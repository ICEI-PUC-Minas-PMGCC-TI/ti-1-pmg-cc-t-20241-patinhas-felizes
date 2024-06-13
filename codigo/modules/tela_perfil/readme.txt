Para inicializar a entrega, é necessário abrir o JSON Server responsável pelo armazenamento das informações necessárias para a funcionalidade da pagina.

Meu grupo optou por utilizar o JSON Server disponibilizado pelo site Replit. Portanto, para abrí-lo, deve-se acessar o link "https://replit.com/@HenriqueGiberti/JSONServer2" do projeto.

Após isso, faça um "fork" do repositório para inicializar o JSON Server. Entretanto, realizar o fork do repositório altera a URL de acesso ao JSON Server, então é necessário fazer algumas alterações no código JavaScript para a aplicação funcionar corretamente.

Para isso, abra o código JavaScript "app.js" e, na linha 1 de declaração da variável "apiUrl", substitua a string existente pelo link correspondente ao servidor aberto por você. Agora sim o programa funcionará.

Obrigado!

Além disso, como a tela de login não foi própriamente implementada ainda, deve-se inserir manualmente o id do usuário que se irá editar, 
no produto final ele será salvo na tela de login no local storage para que seja pego agora, 
portanto, insira o id do usuário na linha 155 do arquivo perfil.html onde se encontra um número após "'id',"