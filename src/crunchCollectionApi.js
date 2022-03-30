const config = require("../config/config.json");
const axios = require("axios");

async function recuperaColecoes() {
  var configAxios = {
    method: "get",
    url: "https://platform.42crunch.com/api/v1/collections",
    headers: {
      "X-API-KEY": config.crunch_API_KEY,
    },
  };

  const respose = await axios(configAxios);

  return respose.data.list;
}

async function excluirColecao(colecaoId) {
  var configAxio = {
    method: "delete",
    url: `https://platform.42crunch.com/api/v1/collections/${colecaoId}`,
    headers: {
      "X-API-KEY": config.crunch_API_KEY,
    },
  };

  const respose = await axios(configAxio);
}

async function excluirColecaoSeExistir(nmeColecao) {
  let colecoes = [];
  colecoes = await recuperaColecoes();

  const existeColecao = colecoes.filter((x) => x.desc.name === nmeColecao);

  if (existeColecao && existeColecao.length > 0) {
    existeColecao.forEach(async (element) => {
      await excluirColecao(element.desc.id);
    });
  }
}

async function excluirTodasColecoes(){
  colecoes = await recuperaColecoes();
  colecoes.forEach(async (element) => {
    await excluirColecao(element.desc.id);
  });
}

async function criarColecao(nmeColecao) {
  excluirColecaoSeExistir(nmeColecao);

  var data = JSON.stringify({
    name: nmeColecao,
    isShared: false,
    isSharedWrite: false,
  });

  var configAxio = {
    method: "post",
    url: "https://platform.42crunch.com/api/v1/collections",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": config.crunch_API_KEY,
    },
    data: data,
  };

  let cid = "";
  const respose = await axios(configAxio);
  cid = respose.data.desc.id;

  return cid;
}

module.exports = {
  criarColecao: criarColecao,
  excluirTodasColecoes : excluirTodasColecoes
};
