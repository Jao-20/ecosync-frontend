import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
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
]

const nomesTipo = {
  luz: 'Iluminação',
  climatizacao: 'Climatização',
  eletro: 'Eletrodomésticos',
}

function Admin() {
  const [lista, setLista] = useState<Dispositivo[]>([])
  const [editandoId, setEditandoId] = useState<number | null>(null)
  const [nome, setNome] = useState('')
  const [comodo, setComodo] = useState('')
  const [tipo, setTipo] = useState<Dispositivo['tipo']>('luz')
  const [consumo, setConsumo] = useState('')
  const [erro, setErro] = useState('')

  useEffect(() => {
    listarDispositivos().then(setLista)
  }, [])

  function limpar() {
    setEditandoId(null)
    setNome('')
    setComodo('')
    setTipo('luz')
    setConsumo('')
    setErro('')
  }

  function editar(d: Dispositivo) {
    setEditandoId(d.id)
    setNome(d.nome)
    setComodo(d.comodo)
    setTipo(d.tipo)
    setConsumo(String(d.consumo).replace('.', ','))
    setErro('')
  }

  async function excluir(id: number) {
    if (!window.confirm('Excluir este dispositivo?')) return
    await removerDispositivo(id)
    setLista(await listarDispositivos())
    if (editandoId === id) limpar()
  }

  async function enviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()

    const valorConsumo = Number(consumo.replace(',', '.'))

    if (nome.trim() === '' || comodo.trim() === '') {
      setErro('Preencha o nome e o cômodo.')
      return
    }
    if (consumo.trim() === '' || Number.isNaN(valorConsumo) || valorConsumo < 0) {
      setErro('Informe um consumo válido (ex.: 1,5).')
      return
    }

    if (editandoId === null) {
      await criarDispositivo({
        nome: nome.trim(),
        comodo: comodo.trim(),
        tipo,
        ligado: false,
        consumo: valorConsumo,
      })
    } else {
      const original = lista.find((d) => d.id === editandoId)
      if (original) {
        await atualizarDispositivo({
          ...original,
          nome: nome.trim(),
          comodo: comodo.trim(),
          tipo,
          consumo: valorConsumo,
        })
      }
    }

    setLista(await listarDispositivos())
    limpar()
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
              Consumo (kWh/dia)
              <input
                type="text"
                inputMode="decimal"
                value={consumo}
                onChange={(e) => setConsumo(e.target.value)}
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
            <button type="submit" className="botao botao-form">
              {editandoId === null ? 'Cadastrar' : 'Salvar alterações'}
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
                <td>{d.consumo.toLocaleString('pt-BR')} kWh</td>
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

        {lista.length === 0 && <p className="tabela-vazia">Nenhum dispositivo cadastrado.</p>}
      </div>
    </div>
  )
}

export default Admin