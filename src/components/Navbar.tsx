import { Link, NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">EcoSync</Link>
      <div className="links">
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/dispositivos">Dispositivos</NavLink>
        <NavLink to="/chat">Chat</NavLink>
        <NavLink to="/admin">Admin</NavLink>
      </div>
    </nav>
  )
}

export default Navbar