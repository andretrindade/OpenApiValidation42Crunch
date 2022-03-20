const config = require("./config/config.json");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const crunchCollectionApi = require("./src/crunchCollectionApi");
const crunchApi = require("./src/crunchApi");
var path = require("path");

function recuperaArquivosParaSeremEnviados() {
  let elements = [];

  config.files.forEach((x) => {
    let pathFull = `${config.pathFile}/${x}`;
    elements.push({ nmeFile: path.parse(x).name, pathFull: pathFull });
  });
  return elements;
}

function init() {
  const arquivos = recuperaArquivosParaSeremEnviados();
  arquivos.forEach(async (arquivo) => {
    console.log("_________________");

    try {
      const cid = await crunchCollectionApi.criarColecao(arquivo.nmeFile);
      const idGerado = await crunchApi.enviaRequisicaoParaApiDeValidacao(
        arquivo.pathFull,
        cid
      );
      console.log(
        `>>>> https://platform.42crunch.com/apis/${idGerado}/security-audit-report`
      );
    } catch (error) {
      console.log("error");
    }
    console.log("_________________");
  });
}

init();
