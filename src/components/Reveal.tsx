import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  atraso?: number
}

function Reveal({ children, atraso = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visivel, setVisivel] = useState(false)

  useEffect(() => {
    const elemento = ref.current
    if (!elemento) return

    const observer = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setVisivel(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )

    observer.observe(elemento)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={visivel ? 'reveal visivel' : 'reveal'}
      style={{ transitionDelay: `${atraso}ms` }}
    >
      {children}
    </div>
  )
}

export default Reveal