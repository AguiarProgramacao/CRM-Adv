import api from "./api";

export async function createUsuario(dados) {
  const response = await api.post("/usuarios", dados);
  return response.data;
}

export async function getUsuarios() {
  const response = await api.get("/usuarios");
  return response.data;
}

export async function getPerfil() {
  const stored = localStorage.getItem("user");
  if (!stored) {
    throw new Error("Perfil não encontrado.");
  }
  return JSON.parse(stored);
}
