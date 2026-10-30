export type Mensagem = {
  id: number
  autor: 'usuario' | 'assistente'
  texto: string
  hora: string
}