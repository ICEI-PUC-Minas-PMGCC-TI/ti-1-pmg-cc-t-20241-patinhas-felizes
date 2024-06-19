const apiUrl = 'https://17888d69-e5c6-41a4-a17c-98ca11856607-00-f4ikhqwcowcp.janeway.replit.dev/Animais';
const apiUrlUsers = 'https://17888d69-e5c6-41a4-a17c-98ca11856607-00-f4ikhqwcowcp.janeway.replit.dev/Users';

let controleMatch = 0;
let controleSlideMatch = 0

let seletorGenero = document.querySelector('#genero');
let seletorPorte = document.querySelector('#tamanho');
let seletorEspecie = document.querySelector('#especie');

let botaoModalMatch = document.querySelector('#botaoModalMatch');
let botaoModalMatch2 = document.querySelector('#botaoModalMatch2');
let botaoFecharModalMatch = document.querySelector('.fechar-modal-Match');
let botaoFecharModalMatch2 = document.querySelector('.fechar-modal-Match2');
let iconeXMatch = document.querySelector('#iconeX');
let iconeLikeMatch = document.querySelector('#iconeLike');
let slideEsquerdaMatch = document.querySelector('#slideEsquerda');
let slideDireitaMatch = document.querySelector('#slideDireita');
let voltarMatchResultado = document.querySelector('#voltarMatch');
let adotarMatchResultado = document.querySelector('#adotarMatch');


const botoesModal = document.querySelectorAll('.botaoModal');
const botoesFecharModal = document.querySelectorAll('.fechar-modal');


seletorGenero.addEventListener('change', mostrarDados);
seletorPorte.addEventListener('change', mostrarDados);
seletorEspecie.addEventListener('change', mostrarDados);

botaoModalMatch.addEventListener('click', abrirModalMatch);
botaoModalMatch.addEventListener('click', carregarModalMatch);
botaoModalMatch2.addEventListener('click', abrirModalMatch2);
botaoFecharModalMatch.addEventListener('click', fecharModalMatch);
botaoFecharModalMatch2.addEventListener('click', fecharModalMatch2);
iconeXMatch.addEventListener('click', proximoAnimalMatch);
iconeLikeMatch.addEventListener('click', confirmarMatch);
slideEsquerdaMatch.addEventListener('click', proximaFotoMatch);
slideDireitaMatch.addEventListener('click', proximaFotoMatch);
voltarMatchResultado.addEventListener('click', fecharModalMatch2);
adotarMatchResultado.addEventListener('click', adotou);

botoesModal.forEach(button => button.addEventListener('click', abrirModal2));
botoesFecharModal.forEach(button => button.addEventListener('click', fecharModal));


async function readAnimais() {
    let animais = {};
    try {
        const response = await fetch(apiUrl);
        animais = await response.json();
        console.log("Success:", animais);
    } catch (error) {
        console.error("Error:", error);
    }
    return animais;
}

async function readUsuarios() {
    let usuarios = {};
    try {
        const response = await fetch(apiUrlUsers);
        usuarios = await response.json();
        console.log("Success:", usuarios);
    } catch (error) {
        console.error("Error:", error);
    }
    return usuarios;
}

async function mostrarDados() {
    let valorGenero = seletorGenero.value;
    let valorPorte = seletorPorte.value;
    let valorEspecie = seletorEspecie.value;
    let objDados = {};
    let strHTML = '';
    let commentsShowDiv = document.querySelector('#cards');
    objDados = await readAnimais();

    for (const element of objDados) {
        let id = element.id;
        let url = element.imagem
        let species = element.especie;
        let name = element.nome;
        let description = element.descricao;
        let sex = element.sexo;
        let urlSex = element.urlSexo;
        let size = element.porte;
        let age = element.idade;
        let race = element.raca;
        let vaccination = element.vacinado;
        let castrated = element.castrado;
        let history = element.historia;
        let tags = element.etiquetas;

        let isGeneroMatch = valorGenero === 'T' || sex === valorGenero;
        let isPorteMatch = valorPorte === 'T' || size === valorPorte;
        let isEspecieMatch = valorEspecie === 'T' || species === valorEspecie;

        if (isGeneroMatch && isPorteMatch && isEspecieMatch) {
            strHTML += `<div class="card ${sex}" id="${id}">
                    <img src="${url}" alt="">
                    <div>
                        <h1>${name}</h1>
                        <img class="sexo" id="${sex}" src="${urlSex}" alt="imagem do sexo">
                        <h2>${description}</h2>
                        <button class="botaoModal">Saiba Mais</button>
                    </div>
                </div>`;
        }




    }
    commentsShowDiv.innerHTML = strHTML;



    const botoesModal = document.querySelectorAll('.botaoModal');
    botoesModal.forEach(button => button.addEventListener('click', abrirModal));
}

