// ===============================
// Quotes Array & Local Storage
// ===============================

let quotes = [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Don’t let yesterday take up too much of today.", category: "Inspiration" },
  { text: "It’s not whether you get knocked down, it’s whether you get up.", category: "Perseverance" }
];

// Load quotes if saved
if (localStorage.getItem('quotes')) {
  quotes = JSON.parse(localStorage.getItem('quotes'));
}

// ===============================
// Save Quotes to Local Storage
// ===============================

function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// ===============================
// Populate Categories Dropdown
// ===============================

function populateCategories() {
  const filter = document.getElementById('categoryFilter');

  // Remove all except 'All Categories'
  filter.innerHTML = '<option value="all">All Categories</option>';

  const categories = [...new Set(quotes.map(q => q.category))];

  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    filter.appendChild(option);
  });

  // Restore last selected filter
  const lastFilter = localStorage.getItem('selectedCategory');
  if (lastFilter) {
    filter.value = lastFilter;
    filterQuotes();
  }
}

// ===============================
// Show Random Quote
// ===============================

function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  const quoteDisplay = document.getElementById('quoteDisplay');

  quoteDisplay.innerHTML = '';

  const quoteText = document.createElement('p');
  quoteText.textContent = `"${randomQuote.text}"`;

  const quoteCategory = document.createElement('p');
  quoteCategory.innerHTML = `<em>Category: ${randomQuote.category}</em>`;

  quoteDisplay.appendChild(quoteText);
  quoteDisplay.appendChild(quoteCategory);

  // Save last shown quote in sessionStorage (optional)
  sessionStorage.setItem('lastQuote', JSON.stringify(randomQuote));
}

// ===============================
// Filter Quotes
// ===============================

function filterQuotes() {
  const selectedCategory = document.getElementById('categoryFilter').value;

  localStorage.setItem('selectedCategory', selectedCategory);

  const quoteDisplay = document.getElementById('quoteDisplay');
  quoteDisplay.innerHTML = '';

  const filteredQuotes = selectedCategory === 'all'
    ? quotes
    : quotes.filter(q => q.category === selectedCategory);

  if (filteredQuotes.length === 0) {
    quoteDisplay.textContent = 'No quotes found for this category.';
    return;
  }

  filteredQuotes.forEach(q => {
    const quoteBlock = document.createElement('div');
    const quoteText = document.createElement('p');
    quoteText.textContent = `"${q.text}"`;
    const quoteCategory = document.createElement('p');
    quoteCategory.innerHTML = `<em>Category: ${q.category}</em>`;

    quoteBlock.appendChild(quoteText);
    quoteBlock.appendChild(quoteCategory);
    quoteDisplay.appendChild(quoteBlock);
  });
}

// ===============================
// Add New Quote
// ===============================

function createAddQuoteForm() {
  const newText = document.getElementById('newQuoteText').value.trim();
  const newCategory = document.getElementById('newQuoteCategory').value.trim();

  if (newText && newCategory) {
    quotes.push({ text: newText, category: newCategory });
    saveQuotes();
    populateCategories(); // Update dropdown if new category
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
  const json = JSON.stringify(quotes, null, 2);
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
    populateCategories();
    alert('Quotes imported successfully!');
  };
  fileReader.readAsText(event.target.files[0]);
}

// ===============================
// Initialize
// ===============================

document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Populate filter when page loads
populateCategories();
