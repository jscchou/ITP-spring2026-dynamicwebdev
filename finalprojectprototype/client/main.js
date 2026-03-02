const composeBtn = document.getElementById('compose-btn');
const saveBtn = document.getElementById('save-btn');
const poemDisplay = document.getElementById('poem-display');

let currentPoem = null;

// --- Compose a poem ---
composeBtn.addEventListener('click', async () => {
  poemDisplay.textContent = 'Composing...';
  saveBtn.disabled = true;

  const response = await fetch('/compose', { method: 'POST' });
  const data = await response.json();

  if (data.poem) {
    currentPoem = data.poem;
    poemDisplay.textContent = data.poem.text;
    saveBtn.disabled = false;
  } else {
    poemDisplay.textContent = 'Something went wrong.';
  }
});

// --- Save the poem ---
saveBtn.addEventListener('click', async () => {
  if (!currentPoem) return;

  const response = await fetch('/save', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ poem: currentPoem })
  });

  const data = await response.json();
  if (data.success) {
    alert('Poem saved!');
  }
});