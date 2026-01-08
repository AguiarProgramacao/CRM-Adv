import api from './api';

export const getMensagens = () => api.get('/whatsapp');
export const sendMensagem = (numero, texto) =>
  api.post('/whatsapp/enviar', { numero, texto });

