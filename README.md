## Informações gerais

Recupera listagem de arquivos yaml e converte para formato json (api 42crunch aceita somente formatos em json).

Os arquivos em json ficam armazendados na pasta ./arquivosGeradosJson

Programa contem mecanismos de excluir caleção de api caso já exista. 
Isso é util para envios do mesmo arquivo mais de uma vez.

No final da execução é retornado link para visualização dos apontamentos realizados pela plataforma 42crunch



## Configurações iniciais

### config/config.json

- crunch_API_KEY
  - Registrar no site https://platform.42crunch.com/ e gerar token com as opções API Security Audit; Protection; List resources; Delete resources
- caminhoDoArquivo
  - Caminho dos arquivos yaml
- arquivos
  - Nome dos arquivos para serem enviados para validação


## Executando

>npm install

>node main.js
_________________

## Exemplo de final de execução


 Criando coleção teste
 
 Coleção já existe
 
 Excluindo coleção da6fa201-66ff-4719-8a35-a90078e519b7
 
 Coleção criada com sucesso.  6fd6c852-4c8c-4a84-a91b-5157647d8c86
 
 Enviando arquivo 
 C:\Users\André\Downloads\api-security-audit-action-2\api-security/
 arquivosGeradosJson/teste.json
 
 Arquivo enviado com sucesso. ID  = c7e9afc4-e3bf-4802-9511-a341d92f4044

 https://platform.42crunch.com/apis/c7e9afc4-e3bf-4802-9511-a341d92f4044/security-audit-report
_________________

