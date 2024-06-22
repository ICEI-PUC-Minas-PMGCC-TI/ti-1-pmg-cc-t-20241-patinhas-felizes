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

    console.log(animalData);
    // Aqui você pode adicionar a lógica para enviar os dados para o backend ou processá-los como necessário.
}
