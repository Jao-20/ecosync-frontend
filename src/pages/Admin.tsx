import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import Comodos from '../components/Comodos'
import { mensagemDe } from '../services/api'
import {
  atualizarDispositivo,
  criarDispositivo,
  listarDispositivos,
  removerDispositivo,
} from '../services/dispositivosService'
import type { Dispositivo } from '../types/Dispositivo'

const tiposAdmin: { valor: Dispositivo['tipo']; rotulo: string }[] = [
  { valor: 'luz', rotulo: 'Iluminação' },
  { valor: 'climatizacao', rotulo: 'Climatização' },
  { valor: 'eletro', rotulo: 'Eletrodomésticos' },
  { valor: 'entretenimento', rotulo: 'Entretenimento' },
]

const nomesTipo = {
  luz: 'Iluminação',
  climatizacao: 'Climatização',
  eletro: 'Eletrodomésticos',
  entretenimento: 'Entretenimento',
}

function Admin() {
  const [lista, setLista] = useState<Dispositivo[]>([])
  const [editandoId, setEditandoId] = useState<number | null>(null)
  const [nome, setNome] = useState('')
  const [comodo, setComodo] = useState('')
  const [tipo, setTipo] = useState<Dispositivo['tipo']>('luz')
  const [potencia, setPotencia] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(true)
  const [salvando, setSalvando] = useState(false)

  useEffect(() => {
    listarDispositivos()
      .then(setLista)
      .catch((e: unknown) => setErro(mensagemDe(e)))
      .finally(() => setCarregando(false))
  }, [])

  async function recarregar() {
    try {
      setLista(await listarDispositivos())
    } catch (e) {
      setErro(mensagemDe(e))
    }
  }

  function limpar() {
    setEditandoId(null)
    setNome('')
    setComodo('')
    setTipo('luz')
    setPotencia('')
    setErro('')
  }

  function editar(d: Dispositivo) {
    setEditandoId(d.id)
    setNome(d.nome)
    setComodo(d.comodo)
    setTipo(d.tipo)
    setPotencia(String(d.potenciaWatts).replace('.', ','))
    setErro('')
  }

  async function excluir(id: number) {
    if (!window.confirm('Excluir este dispositivo?')) return
    try {
      await removerDispositivo(id)
      setLista(await listarDispositivos())
      if (editandoId === id) limpar()
    } catch (e) {
      setErro(mensagemDe(e))
    }
  }

  async function enviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()

    const potenciaWatts = Number(potencia.replace(',', '.'))

    if (nome.trim() === '' || comodo.trim() === '') {
      setErro('Preencha o nome e o cômodo.')
      return
    }
    if (potencia.trim() === '' || Number.isNaN(potenciaWatts) || potenciaWatts <= 0) {
      setErro('Informe uma potência válida, em watts (ex.: 60).')
      return
    }

    const dados = { nome: nome.trim(), comodo: comodo.trim(), tipo, potenciaWatts }

    setSalvando(true)
    try {
      if (editandoId === null) {
        await criarDispositivo(dados)
      } else {
        await atualizarDispositivo(editandoId, dados)
      }
      setLista(await listarDispositivos())
      limpar()
    } catch (e) {
      setErro(mensagemDe(e))
    } finally {
      setSalvando(false)
    }
  }

  return (
    <div className="container">
      <h1>Área Administrativa</h1>
      <p className="admin-sub">Cadastre, edite e remova os dispositivos da casa.</p>

      <form className="admin-form" onSubmit={enviar}>
        <div className="admin-form-topo">
          <h2>{editandoId === null ? 'Novo dispositivo' : 'Editar dispositivo'}</h2>
        </div>

        <div className="admin-form-corpo">
          <div className="form-grid">
            <label className="campo">
              Nome
              <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
            </label>

            <label className="campo">
              Cômodo
              <input type="text" value={comodo} onChange={(e) => setComodo(e.target.value)} />
            </label>

            <label className="campo">
              Potência (W)
              <input
                type="text"
                inputMode="decimal"
                value={potencia}
                onChange={(e) => setPotencia(e.target.value)}
              />
            </label>
          </div>

          <div className="grupo">
            <span className="grupo-titulo grupo-claro">Tipo</span>
            <div className="chips chips-claro">
              {tiposAdmin.map((t) => (
                <button
                  type="button"
                  key={t.valor}
                  className={tipo === t.valor ? 'chip ativo' : 'chip'}
                  onClick={() => setTipo(t.valor)}
                >
                  {t.rotulo}
                </button>
              ))}
            </div>
          </div>

          {erro && <p className="auth-erro">{erro}</p>}

          <div className="form-acoes">
            <button type="submit" className="botao botao-form" disabled={salvando}>
              {salvando ? 'Salvando...' : editandoId === null ? 'Cadastrar' : 'Salvar alterações'}
            </button>
            {editandoId !== null && (
              <button type="button" className="botao-secundario" onClick={limpar}>
                Cancelar
              </button>
            )}
          </div>
        </div>
      </form>

      <div className="tabela-wrap">
        <table className="tabela">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Cômodo</th>
              <th>Tipo</th>
              <th>Potência</th>
              <th>Consumo</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {lista.map((d) => (
              <tr key={d.id}>
                <td>{d.nome}</td>
                <td>{d.comodo}</td>
                <td>
                  <span className="selo">{nomesTipo[d.tipo]}</span>
                </td>
                <td>{d.potenciaWatts.toLocaleString('pt-BR')} W</td>
                <td>{d.consumo.toLocaleString('pt-BR')} kWh/dia</td>
                <td>
                  <div className="acoes">
                    <button className="btn-icone" onClick={() => editar(d)} aria-label="Editar">
                      <Pencil size={18} />
                    </button>
                    <button className="btn-icone perigo" onClick={() => excluir(d.id)} aria-label="Excluir">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {carregando && <p className="tabela-vazia">Carregando...</p>}
        {!carregando && lista.length === 0 && (
          <p className="tabela-vazia">Nenhum dispositivo cadastrado.</p>
        )}
      </div>

      {!carregando && <Comodos dispositivos={lista} aoRenomear={recarregar} />}
    </div>
  )
}

export default Admin