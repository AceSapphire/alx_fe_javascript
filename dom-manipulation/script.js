// ===============================
// Quotes Array & Local Storage
// ===============================

// Initial quotes
let quotes = [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Don’t let yesterday take up too much of today.", category: "Inspiration" },
  { text: "It’s not whether you get knocked down, it’s whether you get up.", category: "Perseverance" }
];

// Load quotes from localStorage if available
if (localStorage.getItem('quotes')) {
  quotes = JSON.parse(localStorage.getItem('quotes'));
}

// Save quotes to localStorage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// ===============================
// Show Random Quote
// ===============================

function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  const quoteDisplay = document.getElementById('quoteDisplay');

  // Clear old quote
  quoteDisplay.innerHTML = '';

  // Create new quote elements using createElement + appendChild
  const quoteText = document.createElement('p');
  quoteText.textContent = `"${randomQuote.text}"`;

  const quoteCategory = document.createElement('p');
  quoteCategory.innerHTML = `<em>Category: ${randomQuote.category}</em>`;

  quoteDisplay.appendChild(quoteText);
  quoteDisplay.appendChild(quoteCategory);

  // Save last shown quote in sessionStorage (optional)
  sessionStorage.setItem('lastQuote', JSON.stringify(randomQuote));
}

// Add event listener for "Show New Quote" button
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// ===============================
// Add New Quote
// ===============================

function createAddQuoteForm() {
  const newText = document.getElementById('newQuoteText').value.trim();
  const newCategory = document.getElementById('newQuoteCategory').value.trim();

  if (newText && newCategory) {
    quotes.push({ text: newText, category: newCategory });
    saveQuotes(); // Save to localStorage
    alert('New quote added!');
    // Clear inputs
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';
  } else {
    alert('Please enter both a quote and category.');
  }
}

// ===============================
// Export to JSON
// ===============================

function exportToJson() {
  const json = JSON.stringify(quotes, null, 2); // Pretty format
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'quotes.json';
  a.click();
  URL.revokeObjectURL(url);
}

// ===============================
// Import from JSON
// ===============================

function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    alert('Quotes imported successfully!');
  };
  fileReader.readAsText(event.target.files[0]);
}



