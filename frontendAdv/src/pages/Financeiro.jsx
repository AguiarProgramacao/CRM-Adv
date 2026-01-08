import { useState, useEffect, useMemo } from 'react';
import ResumoFinanceiro from '../components/financeiro/ResumoFinanceiro'
import TransacoesFinanceiras from '../components/financeiro/FluxoDeCaixa';
import ResumoSecundario from '../components/financeiro/ResumoSecundario';
import Boletos from '../components/financeiro/BoletosRecentes';
import ModalTransacaoForm from '../components/modal/ModalTransacao';
import ModalBoleto from '../components/modal/ModalBoleto';
import { fetchBoletos, fetchTransacoes } from "../services/financeiroService";

export default function Financeiro() {
  const [abaAtiva, setAbaAtiva] = useState('dashboard');
  const [transacoes, setTransacoes] = useState([]);
  const [boletos, setBoletos] = useState([]);
  const [showModalTransacao, setShowModalTransacao] = useState(false);
  const [showModalBoleto, setShowModalBoleto] = useState(false);

  useEffect(() => {
    const carregar = async () => {
      try {
        const [transacoesRes, boletosRes] = await Promise.all([
          fetchTransacoes(),
          fetchBoletos()
        ]);
        setTransacoes(transacoesRes);
        setBoletos(boletosRes);
      } catch (error) {
        console.error('Erro ao buscar dados financeiros:', error);
      }
    };

    carregar();
  }, []);

  const boletosVencidos = boletos.filter(boleto => {
    const dataVencimento = new Date(boleto.vencimento);
    return dataVencimento < new Date() && boleto.status !== 'pago';
  });

  const alertas = [];

  if (boletosVencidos.length > 0) {
    alertas.push({
      titulo: 'Boletos Vencidos',
      descricao: `${boletosVencidos.length} boleto(s) vencido(s) detectado(s).`
    });
  }

  const fluxoCaixa = useMemo(() => {
    if (!Array.isArray(transacoes) || transacoes.length === 0) return [];

    const porDia = new Map();

    transacoes.forEach((t) => {
      const rawDate = t.dataTransacao || t.data || t.criadoEm;
      const dateObj = rawDate ? new Date(rawDate) : null;
      if (!dateObj || Number.isNaN(dateObj.getTime())) return;

      const dia = String(dateObj.getDate()).padStart(2, "0");
      const mes = String(dateObj.getMonth() + 1).padStart(2, "0");
      const ano = dateObj.getFullYear();
      const key = `${ano}-${mes}-${dia}`;
      const label = `${dia}/${mes}`;

      const current = porDia.get(key) || {
        data: label,
        entrada: 0,
        saida: 0,
        ts: new Date(ano, dateObj.getMonth(), dateObj.getDate()).getTime()
      };

      const valor = Number(t.valor) || 0;
      if (t.tipo === "entrada") current.entrada += valor;
      if (t.tipo === "saida") current.saida += valor;

      porDia.set(key, current);
    });

    return Array.from(porDia.values())
      .sort((a, b) => a.ts - b.ts)
      .map(({ ts, ...rest }) => rest);
  }, [transacoes]);

  const categorias = useMemo(() => {
    if (!Array.isArray(transacoes) || transacoes.length === 0) return [];

    const soma = new Map();
    let total = 0;

    transacoes.forEach((t) => {
      const nome = (t.categoria || "sem categoria").toString();
      const valor = Math.abs(Number(t.valor) || 0);
      if (!valor) return;

      total += valor;
      soma.set(nome, (soma.get(nome) || 0) + valor);
    });

    if (!total) return [];

    return Array.from(soma.entries()).map(([nome, valor]) => ({
      nome,
      percentual: valor / total
    }));
  }, [transacoes]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <span className="text-green-600 text-4xl font-black leading-4">$</span> GestÃ£o Financeira
          </h1>
          <p className="text-gray-500">Controle completo das finanÃ§as do escritÃ³rio</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowModalTransacao(true)}
            className="bg-white border rounded px-4 h-10"
          >
            + Nova Transacao
          </button>
          <button
            onClick={() => setShowModalBoleto(true)}
            className="bg-blue-600 text-white rounded px-4 h-10"
          >
            Emitir Boleto
          </button>
        </div>
      </div>

      <ResumoFinanceiro />

      {/* Tabs */}
      <div className="mt-6 border-b border-gray-200 flex gap-4">
        {['dashboard', 'transações', 'boletos'].map(tab => (
          <button
            key={tab}
            onClick={() => setAbaAtiva(tab)}
            className={`pb-2 font-medium ${abaAtiva === tab
              ? 'border-b-2 border-black text-black'
              : 'text-gray-500 hover:text-black'
              }`}
          >
            {tab.charAt().toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {abaAtiva === 'dashboard' && <ResumoSecundario 
          fluxoCaixa={fluxoCaixa} 
          categorias={categorias} 
          transacoes={transacoes} 
          boletos={boletos} 
          alertas={alertas} 
        />}
        {abaAtiva === 'transações' && <TransacoesFinanceiras />}
        {abaAtiva === 'boletos' && (
          <Boletos boletos={boletos} />
        )}
      </div>

      <ModalTransacaoForm
        isOpen={showModalTransacao}
        onClose={() => setShowModalTransacao(false)}
      />
      {showModalBoleto && (
        <ModalBoleto onClose={() => setShowModalBoleto(false)} />
      )}
    </div>
  );
}

