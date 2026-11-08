import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import type { ContextoLayout } from '../components/Layout'
import { mensagemDe } from '../services/api'
import { atualizarPerfil, excluirConta } from '../services/authService'
import type { AlteracaoPerfil } from '../services/authService'

function Perfil() {
  const navigate = useNavigate()
  const { usuario, setUsuario } = useOutletContext<ContextoLayout>()

  const [nome, setNome] = useState(usuario.nome)
  const [email, setEmail] = useState(usuario.email)
  const [dadosAviso, setDadosAviso] = useState({ erro: '', ok: '' })
  const [salvandoDados, setSalvandoDados] = useState(false)

  const [senhaAtual, setSenhaAtual] = useState('')
  const [novaSenha, setNovaSenha] = useState('')
  const [confirmar, setConfirmar] = useState('')
  const [senhaAviso, setSenhaAviso] = useState({ erro: '', ok: '' })
  const [salvandoSenha, setSalvandoSenha] = useState(false)

  const [senhaExclusao, setSenhaExclusao] = useState('')
  const [erroExclusao, setErroExclusao] = useState('')
  const [excluindo, setExcluindo] = useState(false)

  async function salvarDados(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()

    const alteracao: AlteracaoPerfil = {}
    if (nome.trim() !== usuario.nome) alteracao.nome = nome.trim()
    if (email.trim().toLowerCase() !== usuario.email) alteracao.email = email.trim()

    if (Object.keys(alteracao).length === 0) {
      setDadosAviso({ erro: '', ok: 'Nada mudou.' })
      return
    }

    setSalvandoDados(true)
    setDadosAviso({ erro: '', ok: '' })
    try {
      const atualizado = await atualizarPerfil(alteracao)
      setUsuario(atualizado)
      setNome(atualizado.nome)
      setEmail(atualizado.email)
      setDadosAviso({ erro: '', ok: 'Dados atualizados.' })
    } catch (e) {
      setDadosAviso({ erro: mensagemDe(e), ok: '' })
    } finally {
      setSalvandoDados(false)
    }
  }

  async function trocarSenha(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()

    if (novaSenha.length < 6) {
      setSenhaAviso({ erro: 'A nova senha precisa ter pelo menos 6 caracteres.', ok: '' })
      return
    }
    if (novaSenha !== confirmar) {
      setSenhaAviso({ erro: 'As senhas não são iguais.', ok: '' })
      return
    }

    setSalvandoSenha(true)
    setSenhaAviso({ erro: '', ok: '' })
    try {
      await atualizarPerfil({ senhaAtual, novaSenha })
      setSenhaAtual('')
      setNovaSenha('')
      setConfirmar('')
      setSenhaAviso({ erro: '', ok: 'Senha alterada.' })
    } catch (e) {
      setSenhaAviso({ erro: mensagemDe(e), ok: '' })
    } finally {
      setSalvandoSenha(false)
    }
  }

  async function excluir(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    if (!window.confirm('Excluir a sua conta? Seus dispositivos e o histórico deixam de ficar disponíveis.')) {
      return
    }

    setExcluindo(true)
    setErroExclusao('')
    try {
      await excluirConta(senhaExclusao)
      navigate('/login', { replace: true })
    } catch (e) {
      setErroExclusao(mensagemDe(e))
      setExcluindo(false)
    }
  }

  return (
    <div className="container">
      <h1>Meu perfil</h1>
      <p className="admin-sub">Altere seus dados, sua senha ou exclua a sua conta.</p>

      <form className="admin-form" onSubmit={salvarDados}>
        <div className="admin-form-topo">
          <h2>Dados da conta</h2>
        </div>
        <div className="admin-form-corpo">
          <div className="form-grid">
            <label className="campo">
              Nome
              <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
            </label>
            <label className="campo">
              E-mail
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>
          </div>

          {dadosAviso.erro && <p className="auth-erro">{dadosAviso.erro}</p>}
          {dadosAviso.ok && <p className="auth-sucesso">{dadosAviso.ok}</p>}

          <div className="form-acoes">
            <button type="submit" className="botao botao-form" disabled={salvandoDados}>
              {salvandoDados ? 'Salvando...' : 'Salvar dados'}
            </button>
          </div>
        </div>
      </form>

      <form className="admin-form" onSubmit={trocarSenha}>
        <div className="admin-form-topo">
          <h2>Trocar senha</h2>
        </div>
        <div className="admin-form-corpo">
          <div className="form-grid">
            <label className="campo">
              Senha atual
              <input
                type="password"
                autoComplete="current-password"
                value={senhaAtual}
                onChange={(e) => setSenhaAtual(e.target.value)}
                required
              />
            </label>
            <label className="campo">
              Nova senha
              <input
                type="password"
                autoComplete="new-password"
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
                required
              />
            </label>
            <label className="campo">
              Confirmar nova senha
              <input
                type="password"
                autoComplete="new-password"
                value={confirmar}
                onChange={(e) => setConfirmar(e.target.value)}
                required
              />
            </label>
          </div>

          {senhaAviso.erro && <p className="auth-erro">{senhaAviso.erro}</p>}
          {senhaAviso.ok && <p className="auth-sucesso">{senhaAviso.ok}</p>}

          <div className="form-acoes">
            <button type="submit" className="botao botao-form" disabled={salvandoSenha}>
              {salvandoSenha ? 'Salvando...' : 'Trocar senha'}
            </button>
          </div>
        </div>
      </form>

      <form className="admin-form zona-perigo" onSubmit={excluir}>
        <div className="admin-form-topo">
          <h2>Excluir conta</h2>
        </div>
        <div className="admin-form-corpo">
          <p className="admin-sub">Para confirmar, digite a sua senha. Esta ação não pode ser desfeita.</p>
          <div className="form-grid">
            <label className="campo">
              Senha
              <input
                type="password"
                autoComplete="current-password"
                value={senhaExclusao}
                onChange={(e) => setSenhaExclusao(e.target.value)}
                required
              />
            </label>
          </div>

          {erroExclusao && <p className="auth-erro">{erroExclusao}</p>}

          <div className="form-acoes">
            <button type="submit" className="botao botao-form botao-perigo" disabled={excluindo}>
              {excluindo ? 'Excluindo...' : 'Excluir minha conta'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Perfil
