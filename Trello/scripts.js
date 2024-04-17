// Создание массива для хранения данных о досках
let boards = [];

// Функция создания новой доски
function createBoard(name) {
    const newBoard = {
        id: Date.now(), // Уникальный ID
        name: name,
        lists: [] // Списки внутри доски
    };
    boards.push(newBoard);
    renderBoards(); // Отображение новой доски
}

// Функция рендеринга досок
function renderBoards() {
    const boardsContainer = document.getElementById('boards');
    boardsContainer.innerHTML = ''; // Очистка контейнера

    boards.forEach(board => {
        const boardElement = document.createElement('div');
        boardElement.classList.add('board');
        boardElement.id = board.id;

        // Элементы для названия и кнопок управления доской
        const boardTitle = document.createElement('h2');
        boardTitle.textContent = board.name;

        // Кнопка добавления списка
        const addListButton = document.createElement('button');
        addListButton.textContent = 'Добавить список';
        addListButton.addEventListener('click', () => createList(board.id));

        // Добавление элементов в DOM
        boardElement.appendChild(boardTitle);
        boardElement.appendChild(addListButton);

        // Рендеринг списков внутри доски
        renderBoard(board.id, boardElement);

        boardsContainer.appendChild(boardElement);
    });
}

// Функция создания нового списка
function createList(boardId) {
    const board = boards.find(board => board.id === boardId);
    const newList = {
        id: Date.now(),
        title: 'Новый список',
        cards: []
    };
    board.lists.push(newList);
    renderBoards(); // Обновление отображения всех досок
}

// Функция рендеринга доски (с ее списками и карточками)
function renderBoard(boardId, boardElement) {
    const board = boards.find(board => board.id === boardId);
    board.lists.forEach(list => {
        const listElement = document.createElement('div');
        listElement.classList.add('list');
        listElement.id = list.id;

        // Элементы для названия и кнопки добавления карточки
        const listTitle = document.createElement('h3');
        listTitle.textContent = list.title;
        listElement.appendChild(listTitle);

        const addCardButton = document.createElement('button');
        addCardButton.textContent = 'Добавить карточку';
        addCardButton.addEventListener('click', () => createCard(board.id, list.id));
        listElement.appendChild(addCardButton);

        // Отображение карточек в списке
        renderCards(list, listElement);

        boardElement.appendChild(listElement);
    });
}

// Функция создания новой карточки
function createCard(boardId, listId) {
    const board = boards.find(board => board.id === boardId);
    const list = board.lists.find(list => list.id === listId);

    const newCard = {
        id: Date.now(),
        text: 'Новая карточка'
    };

    list.cards.push(newCard);
    renderBoards(); // Обновление отображения всех досок
}

// Функция рендеринга карточек
function renderCards(list, listElement) {
  list.cards.forEach(card => {
      // Создание элемента карточки
      const cardElement = document.createElement('div');
      cardElement.classList.add('card');

      // Создание текста карточки
      const cardText = document.createElement('span');
      cardText.textContent = card.text;
      cardElement.appendChild(cardText);

      // Кнопка редактирования карточки
      const editButton = document.createElement('button');
      editButton.textContent = '✏️'; // Символ карандаша
      editButton.classList.add('edit-btn');
      editButton.addEventListener('click', (e) => {
          e.stopPropagation();
          editCardText(card);
      });
      cardElement.appendChild(editButton);

      // Кнопка удаления карточки
      const deleteButton = document.createElement('button');
      deleteButton.textContent = '🗑️'; // Символ корзины
      deleteButton.classList.add('delete-btn');
      deleteButton.addEventListener('click', (e) => {
          e.stopPropagation();
          deleteCard(list, card);
      });
      cardElement.appendChild(deleteButton);

      // Добавление карточки в список
      listElement.appendChild(cardElement);
  });
}


// Функция редактирования текста карточки
function editCardText(card) {
    const newText = prompt('Введите новый текст карточки:', card.text);
    if (newText !== null) {
        card.text = newText;
        renderBoards();
    }
}

// Функция удаления карточки
function deleteCard(list, card) {
    const cardIndex = list.cards.findIndex(c => c.id === card.id);
    if (cardIndex !== -1) {
        list.cards.splice(cardIndex, 1);
        renderBoards();
    }
}

// Запуск приложения
document.getElementById('create-board-btn').addEventListener('click', () => {
    const boardName = document.getElementById('new-board-name').value.trim();
    if (boardName) {
        createBoard(boardName);
        document.getElementById('new-board-name').value = '';
    }
});

createBoard('Моя первая доска');
createBoard('Вторая доска');
