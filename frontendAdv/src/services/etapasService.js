import api from "./api";

export async function getEtapas() {
  try {
    const response = await api.get("/etapas");
    return { data: response.data };
  } catch (err) {
    return { data: [] };
  }
}

export async function createEtapa(etapa) {
  const response = await api.post("/etapas", etapa);
  return response.data;
}

export async function updateEtapa(id, etapa) {
  const response = await api.put(`/etapas/${id}`, etapa);
  return response.data;
}

export async function deleteEtapa(id) {
  const response = await api.delete(`/etapas/${id}`);
  return response.data;
}