async function abrirModal(event) {
    let objDados2 = {};
    let strHTML2 = '';
    let commentsShowDiv2 = document.querySelector('#modais');

    const botaoClicado = event.currentTarget;
    const card = botaoClicado.closest('.card');
    if (!card) {
        console.error("O elemento .card mais próximo não foi encontrado.");
        return;
    }
    const cardId = card.id;
    console.log(cardId);

    objDados2 = await readAnimais();

    for (const element of objDados2) {
        let id = element.id;
        let url = element.imagem;
        let name = element.nome;
        let description = element.descricao;
        let sex = element.sexo;
        let urlSex = element.urlSexo;
        let age = element.idade;
        let race = element.raca;
        let vaccination = element.vacinado;
        let castrated = element.castrado;
        let history = element.historia;
        let tags = element.etiquetas;
        let size = element.porte;

        if (size == 'P') {
            size = 'Pequeno';
        } else {
            if (size == 'M') {
                size = 'Médio';
            } else {
                size = 'Grande';
            }
        }

        if (id == cardId) {
            strHTML2 += `
            <div class="modal ${sex}">
            <header id="cabecalhoModal">
                <h1>Vamos Adotar?</h1>
                <span class="fechar-modal"> × </span>
            </header>
            <div class="corpo_modal">
                <section class="flexPerfil">
                    <div>
                        <img id="avatarPrincipal" src="${url}" alt="">
                    </div>
                    <div class="informacoes">
                        <div id="nomeAutor">
                            <p>${name}</p>
                        </div>
                        <p><strong>Idade:</strong> ${age}</p>
                        <p><strong>Raça:</strong> ${race}</p>
                        <p><strong>Porte:</strong> ${size}</p>
                        <p><strong>Vacinação:</strong> ${vaccination}</p>
                        <p><strong>Castrado:</strong> ${castrated ? "Sim" : "Não"}</p>
                        <div id="descricao">
                            <h4>História:</h4>
                            <p>${history}</p>
                        </div>
                        <p><strong>Tags: </strong> ${tags.join(', ')} </p>
                        <button class="button-44" onclick="adotou()">Adotar!</button>
                    </div>
                </section>
            </div>
            </div>`;
        }
    }

    commentsShowDiv2.innerHTML = strHTML2;
    const botoesFecharModal = document.querySelectorAll('.fechar-modal');
    botoesFecharModal.forEach(button => button.addEventListener('click', fecharModal));
    document.querySelector('.modal').classList.add('visivel');
}

function fecharModal() {
    document.querySelector('.modal').classList.remove('visivel');
}

function abrirModal2(event) {
    document.querySelector('.modal').classList.add('visivel');
    const botaoClicado = event.currentTarget;
    const card = botaoClicado.closest('.card');
    if (!card) {
        console.error("O elemento .card mais próximo não foi encontrado.");
        return;
    }

    const cardId = card.id;
    console.log(cardId)
}

function adotou() {
    alert("Recurso realizado por outro membro do grupo.");
}

function abrirModalMatch() {
    document.querySelector('.modalMatch').classList.add('visivel');
}

