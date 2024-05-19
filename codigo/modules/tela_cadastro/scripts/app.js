var db_cadastro_inicial = 
    
        {
            "id": "1",
            "nome": "Leanne Graham",
            "email": "Sincere@april.biz",
            "senha": "123"
        }
    
/*
var db = JSON.parse(localStorage.getItem('db_cadastro'));
if (!db) {
    db = db_cadastro_inicial;
};
function enviarCadastro(cadastro){
    let novoCadastro ={
        "nome": cadastro.nome,
        "email" : cadastro.email,
        "senha" : cadastro.senha,
    };
    db.cadastros.push(novoCadastro);
    displayMessage("Cadastro criado com sucesso");

    // Atualiza os dados no Local Storage
    localStorage.setItem('db_cadastro', JSON.stringify(db));
}
*/

const apiUrl = 'https://95d30d3a-8d74-40c6-bf87-67fbd1058a1a-00-18yz2ooynpmh1.janeway.replit.dev/users';

// Exibe mensagem em um elemento de ID msg
function displayMessage(message) {
    document.getElementById('msg').innerHTML = '<div class="alert alert-warning">' + message + '</div>';
}
    
    async function createUser (user) { 
    //  tentar fazer a chamada
        try 
        {
        //  definir a chamada HTTP do JSON Server
            const response = await fetch(apiUrl, {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });
            console.log(user);
            displayMessage("Sucesso ao criar usuário");
        } 
    //  chamada de erro
        catch (error) 
        {
            console.error("Error:", error);
            displayMessage("Erro ao criar usuário");
        }
    }
    