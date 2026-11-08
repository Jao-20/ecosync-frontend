export class ErroApi extends Error {
  status: number
  codigo: string

  constructor(status: number, codigo: string, mensagem: string) {
    super(mensagem)
    this.status = status
    this.codigo = codigo
  }
}

export function mensagemDe(erro: unknown) {
  return erro instanceof ErroApi ? erro.message : 'Algo deu errado. Tente novamente.'
}

type CorpoDeErro = { erro?: { codigo?: string; mensagem?: string } } | null

export async function api<T>(caminho: string, metodo = 'GET', corpo?: object): Promise<T> {
  let resposta: Response
  try {
    resposta = await fetch(`/api${caminho}`, {
      method: metodo,
      headers: corpo ? { 'Content-Type': 'application/json' } : undefined,
      body: corpo ? JSON.stringify(corpo) : undefined,
    })
  } catch {
    throw new ErroApi(0, 'SEM_CONEXAO', 'Não foi possível conectar ao servidor.')
  }

  if (resposta.status === 204) return undefined as T

  const dados: unknown = await resposta.json().catch(() => null)
  if (resposta.ok) return dados as T

  const { erro } = (dados as CorpoDeErro) ?? {}
  const codigo = erro?.codigo ?? 'ERRO'

  if (codigo === 'NAO_AUTENTICADO') window.location.assign('/login')

  throw new ErroApi(
    resposta.status,
    codigo,
    erro?.mensagem ?? 'Algo deu errado. Tente novamente.',
  )
}
