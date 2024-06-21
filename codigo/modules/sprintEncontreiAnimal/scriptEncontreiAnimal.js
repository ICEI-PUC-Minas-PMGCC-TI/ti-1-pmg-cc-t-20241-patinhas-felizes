document.getElementById('emailForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Previne o envio padrão do formulário

    // Simula o envio do formulário (substitua com sua lógica real de envio de email)
    setTimeout(function() {
        // Mostra a mensagem de sucesso
        document.getElementById('messageBox').classList.remove('hidden');
        document.getElementById('messageBox').classList.add('visible');
    }, 1000); // Simula um atraso de 1 segundo para envio do email
});
