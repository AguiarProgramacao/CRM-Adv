import api from "./api";

export async function getTodosProcessos() {
  const response = await api.get("/processos");
  return response.data;
}

export async function getProcessoById(id) {
  const response = await api.get(`/processos/${id}`);
  return response.data;
}

export async function getAllTarefas() {
  const response = await api.get("/processos/tarefas");
  return response.data;
}

export async function criarProcesso(data) {
  const response = await api.post("/processos", data);
  return response.data;
}

export async function atualizarProcesso(id, data) {
  const response = await api.put(`/processos/${id}`, data);
  return response.data;
}

export async function deletarProcesso(id) {
  const response = await api.delete(`/processos/${id}`);
  return response.data;
}

export async function buscarProcessoPorCliente(clienteId) {
  const response = await api.get(`/processos/cliente/${clienteId}`);
  return response.data;
}

export async function getAnotacoesByProcesso(processoId) {
  const response = await api.get(`/processos/${processoId}/anotacoes`);
  return response.data;
}

export async function createAnotacao(processoId, data) {
  const response = await api.post(`/processos/${processoId}/anotacoes`, data);
  return response.data;
}

export async function getTarefasByProcesso(processoId) {
  const response = await api.get(`/processos/${processoId}/tarefas`);
  return response.data;
}

export async function createTarefa(processoId, data) {
  const id = processoId || data?.processoId;
  if (!id) {
    throw new Error("processoId é obrigatório para criar tarefa.");
  }
  const response = await api.post(`/processos/${id}/tarefas`, data);
  return response.data;
}

export async function updateTarefa(tarefaId, dados) {
  const response = await api.put(`/processos/tarefas/${tarefaId}`, dados);
  return response.data;
}

export async function deleteTarefa(tarefaId) {
  const response = await api.delete(`/processos/tarefas/${tarefaId}`);
  return response.data;
}

export async function getArquivosByProcesso(processoId) {
  const response = await api.get(`/processos/${processoId}/arquivos`);
  return response.data;
}

export async function uploadArquivos(processoId, files) {
  const formData = new FormData();
  formData.append("processoId", processoId);
  (files || []).forEach((file) => formData.append("files", file));

  const response = await api.post("/processos/upload-arquivo", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}
