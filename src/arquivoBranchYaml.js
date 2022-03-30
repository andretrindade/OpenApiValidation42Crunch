const config = require("./../config/config.json");
const convertorYamlParaJson = require("./convertorArquivos");
var path = require("path");

function recuperaArquivosParaSeremEnviados() {
  let elements = [];

  config.arquivos.forEach((x) => {
    let nmeArquivo = path.parse(x).name;
    let caminhoCompletoJson = `${process.cwd()}/arquivosGeradosJson/${nmeArquivo}.json`;
    elements.push({
      nmeArquivo: nmeArquivo,
      caminhoCompletoYaml: x,
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
