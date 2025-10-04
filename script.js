const quotes = [
    "quote 5",
    "quote 1",
    "quote 2",
    "quote 3",
    "quote 4"
]

let current = 0;

function changeQuote() {
    current = (current + 1) % quotes.length;
    document.getElementById("quote").innerText = quotes[current];
}