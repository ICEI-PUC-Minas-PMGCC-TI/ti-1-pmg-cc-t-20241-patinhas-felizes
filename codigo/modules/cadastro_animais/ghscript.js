function submitForm() {
    const form = document.getElementById('animalForm');
    const formData = new FormData(form);

    const animalData = {
        id: Date.now(), // ID único baseado no timestamp
        imagem: formData.get('imagem'),
        sexo: formData.get('sexo'),
        idade: formData.get('idade'),
        raca: formData.get('raca'),
        cidade: formData.get('cidade'),
        historia: formData.get('historia'),
        tags: formData.get('tags').split(',').map(tag => tag.trim())
    };

    // Enviar os dados para o JSON Server usando fetch
    fetch('http://localhost:3000/animals', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(animalData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Animal adicionado com sucesso:', data);
        loadAnimals(); // Recarregar a lista de animais
    })
    .catch(error => {
        console.error('Erro ao adicionar animal:', error);
    });
}
