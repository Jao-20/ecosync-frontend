import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { mensagemDe } from '../services/api'
import { entrar } from '../services/authService'

type EstadoLogin = { cadastradoEmail?: string } | null

function Login() {
  const navigate = useNavigate()
  const cadastradoEmail = (useLocation().state as EstadoLogin)?.cadastradoEmail
  const [email, setEmail] = useState(cadastradoEmail ?? '')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [enviando, setEnviando] = useState(false)

  async function enviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    setErro('')
    setEnviando(true)
    try {
      await entrar(email, senha)
      navigate('/dashboard')
    } catch (e) {
      setErro(mensagemDe(e))
      setEnviando(false)
    }
  }

  return (
    <section className="auth">
      <form className="auth-card" onSubmit={enviar}>
        <Link to="/" className="auth-logo">EcoSync</Link>
        <h1>Entrar</h1>
        <p className="auth-sub">Faça login para acessar a sua casa.</p>

        {cadastradoEmail && (
          <p className="auth-sucesso">Conta criada com sucesso. Entre com a sua senha.</p>
        )}

        <label className="campo">
          E-mail
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>

        <label className="campo">
          Senha
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
        </label>

        {erro && <p className="auth-erro">{erro}</p>}

        <button type="submit" className="botao auth-botao" disabled={enviando}>
          {enviando ? 'Entrando...' : 'Fazer login'}
        </button>

        <p className="auth-troca">
          Ainda não tem conta? <Link to="/cadastro">Cadastre-se</Link>
        </p>
      </form>
    </section>
  )
}

export default Login