export type Dispositivo = {
  id: number
  nome: string
  comodo: string
  ambienteId: number
  tipo: 'luz' | 'climatizacao' | 'eletro' | 'entretenimento'
  ligado: boolean
  potenciaWatts: number
  consumo: number
}

export type DadosDispositivo = Pick<Dispositivo, 'nome' | 'comodo' | 'tipo' | 'potenciaWatts'>
