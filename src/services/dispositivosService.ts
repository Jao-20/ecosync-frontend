import type { DadosDispositivo, Dispositivo } from '../types/Dispositivo'
import { api } from './api'

export function listarDispositivos(): Promise<Dispositivo[]> {
  return api('/dispositivos')
}

export function criarDispositivo(dados: DadosDispositivo): Promise<Dispositivo> {
  return api('/dispositivos', 'POST', dados)
}

export function atualizarDispositivo(id: number, dados: DadosDispositivo): Promise<Dispositivo> {
  return api(`/dispositivos/${id}`, 'PUT', dados)
}

export function alterarEstado(id: number, ligado: boolean): Promise<Dispositivo> {
  return api(`/dispositivos/${id}/estado`, 'PATCH', { ligado })
}

export function removerDispositivo(id: number): Promise<void> {
  return api(`/dispositivos/${id}`, 'DELETE')
}
