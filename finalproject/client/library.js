const displayArea = document.querySelector('.library-content');

window.onload = () => {
  loadPoems();
};

const loadPoems = async () => {
  const response = await fetch('/all-poems');
  const data = await response.json();

  displayArea.innerHTML = '';

  for (let p of data.poems) {
    const card = document.createElement('div');
    card.className = 'poem-card';

    const title = document.createElement('h2');
    title.className = 'poem-card__title';
    title.textContent = "title: " + p.title;

    const poem = document.createElement('pre');
    poem.className = 'poem-card__poem';
    poem.textContent = p.poem;

    const note = document.createElement('p');
    note.className = 'poem-card__note';
    note.textContent = "notes from author: " +p.note;

    card.appendChild(title);
    card.appendChild(poem);
    card.appendChild(note);

    displayArea.appendChild(card);
  }
};