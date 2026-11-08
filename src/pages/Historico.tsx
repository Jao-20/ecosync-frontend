import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { mensagemDe } from '../services/api'
import { listarDispositivos } from '../services/dispositivosService'
import { listarHistorico } from '../services/historicoService'
import type { Dispositivo } from '../types/Dispositivo'
import type { PaginaHistorico } from '../types/Historico'

const formatoData = new Intl.DateTimeFormat('pt-BR', {
  dateStyle: 'short',
  timeStyle: 'short',
  timeZone: 'America/Sao_Paulo',
})

function duracao(inicio: string, fim: string | null) {
  const minutos = Math.round(
    ((fim ? new Date(fim).getTime() : Date.now()) - new Date(inicio).getTime()) / 60_000,
  )
  if (minutos < 60) return `${minutos} min`
  const horas = Math.floor(minutos / 60)
  const resto = minutos % 60
  return resto === 0 ? `${horas} h` : `${horas} h ${resto} min`
}

function Historico() {
  const [dispositivos, setDispositivos] = useState<Dispositivo[]>([])
  const [dispositivoId, setDispositivoId] = useState('')
  const [de, setDe] = useState('')
  const [ate, setAte] = useState('')
  const [pagina, setPagina] = useState(1)
  const [dados, setDados] = useState<PaginaHistorico | null>(null)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  useEffect(() => {
    listarDispositivos()
      .then(setDispositivos)
      .catch((e: unknown) => setErro(mensagemDe(e)))
  }, [])

  useEffect(() => {
    let atual = true
    listarHistorico({
      dispositivoId: dispositivoId ? Number(dispositivoId) : undefined,
      de: de || undefined,
      ate: ate || undefined,
      pagina,
    })
      .then((resposta) => atual && setDados(resposta))
      .catch((e: unknown) => atual && setErro(mensagemDe(e)))
      .finally(() => atual && setCarregando(false))
    return () => {
      atual = false
    }
  }, [dispositivoId, de, ate, pagina])

  function buscar(aplicar: () => void) {
    aplicar()
    setCarregando(true)
    setErro('')
  }

  function filtrar(aplicar: () => void) {
    buscar(() => {
      aplicar()
      setPagina(1)
    })
  }

  const filtrando = dispositivoId !== '' || de !== '' || ate !== ''

  return (
    <div className="container">
      <h1>Histórico de uso</h1>
      <p className="admin-sub">Cada vez que um dispositivo foi ligado, por quanto tempo e quanto consumiu.</p>

      <div className="admin-form">
        <div className="admin-form-corpo">
          <div className="form-grid">
            <label className="campo">
              Dispositivo
              <select
                value={dispositivoId}
                onChange={(e) => filtrar(() => setDispositivoId(e.target.value))}
              >
                <option value="">Todos</option>
                {dispositivos.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.nome} ({d.comodo})
                  </option>
                ))}
              </select>
            </label>

            <label className="campo">
              De
              <input
                type="date"
                value={de}
                max={ate || undefined}
                onChange={(e) => filtrar(() => setDe(e.target.value))}
              />
            </label>

            <label className="campo">
              Até
              <input
                type="date"
                value={ate}
                min={de || undefined}
                onChange={(e) => filtrar(() => setAte(e.target.value))}
              />
            </label>
          </div>

          {filtrando && (
            <button
              type="button"
              className="botao-secundario"
              onClick={() =>
                filtrar(() => {
                  setDispositivoId('')
                  setDe('')
                  setAte('')
                })
              }
            >
              Limpar filtros
            </button>
          )}
        </div>
      </div>

      {erro && <p className="auth-erro">{erro}</p>}

      <div className="tabela-wrap">
        <table className="tabela">
          <thead>
            <tr>
              <th>Dispositivo</th>
              <th>Cômodo</th>
              <th>Ligado em</th>
              <th>Desligado em</th>
              <th>Duração</th>
              <th>Consumo</th>
            </tr>
          </thead>
          <tbody>
            {dados?.itens.map((r) => (
              <tr key={r.id}>
                <td>{r.dispositivoNome}</td>
                <td>{r.comodo}</td>
                <td>{formatoData.format(new Date(r.ligadoEm))}</td>
                <td>
                  {r.desligadoEm ? (
                    formatoData.format(new Date(r.desligadoEm))
                  ) : (
                    <span className="selo">Ligado agora</span>
                  )}
                </td>
                <td>{duracao(r.ligadoEm, r.desligadoEm)}</td>
                <td>
                  {r.consumoKwh === null ? '—' : `${r.consumoKwh.toLocaleString('pt-BR')} kWh`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {carregando && <p className="tabela-vazia">Carregando...</p>}
        {!carregando && dados?.itens.length === 0 && (
          <p className="tabela-vazia">
            {filtrando ? 'Nenhum registro para esses filtros.' : 'Nenhum uso registrado ainda.'}
          </p>
        )}
      </div>

      {dados && dados.totalPaginas > 1 && (
        <div className="paginacao">
          <button
            className="btn-icone"
            onClick={() => buscar(() => setPagina((p) => p - 1))}
            disabled={carregando || pagina <= 1}
            aria-label="Página anterior"
          >
            <ChevronLeft size={18} />
          </button>
          <span>
            Página {dados.pagina} de {dados.totalPaginas} · {dados.total} registros
          </span>
          <button
            className="btn-icone"
            onClick={() => buscar(() => setPagina((p) => p + 1))}
            disabled={carregando || pagina >= dados.totalPaginas}
            aria-label="Próxima página"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  )
}

export default Historico
