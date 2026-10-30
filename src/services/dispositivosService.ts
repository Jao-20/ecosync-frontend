import { dispositivos as dadosIniciais } from '../mocks/dispositivos'
import type { Dispositivo } from '../types/Dispositivo'

// "Banco de dados" falso, na memória. Quando a API existir, some daqui.
let banco: Dispositivo[] = [...dadosIniciais]

export async function listarDispositivos(): Promise<Dispositivo[]> {
  return [...banco]
}

export async function criarDispositivo(dados: Omit<Dispositivo, 'id'>): Promise<Dispositivo> {
  const novo: Dispositivo = { ...dados, id: Date.now() }
  banco = [...banco, novo]
  return novo
}

export async function atualizarDispositivo(atualizado: Dispositivo): Promise<void> {
  banco = banco.map((d) => (d.id === atualizado.id ? atualizado : d))
}

export async function removerDispositivo(id: number): Promise<void> {
  banco = banco.filter((d) => d.id !== id)
}