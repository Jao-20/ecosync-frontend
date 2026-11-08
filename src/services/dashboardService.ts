import type { DadosDashboard } from '../types/Dashboard'
import { api } from './api'

export function obterDashboard(): Promise<DadosDashboard> {
  return api('/dashboard')
}
