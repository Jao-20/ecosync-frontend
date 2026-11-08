import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Menu, Search } from 'lucide-react'
import Sidebar from './Sidebar'
import { mensagemDe } from '../services/api'
import { obterUsuarioAtual } from '../services/authService'
import type { Usuario } from '../types/Usuario'

export type ContextoLayout = {
  usuario: Usuario
  setUsuario: (usuario: Usuario) => void
}

function Layout() {
  const navigate = useNavigate()
  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const [erro, setErro] = useState('')
  const [aberta, setAberta] = useState(false)
  const [texto, setTexto] = useState('')

  useEffect(() => {
    obterUsuarioAtual()
      .then(setUsuario)
      .catch((e: unknown) => setErro(mensagemDe(e)))
  }, [])

  function buscar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    navigate(`/dispositivos?busca=${encodeURIComponent(texto)}`)
  }

  if (usuario === null) {
    return (
      <div className="container">
        {erro ? <p className="auth-erro">{erro}</p> : <p>Carregando...</p>}
      </div>
    )
  }

  return (
    <div className="app">
      <Sidebar usuario={usuario} aberta={aberta} fechar={() => setAberta(false)} />

      <div className="app-conteudo">
        <header className="topbar">
          <button className="topbar-menu" onClick={() => setAberta(true)} aria-label="Abrir menu">
            <Menu size={22} />
          </button>

          <form className="topbar-busca" onSubmit={buscar}>
            <Search size={18} />
            <input
              type="text"
              placeholder="Buscar dispositivos..."
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
            />
          </form>

          <div className="topbar-usuario">
            <div className="avatar">{usuario.nome[0]}</div>
            <span>{usuario.nome}</span>
          </div>
        </header>

        <main>
          <Outlet context={{ usuario, setUsuario } satisfies ContextoLayout} />
        </main>
      </div>
    </div>
  )
}

export default Layout
