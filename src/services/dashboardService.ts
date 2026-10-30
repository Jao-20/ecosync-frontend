import { dadosDashboard } from '../mocks/dashboard'
import type { DadosDashboard } from '../types/Dashboard'

export async function obterDashboard(): Promise<DadosDashboard> {
  // Por enquanto devolve o mock. Quando a API existir, só esta função muda.
  return dadosDashboard
}