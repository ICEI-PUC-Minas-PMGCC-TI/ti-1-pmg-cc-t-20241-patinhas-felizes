const apiUrl = 'https://041d134d-da1a-466d-9571-e0fc34f6359c-00-2d6hw0lgnfpxl.worf.replit.dev/form';

async function readRequirements() {
    let requirements = {}; 
    try {
        const response = await fetch(apiUrl);
        console.log("Response:", response);
        requirements = await response.json();
        console.log("Requirements:", requirements);
    } catch (error) {
        console.error("Error:", error);
    }
    return requirements;
}

    async function imprimeRequerimentos() {
        let tela = document.getElementById('tela');
        let strHtml = '';
        let objRequerimentos = await readRequirements();
        console.log(objRequerimentos);
        strHtml += '<div class="row">';
        if (objRequerimentos.length > 0) {
            for (let i = 0; i < objRequerimentos.length; i++) {
                strHtml += `
                    <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 Requerimentos" id="card-${i}">
                        <div class="card caixa">
                            <div class="card imagemreq" id="imagem-${i}" style="font-size: 3vw;">
                                <img class = img-animal src="${objRequerimentos[i].imagem}" alt="img-animal" style="width: 100%;">
                                <div class="card-text">
                                    <h5 class="req-animal">${objRequerimentos[i].animal}</h5>
                                </div>
                            </div>
                            <div class="centerB">
                                <div class="button">
                                    <button type="button" class="adotou" data-id="${objRequerimentos[i].id}">Adotou</button>
                                    <button type="button" class="nao-adotou" data-id="${objRequerimentos[i].id}">Não Adotou</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
        strHtml += '</div>';        
        tela.innerHTML = strHtml;
        



    // Configura os botões de imagem
    for (let i = 0; i < objRequerimentos.length; i++) {
        document.getElementById(`imagem-${i}`).addEventListener('click', function() {
            imprimeformulario(objRequerimentos[i]);
        });
    }


  // Configura os botões
let botoesAdotou = document.querySelectorAll('.adotou');
let botoesNaoAdotou = document.querySelectorAll('.nao-adotou');

botoesAdotou.forEach(botao => {
    botao.addEventListener('click', function(event) {
        let id = event.target.getAttribute('data-id');
        document.getElementById('card-' + id).remove();
        objRequerimentos.splice(id, 1);
        // Envia a solicitação de DELETE para o servidor

        fetch(apiUrl + '/' + id, {
            method: 'DELETE',
        }).then(response => {
            if (!response.ok) {
                throw new Error('Erro na requisição HTTP: ' + response.status);
            }
        }).catch(error => {
            console.error('Erro na remoção do servidor:', error);
        });
    });
});

botoesNaoAdotou.forEach(botao => {
    botao.addEventListener('click', function(event) {
        let id = event.target.getAttribute('data-id');
        document.getElementById('card-' + id).remove();
        
        alert('Requerimento descartado! ');
        // Envia a solicitação de DELETE para o servidor
        fetch(apiUrl +  '/' + id, {
            method: 'DELETE',
        }).then(response => {
            if (!response.ok) {
                throw new Error('Erro na requisição HTTP: ' + response.status);
            }
        }).catch(error => {
            console.error('Erro na remoção do servidor:', error);
        });
    });
});

        }
        else 
        {
            
            console.log('Nenhum dado encontrado em form');
        }
}

imprimeRequerimentos();

function imprimeformulario(contato) {
    document.getElementById('requerimentosDisplay').style.display = 'block';
    let req = document.getElementById('requerimentosDisplay');
    let formHtml = '';

    // Adiciona botão de fechar
    formHtml += '<button id="closeButton">Fechar</button>';
    formHtml += '<div>';

    // Cria um card para o contato selecionado
    formHtml += `
        <div id="requerimento1">
            <div class="requerimento2">
                <div class="requerimento1-text">
                <h5 class="req-animal">Formulário da pessoa que está interessada em adotar: </h5>
                    <ul>
                        <li class="req">Nome: <p class="preq">${contato.nome}</p></li>
                        <li class="req">Sexo: <p class="preq">${contato.sexo}</p></li>
                        <li class="req">Idade: <p class="preq">${contato.idade}</p></li>
                        <li class="req">Cidade: <p class="preq">${contato.cidade}</p></li>
                        <li class="req">Telefone: <p class="preq">${contato.telefone}</p></li>
                        <li class="req">E-mail: <p class="preq">${contato.email}</p></li>
                        <li class="req">Mora em casa ou apartamento?  <p class="preq">${contato.mora}</p></li>
                        <li class="req">Todos da sua casa estão cientes da adoção? <p class="preq">${contato.cientes}</p></li>
                        <li class="req">Em caso de morar em apartamento, é liberado ter animais? <p class="preq">${contato.apliberado}</p></li>
                        <li class="req">Você já teve algum animal? <p class="preq">${contato.teveanimal}</p></li>
                        <li class="req">Aonde o seu animal irá ficar quando você viajar? <p class="preq">${contato.aondefica}</p></li>
                        <li class="req">O animal ficará muito tempo sozinho? <p class="preq">${contato.animalsozinho}</p></li>
                        <li class="req">Você permite a ONG ir até a sua casa para verificar se as respostas do formulário são verdadeiras? <p class="preq">${contato.permisao}</p></li>
                    </ul>
                </div>
            </div>
        </div>
    `;
    formHtml += '</div>';

    req.innerHTML = formHtml;

    // Adiciona evento de clique ao botão de fechar
    document.getElementById('closeButton').addEventListener('click', function() {
        document.getElementById('requerimentosDisplay').style.display = 'none';
    });
}


