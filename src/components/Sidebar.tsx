import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Lightbulb, LayoutDashboard, LogOut, MessageCircle, Settings } from 'lucide-react'
import { usuario } from '../mocks/usuario'

type SidebarProps = {
  aberta: boolean
  fechar: () => void
}

const itens = [
  { to: '/dashboard', rotulo: 'Dashboard', icone: LayoutDashboard },
  { to: '/dispositivos', rotulo: 'Dispositivos', icone: Lightbulb },
  { to: '/chat', rotulo: 'Chat', icone: MessageCircle },
  { to: '/admin', rotulo: 'Admin', icone: Settings },
]

function Sidebar({ aberta, fechar }: SidebarProps) {
  const navigate = useNavigate()

  return (
    <>
      {aberta && <div className="sidebar-fundo" onClick={fechar} />}

      <aside className={aberta ? 'sidebar aberta' : 'sidebar'}>
        <Link to="/" className="sidebar-logo">
          EcoSync
        </Link>

        <span className="sidebar-secao">Navegação</span>

        <nav className="sidebar-nav">
          {itens.map(({ to, rotulo, icone: Icone }) => (
            <NavLink key={to} to={to} onClick={fechar}>
              <Icone size={20} />
              {rotulo}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-conta">
          <div className="avatar">{usuario.nome[0]}</div>
          <div className="conta-info">
            <strong>{usuario.nome}</strong>
            <span>{usuario.email}</span>
          </div>
          <button className="sair" onClick={() => navigate('/login')} aria-label="Sair">
            <LogOut size={18} />
          </button>
        </div>
      </aside>
    </>
  )
}

export default Sidebar