export const mensagemBoasVindas =
  'Olá! Eu sou o assistente do EcoSync. Posso explicar o seu consumo e sugerir formas de economizar. Como posso ajudar?'

export const sugestoes = [
  'Quanto gastei hoje?',
  'Como economizar no ar-condicionado?',
  'Quais aparelhos estão ligados?',
  'Qual a previsão para amanhã?',
]

export const respostas: { palavras: string[]; texto: string }[] = [
  {
    palavras: ['gastei', 'consumo', 'hoje'],
    texto:
      'Hoje a sua casa consumiu 12,4 kWh, cerca de 8% a menos do que ontem. O maior consumo vem da climatização.',
  },
  {
    palavras: ['economizar', 'economia', 'condicionado'],
    texto:
      'O ar-condicionado do quarto costuma ficar ligado depois das 23h sem ninguém. Programar o desligamento para 22h30 pode reduzir cerca de 12% do consumo da semana.',
  },
  {
    palavras: ['ligados', 'aparelhos', 'dispositivos'],
    texto:
      'Agora estão ligados: ar-condicionado da sala, lâmpada principal, lâmpada da mesa, geladeira e lâmpada do corredor.',
  },
  {
    palavras: ['previsao', 'amanha'],
    texto:
      'A previsão para amanhã é de 13,0 kWh, perto da média da semana. Desligando o ar do quarto mais cedo, pode ficar perto de 12 kWh.',
  },
]

export const respostaPadrao =
  'Ainda estou aprendendo sobre isso. Tente perguntar sobre o seu consumo de hoje, os aparelhos ligados, a previsão ou como economizar.'    