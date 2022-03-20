const config = require("./../config/config.json");
const convertorYamlParaJson = require("./convertorArquivos");
var path = require("path");

function recuperaArquivosParaSeremEnviados() {
  let elements = [];

  config.arquivos.forEach((x) => {
    let pathFull = `${config.caminhoDoArquivo}/${x}`;
    let caminhoCompletoJson = `${process.cwd()}/arquivosGeradosJson/${path.parse(x).name}.json`;
    elements.push({
      nmeArquivo: path.parse(x).name,
      caminhoCompletoYaml: pathFull,
      caminhoCompletoJson: caminhoCompletoJson,
    });
  });
  return elements;
}

function recuperaArquivosJsonParaSerEnviados() {
  let arquivos = recuperaArquivosParaSeremEnviados();
  arquivos.forEach((x) => {
    convertorYamlParaJson.converteYamlParaJson(
      x.caminhoCompletoYaml,
      x.caminhoCompletoJson
    );
  });

  return arquivos;
}

module.exports = {
  recuperaArquivosJsonParaSerEnviados: recuperaArquivosJsonParaSerEnviados,
};
