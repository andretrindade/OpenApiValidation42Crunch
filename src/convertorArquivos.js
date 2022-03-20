const yaml = require("js-yaml");
const fs = require("fs");

function converteYamlParaJson(arquivoYaml, caminhoArquivoJson) {
  const obj = yaml.load(fs.readFileSync(arquivoYaml, { encoding: "utf-8" }));

  fs.writeFileSync(caminhoArquivoJson, JSON.stringify(obj, null, 2));
}

module.exports = {
  converteYamlParaJson: converteYamlParaJson,
};
