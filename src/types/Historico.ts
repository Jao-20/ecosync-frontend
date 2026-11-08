export type RegistroHistorico = {
  id: number
  dispositivoId: number
  dispositivoNome: string
  comodo: string
  ligadoEm: string
  desligadoEm: string | null
  consumoKwh: number | null
}

export type PaginaHistorico = {
  itens: RegistroHistorico[]
  pagina: number
  limite: number
  total: number
  totalPaginas: number
}

export type FiltroHistorico = {
  dispositivoId?: number
  de?: string
  ate?: string
  pagina: number
}
