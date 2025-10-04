let quotes = [];
let current = 0;

function fetchQuotesForCycling() {
    fetch("http://localhost:3000/quotes")
        .then(response => response.json())
        .then(data => {
            quotes = data.map(q => q.text); //Store only text from displayAllQuotes
            current = 0;
            if (quotes.length > 0) {
                document.getElementById("quote").innerText = quotes[current];
            } else {
                document.getElementById("quote").innerText = "No quotes to display.";
            }
        });
}

function changeQuote() {
    if (quotes.length === 0) return;
    current = (current + 1) % quotes.length;
    document.getElementById("quote").innerText = quotes[current];
}

function displayAllQuotes() {
    fetch("http://localhost:3000/quotes")
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById("all-quotes");
        container.innerHTML = ""; //Clear previous quotes displayed on screen?
        data.forEach(q => {
            const wrapper = document.createElement("div");
            wrapper.className = "quote-row";

            const block = document.createElement("quote");
            block.innerText = q.text;
            block.className = "quote-block";

            const delBtn = document.createElement("button");
            delBtn.innerText = "Delete";
            delBtn.onclick = () => {
                fetch(`http://localhost:3000/quotes/${q.id}`, {method: "DELETE"})
                    .then(() => {
                        displayAllQuotes(); //Refresh list after deletion
                        fetchQuotesForCycling(); //Refresh cycling quotes after deletion
                    });
            };

            wrapper.appendChild(delBtn);
            wrapper.appendChild(block);
            container.appendChild(wrapper);
        });
    });
}

//Call when page loads
window.onload = () => {
    fetchQuotesForCycling();
    displayAllQuotes();
}

document.getElementById("add-quote-form").addEventListener("submit", function(e) {
    e.preventDefault();
    const quoteText = document.getElementById("new-quote").value;
    fetch("http://localhost:3000/quotes", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({text: quoteText})
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("new-quote").value = "";
        displayAllQuotes(); //Refresh the list
        fetchQuotesForCycling(); //Refresh cycling quotes
    });
});