function abrirModalMatch2(imagemPet, sexo, imagemPessoa) {
    document.querySelector('.modalMatch2').classList.add('visivel');

    let modalMatch2 = document.querySelector('.modalMatch2');
    let imgAvatarAnimalMatch = document.querySelector('#avatarPrincipalMatchAnimal');
    let imgAvatarUsuarioMatch = document.querySelector('#avatarPrincipalMatchUsuario');

    imgAvatarAnimalMatch.src = imagemPet;
    imgAvatarUsuarioMatch.src = imagemPessoa;

    if(sexo == 'M') {
        modalMatch2.classList.add('corFundo');
        voltarMatchResultado.classList.add('corFundo');
        adotarMatchResultado.classList.add('corFundo');
    } else {
        modalMatch2.classList.remove('corFundo');
        voltarMatchResultado.classList.remove('corFundo');
        adotarMatchResultado.classList.remove('corFundo');
    }

}


function fecharModalMatch() {
    document.querySelector('.modalMatch').classList.remove('visivel');
}

function fecharModalMatch2() {
    document.querySelector('.modalMatch2').classList.remove('visivel');
    abrirModalMatch();
}

async function carregarModalMatch() {

    let objDados = {};

    let modalMatch = document.querySelector('.modalMatch');
    let imgAnimalMatch = document.querySelector('#imgMatch');
    let nomeAnimalMatch = document.querySelector('#nomeMatch');
    let descricaoAnimalMatch = document.querySelector('#descricaoMatch');


    objDados = await readAnimais(); 

    if(objDados[controleMatch].sexo == 'M') {
        modalMatch.classList.add('corFundo');
    } else {
        modalMatch.classList.remove('corFundo');
    }

    imgAnimalMatch.src = objDados[controleMatch].imagem;
    nomeAnimalMatch.innerHTML = objDados[controleMatch].nome;
    descricaoAnimalMatch.innerHTML = objDados[controleMatch].descricao;

}

async function proximoAnimalMatch() {
    
    controleSlideMatch = 0;

    let modalMatch = document.querySelector('.modalMatch');

    modalMatch.classList.add('slide-out');

    setTimeout(async () => {

        modalMatch.classList.remove('rotate-out');
        modalMatch.classList.add('rotate-in');

        modalMatch.offsetHeight; 

        setTimeout(() => {
            modalMatch.classList.remove('rotate-in');
        }, 200);
    }, 200); 

    let objDadosA = {};
    objDadosA = await readAnimais(); 

    controleMatch++;

    if(controleMatch < objDadosA.length) {
        carregarModalMatch();
    } else {
        controleMatch = 0;
        carregarModalMatch();
    }

}

async function proximaFotoMatch(event) {

    let botaoClicado = event.currentTarget;

    let objDadosA = {};
    objDadosA = await readAnimais(); 

    if(objDadosA[controleMatch].imagens) {
        if(botaoClicado == slideEsquerdaMatch) {
            controleSlideMatch--;
            if(controleSlideMatch < 0) {
                controleSlideMatch = objDadosA[controleMatch].imagens.length - 1;
            }
        } else {
            if(botaoClicado == slideDireitaMatch) {
                controleSlideMatch++;
                if(controleSlideMatch >= objDadosA[controleMatch].imagens.length) {
                    controleSlideMatch = 0;
                }
            }
        }
    
        let imgAnimalMatch = document.querySelector('#imgMatch');
        imgAnimalMatch.src = objDadosA[controleMatch].imagens[controleSlideMatch];
    }

}

async function confirmarMatch() {

    let objDadosA = {};
    let objDadosU = {};
    let x = 0;
    let contadorEtiquetasMatch = 0;
    objDadosA = await readAnimais(); 
    objDadosU = await readUsuarios(); 

    while(x < objDadosU[0].etiquetas.length) {

        for(let y = 0; y < objDadosA[controleMatch].etiquetas.length; y++) {
            if(objDadosA[controleMatch].etiquetas[y] == objDadosU[0].etiquetas[x]) {
                contadorEtiquetasMatch++;
            }
        } 
        x++;
    }

    if(contadorEtiquetasMatch >= 3) {
        fecharModalMatch();
        abrirModalMatch2(objDadosA[controleMatch].imagem, objDadosA[controleMatch].sexo, objDadosU[0].imagem);
    } else {
        proximoAnimalMatch();
    }

}

mostrarDados();
