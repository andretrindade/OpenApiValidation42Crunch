const arquivoBranchYaml = require("./src/arquivoBranchYaml");
const config = require("./config/config.json");
const validadorArquivoYamlService = require("./src/validadorArquivoYamlService");




function init() {
  if (config.crunch_API_KEY.length != 36) {
    console.error("Favor adicionar token  no arquivo config/config.json");
    return false;
  }

  const arquivos = arquivoBranchYaml.recuperaArquivosJsonParaSerEnviados();

  if(arquivos.length > 3){
    console.error("Essa versão somente valida 3 arquivos por vez.");
    return false;


  }

  validadorArquivoYamlService.realizaValidacaoDeArquivosYaml(arquivos);

}


init();
