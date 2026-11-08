import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { mensagemDe } from '../services/api'
import { cadastrar } from '../services/authService'

function Cadastro() {
  const navigate = useNavigate()
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmar, setConfirmar] = useState('')
  const [erro, setErro] = useState('')
  const [enviando, setEnviando] = useState(false)

  async function enviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()

    if (senha.length < 6) {
      setErro('A senha precisa ter pelo menos 6 caracteres.')
      return
    }
    if (senha !== confirmar) {
      setErro('As senhas não são iguais.')
      return
    }

    setErro('')
    setEnviando(true)
    try {
      const usuario = await cadastrar(nome, email, senha)
      navigate('/login', { state: { cadastradoEmail: usuario.email } })
    } catch (e) {
      setErro(mensagemDe(e))
      setEnviando(false)
    }
  }

  return (
    <section className="auth">
      <form className="auth-card" onSubmit={enviar}>
        <Link to="/" className="auth-logo">EcoSync</Link>
        <h1>Criar conta</h1>

        <label className="campo">
          Nome
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
        </label>

        <label className="campo">
          E-mail
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>

        <label className="campo">
          Senha
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
        </label>

        <label className="campo">
          Confirmar senha
          <input type="password" value={confirmar} onChange={(e) => setConfirmar(e.target.value)} required />
        </label>

        {erro && <p className="auth-erro">{erro}</p>}

        <button type="submit" className="botao auth-botao" disabled={enviando}>
          {enviando ? 'Cadastrando...' : 'Cadastrar'}
        </button>

        <p className="auth-troca">
          Já tem conta? <Link to="/login">Entrar</Link>
        </p>
      </form>
    </section>
  )
}

export default Cadastro