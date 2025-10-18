if (document.getElementById('my-work-link')) {
  document.getElementById('my-work-link').addEventListener('click', () => {
    document.getElementById('my-work-section').scrollIntoView({behavior: "smooth"})
  })
}

// JSON Formatter functionality for project-pages/formatjson.html
function safeParseJson(text) {
  try {
    return { value: JSON.parse(text) };
  } catch (err) {
    return { error: err };
  }
}

function formatJson() {
  const input = document.getElementById('json-input');
  const errEl = document.getElementById('json-error');
  if (!input) return;
  const text = input.value.trim();
  if (!text) {
    errEl.textContent = 'Input is empty.';
    return;
  }
  const parsed = safeParseJson(text);
  if (parsed.error) {
    errEl.textContent = 'Invalid JSON: ' + parsed.error.message;
    return;
  }
  errEl.textContent = '';
  input.value = JSON.stringify(parsed.value, null, 2);
}

function minifyJson() {
  const input = document.getElementById('json-input');
  const errEl = document.getElementById('json-error');
  if (!input) return;
  const text = input.value.trim();
  if (!text) {
    errEl.textContent = 'Input is empty.';
    return;
  }
  const parsed = safeParseJson(text);
  if (parsed.error) {
    errEl.textContent = 'Invalid JSON: ' + parsed.error.message;
    return;
  }
  errEl.textContent = '';
  input.value = JSON.stringify(parsed.value);
}

function copyJson() {
  const input = document.getElementById('json-input');
  const errEl = document.getElementById('json-error');
  if (!input) return;
  const text = input.value;
  if (!text) {
    errEl.textContent = 'Nothing to copy.';
    return;
  }
  navigator.clipboard.writeText(text).then(() => {
    errEl.textContent = 'Copied to clipboard.';
    setTimeout(() => { errEl.textContent = ''; }, 2000);
  }).catch((e) => {
    errEl.textContent = 'Copy failed: ' + e;
  });
}

function clearJson() {
  const input = document.getElementById('json-input');
  const errEl = document.getElementById('json-error');
  if (!input) return;
  input.value = '';
  errEl.textContent = '';
}

// Attach listeners when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const formatBtn = document.getElementById('format-btn');
  const minifyBtn = document.getElementById('minify-btn');
  const copyBtn = document.getElementById('copy-btn');
  const clearBtn = document.getElementById('clear-btn');
  if (formatBtn) formatBtn.addEventListener('click', formatJson);
  if (minifyBtn) minifyBtn.addEventListener('click', minifyJson);
  if (copyBtn) copyBtn.addEventListener('click', copyJson);
  if (clearBtn) clearBtn.addEventListener('click', clearJson);
});