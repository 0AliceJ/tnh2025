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

function displayAllQuotes() {
    fetch("http://localhost:3000/quotes")
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById("all-quotes");
        container.innerHTML = ""; //Clear previous quotes(??? what???)
        data.forEach(q => {
            const block = document.createElement("blockquote");
            block.innerText = q.text;
            container.appendChild(block);
        });
    });
}

//Call displayAllQuotes when page loads
window.onload = displayAllQuotes;

document.getElementById("add-quote-form").addEventListener("submit", function(e) {
    e.preventDefault();
    const quoteText = document.getElementById("new-quote").value;
    fetch("/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({text: quoteText})
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("new-quote").value = "";
        displayAllQuotes(); //Refresh the list
    });
});