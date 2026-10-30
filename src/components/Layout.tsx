import { useState } from 'react'
import type { FormEvent } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Menu, Search } from 'lucide-react'
import Sidebar from './Sidebar'
import { usuario } from '../mocks/usuario'

function Layout() {
  const navigate = useNavigate()
  const [aberta, setAberta] = useState(false)
  const [texto, setTexto] = useState('')

  function buscar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    navigate(`/dispositivos?busca=${encodeURIComponent(texto)}`)
  }

  return (
    <div className="app">
      <Sidebar aberta={aberta} fechar={() => setAberta(false)} />

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
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout