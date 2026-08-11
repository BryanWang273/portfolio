// ============================================
// Mobile nav toggle
// ============================================
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

// Close mobile menu after tapping a link
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ============================================
// Terminal typing animation
// ============================================
// Each line: { type: 'prompt'|'out', text } — 'prompt' lines are typed
// character by character, 'out' lines appear instantly after.
const script = [
  { type: 'prompt', text: 'whoami' },
  { type: 'out',    text: 'alex-rivera — backend engineer' },
  { type: 'prompt', text: 'cat focus.txt' },
  { type: 'out',    text: 'distributed systems, APIs, developer tooling' },
  { type: 'prompt', text: 'status --job-search' },
  { type: 'out',    text: 'open to new roles · reply time: < 24h' },
];

const body = document.getElementById('terminalBody');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Only the home page has the terminal — skip entirely on other pages
if (body) {

function renderStatic() {
  body.innerHTML = script.map(line =>
    line.type === 'prompt'
      ? `<span class="prompt">$</span> <span class="cmd">${line.text}</span>`
      : `<span class="out">${line.text}</span>`
  ).join('\n');
}

async function typeLine(el, text, speed = 28) {
  for (let i = 0; i < text.length; i++) {
    el.textContent += text[i];
    await new Promise(r => setTimeout(r, speed));
  }
}

async function runTerminal() {
  if (reduceMotion) { renderStatic(); return; }

  body.innerHTML = '';
  for (const line of script) {
    const row = document.createElement('div');
    if (line.type === 'prompt') {
      row.innerHTML = '<span class="prompt">$</span> ';
      const cmd = document.createElement('span');
      cmd.className = 'cmd';
      row.appendChild(cmd);
      body.appendChild(row);
      await typeLine(cmd, line.text);
      await new Promise(r => setTimeout(r, 250));
    } else {
      row.innerHTML = `<span class="out">${line.text}</span>`;
      body.appendChild(row);
      await new Promise(r => setTimeout(r, 350));
    }
  }
  const cursorRow = document.createElement('div');
  cursorRow.innerHTML = '<span class="prompt">$</span> <span class="cursor"></span>';
  body.appendChild(cursorRow);
}

// Run once the page has settled
window.addEventListener('DOMContentLoaded', runTerminal);

} // end terminal guard
