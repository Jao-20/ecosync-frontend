import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import { listarDispositivos } from '../services/dispositivosService'
import type { Dispositivo } from '../types/Dispositivo'

const tipos = [
  { valor: 'todos', rotulo: 'Todos' },
  { valor: 'luz', rotulo: 'Iluminação' },
  { valor: 'climatizacao', rotulo: 'Climatização' },
  { valor: 'eletro', rotulo: 'Eletrodomésticos' },
]

const ordens = [
  { valor: 'nome', rotulo: 'Nome (A-Z)' },
  { valor: 'consumo', rotulo: 'Maior consumo' },
]

function normalizar(texto: string) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[-_]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function Dispositivos() {
  const [lista, setLista] = useState<Dispositivo[]>([])
  const [carregando, setCarregando] = useState(true)
  const [busca, setBusca] = useState('')
  const [tipo, setTipo] = useState('todos')
  const [ordem, setOrdem] = useState('nome')

  useEffect(() => {
    listarDispositivos().then((dados) => {
      setLista(dados)
      setCarregando(false)
    })
  }, [])

  function alternar(id: number) {
    setLista(lista.map((d) => (d.id === id ? { ...d, ligado: !d.ligado } : d)))
  }

  const termos = normalizar(busca).split(' ').filter(Boolean)

  const filtrados = lista
    .filter((d) => {
      const alvo = normalizar(`${d.nome} ${d.comodo}`)
      return termos.every((t) => alvo.includes(t))
    })
    .filter((d) => tipo === 'todos' || d.tipo === tipo)
    .sort((a, b) => {
      if (ordem === 'consumo') return b.consumo - a.consumo
      return a.nome.localeCompare(b.nome)
    })

  return (
    <div className="container">
      <h1>Dispositivos</h1>

      <div className="painel-filtros">
        <div className="busca">
          <Search size={18} />
          <input
            type="text"
            placeholder="Buscar por nome ou cômodo..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>

        <div className="grupo">
          <span className="grupo-titulo">Tipo</span>
          <div className="chips">
            {tipos.map((t) => (
              <button
                key={t.valor}
                className={tipo === t.valor ? 'chip ativo' : 'chip'}
                onClick={() => setTipo(t.valor)}
              >
                {t.rotulo}
              </button>
            ))}
          </div>
        </div>

        <div className="grupo">
          <span className="grupo-titulo">Ordenar por</span>
          <div className="chips">
            {ordens.map((o) => (
              <button
                key={o.valor}
                className={ordem === o.valor ? 'chip ativo' : 'chip'}
                onClick={() => setOrdem(o.valor)}
              >
                {o.rotulo}
              </button>
            ))}
          </div>
        </div>
      </div>

      {carregando && <p>Carregando...</p>}
      {!carregando && (
        <p className="contagem">
          {filtrados.length} {filtrados.length === 1 ? 'dispositivo' : 'dispositivos'}
        </p>
      )}
      {!carregando && filtrados.length === 0 && <p>Nenhum dispositivo encontrado.</p>}

      <div className="lista">
        {filtrados.map((d) => (
          <div className="dispositivo" key={d.id}>
            <div>
              <h2>{d.nome}</h2>
              <p>
                {d.comodo} · {d.consumo.toLocaleString('pt-BR')} kWh/dia
              </p>
            </div>

            <button
              className={d.ligado ? 'toggle ligado' : 'toggle'}
              onClick={() => alternar(d.id)}
            >
              {d.ligado ? 'Ligado' : 'Desligado'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dispositivos