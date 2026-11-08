import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Coins, PiggyBank, Plus, Sparkles, Zap } from 'lucide-react'
import {
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import Card from '../components/Card'
import { mensagemDe } from '../services/api'
import { obterDashboard } from '../services/dashboardService'
import type { DadosDashboard } from '../types/Dashboard'

const coresTipo: Record<string, string> = {
  Iluminação: '#e0a526',
  Climatização: '#1f7a56',
  Eletrodomésticos: '#6fe0a8',
  Entretenimento: '#3b6fb5',
}
const COR_RESERVA = '#7f9b8d'
const SEM_DADOS = 'Sem dados'

function corDoTipo(nome: string) {
  return coresTipo[nome] ?? COR_RESERVA
}

function moeda(valor: number | null) {
  if (valor === null) return SEM_DADOS
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function energia(valor: number | null) {
  return valor === null ? SEM_DADOS : `${valor.toLocaleString('pt-BR')} kWh`
}

function Dashboard() {
  const [dados, setDados] = useState<DadosDashboard | null>(null)
  const [erro, setErro] = useState('')

  useEffect(() => {
    obterDashboard()
      .then(setDados)
      .catch((e: unknown) => setErro(mensagemDe(e)))
  }, [])

  if (dados === null) {
    return (
      <div className="container">
        {erro ? <p className="auth-erro">{erro}</p> : <p>Carregando...</p>}
      </div>
    )
  }

  const { resumo, consumoSemana, consumoPorTipo, consumoPorComodo, recomendacao } = dados
  const maiorComodo = Math.max(...(consumoPorComodo ?? []).map((c) => c.kwh))

  return (
    <div className="container container-largo">
      <div className="dash-topo">
        <div>
          <h1>Dashboard</h1>
          <p>Acompanhe o consumo e as recomendações da sua casa.</p>
        </div>

        <Link to="/admin" className="botao botao-form">
          <Plus size={18} /> Adicionar dispositivo
        </Link>
      </div>

      <section className="cards">
        <Card
          titulo="Consumo hoje"
          valor={energia(resumo.consumoHoje.valor)}
          icone={<Zap size={22} />}
          variacao={resumo.consumoHoje.variacao}
          subirEhBom={false}
        />
        <Card
          titulo="Custo estimado do mês"
          valor={moeda(resumo.custoMes.valor)}
          icone={<Coins size={22} />}
          variacao={resumo.custoMes.variacao}
          subirEhBom={false}
        />
        <Card
          titulo="Economia do mês"
          valor={moeda(resumo.economiaMes.valor)}
          icone={<PiggyBank size={22} />}
          variacao={resumo.economiaMes.variacao}
        />
      </section>

      <section className="dash-linha linha-2-1">
        <div className="painel">
          <h2>Consumo da semana</h2>
          <p className="painel-sub">
            Consumo real comparado com a média das 4 semanas anteriores (kWh).
          </p>

          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={consumoSemana}>
              <CartesianGrid strokeDasharray="3 3" stroke="#cfdad5" />
              <XAxis dataKey="dia" tick={{ fill: '#3c4d47' }} />
              <YAxis tick={{ fill: '#3c4d47' }} />
              <Tooltip formatter={(valor) => (valor == null ? SEM_DADOS : `${valor} kWh`)} />
              <Legend />
              <Line
                type="monotone"
                dataKey="real"
                name="Consumo real"
                stroke="#1f7a56"
                strokeWidth={3}
              />
              <Line
                type="monotone"
                dataKey="previsto"
                name="Previsão"
                stroke="#e0a526"
                strokeWidth={3}
                strokeDasharray="6 4"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="painel">
          <h2>Consumo por tipo</h2>
          <p className="painel-sub">Participação de cada tipo no total.</p>

          {consumoPorTipo === null ? (
            <p>Ainda não há consumo registrado hoje.</p>
          ) : (
            <>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={consumoPorTipo}
                    dataKey="valor"
                    nameKey="nome"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                  >
                    {consumoPorTipo.map((item) => (
                      <Cell key={item.nome} fill={corDoTipo(item.nome)} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(valor) => `${valor}%`} />
                </PieChart>
              </ResponsiveContainer>

              <ul className="legenda">
                {consumoPorTipo.map((item) => (
                  <li key={item.nome}>
                    <span className="ponto" style={{ background: corDoTipo(item.nome) }} />
                    {item.nome}
                    <strong>{item.valor.toLocaleString('pt-BR')}%</strong>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </section>

      <section className="dash-linha linha-1-1">
        <div className="painel">
          <h2>Consumo por cômodo</h2>
          <p className="painel-sub">Quanto cada ambiente consumiu hoje (kWh).</p>

          {consumoPorComodo === null && <p>Ainda não há consumo registrado hoje.</p>}

          {consumoPorComodo?.map((c) => (
            <div className="barra-linha" key={c.comodo}>
              <div className="barra-info">
                <span>{c.comodo}</span>
                <strong>{c.kwh.toLocaleString('pt-BR')} kWh</strong>
              </div>
              <div className="barra-trilho">
                <div
                  className="barra-preenchimento"
                  style={{ width: `${(c.kwh / maiorComodo) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="destaque-ia">
          <span className="ia-selo">
            <Sparkles size={18} /> {recomendacao?.titulo ?? 'Dica do EcoSync'}
          </span>
          <h2>Uma forma simples de economizar</h2>
          <p>
            {recomendacao?.texto ??
              'Use seus dispositivos por alguns dias para receber uma dica baseada no seu consumo.'}
          </p>
          <Link to="/chat" className="botao-ambar">
            Conversar com o assistente
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Dashboard