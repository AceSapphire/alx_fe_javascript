// Array of quotes
let quotes = [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Don’t let yesterday take up too much of today.", category: "Inspiration" },
  { text: "It’s not whether you get knocked down, it’s whether you get up.", category: "Perseverance" }
];

// Function to show random quote using createElement & appendChild
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  const quoteDisplay = document.getElementById('quoteDisplay');

  // Clear old quote
  quoteDisplay.innerHTML = '';

  // Create quote text element
  const quoteText = document.createElement('p');
  quoteText.textContent = `"${randomQuote.text}"`;

  // Create quote category element
  const quoteCategory = document.createElement('p');
  quoteCategory.innerHTML = `<em>Category: ${randomQuote.category}</em>`;

  // Append both to the display container
  quoteDisplay.appendChild(quoteText);
  quoteDisplay.appendChild(quoteCategory);
}

// Event listener for the Show New Quote button
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Function to add a new quote
function createAddQuoteForm() {
  const newText = document.getElementById('newQuoteText').value.trim();
  const newCategory = document.getElementById('newQuoteCategory').value.trim();

  if (newText && newCategory) {
    quotes.push({ text: newText, category: newCategory });
    alert('New quote added!');
    // Clear inputs
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';
  } else {
    alert('Please enter both a quote and category.');
  }
}


