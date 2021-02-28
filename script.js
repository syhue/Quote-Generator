const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function hideLoadingSpinner() {
    if (!loader.hidden) {
        loader.hidden = true;
        quoteContainer.hidden = false;
    }
}

function getQuote() {
    showLoadingSpinner();

    const constant = 2;
    const tags = "inspirational";

    fetch(`https://api.quotable.io/random?limit=${constant}&tags=${tags}`)
        .then(response => {    
            return response.json();
        })
        .then(data => {
            quoteText.innerText = data.content;

            if (data.author === '') {
                authorText.innerText = 'Unknown';
            } else {
                authorText.innerText = data.author;
            }

            if (data.length > 50) {
                quoteText.classList.add('long-quote');
            } else {
                quoteText.classList.remove('long-quote');
            }
        })
        .catch(error => {
            console.log(error);
        });

        hideLoadingSpinner();
}

function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

newQuoteBtn.addEventListener('click',getQuote);
twitterBtn.addEventListener('click', tweetQuote);

getQuote();