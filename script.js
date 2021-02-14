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

    fetch("https://type.fit/api/quotes")
        .then(response => {
            return response.json();
        })
        .then(data => {
            let random = generateRandomNumber();
            quoteText.innerText = data[random].text;

            if (data[random].author === '') {
                authorText.innerText = 'Unknown';
            } else {
                authorText.innerText = data[random].author;
            }

            if (data[random].text.length > 50) {
                quoteText.classList.add('long-quote');
            } else {
                quoteText.classList.remove('long-quote');
            }
        })
        .catch(error => {
            getQuote();
        });

        hideLoadingSpinner();
}

function generateRandomNumber() {
    let x = Math.floor((Math.random() * 1642) + 0);
    return x;
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