const apiUrl = 'https://e0ba45e8-bbb8-46df-b0e4-87f3116292ed-00-3a692qparh9sa.janeway.replit.dev/comments';

function displayMessage (mensagem) {
    msg = document.getElementById('msg');
    msg.innerHTML = '<div class="alert alert-warning">' + mensagem + '</div>';
}

async function readComments () {
//  definir dados locais
    let comments = [];
//  tentar fazer a chamada
    try
    {
    //  definir a chamade HTTP do JSON Server
        const response = await fetch (apiUrl);
        comments = await response.json();
    //  mostrar resultado
        console.log("Success:", comments);
    }
    catch (error)
    {
        console.error("Error:", error);
        displayMessage("Erro ao ler comentario");
    }
//  retornar
    return (comments);
}

async function createComment (comment) { 
//  tentar fazer a chamada
    try 
    {
    //  definir a chamada HTTP do JSON Server
        const response = await fetch(apiUrl, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(comment),
        });
    //  mostrar resultado
        const result = await response.json();
    //  atualizar a pagina
        mostrarDados();
    } 
//  chamada de erro
    catch (error) 
    {
        console.error("Error:", error);
        displayMessage("Erro ao criar comentario");
    }
}

async function mostrarDados () 
{
//  definir dados locais
    let objDados = []
    let strHTML = ''
    let commentsShowDiv = document.querySelector('#commentsShowDiv');
//  chamar funcao para ler dados do JSON Server
    objDados = await readComments();
//  repetir para cada elemento dos dados
    for ( var x = 0; x < objDados.length; x++ )
    {
    //  definir dados locais
        let username = objDados[x].user.username;
        let content = objDados[x].content;
        let id = objDados[x].id;
    //  adicionar os valores à formatação de string a ser inserida
        strHTML += `<div class="comment" id=${id}>
                        <div class="contentHolder">
                            <p class="commentP"><span class="commentUsername">${username}</span>:<span class="commentContent">${content}</span></p>
                        </div>                        
                    </div>`
    }
//  inserir string na div dos comentários
    commentsShowDiv.innerHTML = strHTML;  
} 

async function lerInput ()
{
//  definir dados locais
    let strContent = '';
    let novoComentario = '';
//  ler um comentario novo
    strContent = document.getElementById ('campoComment').value;
    document.getElementById ('campoComment').value = ''
//  testar se há algo a ser publicado
    if ( strContent )
    {
    //  criar objeto novoComentario
        novoComentario = {
            user: {
                username: "Lucas Carneiro",
                email: "lucas@gmail.com",
                CPF: "123456789-12",
                password: "1275614"
              },
            id: randomNumber(),
            content: strContent
        };
    //  salvar dados no JSON Server
        createComment ( novoComentario );
    //  atualizar os dados na tela
        mostrarDados ();
    }
}

// impedir a atualização da página com cada envio do formulário
    
document.getElementById ('form').addEventListener ('submit', (evento) => {
    evento.preventDefault();
    lerInput();
})


function randomNumber () {
//  gerar um numero de 1 a 99;
    let random = Math.floor(Math.random() * 100);
//  retornar
    return random;
}