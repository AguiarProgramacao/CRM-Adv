import api from "./api";

export async function createCliente(cliente) {
  const response = await api.post("/clientes", cliente);
  return response.data;
}

export async function getClientes() {
  const response = await api.get("/clientes");
  return response.data;
}

export async function getClienteById(id) {
  const response = await api.get(`/clientes/${id}`);
  return response.data;
}

export async function updateCliente(id, data) {
  const response = await api.put(`/clientes/${id}`, data);
  return response.data;
}

export async function deleteCliente(id) {
  const response = await api.delete(`/clientes/${id}`);
  return response.data;
}

export async function atendimentoCliente(data) {
  const response = await api.post("/clientes/atendimento", data);
  return response.data;
}

export async function updateLead(clienteId, etapaId) {
  const response = await api.post("/clientes/lead", { clienteId, etapaId });
  return response.data;
}

export async function criarAgendamento(data) {
  const response = await api.post("/agendamentos", data);
  return response.data;
}

export async function getTodosAgendamentos() {
  const response = await api.get("/agendamentos");
  return response.data;
}

export async function conectarGoogleCalendar() {
  const response = await api.get("/google/auth");
  const { url } = response.data;
  if (url) {
    window.location.href = url;
  }
  return response.data;
}

export async function verificarConexaoGoogle() {
  const res = await api.get("/google/status");
  return res.data;
}