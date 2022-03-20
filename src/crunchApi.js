const config = require("../config/config.json");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
var geraStringAleatoria = require("./stringAleatoria");
const tamanhoStringAleatoria = 5;

function montaFormDataComArquivoParaSerEnviadoParaApi(arquivo, cid) {
  const palavraAleatorio = geraStringAleatoria(tamanhoStringAleatoria);
  let data = new FormData();
  data.append("cid", cid);
  data.append("name", `${palavraAleatorio}`);
  data.append("yaml", "false");
  data.append("specfile", fs.createReadStream(arquivo));

  return data;
}

async function enviaRequisicaoParaApiDeValidacao(arquivo, cid) {
  const formData = montaFormDataComArquivoParaSerEnviadoParaApi(arquivo, cid);
  var configAxios = {
    method: "post",
    url: "https://platform.42crunch.com/api/v1/apis",
    headers: {
      "X-API-KEY": config.crunch_API_KEY,
      ...formData.getHeaders(),
    },
    data: formData,
  };
  let id = "";

  console.log("> Enviando arquivo " + arquivo);

  let response = await axios(configAxios);
  id = response.data.desc.id;
  console.log("> Arquivo enviado com sucesso. ID  = " + id);

  return id;
}

module.exports = {
  enviaRequisicaoParaApiDeValidacao: enviaRequisicaoParaApiDeValidacao,
};
