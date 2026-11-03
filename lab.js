const phraseInput = document.getElementById('phrase');
const posterWords = document.getElementById('posterWords');
const poster = document.getElementById('poster');
const scale = document.getElementById('typeSize');
const sizeValue = document.getElementById('sizeValue');
const paletteButtons = [...document.querySelectorAll('[data-palette]')].filter(el => el.tagName === 'BUTTON');
const status = document.getElementById('status');
function updatePhrase(value) {
  const phrase = value.trim() || 'STAY CURIOUS.';
  const bits = phrase.split(/\s+/);
  // Use textContent to safely display anything typed by a visitor.
  posterWords.replaceChildren();
  if (bits.length === 1) {
    const italic = document.createElement('i'); italic.textContent = bits[0].toUpperCase(); posterWords.append(italic);
  } else {
    const line = document.createTextNode(bits.slice(0, -1).join(' ').toUpperCase());
    const br = document.createElement('br');
    const italic = document.createElement('i'); italic.textContent = bits[bits.length - 1].toUpperCase();
    posterWords.append(line, br, italic);
  }
}
phraseInput.addEventListener('input', () => updatePhrase(phraseInput.value));
scale.addEventListener('input', () => { posterWords.style.setProperty('--typeScale', Number(scale.value)/100); sizeValue.textContent = scale.value + '%'; });
paletteButtons.forEach(button => button.addEventListener('click', () => {
  poster.dataset.palette = button.dataset.palette;
  paletteButtons.forEach(b => { const chosen = b === button; b.classList.toggle('is-selected', chosen); b.setAttribute('aria-pressed', String(chosen)); });
  status.textContent = 'New mood, new possibilities.';
}));
const suggestions = ['MAKE IT MATTER.', 'STAY CURIOUS.', 'THINK BIGGER.', 'MORE MAGIC.', 'IDEAS BLOOM.'];
document.getElementById('surprise').addEventListener('click', () => {
  const suggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
  phraseInput.value = suggestion; updatePhrase(suggestion);
  paletteButtons[Math.floor(Math.random() * paletteButtons.length)].click();
  status.textContent = 'Sometimes the unexpected works best.';
});
document.getElementById('reset').addEventListener('click', () => {
  phraseInput.value = 'STAY CURIOUS.'; updatePhrase(phraseInput.value);
  scale.value = '100'; scale.dispatchEvent(new Event('input'));
  paletteButtons[0].click(); status.textContent = 'Every good idea starts somewhere.';
});
document.getElementById('year').textContent = new Date().getFullYear();

const layoutButtons = [...document.querySelectorAll('[data-layout]')].filter(b => b.tagName === 'BUTTON');
const layoutPreview = document.querySelector('#composition-preview');
const layoutStatus = document.querySelector('#composition-status');
layoutButtons.forEach(button => button.addEventListener('click', () => {
  const value = button.dataset.layout;
  layoutPreview.dataset.layout = value;
  layoutButtons.forEach(b => { const active = b === button; b.classList.toggle('is-active', active); b.setAttribute('aria-pressed', String(active)); });
  layoutStatus.textContent = value[0].toUpperCase() + value.slice(1) + ' composition selected.';
}));
