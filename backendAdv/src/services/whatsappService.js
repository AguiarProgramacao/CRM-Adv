const axios = require('axios');

const EVOLUTION_API_URL = 'http://localhost:5678/webhook/a3a4bedf-5337-43aa-b90c-e69cbce1818c';
const EVOLUTION_API_TOKEN = 'DevAguiar@1';

exports.enviarMensagem = async (numero, mensagem) => {
  try {
    const response = await axios.post(EVOLUTION_API_URL, {
      number: numero,
      message: mensagem
    }, {
      headers: {
        Authorization: `${EVOLUTION_API_TOKEN}`
      }
    });

    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Erro ao enviar mensagem');
  }
};
