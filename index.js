console.log('index.js is connected');

document.addEventListener("DOMContentLoaded", function(){
    const ALL_QUEENS_API = 'http://www.nokeynoshade.party/api/queens/all';
    const viewButton = document.getElementById('view-button');
    const searchButton = document.getElementById('search-button');
    viewButton.addEventListener("click", viewAllQueens);
    searchButton.addEventListener("click", searchQueenByName);
    const results = document.getElementById('results-section');

    async function viewAllQueens() {
        // clears container
        results.innerHTML = '';
        
        // 1. fetch data
        // 2. loop thru data, create elements and append

        const allQueenData = await getAllQueenData()
        console.log(allQueenData)

        for (let queenData of allQueenData) {
            console.log("my queen:", queenData)
            const queenProfile = createQueenProfile(queenData)    
            results.appendChild(queenProfile)
        }

        // for (let i = 0; i < allQueenData.length; i++) {
        //     const someData = allQueenData[i]
        //     console.log("some queen:", someData);
        // }
    }

    async function searchQueenByName() {
        console.log(results.children);
        // clears container
        results.innerHTML = '';

        // fetch data
        const allQueenData = await getAllQueenData()

        // filter data by user input
        const foundQueens = allQueenData.filter(function(queen) {
            return queen.name.toLowerCase().includes(document.getElementById('search-bar').value)
        })
        console.log(foundQueens);

        // loop through search results, create elements, append to the DOM
        for (let queen of foundQueens) {
            const queenProfile = createQueenProfile(queen)
            results.appendChild(queenProfile)
        }
    }

    function createQueenProfile(queenData) {
        const queenProfile = document.createElement("div");
        queenProfile.className = "queen-profile";
        const name = document.createElement("h3")
        name.innerText = queenData.name

        const image = document.createElement("img")
        image.src = queenData.image_url
        // image.style = "width:200px"
        image.className = "profile-image"

        const quote = document.createElement("p")
        quote.innerText = queenData.quote

        queenProfile.appendChild(name)
        queenProfile.appendChild(image)
        queenProfile.appendChild(quote)
        

        return queenProfile
    }

    async function getAllQueenData() {
        // fetch(ALL_QUEENS_API)
        //     .then(function(response) {
        //         return response.json();
        //     })
        //     .then(function (allQueens) {
        //         console.log(allQueens)
        //     })

        const response = await fetch(ALL_QUEENS_API)
        const allQueenData = await response.json()
        return allQueenData
    }
});

/*
document.addEventListener("DOMContentLoaded", function(){
    function getAllQueens(event) {
        const storedQueens = localStorage.getItem('allQueens');
        
        if (!storedQueens) {
            fetch('http://www.nokeynoshade.party/api/queens/all')
                .then(function(response) {
                    return response.json();
                })
                .then(function(allQueens) {
                    console.log("1");
                    localStorage.setItem('allQueens', JSON.stringify(allQueens));
                }); 
        }
    };   

    function showAllQueens() {
        const queens = JSON.parse(localStorage.getItem('allQueens')); // bc we set it previously
        const queenMarkup = queens.map(queen => {
            return `
                <h3>${queen.name}</h3>
                <img src=${queen.image_url} style="width:200px;"/>
                <p>${queen.quote}</p>
            `;
        });
        // console.log(queenMarkup.join(' '));
        document.getElementById('results-section').innerHTML=queenMarkup.join(' ')
    };

    function searchQueens() {
        const storedQueens = localStorage.getItem('allQueens');
        const foundQueens = JSON.parse(storedQueens).filter( (queen) => {
            return queen.name.toLowerCase().includes(document.getElementById('search-bar').value)
        });
        console.log(foundQueens);
        const queenMarkup = foundQueens.map(queen => {
            return `
                <h3>${queen.name}</h3>
                <img src=${queen.image_url} style="width:200px;"/>
                <p>${queen.quote}</p>
            `;
        });
        document.getElementById('results-section').innerHTML=queenMarkup.join(' ')
    };

    const searchButton = document.getElementById('search-button');
    const viewButton = document.getElementById('view-button');

    getAllQueens();
    viewButton.addEventListener("click", showAllQueens);
    searchButton.addEventListener("click", searchQueens);
});
*/