const apiUrl = "https://8c527326-95a2-40be-b6bf-35c75a1a8215-00-1d6s2oth1nhei.spock.replit.dev/form"


async function createForm (form) { 
  //  tentar fazer a chamada
      try 
      {
      //  definir a chamada HTTP do JSON Server
          const response = await fetch(apiUrl, {
              method: "POST", 
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(form),
          });
      //  mostrar resultado
          const result = await response.json();
          console.log(result);
      } 
  //  chamada de erro
      catch (error) 
      {
          console.error("Error:", error);
      }
  } 


  async function Nome ()
{
//  definir dados locais
    let strContent = '';
    let novoForm = '';
//  ler um comentario novo
    strContent = document.getElementById ('nome').value;
    document.getElementById ('nome').value = ''
//  testar se há algo a ser publicado
    if ( strContent )
    {
    //  criar objeto novoComentario
        novoForm = {

        }
    //  salvar dados no JSON Server
        createComment ( novoComentario );
    //  atualizar os dados na tela
        mostrarDados ();
    }
}

var perguntas = document.getElementsByClassName("pergunta");

var indicePerguntaAtual = 0;

let campos = []

function mostrarProximaPergunta() {
    perguntas[indicePerguntaAtual].style.display = "none";
    let id = 'pergunta' + ( indicePerguntaAtual + 1 );
    let campoInput = document.querySelector(`#${id} .resposta`);
    let valor = campoInput.value;
    console.log (valor)
    if (valor){
      campos[indicePerguntaAtual] = valor
    }
    console.log(campos)
    indicePerguntaAtual++;
    if (indicePerguntaAtual < perguntas.length) {
        perguntas[indicePerguntaAtual].style.display = "block";
    }
}

async function perguntaFinal() {
   let novoForm =  {
    "id": indicePerguntaAtual,
    "animal": campos[3],
    "nome": campos[0],
    "sexo": campos[5],
    "idade":  campos[4],
    "cidade": campos[6],
    "telefone": campos[2],
    "email": campos[1],
    "mora": campos[7],
    "cientes": campos[9],
    "apliberado": campos[8],
    "teveanimal": campos[10],
    "aondefica": 'Com meus amigos ou familia',
    "animalsozinho": campos[11],
    "permisao": campos[12],
    "imagem": "https://img.freepik.com/fotos-premium/cachorro-fofo-enquanto-levanta-o-pe_1000717-382.jpg"
  }
  console.log(novoForm)
  createForm(novoForm)
} 
