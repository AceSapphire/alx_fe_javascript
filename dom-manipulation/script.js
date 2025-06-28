// quotes array
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
  { text: "Stay positive!", category: "Motivation" },
  { text: "Never give up.", category: "Inspiration" }
];

// Show new quote
function displayRandomQuote() {
  const quoteDisplay = document.getElementById('quoteDisplay');
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  quoteDisplay.textContent = `"${quote.text}" — ${quote.category}`;

  // Save last viewed quote in sessionStorage
  sessionStorage.setItem('lastQuote', JSON.stringify(quote));
}

// Add new quote
function addQuote() {
  const textInput = document.getElementById('newQuoteText');
  const categoryInput = document.getElementById('newQuoteCategory');
  const text = textInput.value.trim();
  const category = categoryInput.value.trim();

  if (text && category) {
    quotes.push({ text, category });
    saveQuotes();
    textInput.value = "";
    categoryInput.value = "";
    populateCategories();
    filterQuotes();
  }
}

// Save quotes to localStorage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Populate categories in dropdown
function populateCategories() {
  const categoryFilter = document.getElementById('categoryFilter');
  const categories = [...new Set(quotes.map(q => q.category))];

  categoryFilter.innerHTML = '<option value="all">All Categories</option>';
  categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option);
  });

  // Restore last filter
  const lastFilter = localStorage.getItem('selectedCategory') || 'all';
  categoryFilter.value = lastFilter;
}

// Filter quotes by category
function filterQuotes() {
  const selectedCategory = document.getElementById('categoryFilter').value;
  localStorage.setItem('selectedCategory', selectedCategory);

  const filteredQuotes = selectedCategory === 'all'
    ? quotes
    : quotes.filter(q => q.category === selectedCategory);

  const quoteDisplay = document.getElementById('quoteDisplay');
  if (filteredQuotes.length > 0) {
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const quote = filteredQuotes[randomIndex];
    quoteDisplay.textContent = `"${quote.text}" — ${quote.category}`;
  } else {
    quoteDisplay.textContent = "No quotes found for this category.";
  }
}

// Export quotes as JSON
function exportQuotes() {
  const blob = new Blob([JSON.stringify(quotes)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'quotes.json';
  a.click();
  URL.revokeObjectURL(url);
}

// Import quotes from JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    populateCategories();
    filterQuotes();
    alert('Quotes imported successfully!');
  };
  fileReader.readAsText(event.target.files[0]);
}

// Simulate fetching from server
async function fetchQuotesFromServer() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await response.json();
  // Mock server quotes
  return [
    { text: "Server quote 1", category: "Server" },
    { text: "Server quote 2", category: "Server" }
  ];
}

// Simulate posting to server
async function postQuotesToServer() {
  await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(quotes)
  });
}

// Sync quotes with server and resolve conflicts
async function syncQuotes() {
  const serverQuotes = await fetchQuotesFromServer();
  await postQuotesToServer();
  quotes = [...serverQuotes, ...quotes];
  saveQuotes();
  syncStatus.textContent = "Quotes synced with server!";
  setTimeout(() => {
    syncStatus.textContent = "";
  }, 3000);
  populateCategories();
  filterQuotes();
}

// Run sync every 15 seconds
setInterval(syncQuotes, 15000);

// Add event listeners
document.getElementById('newQuote').addEventListener('click', displayRandomQuote);
window.addEventListener('load', () => {
  populateCategories();
  filterQuotes();
  const lastViewed = sessionStorage.getItem('lastQuote');
  if (lastViewed) {
    const quote = JSON.parse(lastViewed);
    document.getElementById('quoteDisplay').textContent = `"${quote.text}" — ${quote.category}`;
  }
});

// Add sync status element
const syncStatus = document.createElement('div');
syncStatus.id = 'syncStatus';
document.body.appendChild(syncStatus);
