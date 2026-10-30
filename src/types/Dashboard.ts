export type DadosDashboard = {
  resumo: {
    consumoHoje: { valor: number; variacao: number }
    custoMes: { valor: number; variacao: number }
    economiaMes: { valor: number; variacao: number }
  }
  consumoSemana: { dia: string; real: number; previsto: number }[]
  consumoPorTipo: { nome: string; valor: number }[]
  consumoPorComodo: { comodo: string; kwh: number }[]
  recomendacao: { titulo: string; texto: string }
}