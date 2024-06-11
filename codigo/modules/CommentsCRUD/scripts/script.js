const apiUrl = 'https://e0ba45e8-bbb8-46df-b0e4-87f3116292ed-00-3a692qparh9sa.janeway.replit.dev/comments';

function displayMessage (mensagem) {
    msg = document.getElementById('msg');
    msg.innerHTML = '<div class="alert alert-warning">' + mensagem + '</div>';
} // end displayMessage ( )

async function readComments () {
//  definir dados locais
    let comments = {};
//  tentar fazer a chamada
    try
    {
    //  definir a chamade HTTP do JSON Server
        const response = await fetch (apiUrl);
        comments = await response.json();
    //  mostrar resultado
        console.log("Success:", comments);
        displayMessage("Sucesso ao ler comentario!");
    }
    catch (error)
    {
        console.error("Error:", error);
        displayMessage("Erro ao ler comentario (JSON Server indisponível).");
    }
//  retornar
    return (comments);
} // end readComments ( )

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
        displayMessage("Sucesso ao criar comentario!");
    //  atualizar a pagina
        mostrarDados();
    } 
//  chamada de erro
    catch (error) 
    {
        console.error("Error:", error);
        displayMessage("Erro ao criar comentario (JSON Server indisponível).");
    }
} // end createComment ( )

async function updateComment (id, comentario) {
//  tentar fazer a chamada
    try
    {
    //  definir a chamada HTTP do JSON Server
        const response = await fetch (`${apiUrl}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(comentario),
        });
    //  mostrar resultado
        displayMessage("Sucesso ao editar comentario!");
    }
//  chamada de erro
    catch (error)
    {
        console.error("Error:", error);
        displayMessage("Erro ao editar comentario (JSON Server indisponível).");
    }
} // end updateComment ( )

async function deleteComment (id) {
//  tentar fazer a chamada
    try
    {
    //  definir a chamada HTTP do JSON Server
        const response = await fetch (`${apiUrl}/${id}`, {
            method: 'DELETE',
        });
    //  mostrar resultado
        displayMessage("Sucesso ao excluir comentario!");
    }
//  chamada de erro
    catch (error)
    {
        console.error("Error:", error);
        displayMessage("Erro ao excluir comentario (JSON Server indisponível).");        
    }
} // end deleteComment ( )

/*
    Manipular a obtenção do usuário
*/

function getUser ()
{
//  definir dados locais
    let user = {
        username: "Lucas Carneiro",
        email: "lucas@gmail.com",
        cpf: "123456789-12",
        password: "123456"
    };
//  retornar
    return (user);
} // end getUser ( )

/*
    Manipular a exibição de dados
*/

async function mostrarDados () 
{
//  definir dados locais
    let objDados = {}
    let strHTML = ''
    let commentsShowDiv = document.querySelector('#commentsShowDiv');
//  chamar funcao para ler dados do JSON Server
    objDados = await readComments();
//  repetir para cada elemento dos dados
    for ( let x = 0; x < objDados.length; x++ )
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
                        <div class="dropdown">
                            <button class="btnDropdown" id="${id}">
                                <svg xmlns="http://www.w3.org/2000/svg" wclassth="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16"><path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/></svg>
                            </button>
                            <div class="dropdownContent">
                                <button class="btnHidden btnEditar">Editar</button>
                                <button class="btnHidden btnExcluir">Excluir</button>
                            </div>
                        </div>
                    </div>`
    }
//  inserir string na div dos comentários
    commentsShowDiv.innerHTML = strHTML;  
//  chamar funcao para lidar como botao Dropdown
    handleDropdownButton();  
} // end mostrarDados  ( )

/*
    Manipular a leitura do input e a criação de comentário
*/

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
                username: "Ana Clara Lonczynski",
                email: "anaclara@gmail.com",
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
} // end lerInput ( )

/*
    Manipular a edição de comentário
*/

