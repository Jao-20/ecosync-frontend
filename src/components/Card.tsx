import type { ReactNode } from 'react'

type CardProps = {
  titulo: string
  valor: string
  icone: ReactNode
  variacao?: number
  subirEhBom?: boolean
}

function Card({ titulo, valor, icone, variacao, subirEhBom = true }: CardProps) {
  const bom = variacao !== undefined && variacao > 0 === subirEhBom

  return (
    <div className="card">
      <div className="card-topo">
        <div className="card-icone">{icone}</div>

        {variacao !== undefined && (
          <span className={bom ? 'selo-var bom' : 'selo-var ruim'}>
            {variacao > 0 ? '↑' : '↓'} {Math.abs(variacao).toLocaleString('pt-BR')}%
          </span>
        )}
      </div>

      <h2>{titulo}</h2>
      <p className="valor">{valor}</p>
    </div>
  )
}

export default Card