import { respostaPadrao, respostas } from '../mocks/chat'

function palavrasDe(texto: string) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
}

export async function enviarMensagem(texto: string): Promise<string> {
  const ditas = palavrasDe(texto)
  const achada = respostas.find((r) => r.palavras.some((p) => ditas.includes(p)))

  await new Promise((resolve) => setTimeout(resolve, 1200))

  return achada ? achada.texto : respostaPadrao
}