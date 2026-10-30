import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  function enviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    // Por enquanto só simula. Depois: validar o login na API do back-end.
    console.log('Login simulado:', { email })
    navigate('/dashboard')
  }

  return (
    <section className="auth">
      <form className="auth-card" onSubmit={enviar}>
        <Link to="/" className="auth-logo">EcoSync</Link>
        <h1>Entrar</h1>
        <p className="auth-sub">Faça login para acessar a sua casa.</p>

        <label className="campo">
          E-mail
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>

        <label className="campo">
          Senha
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
        </label>

        <button type="submit" className="botao auth-botao">Fazer login</button>

        <p className="auth-troca">
          Ainda não tem conta? <Link to="/cadastro">Cadastre-se</Link>
        </p>
      </form>
    </section>
  )
}

export default Login