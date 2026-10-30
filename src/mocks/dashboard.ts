import type { DadosDashboard } from '../types/Dashboard'

export const dadosDashboard: DadosDashboard = {
  resumo: {
    consumoHoje: { valor: 12.4, variacao: -8.2 },
    custoMes: { valor: 286.5, variacao: -4.1 },
    economiaMes: { valor: 54.2, variacao: 12.6 },
  },
  consumoSemana: [
    { dia: 'Seg', real: 13.1, previsto: 13.8 },
    { dia: 'Ter', real: 12.6, previsto: 13.2 },
    { dia: 'Qua', real: 14.2, previsto: 13.5 },
    { dia: 'Qui', real: 11.8, previsto: 12.9 },
    { dia: 'Sex', real: 12.9, previsto: 13.1 },
    { dia: 'Sáb', real: 15.3, previsto: 14.8 },
    { dia: 'Dom', real: 12.4, previsto: 13.0 },
  ],
  consumoPorTipo: [
    { nome: 'Climatização', valor: 52 },
    { nome: 'Iluminação', valor: 18 },
    { nome: 'Eletrodomésticos', valor: 30 },
  ],
  consumoPorComodo: [
    { comodo: 'Sala', kwh: 5.2 },
    { comodo: 'Quarto', kwh: 3.9 },
    { comodo: 'Cozinha', kwh: 2.1 },
    { comodo: 'Lavanderia', kwh: 0.8 },
    { comodo: 'Corredor', kwh: 0.4 },
  ],
  recomendacao: {
    titulo: 'Dica da IA',
    texto:
      'O ar-condicionado do quarto costuma ficar ligado até depois das 23h sem ninguém. Programar o desligamento para 22h30 pode reduzir cerca de 12% do consumo da semana.',
  },
}