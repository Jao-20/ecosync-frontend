import type { Dispositivo } from '../types/Dispositivo'

export const dispositivos: Dispositivo[] = [
  { id: 1, nome: 'Ar-condicionado', comodo: 'Sala', tipo: 'climatizacao', ligado: true, consumo: 4.8 },
  { id: 2, nome: 'Ar-condicionado', comodo: 'Quarto', tipo: 'climatizacao', ligado: false, consumo: 3.9 },
  { id: 3, nome: 'Lâmpada principal', comodo: 'Sala', tipo: 'luz', ligado: true, consumo: 0.4 },
  { id: 4, nome: 'Lâmpada da mesa', comodo: 'Quarto', tipo: 'luz', ligado: true, consumo: 0.1 },
  { id: 5, nome: 'Geladeira', comodo: 'Cozinha', tipo: 'eletro', ligado: true, consumo: 1.6 },
  { id: 6, nome: 'Micro-ondas', comodo: 'Cozinha', tipo: 'eletro', ligado: false, consumo: 0.7 },
  { id: 7, nome: 'Máquina de lavar', comodo: 'Lavanderia', tipo: 'eletro', ligado: false, consumo: 1.2 },
  { id: 8, nome: 'Lâmpada do corredor', comodo: 'Corredor', tipo: 'luz', ligado: true, consumo: 0.2 },
]