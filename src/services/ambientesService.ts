import type { Ambiente } from '../types/Ambiente'
import { api } from './api'

export function listarAmbientes(): Promise<Ambiente[]> {
  return api('/ambientes')
}

export function renomearAmbiente(id: number, nome: string): Promise<Ambiente> {
  return api(`/ambientes/${id}`, 'PATCH', { nome })
}

export function removerAmbiente(id: number): Promise<void> {
  return api(`/ambientes/${id}`, 'DELETE')
}
