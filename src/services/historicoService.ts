import type { FiltroHistorico, PaginaHistorico } from '../types/Historico'
import { api } from './api'

export function listarHistorico(filtro: FiltroHistorico): Promise<PaginaHistorico> {
  const parametros = new URLSearchParams()
  for (const [chave, valor] of Object.entries(filtro)) {
    if (valor !== undefined && valor !== '') parametros.set(chave, String(valor))
  }
  return api(`/historico?${parametros}`)
}
