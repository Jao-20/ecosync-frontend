import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { Bot, RotateCcw, Send } from 'lucide-react'
import { mensagemBoasVindas, sugestoes } from '../mocks/chat'
import { enviarMensagem } from '../services/chatService'
import type { Mensagem } from '../types/Chat'

function horaAgora() {
  return new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
}

function novaConversa(): Mensagem[] {
  return [{ id: 1, autor: 'assistente', texto: mensagemBoasVindas, hora: horaAgora() }]
}

function Chat() {
  const [mensagens, setMensagens] = useState<Mensagem[]>(novaConversa)
  const [texto, setTexto] = useState('')
  const [digitando, setDigitando] = useState(false)
  const listaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const lista = listaRef.current
    if (lista) lista.scrollTop = lista.scrollHeight
  }, [mensagens, digitando])

  async function enviar(conteudo: string) {
    const limpo = conteudo.trim()
    if (limpo === '' || digitando) return

    setMensagens((atual) => [
      ...atual,
      { id: Date.now(), autor: 'usuario', texto: limpo, hora: horaAgora() },
    ])
    setTexto('')
    setDigitando(true)

    const resposta = await enviarMensagem(limpo)

    setDigitando(false)
    setMensagens((atual) => [
      ...atual,
      { id: Date.now() + 1, autor: 'assistente', texto: resposta, hora: horaAgora() },
    ])
  }

  function aoEnviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    enviar(texto)
  }

  return (
    <div className="chat-pagina">
      <div className="chat-janela">
        <header className="chat-cabecalho">
          <div className="chat-avatar-grande">
            <Bot size={28} />
          </div>

          <div className="chat-titulo">
            <strong>Assistente EcoSync</strong>
            <span>
              <i className="ponto-online" /> Sempre por aqui para ajudar
            </span>
          </div>

          <button
            className="chat-nova"
            onClick={() => setMensagens(novaConversa())}
            aria-label="Nova conversa"
            title="Nova conversa"
          >
            <RotateCcw size={18} />
          </button>
        </header>

        <div className="chat-lista" ref={listaRef}>
          {mensagens.map((m) => (
            <div
              key={m.id}
              className={m.autor === 'usuario' ? 'msg msg-usuario' : 'msg msg-assistente'}
            >
              {m.autor === 'assistente' && (
                <div className="msg-avatar">
                  <Bot size={18} />
                </div>
              )}

              <div className="balao">
                <p>{m.texto}</p>
                <span className="hora">{m.hora}</span>
              </div>
            </div>
          ))}

          {mensagens.length === 1 && (
            <div className="sugestoes">
              {sugestoes.map((s) => (
                <button key={s} className="sugestao" onClick={() => enviar(s)}>
                  {s}
                </button>
              ))}
            </div>
          )}

          {digitando && (
            <div className="msg msg-assistente">
              <div className="msg-avatar">
                <Bot size={18} />
              </div>
              <div className="balao digitando">
                <span />
                <span />
                <span />
              </div>
            </div>
          )}
        </div>

        <form className="chat-form" onSubmit={aoEnviar}>
          <input
            type="text"
            placeholder="Escreva sua mensagem..."
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
          />
          <button
            type="submit"
            className="chat-enviar"
            disabled={texto.trim() === '' || digitando}
            aria-label="Enviar"
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  )
}

export default Chat