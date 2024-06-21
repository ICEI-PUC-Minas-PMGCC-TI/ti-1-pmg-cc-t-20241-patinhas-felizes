const apiUrlJP = '';
const apiUrlUsersJP = '';

let controleMatchJP = 0;
let controleSlideMatchJP = 0

let seletorGeneroJP = document.querySelector('#generoJP');
let seletorPorteJP = document.querySelector('#tamanhoJP');
let seletorEspecieJP = document.querySelector('#especieJP');

let botaoModalMatchJP = document.querySelector('#botaoModalMatchJP');
let botaoModalMatch2JP = document.querySelector('#botaoModalMatch2JP');
let botaoFecharModalMatchJP = document.querySelector('.fechar-modal-MatchJP');
let botaoFecharModalMatch2JP = document.querySelector('.fechar-modal-Match2JP');
let iconeXMatchJP = document.querySelector('#iconeXJP');
let iconeLikeMatchJP = document.querySelector('#iconeLikeJP');
let slideEsquerdaMatchJP = document.querySelector('#slideEsquerdaJP');
let slideDireitaMatchJP = document.querySelector('#slideDireitaJP');
let voltarMatchResultadoJP = document.querySelector('#voltarMatchJP');
let adotarMatchResultadoJP = document.querySelector('#adotarMatchJP');


const botoesModalJP = document.querySelectorAll('.botaoModalJP');
const botoesFecharModalJP = document.querySelectorAll('.fechar-modalJP');


seletorGeneroJP.addEventListener('change', mostrarDadosJP);
seletorPorteJP.addEventListener('change', mostrarDadosJP);
seletorEspecieJP.addEventListener('change', mostrarDadosJP);

botaoModalMatchJP.addEventListener('click', abrirModalMatchJP);
botaoModalMatchJP.addEventListener('click', carregarModalMatchJP);
botaoModalMatch2JP.addEventListener('click', abrirModalMatch2JP);
botaoFecharModalMatchJP.addEventListener('click', fecharModalMatchJP);
botaoFecharModalMatch2JP.addEventListener('click', fecharModalMatch2JP);
iconeXMatchJP.addEventListener('click', proximoAnimalMatchJP);
iconeLikeMatchJP.addEventListener('click', confirmarMatchJP);
slideEsquerdaMatchJP.addEventListener('click', proximaFotoMatchJP);
slideDireitaMatchJP.addEventListener('click', proximaFotoMatchJP);
voltarMatchResultadoJP.addEventListener('click', fecharModalMatch2JP);
adotarMatchResultadoJP.addEventListener('click', adotouJP);

botoesModalJP.forEach(button => button.addEventListener('click', abrirModal2JP));
botoesFecharModalJP.forEach(button => button.addEventListener('click', fecharModalJP));


async function readAnimaisJP() {
    let animais = {};
    try {
        const response = await fetch(apiUrlJP);
        animais = await response.json();
        console.log("Success:", animais);
    } catch (error) {
        console.error("Error:", error);
    }
    return animais;
}

async function readUsuariosJP() {
    let usuarios = {};
    try {
        const response = await fetch(apiUrlUsersJP);
        usuarios = await response.json();
        console.log("Success:", usuarios);
    } catch (error) {
        console.error("Error:", error);
    }
    return usuarios;
}

async function mostrarDadosJP() {
    let valorGenero = seletorGeneroJP.value;
    let valorPorte = seletorPorteJP.value;
    let valorEspecie = seletorEspecieJP.value;
    let objDados = {};
    let strHTML = '';
    let commentsShowDiv = document.querySelector('#cardsJP');
    objDados = await readAnimaisJP();

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
            strHTML += `<div class="cardJP ${sex}" id="${id}">
                    <img src="${url}" alt="">
                    <div>
                        <h1>${name}</h1>
                        <img class="sexoJP" id="${sex}" src="${urlSex}" alt="imagem do sexo">
                        <h2>${description}</h2>
                        <button class="botaoModalJP">Saiba Mais</button>
                    </div>
                </div>`;
        }




    }
    commentsShowDiv.innerHTML = strHTML;



    const botoesModalJP = document.querySelectorAll('.botaoModalJP');
    botoesModalJP.forEach(button => button.addEventListener('click', abrirModalJP));
}

