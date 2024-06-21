const apiUrl = '';

let seletorGenero = document.querySelector('#genero');
let seletorPorte = document.querySelector('#tamanho');
let seletorEspecie = document.querySelector('#especie');

seletorGenero.addEventListener('change', mostrarDados);
seletorPorte.addEventListener('change', mostrarDados);
seletorEspecie.addEventListener('change', mostrarDados);


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

const botoesFecharModal = document.querySelectorAll('.fechar-modal');
botoesFecharModal.forEach(button => button.addEventListener('click', fecharModal));

function fecharModal() {
    document.querySelector('.modal').classList.remove('visivel');
}

const botoesModal = document.querySelectorAll('.botaoModal');
botoesModal.forEach(button => button.addEventListener('click', abrirModal2));

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

mostrarDados();
