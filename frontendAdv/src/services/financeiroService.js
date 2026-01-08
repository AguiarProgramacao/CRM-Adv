import api from "./api";

export async function listarPagamentos() {
  const response = await api.get("/stripe/boletos");
  return response.data;
}

export async function criarPagamento(dados) {
  const payload = {
    nome: dados.nomeCliente,
    email: dados.email,
    clienteId: dados.clienteId,
    valorCentavos: Math.round(Number(dados.valor) * 100),
  };

  const response = await api.post("/stripe/gerar-boleto", payload);
  return response.data;
}

export async function listarTodasCobrancas() {
  const response = await api.get("/stripe/boletos");
  return response.data;
}

export async function listarCobrancasPorCliente(clienteId) {
  const response = await api.get("/stripe/boletos");
  return response.data.filter((boleto) => boleto.clienteId === Number(clienteId));
}

export async function fetchTransacoes() {
  const response = await api.get("/financeiro/transacoes");
  return response.data;
}

export async function fetchBoletos() {
  const response = await api.get("/stripe/boletos");
  return response.data;
}

export async function criarTransacao(dados) {
  const response = await api.post("/financeiro/transacao", dados);
  return response.data;
}

export function atualizarStatusTransacao(id, status) {
  return api.patch(`/financeiro/transacoes/${id}/status`, { status });
}
