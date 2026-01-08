import React, { useEffect, useState } from "react";
import { ArrowDownCircle, ArrowUpCircle, DollarSign, FileWarning } from "lucide-react";
import { fetchTransacoes } from "../../services/financeiroService";

const ResumoFinanceiro = () => {
  const [resumo, setResumo] = useState(null);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const res = await fetchTransacoes();
        const transacoes = Array.isArray(res.data) ? res.data : res;

        if (!Array.isArray(transacoes)) {
          console.warn("Transações não são um array. Recebido:", transacoes);
          setResumo([]);
          return;
        }

        let entradas = 0;
        let saidas = 0;
        let pendenciasEntrada = 0;
        let pendenciasSaida = 0;
        let qtdPendenciasEntrada = 0;
        let qtdPendenciasSaida = 0;

        transacoes.forEach((t) => {
          const status = String(t.status || "").toLowerCase();

          if (status === "recebido" || status === "pago") {
            if (t.tipo === "entrada") entradas += t.valor;
            if (t.tipo === "saida") saidas += t.valor;
          } else if (["pendente", "pagar", "receber"].includes(status)) {
            if (t.tipo === "entrada") {
              pendenciasEntrada += t.valor;
              qtdPendenciasEntrada++;
            }
            if (t.tipo === "saida") {
              pendenciasSaida += t.valor;
              qtdPendenciasSaida++;
            }
          }
        });

        const saldo = entradas - saidas;

        setResumo([
          {
            label: "Total de Entradas",
            valor: entradas,
            corTexto: "text-green-600",
            corFundo: "bg-green-100",
            icone: <ArrowUpCircle className="text-green-500" size={24} />,
            subtitulo: "Valores recebidos"
          },
          {
            label: "Total de Saídas",
            valor: saidas,
            corTexto: "text-red-600",
            corFundo: "bg-red-100",
            icone: <ArrowDownCircle className="text-red-500" size={24} />,
            subtitulo: "Valores pagos"
          },
          {
            label: "Saldo Total",
            valor: saldo,
            corTexto: saldo >= 0 ? "text-green-600" : "text-red-600",
            corFundo: "bg-blue-100",
            icone: <DollarSign className="text-blue-600" size={24} />,
            subtitulo: "Entradas - Saídas"
          },
          {
            label: "Pendências",
            valor: pendenciasEntrada + pendenciasSaida,
            corTexto: "text-orange-500",
            corFundo: "bg-orange-100",
            icone: <FileWarning className="text-orange-500" size={24} />,
            subtitulo: `${qtdPendenciasSaida} a pagar • ${qtdPendenciasEntrada} a receber`
          }
        ]);
      } catch (err) {
        console.error("Erro ao carregar resumo financeiro:", err);
        setResumo([]);
      }
    };

    carregarDados();
  }, []);

  if (!resumo) return <p>Carregando...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {resumo.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-xl p-4 shadow border border-gray-100"
        >
          <div className={`w-10 h-10 flex items-center justify-center rounded-full ${item.corFundo} mb-2`}>
            {item.icone}
          </div>
          <p className="text-sm text-gray-600 font-medium">{item.label}</p>
          <h3 className={`text-2xl font-bold ${item.corTexto} mt-1`}>
            R$ {item.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </h3>
          <p className="text-xs text-gray-400 mt-1">{item.subtitulo}</p>
        </div>
      ))}
    </div>
  );
};

export default ResumoFinanceiro;
