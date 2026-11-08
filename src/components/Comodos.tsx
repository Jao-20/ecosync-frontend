import { useEffect, useState } from 'react'
import { Check, Pencil, Trash2, X } from 'lucide-react'
import { mensagemDe } from '../services/api'
import { listarAmbientes, removerAmbiente, renomearAmbiente } from '../services/ambientesService'
import type { Ambiente } from '../types/Ambiente'
import type { Dispositivo } from '../types/Dispositivo'

type ComodosProps = {
  dispositivos: Dispositivo[]
  aoRenomear: () => void
}

function Comodos({ dispositivos, aoRenomear }: ComodosProps) {
  const [ambientes, setAmbientes] = useState<Ambiente[]>([])
  const [editandoId, setEditandoId] = useState<number | null>(null)
  const [nome, setNome] = useState('')
  const [erro, setErro] = useState('')
  const [ocupado, setOcupado] = useState(false)

  useEffect(() => {
    listarAmbientes()
      .then(setAmbientes)
      .catch((e: unknown) => setErro(mensagemDe(e)))
  }, [dispositivos])

  function quantos(ambienteId: number) {
    return dispositivos.filter((d) => d.ambienteId === ambienteId).length
  }

  function editar(ambiente: Ambiente) {
    setEditandoId(ambiente.id)
    setNome(ambiente.nome)
    setErro('')
  }

  async function salvar(id: number) {
    if (nome.trim() === '') {
      setErro('Informe o nome do cômodo.')
      return
    }
    setOcupado(true)
    try {
      await renomearAmbiente(id, nome.trim())
      setEditandoId(null)
      setErro('')
      aoRenomear()
    } catch (e) {
      setErro(mensagemDe(e))
    } finally {
      setOcupado(false)
    }
  }

  async function excluir(id: number) {
    if (!window.confirm('Excluir este cômodo?')) return
    setOcupado(true)
    try {
      await removerAmbiente(id)
      setAmbientes((atual) => atual.filter((a) => a.id !== id))
      setErro('')
    } catch (e) {
      setErro(mensagemDe(e))
    } finally {
      setOcupado(false)
    }
  }

  return (
    <section className="comodos">
      <h2>Cômodos</h2>
      <p className="admin-sub">
        Os cômodos são criados ao cadastrar um dispositivo. Só dá para excluir um cômodo vazio.
      </p>

      {erro && <p className="auth-erro">{erro}</p>}

      <div className="tabela-wrap">
        <table className="tabela">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Dispositivos</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {ambientes.map((a) => (
              <tr key={a.id}>
                <td>
                  {editandoId === a.id ? (
                    <input
                      className="input-tabela"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') salvar(a.id)
                        if (e.key === 'Escape') setEditandoId(null)
                      }}
                      maxLength={50}
                      autoFocus
                    />
                  ) : (
                    a.nome
                  )}
                </td>
                <td>{quantos(a.id)}</td>
                <td>
                  <div className="acoes">
                    {editandoId === a.id ? (
                      <>
                        <button
                          className="btn-icone"
                          onClick={() => salvar(a.id)}
                          disabled={ocupado}
                          aria-label="Salvar"
                        >
                          <Check size={18} />
                        </button>
                        <button
                          className="btn-icone"
                          onClick={() => setEditandoId(null)}
                          aria-label="Cancelar"
                        >
                          <X size={18} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button className="btn-icone" onClick={() => editar(a)} aria-label="Renomear">
                          <Pencil size={18} />
                        </button>
                        <button
                          className="btn-icone perigo"
                          onClick={() => excluir(a.id)}
                          disabled={ocupado || quantos(a.id) > 0}
                          title={quantos(a.id) > 0 ? 'Remova os dispositivos deste cômodo antes' : undefined}
                          aria-label="Excluir"
                        >
                          <Trash2 size={18} />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {ambientes.length === 0 && <p className="tabela-vazia">Nenhum cômodo cadastrado.</p>}
      </div>
    </section>
  )
}

export default Comodos
