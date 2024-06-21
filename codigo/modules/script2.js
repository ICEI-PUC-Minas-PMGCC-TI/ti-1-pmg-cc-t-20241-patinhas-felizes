const apiUrl = 'https://17888d69-e5c6-41a4-a17c-98ca11856607-00-f4ikhqwcowcp.janeway.replit.dev/ong';

/*
Ler Dados do JsonServer
*/
async function AC_obterDados() {
    //  definir dados locais
    let dados = {};
    //  tentar fazer a chamada
    try {
        //  definir a chamade HTTP do JSON Server
        const response = await fetch(apiUrl);
        dados = await response.json();
        //  mostrar resultado
        console.log("Success:", dados);
        console.log("Sucesso ao ler dados!");
    }
    catch (error) {
        console.error("Error:", error);
        console.log("Erro ao ler dados (JSON Server indisponível).");
    }
    //  retornar
    return (dados);
} // end readComments ( )

/*
Função que lê os Dados do JSON e chama as funções dos elementos
*/
async function AC_mostrarDados() {
    //  definir dados locais
    let objDados = {};
    //  chamar funcao para ler dados do JSON Server
    objDados = await obterDados();
    console.log("OBJ:",objDados);

    //testar se existe objeto e executar funcoes
    if (objDados) {
        mostrarCNPJ(objDados);
        mostrarNome(objDados);
        mostrarLogo(objDados);
        mostrarEmail(objDados);
        mostrarEndereco(objDados);
        mostrarHistoria(objDados);
        mostrarTelefone(objDados);
    }

    //retorne
    return objDados;
}// end mostrarDados  ( )

/*
Função de mostrar o CNPJ
*/
async function AC_mostrarCNPJ(dados) {
    console.log("dados no CNPJ:", dados);
    let cnpjHtml = '';
    // Obtém o elemento <span> pelo id
    var elementoCNPJ = document.getElementById("CNPJONG");
    cnpjHtml += `${dados[0].cnpj}`;

    // Define o conteúdo do elemento <span> com o resultado da função obterNome
    elementoCNPJ.innerHTML = cnpjHtml;
    
}//end mostrarCNPJ

/*
Função que mostra a historia
*/
async function AC_mostrarHistoria(dados) {
    console.log("dados na historia:", dados);
    let HistHtml = '';
    // Obtém o elemento <span> pelo id
    var elementohistoria = document.getElementById("historiaONG");
    HistHtml += `${dados[0].historia}`;

    // Define o conteúdo do elemento <span> com o resultado da função obterNome
    elementohistoria.innerHTML = HistHtml;
    
}//end mostrarHistoria

/*
Função de mostrar o Nome
*/
async function AC_mostrarNome(dados) {
    console.log("dados no Nome:", dados);
    let NomeHtml = '';
    // Obtém o elemento <span> pelo id
    var elementoNome = document.getElementById("nomeONG");
    NomeHtml += `${dados[0].nome}`;

    // Define o conteúdo do elemento <span> com o resultado da função obterNome
    elementoNome.innerHTML = NomeHtml;
    
}//end mostrarNome

/*
Função de mostrar o endereco
*/
async function AC_mostrarEndereco(dados) {
    console.log("dados no Endereco:", dados);
    let EnderecoHtml = '';
    // Obtém o elemento <span> pelo id
    var elementoEndereco = document.getElementById("enderecoONG");
    EnderecoHtml += `${dados[0].endereco}`;

    // Define o conteúdo do elemento <span> com o resultado da função obterNome
    elementoEndereco.innerHTML = EnderecoHtml;
    
}//end mostrarEndereco

/*
Função de mostra o Email
*/
async function AC_mostrarEmail(dados) {
    console.log("dados no Email:", dados);
    let EmailHtml = '';
    // Obtém o elemento <span> pelo id
    var elementoEmail = document.getElementById("emailONG");
    EmailHtml += `${dados[0].email}`;

    // Define o conteúdo do elemento <span> com o resultado da função obterNome
    elementoEmail.innerHTML = EmailHtml;
    
}//end mostrarEmail

/*
Função de mostra o Telefone
*/
async function AC_mostrarTelefone(dados) {
    console.log("dados no Telefone:", dados);
    let TelefoneHtml = '';
    // Obtém o elemento <span> pelo id
    var elementotelefone = document.getElementById("telefoneONG");
    TelefoneHtml += `${dados[0].telefone}`;

    // Define o conteúdo do elemento <span> com o resultado da função obterNome
    elementotelefone.innerHTML = TelefoneHtml;
    
}//end mostrarTelefone

/*
Função de mostra a Logo
*/
async function AC_mostrarLogo(dados) {
    console.log("dados na logo:", dados);
    let LogoHtml = dados[0].logo;
    // Obtém o elemento <span> pelo id
    var elementologo = document.getElementById("imagem");
     // Define o atributo src do elemento <img> com o resultado da função obterImagem
     var imagemSrc = LogoHtml
     if (imagemSrc !== "Imagem não encontrada" && imagemSrc !== "Erro ao converter JSON") {
        elementologo.src = imagemSrc;
     } else {
         // Caso a imagem não seja encontrada ou haja erro, remove a imagem do display
         elementologo.style.display = "none";
     }
    
}//end mostrarLogo
