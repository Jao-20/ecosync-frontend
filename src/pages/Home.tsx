import { Link } from 'react-router-dom'
import { MessageCircle, Thermometer, Zap } from 'lucide-react'
import casa from '../assets/casa.jpg'
import sala from '../assets/sala.jpg'
import celular from '../assets/celular.jpg'
import Reveal from '../components/Reveal'

function Home() {
  return (
    <>
      <section className="hero" style={{ backgroundImage: `url(${casa})` }}>
        <div className="hero-overlay">
          <div className="hero-conteudo">
            <span className="hero-tag">EcoSync</span>
            <h1>Sua casa aprende. Sua conta diminui.</h1>
            <p>O EcoSync aprende a sua rotina e reduz o consumo de energia sem tirar o seu conforto.</p>
            <Link to="/login" className="botao">Entrar</Link>
          </div>
        </div>
      </section>

      <section className="destaque">
        <Reveal>
          <div>
            <span className="hero-tag">Rotina</span>
            <h2>A casa que aprende com você</h2>
            <p>
              O EcoSync observa quando você acende as luzes, liga o ar-condicionado e usa os
              aparelhos. Com o tempo, entende a sua rotina e prepara a casa para ela.
            </p>
          </div>
        </Reveal>
        <Reveal atraso={150}>
          <img src={sala} alt="Quarto com abajur e luz quente" className="destaque-img" />
        </Reveal>
      </section>

      <section className="destaque destaque-invertido">
        <Reveal>
          <div>
            <span className="hero-tag">Controle</span>
            <h2>Tudo na palma da mão</h2>
            <p>
              Acompanhe o consumo, receba sugestões de economia e converse com o assistente
              virtual, de onde você estiver.
            </p>
          </div>
        </Reveal>
        <Reveal atraso={150}>
          <img src={celular} alt="Celular com aplicativo" className="destaque-img" />
        </Reveal>
      </section>

      <section className="secao">
        <Reveal>
          <h2 className="secao-titulo">Como o EcoSync funciona</h2>
        </Reveal>

        <div className="passos">
          <Reveal atraso={0}>
            <div className="passo">
              <Zap size={36} />
              <h3>Aprende a sua rotina</h3>
              <p>Analisa quando você usa luz, ar-condicionado e aparelhos para entender os seus hábitos.</p>
            </div>
          </Reveal>

          <Reveal atraso={150}>
            <div className="passo">
              <Thermometer size={36} />
              <h3>Decide por você</h3>
              <p>Ajusta a temperatura e sugere apagar luzes, economizando sem perder conforto.</p>
            </div>
          </Reveal>

          <Reveal atraso={300}>
            <div className="passo">
              <MessageCircle size={36} />
              <h3>Conversa com você</h3>
              <p>Um assistente virtual responde dúvidas e explica as recomendações de economia.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="secao secao-escura">
        <Reveal>
          <h2 className="secao-titulo">Pronto para economizar?</h2>
        </Reveal>
        <Reveal atraso={150}>
          <Link to="/login" className="botao">Entrar no EcoSync</Link>
        </Reveal>
      </section>
    </>
  )
}

export default Home