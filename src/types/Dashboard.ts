export type Indicador = { valor: number | null; variacao: number | null }

export type DadosDashboard = {
  resumo: {
    consumoHoje: Indicador
    custoMes: Indicador
    economiaMes: Indicador
  }
  consumoSemana: { dia: string; real: number | null; previsto: number | null }[]
  consumoPorTipo: { nome: string; valor: number }[] | null
  consumoPorComodo: { comodo: string; kwh: number }[] | null
  recomendacao: { titulo: string; texto: string } | null
}
