const crunchCollectionApi = require("./src/crunchCollectionApi");
const crunchApi = require("./src/crunchApi");
const arquivoBranchYaml = require("./src/arquivoBranchYaml");
const config = require("./config/config.json");
async function init() {
  if (config.crunch_API_KEY.length != 36) {
    console.error("Favor adicionar token  no arquivo config/config.json");
    return false;
  }

  const arquivos = arquivoBranchYaml.recuperaArquivosJsonParaSerEnviados();

  arquivos.forEach(async (arquivo) => {
    console.log("_________________");

    try {
      const cid = await crunchCollectionApi.criarColecao(arquivo.nmeArquivo);
      const idGerado = await crunchApi.enviaRequisicaoParaApiDeValidacao(
        arquivo.caminhoCompletoJson,
        cid
      );
      console.info(
        `>>>> https://platform.42crunch.com/apis/${idGerado}/security-audit-report`
      );
    } catch (error) {
      console.log("error");
    }
    console.log("_________________");
  });
}

init();
