// machine 01

const seasons = ['spring', 'winter', 'summer', 'autumn'];
const timeofday = ['morning', 'midday', 'afternoon', 'evening', 'midnight'];
const locations = [
  'on Jay Street', 'on a quiet block in Brooklyn', 'along the Hudson River',
  'under the Manhattan Bridge', 'outside a laundromat in Flushing',
  'in a basement in Chinatown', 'on a rooftop in Bushwick',
  'by the piers in Red Hook', 'inside a cafe in the East Village',
  'on the downtown F train', 'between two subway stops',
  'on the last ferry to Staten Island', 'in the back seat of a yellow cab',
  'crossing the Williamsburg Bridge', 'standing at a crowded bus stop',
  'on a platform that smells like rain', 'in a kitchen with no windows',
  'inside a narrow bookstore', 'in a hallway full of echoes',
  'at a table near the door', 'on the floor of a shared apartment',
  'in a room lit only by a desk lamp', 'in a studio facing brick walls',
];
const numbers = ['two', 'three', 'four'];
const people = ['women', 'men', 'boys', 'girls', 'people'];
const descriptions = [
  'with green eyes', 'with blue eyes', 'with brown eyes',
  'with blond hair', 'with green hair', 'with brown hair',
  'with red hair', 'with blue hair', 'with pink hair',
  'wearing large hats', 'wearing pink furry coats',
  'carrying luggage', 'wearing orange scarves',
  'holding yellow umbrellas', 'wearing white sneakers', 'all suited up',
];
const actions = [
  'talking about', 'singing about', 'arguing about',
  'painting images about', 'telling stories about',
  'filming moments about', 'collecting objects about',
  'recording sounds about', 'laughing about', 'fighting about',
  'caring about', 'worrying about', 'waiting for',
  'hoping for', 'missing someone in', 'forgiving someone for',
  'thinking of', 'looking at', 'listening to stories about',
  'writing about', 'whispering about', 'shouting about',
  'confessing about', 'complaining about', 'joking about',
  'dreaming aloud about', 'lecturing about', 'reflecting about',
  'gossiping about', 'praying about', 'wondering about',
];
const states = [
  'came back', 'left', 'woke up', 'died', 'smiled', 'cried',
  'lived', 'slept', 'called again', 'wrote back',
  'finished the story', 'found the way home', 'opened the letter',
  'turned around', 'looked up', 'said goodbye', 'missed the train',
  'caught the train', 'lost the map', 'followed the signs',
  'closed the door', 'learned the song', 'forgot the tune',
  'solved the puzzle', 'broke the silence', 'lit the candle',
  'put out the fire', 'chased the pigeons', 'fed the cats',
  'watered the plants', 'watched the sunset', 'counted the stars',
  'made a wish', 'told the truth', 'told a lie', 'asked why',
  'knew what happened',
];

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function article(word) {
  return 'aeiou'.includes(word[0].toLowerCase()) ? 'An' : 'A';
}

function generatePoem() {
  const shuffledSeasons = shuffle(seasons);
  const lines = [];
  for (const season of shuffledSeasons) {
    lines.push('');
    lines.push(`${article(season)} ${season} ${pick(timeofday)}`);
    lines.push(pick(locations));
    lines.push(`${pick(numbers)} ${pick(people)} ${pick(descriptions)}`);
    lines.push(`${pick(actions)} someone who never ${pick(states)}`);
  }
  const poemText = lines.join('\n').trim();
  return { text: poemText, lines: poemText.split('\n') };
}

// --- DOM refs ---
const composeBtn          = document.querySelector('.compose-btn');
const poemDisplay         = document.querySelector('.poetry-placeholder');
const postGenerateActions = document.querySelector('.post-generate-actions');
const donateForm          = document.querySelector('.donate-form');
const discardBtn          = document.querySelector('.action-btn--trash');
const donateBtn           = document.querySelector('.action-btn--donate');
const cancelBtn           = document.querySelector('.action-btn--cancel');
const submitBtn           = document.querySelector('.action-btn--submit');

// --- Feedback element (appended near submit button) ---
const feedback = document.createElement('p');
feedback.className = 'submit-feedback';
submitBtn.parentNode.insertBefore(feedback, submitBtn.nextSibling);

// --- State ---
function resetToIdle() {
  poemDisplay.textContent = 'Press compose to create poetry';
  poemDisplay.style.opacity = '0.40';     
  poemDisplay.style.textAlign = 'center'; 
  document.getElementById('poem-title').value = '';
  document.getElementById('poem-note').value = '';
  feedback.textContent = '';
}

// --- Render library ---
function renderLibrary(poems) {
  libraryGrid.innerHTML = '';

  if (!poems || poems.length === 0) {
    libraryGrid.innerHTML = '<p class="library-empty">No poems donated yet.</p>';
    return;
  }

  for (const entry of poems) {
    const card = document.createElement('div');
    card.className = 'library-card';

    const dateStr = entry.createdAt
      ? new Date(entry.createdAt).toLocaleDateString('en-US', {
          year: 'numeric', month: 'short', day: 'numeric'
        })
      : '';

    const titleLine = entry.poem?.title
      ? `<p class="library-card__title">${entry.poem.title}</p>`
      : '';

    const noteLine = entry.poem?.note
      ? `<p class="library-card__note">${entry.poem.note}</p>`
      : '';

    card.innerHTML = `
      ${titleLine}
      <pre class="library-card__poem">${entry.poem?.text || entry.poem}</pre>
      ${noteLine}
      ${dateStr ? `<p class="library-card__date">${dateStr}</p>` : ''}
    `;

    libraryGrid.appendChild(card);
  }
}

// --- Load library on page load ---
async function loadLibrary() {
  try {
    const res = await fetch('/data');
    const data = await res.json();
    renderLibrary(data.poems);
  } catch (err) {
    console.error('Failed to load library:', err);
  }
}

// --- Compose ---
composeBtn.addEventListener('click', () => {
  poemDisplay.textContent = generatePoem().text;
  poemDisplay.style.opacity = '1';        
  poemDisplay.style.textAlign = 'left';   
  postGenerateActions.hidden = false;
  donateForm.hidden = true;
});

// --- Discard ---
discardBtn.addEventListener('click', () => {
  resetToIdle();
});

// --- Donate: show form ---
donateBtn.addEventListener('click', () => {
  donateForm.hidden = false;
  postGenerateActions.hidden = true;
  composeBtn.hidden = true;
});

// --- Cancel ---
cancelBtn.addEventListener('click', () => {
  donateForm.hidden = true;
  postGenerateActions.hidden = false;
  composeBtn.hidden = false;
  document.getElementById('poem-title').value = '';
  document.getElementById('poem-note').value = '';
});

// --- Submit: save to backend then refresh library ---
submitBtn.addEventListener('click', async () => {
  const title = document.getElementById('poem-title').value.trim() || 'Untitled';
  const note  = document.getElementById('poem-note').value.trim();
  const text  = poemDisplay.textContent;

  const poem = { title, note, text };

  submitBtn.disabled = true;
  feedback.textContent = 'Saving…';

  try {
    const res = await fetch('/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, note, poem: text }),
    });

    if (!res.ok) throw new Error('Server error');

    feedback.textContent = 'Poem donated to the library.';
    await loadLibrary();

    setTimeout(() => {
      resetToIdle();
    }, 1200);

  } catch (err) {
    console.error('Failed to save poem:', err);
    feedback.textContent = 'Something went wrong. Please try again.';
  } finally {
    submitBtn.disabled = false;
  }
});

// --- Init ---
loadLibrary();