async function abrirModalJP(event) {
    let objDados2 = {};
    let strHTML2 = '';
    let commentsShowDiv2 = document.querySelector('#modaisJP');

    const botaoClicado = event.currentTarget;
    const card = botaoClicado.closest('.cardJP');
    if (!card) {
        console.error("O elemento .card mais próximo não foi encontrado.");
        return;
    }
    const cardId = card.id;
    console.log(cardId);

    objDados2 = await readAnimaisJP();

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
            <div class="modalJP ${sex}">
            <header id="cabecalhoModalJP">
                <h1>Vamos Adotar?</h1>
                <span class="fechar-modalJP"> × </span>
            </header>
            <div class="corpo_modalJP">
                <section class="flexPerfilJP">
                    <div>
                        <img id="avatarPrincipalJP" src="${url}" alt="">
                    </div>
                    <div class="informacoesJP">
                        <div id="nomeAutorJP">
                            <p>${name}</p>
                        </div>
                        <p><strong>Idade:</strong> ${age}</p>
                        <p><strong>Raça:</strong> ${race}</p>
                        <p><strong>Porte:</strong> ${size}</p>
                        <p><strong>Vacinação:</strong> ${vaccination}</p>
                        <p><strong>Castrado:</strong> ${castrated ? "Sim" : "Não"}</p>
                        <div id="descricaoJP">
                            <h4>História:</h4>
                            <p>${history}</p>
                        </div>
                        <p><strong>Tags: </strong> ${tags.join(', ')} </p>
                        <button class="button-44JP" onclick="adotouJP()">Adotar!</button>
                    </div>
                </section>
            </div>
            </div>`;
        }
    }

    commentsShowDiv2.innerHTML = strHTML2;
    const botoesFecharModalJP = document.querySelectorAll('.fechar-modalJP');
    botoesFecharModalJP.forEach(button => button.addEventListener('click', fecharModalJP));
    document.querySelector('.modalJP').classList.add('visivelJP');
}

function fecharModalJP() {
    document.querySelector('.modalJP').classList.remove('visivelJP');
}

function abrirModal2JP(event) {
    document.querySelector('.modalJP').classList.add('visivelJP');
    const botaoClicado = event.currentTarget;
    const card = botaoClicado.closest('.cardJP');
    if (!card) {
        console.error("O elemento .card mais próximo não foi encontrado.");
        return;
    }

    const cardId = card.id;
    console.log(cardId)
}

function adotouJP() {
    alert("Recurso realizado por outro membro do grupo.");
}

function abrirModalMatchJP() {
    document.querySelector('.modalMatchJP').classList.add('visivelJP');
}

function abrirModalMatch2JP(imagemPet, sexo, imagemPessoa) {
    document.querySelector('.modalMatch2JP').classList.add('visivelJP');

    let modalMatch2 = document.querySelector('.modalMatch2JP');
    let imgAvatarAnimalMatch = document.querySelector('#avatarPrincipalMatchAnimalJP');
    let imgAvatarUsuarioMatch = document.querySelector('#avatarPrincipalMatchUsuarioJP');

    imgAvatarAnimalMatch.src = imagemPet;
    imgAvatarUsuarioMatch.src = imagemPessoa;

    if(sexo == 'M') {
        modalMatch2.classList.add('corFundo');
        voltarMatchResultadoJP.classList.add('corFundo');
        adotarMatchResultadoJP.classList.add('corFundo');
    } else {
        modalMatch2.classList.remove('corFundo');
        voltarMatchResultadoJP.classList.remove('corFundo');
        adotarMatchResultadoJP.classList.remove('corFundo');
    }

}


function fecharModalMatchJP() {
    document.querySelector('.modalMatchJP').classList.remove('visivelJP');
}

function fecharModalMatch2JP() {
    document.querySelector('.modalMatch2JP').classList.remove('visivelJP');
    abrirModalMatchJP();
}

async function carregarModalMatchJP() {

    let objDados = {};

    let modalMatch = document.querySelector('.modalMatchJP');
    let imgAnimalMatch = document.querySelector('#imgMatchJP');
    let nomeAnimalMatch = document.querySelector('#nomeMatchJP');
    let descricaoAnimalMatch = document.querySelector('#descricaoMatchJP');


    objDados = await readAnimaisJP(); 

    if(objDados[controleMatchJP].sexo == 'M') {
        modalMatch.classList.add('corFundo');
    } else {
        modalMatch.classList.remove('corFundo');
    }

    imgAnimalMatch.src = objDados[controleMatchJP].imagem;
    nomeAnimalMatch.innerHTML = objDados[controleMatchJP].nome;
    descricaoAnimalMatch.innerHTML = objDados[controleMatchJP].descricao;

}

async function proximoAnimalMatchJP() {
    
    controleSlideMatchJP = 0;

    let modalMatch = document.querySelector('.modalMatchJP');

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
    objDadosA = await readAnimaisJP(); 

    controleMatchJP++;

    if(controleMatchJP < objDadosA.length) {
        carregarModalMatchJP();
    } else {
        controleMatchJP = 0;
        carregarModalMatchJP();
    }

}

async function proximaFotoMatchJP(event) {

    let botaoClicado = event.currentTarget;

    let objDadosA = {};
    objDadosA = await readAnimaisJP(); 

    if(objDadosA[controleMatchJP].imagens) {
        if(botaoClicado == slideEsquerdaMatchJP) {
            controleSlideMatchJP--;
            if(controleSlideMatchJP < 0) {
                controleSlideMatchJP = objDadosA[controleMatchJP].imagens.length - 1;
            }
        } else {
            if(botaoClicado == slideDireitaMatchJP) {
                controleSlideMatchJP++;
                if(controleSlideMatchJP >= objDadosA[controleMatchJP].imagens.length) {
                    controleSlideMatchJP = 0;
                }
            }
        }
    
        let imgAnimalMatch = document.querySelector('#imgMatchJP');
        imgAnimalMatch.src = objDadosA[controleMatchJP].imagens[controleSlideMatchJP];
    }

}

async function confirmarMatchJP() {

    let objDadosA = {};
    let objDadosU = {};
    let x = 0;
    let contadorEtiquetasMatch = 0;
    objDadosA = await readAnimaisJP(); 
    objDadosU = await readUsuariosJP(); 

    while(x < objDadosU[0].etiquetas.length) {

        for(let y = 0; y < objDadosA[controleMatchJP].etiquetas.length; y++) {
            if(objDadosA[controleMatchJP].etiquetas[y] == objDadosU[0].etiquetas[x]) {
                contadorEtiquetasMatch++;
            }
        } 
        x++;
    }

    if(contadorEtiquetasMatch >= 3) {
        fecharModalMatchJP();
        abrirModalMatch2JP(objDadosA[controleMatchJP].imagem, objDadosA[controleMatchJP].sexo, objDadosU[0].imagem);
    } else {
        proximoAnimalMatchJP();
    }

}

mostrarDadosJP();
