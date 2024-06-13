const apiUrl = 'https://95d30d3a-8d74-40c6-bf87-67fbd1058a1a-00-18yz2ooynpmh1.janeway.replit.dev/users';

// Exibe mensagem em um elemento de ID msg
function displayMessage(message) {
    document.getElementById('msg').innerHTML = '<div class="alert alert-warning">' + message + '</div>';
}
    
    async function alterUser (user) { 
        try
        {
        //  definir a chamada HTTP do JSON Server
            const response = await fetch (`${apiUrl}/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
        //  mostrar resultado
            displayMessage("Sucesso ao editar usuário!");
        }
    //  chamada de erro
        catch (error)
        {
            console.error("Error:", error);
            displayMessage("Erro ao editar usuário (JSON Server indisponível).");
        }
    } // end alterUser ( )

    async function deleteUser (id) {
        //  tentar fazer a chamada
            try
            {
            //  definir a chamada HTTP do JSON Server
                const response = await fetch (`${apiUrl}/${id}`, {
                    method: 'DELETE',
                });
            //  mostrar resultado
                displayMessage("Sucesso ao excluir usuário!");
            }
        //  chamada de erro
            catch (error)
            {
                console.error("Error:", error);
                displayMessage("Erro ao excluir usuário (JSON Server indisponível).");        
            }
        } // end deleteComment ( )

   /* async function readUser (id) {
        //  definir dados locais
            let perfil = [];
        //  tentar fazer a chamada
            try
            {
            //  definir a chamade HTTP do JSON Server
                const response = await fetch (`${apiUrl}/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
                perfil = await response.json();
            //  mostrar resultado
                console.log("Success:", perfil);
            }
            catch (error)
            {
                console.error("Error:", error);
                displayMessage("Erro ao ler perfil");
            }
        //  retornar
            return (perfil);
        }*/

        async function readUser(id) {
            let perfil = {};
            try {
                // Definir a chamada HTTP do JSON Server
                const response = await fetch(`${apiUrl}/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                perfil = await response.json();
                // Mostrar resultado
                console.log("Success:", perfil);
            } catch (error) {
                console.error("Error:", error);
                displayMessage("Erro ao ler perfil");
            }
            return perfil;
        }
    