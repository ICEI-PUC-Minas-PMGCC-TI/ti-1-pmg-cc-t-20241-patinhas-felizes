const animals = [
    { "id": 1, "sexo": "Fêmea", "idade": "3 anos", "raca": "Labrador", "cidade": "São Paulo", "historia": "Resgatada da rua", "tags": ["amigável", "brincalhona"] },
    { "id": 2, "sexo": "Macho", "idade": "2 anos", "raca": "Beagle", "cidade": "Rio de Janeiro", "historia": "Abandonado", "tags": ["ativo", "curioso"] }
];

function loadAnimals() {
    const animalGrid = document.getElementById('animal-grid');

    // Limpa o grid
    animalGrid.innerHTML = '';


    // Adicionar animais do JSON
    animals.forEach(animal => {
        const animalCard = document.createElement('div');
        animalCard.className = 'animal-card';
        animalCard.innerHTML = `
            <p>${animal.raca}</p>
            <div class="crud-buttons">
                <button onclick="editAnimal(${animal.id})">✏️</button>
                <button onclick="deleteAnimal(${animal.id})">🗑️</button>
            </div>
        `;
        animalGrid.appendChild(animalCard);
    });

    // Adicionar botões de "Adicionar Animal" até completar 10 quadrados
    const totalCards = animals.length;
    for (let i = totalCards; i < 10; i++) {
      const addAnimalCard = document.createElement('div');
      addAnimalCard.className = 'add-animal-card';
      addAnimalCard.innerHTML = '+';
      addAnimalCard.onclick = () => {
        window.location.href = 'index.html';
      };
      animalGrid.appendChild(addAnimalCard);
    }
}

function showEditForm() {
    document.getElementById('animal-catalog').style.display = 'none';
    document.getElementById('edit-animal').style.display = 'block';
}

function editAnimal(id) {
    const animal = animals.find(animal => animal.id === id);
    if (animal) {
        document.getElementById('form-title').innerText = 'Editar Animal';
        document.getElementById('animal-id').value = animal.id;
        document.getElementById('sexo').value = animal.sexo;
        document.getElementById('idade').value = animal.idade;
        document.getElementById('raca').value = animal.raca;
        document.getElementById('cidade').value = animal.cidade;
        document.getElementById('historia').value = animal.historia;
        document.getElementById('tags').value = animal.tags.join(', ');

        showEditForm();
    }
}

function saveAnimal(event) {
    event.preventDefault();
    const id = document.getElementById('animal-id').value;
    const animalIndex = animals.findIndex(animal => animal.id == id);
    if (animalIndex !== -1) {
        animals[animalIndex].sexo = document.getElementById('sexo').value;
        animals[animalIndex].idade = document.getElementById('idade').value;
        animals[animalIndex].raca = document.getElementById('raca').value;
        animals[animalIndex].cidade = document.getElementById('cidade').value;
        animals[animalIndex].historia = document.getElementById('historia').value;
        animals[animalIndex].tags = document.getElementById('tags').value.split(',').map(tag => tag.trim());
    } else {
        const newAnimal = {
            id: Date.now(),  // ID único baseado no timestamp
            sexo: document.getElementById('sexo').value,
            idade: document.getElementById('idade').value,
            raca: document.getElementById('raca').value,
            cidade: document.getElementById('cidade').value,
            historia: document.getElementById('historia').value,
            tags: document.getElementById('tags').value.split(',').map(tag => tag.trim())
        };
        animals.push(newAnimal);
    }

    cancelEdit();
    reloadAnimalGrid();
}

function deleteAnimal(id) {
    const confirmation = confirm(`Tem certeza que deseja excluir o animal com ID: ${id}?`);
    if (confirmation) {
        const animalIndex = animals.findIndex(animal => animal.id === id);
        if (animalIndex !== -1) {
            animals.splice(animalIndex, 1);
            reloadAnimalGrid();
        }
    }
}

function cancelEdit() {
    document.getElementById('animal-catalog').style.display = 'block';
    document.getElementById('edit-animal').style.display = 'none';
    document.getElementById('edit-form').reset();
    document.getElementById('form-title').innerText = 'Cadastrar Animal';
}

function reloadAnimalGrid() {
    const animalGrid = document.getElementById('animal-grid');
    animalGrid.innerHTML = ''; // Limpar a grid
    loadAnimals(); // Recarregar a grid
}

document.getElementById('edit-form').addEventListener('submit', saveAnimal);

document.addEventListener('DOMContentLoaded', loadAnimals);