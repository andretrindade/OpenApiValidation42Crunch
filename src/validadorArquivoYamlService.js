const crunchCollectionApi = require('./crunchCollectionApi')
const crunchApi = require('./crunchApi')

async function enviaArquivoParaValidacao42Crunch(arquivo){

    let resultadoValidacao = {};
  
    resultadoValidacao.cid = await crunchCollectionApi.criarColecao(arquivo.nmeArquivo);
    resultadoValidacao.idApi = await crunchApi.enviaRequisicaoParaApiDeValidacao(
      arquivo,
      resultadoValidacao.cid
    );
    resultadoValidacao.resultadoUrl = `https://platform.42crunch.com/apis/${resultadoValidacao.idApi}/security-audit-report`
  
  
    return resultadoValidacao;
  
  }

async function recuperaResultadoValidacaoArquivoApi(idApi){
   let response =  await crunchApi.recuperaResultadoValidacaoDaApi(idApi);
    let errosMapeados = Buffer.from(response.data.data, 'base64').toString();

    let resultado = {
        numCriticals : response.data.attr.data.numCriticals,
        numErrors : response.data.attr.data.numErrors,
        numHighs : response.data.attr.data.numHighs,
        numInfos : response.data.attr.data.numInfos,
        numLows : response.data.attr.data.numLows,
        numMediums : response.data.attr.data.numMediums,
        errosDetalhes : errosMapeados
    };

   return resultado 
} 

async function realizaValidacaoDeArquivosYaml(arquivos){

  
  await crunchCollectionApi.excluirTodasColecoes();

    const promises = arquivos.map(async (arquivo) => {
      let resultado = {arquivo : arquivo}
      try {
        
        resultado.resposta42Crunch = await enviaArquivoParaValidacao42Crunch(arquivo);
        resultado.resposta42CrunchValidacao = await recuperaResultadoValidacaoArquivoApi(resultado.resposta42Crunch.idApi);
        resultado.sucesso = true;
  
      } catch (error) {
        resultado.sucesso = false;
        resultado.error = error;
      }
  
      return resultado
    })
    
    const resultados = await Promise.all(promises);
  
    resultados.forEach(resultado=>{
      apresentarResultado(resultado);
    })
}


function apresentarResultado(resultado){
    console.log("______________________________");
  
    console.log(`Arquivo: ${resultado.arquivo.nmeArquivo}`);
    console.log(`Sucesso: ${resultado.sucesso}`);
    if(resultado.sucesso){
      console.log(`Url plataforma: ${resultado.resposta42Crunch.resultadoUrl}`);
      console.log(`Erros:   ${resultado.resposta42CrunchValidacao.numErrors }`)
      console.log(`Criticals: ${resultado.resposta42CrunchValidacao.numCriticals }`)
      console.log(`Highs:   ${resultado.resposta42CrunchValidacao.numHighs }`)
      console.log(`Mediums: ${resultado.resposta42CrunchValidacao.numMediums}`)
      console.log(`Lows:    ${resultado.resposta42CrunchValidacao.numLows  }`)
      console.log(`Infos:   ${resultado.resposta42CrunchValidacao.numInfos }`)

    }else{
        //console.log(resultado.error)
    }

  }

module.exports ={
    realizaValidacaoDeArquivosYaml : realizaValidacaoDeArquivosYaml
}