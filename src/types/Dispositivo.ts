export type Dispositivo = {
  id: number
  nome: string
  comodo: string
  tipo: 'luz' | 'climatizacao' | 'eletro'
  ligado: boolean
  consumo: number
}