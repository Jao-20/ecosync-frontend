import type { Usuario } from '../types/Usuario'
import { api } from './api'

export function entrar(email: string, senha: string): Promise<Usuario> {
  return api('/auth/login', 'POST', { email, senha })
}

export function sair(): Promise<void> {
  return api('/auth/logout', 'POST')
}

export function cadastrar(nome: string, email: string, senha: string): Promise<Usuario> {
  return api('/usuarios', 'POST', { nome, email, senha })
}

export function obterUsuarioAtual(): Promise<Usuario> {
  return api('/usuarios/me')
}

export type AlteracaoPerfil = {
  nome?: string
  email?: string
  senhaAtual?: string
  novaSenha?: string
}

export function atualizarPerfil(dados: AlteracaoPerfil): Promise<Usuario> {
  return api('/usuarios/me', 'PATCH', dados)
}

export function excluirConta(senha: string): Promise<void> {
  return api('/usuarios/me', 'DELETE', { senha })
}