async function editarDado (e) 
{
//  definir dados
    let id = e.currentTarget.closest('.comment').id;
    let contentHolder = document.querySelector(`div.comment[id="${id}"] .contentHolder`);      
    let comments = await readComments(); 
    let previousComment = comments.find ( (e) => { return (e.id == id) });
    let strHTML = '';
//  adicionar caixa de texto para edicao
    strHTML += `<div class="commentEdit" id=${id}>
                    <div style="display: inline-block;">
                        <p class="commentP"><span class="commentUsername">${previousComment.user.username}</span>:</p>
                    </div>
                    <div>
                        <div class="formEdit">
                            <input type="text" placeholder="Digite o seu novo comentário..." name="comment" class="campoUpdateComment">
                            <button type="submit" class="btnEdit">OK</button>
                            <button type="submit" class="btnCancelEdit">Cancelar</button>
                        </div>   
                    </div>
                </div>`;
//  mostrar caixa de texto na tela
    contentHolder.innerHTML = strHTML;
//  controlar o botao de confirmacao
    let btnEdit = document.querySelector('.btnEdit');
    btnEdit.addEventListener('click', async () => {
    //  indentificar o campo input
        let inputEdit = document.querySelector('.campoUpdateComment');
    //  resgatar o conteúdo digitado
        let strContent = inputEdit.value; 
    //  esvaziar o input
        inputEdit.value = ''; 
    //  editar o objeto
        previousComment.content = strContent;
    //  editar o JSON Server
        await updateComment(id, previousComment);
    //  mostrar os comentarios novamente
        mostrarDados();
    });
//  controlar o botao de cancelamento
    let btnCancelEdit = document.querySelector('.btnCancelEdit');
    btnCancelEdit.addEventListener('click', () => {
    //  recarregar a pagina
        mostrarDados();
    });
} // end editarDado ( )

/*
    Manipular a exclusão de comentário
*/

async function excluirDado (e)
{
//  definir dados
    let id = e.currentTarget.closest('.comment').id;
//  remover comentario do JSON Server
    await deleteComment(id);
//  recarregar a pagina
    mostrarDados();
}

/*
    Impedir a atualização da página com cada envio do formulário
*/  
document.getElementById ('form').addEventListener ('submit', (evento) => {
    evento.preventDefault();
    lerInput();
})


function randomNumber () {
//  gerar um numero de 1 a 99;
    let random = Math.floor(Math.random() * 1000);
//  retornar
    return random;
} // end randomNumber ( )

/*
    Funcao para controlar o evento de mostrar cada dropdownButton
*/

function handleDropdownButton () {
//  definir dados locais
    let btnsDropdown = document.getElementsByClassName('btnDropdown');
// repetir para cada botão
    for (let x = 0; x < btnsDropdown.length; x++) 
    {
    // ação individual para cada botão
        btnsDropdown[x].addEventListener('click', (e) => {
          dropdownButton(e.currentTarget);
        })
    }
} // end handleDropdownButton ( )

/*
    Funcao para controlar o Dropdown Button
*/

function dropdownButton( individualDropdownButton ) {
// definir dados locais
    let id = individualDropdownButton.id;
    let container = document.querySelector(`div.comment[id="${id}"] .dropdownContent`);
    let btnEditar = document.querySelector(`div.comment[id="${id}"] .btnEditar`);
    let btnExcluir = document.querySelector(`div.comment[id="${id}"] .btnExcluir`);
// testar se os botões estão escondidos
    if ( !container.classList.contains('show') ) {
    // mostrar
        container.classList.add('show');
    // criar eventos individuais Editar e Excluir
        btnEditar.addEventListener ('click', (e) => {
            editarDado (e);
            container.classList.remove('show');
        });
        btnExcluir.addEventListener ('click', (e) => {
            excluirDado(e);
            container.classList.remove('show');
        });
    }
    else {
    // esconder
        container.classList.remove('show');
    }
} // end dropdownButton ( )