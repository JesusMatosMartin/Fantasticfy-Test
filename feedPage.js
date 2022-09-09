let onlyOnce = false

window.onload = function getUsers() {
    var data
    try {
        const Http = new XMLHttpRequest()
        // Charge 100 users from API
        const url = 'https://random-data-api.com/api/v2/users?size=100'
        Http.open("GET", url)
        Http.send()
        Http.onreadystatechange = (e) => {
            data = Http.responseText
            if (!onlyOnce) { printUsers(data) }
        }
    } catch (e) {
        alert(e)
    }
}

function printUsers(data) {
    try {
        // Storage on session data array
        sessionStorage.setItem('userData', data)
        var Users = JSON.parse(data)
        // Array length from users
        var userLength = Object.keys(Users).length
        var genders = []
        var text = ""
        var i = 0
        // For every user we create a card
        while (i < userLength) {
            var para = new URLSearchParams();
            para.append("userNumber", i);
            text = text + '<li class="cards_item"><div class="card">'
            text = text + '<div class="card_image"><img rel="preload" src="' + Users[i].avatar + '"></div><div class="card_content">'
            text = text + '<h2 class="card_title">' + Users[i].first_name + " " + Users[i].last_name + '</h2>'
            text = text + '<p class="card_text">' + Users[i].username + '</p><p class="card_gender">' + Users[i].gender + '</p>'
            text = text + '<button class="btn card_btn" onclick="location.href = \'profilePage.html?' + para.toString() + '\'">Perfil Nº ' + i + '</button></div></div></li></div>'
            genders.push(Users[i].gender)
            i++
        }
        // Get element by id from html and writting on it
        document.getElementById("cardList").innerHTML = text
        select(genders)
    } catch (error) {
        if (error instanceof SyntaxError) {
        } else {
            console.log(error)
        }
    }
}


function uniqueValueArray(value, index, self) {
    return self.indexOf(value) === index;
}

function select(genderValue) {
    var i = 0
    var option

    // Returns only unique values
    var uniqueGender = genderValue.filter(uniqueValueArray);

    // Create select elements
    // All values element
    option = document.createElement("option");
    option.text = "Selecciona un Genero"
    option.value = "allValues"
    var select = document.getElementById("gender");
    select.appendChild(option);

    // Dynamic values elements
    while (i < uniqueGender.length) {
        option = document.createElement("option");
        option.text = uniqueGender[i]
        option.value = uniqueGender[i]
        var select = document.getElementById("gender");
        select.appendChild(option);
        i++
    }
    onlyOnce = true
}

function searchProduct() {
    // Get element by id from html and writting on it
    const select = document.getElementById('gender').value.toUpperCase()
    const input = document.getElementById('filter').value.toUpperCase()
    const cardContainter = document.getElementById('cardList')

    // Get element card by class name
    const cards = cardContainter.getElementsByClassName('card')

    // Loop to hide or show the cards
    for (let i = 0; i < cards.length; i++) {
        // Get title text and gender from element cards
        let cardTitle = cards[i].querySelector(".card_title")
        let cardText = cards[i].querySelector(".card_text")
        let cardGender = cards[i].querySelector(".card_gender")
        // If select = "Selecciona un genero" show all the cards
        if ((cardTitle.innerText.toUpperCase().indexOf(input) > -1 || cardText.innerText.toUpperCase().indexOf(input) > -1) && (select === "ALLVALUES")) {
            cards[i].style.display = ""
        }
        // If letters/words on input match with the name or surname or username and gender show the cards specifically
        else if ((cardTitle.innerText.toUpperCase().indexOf(input) > -1 || cardText.innerText.toUpperCase().indexOf(input) > -1) && (cardGender.innerText.toUpperCase().indexOf(select) > -1)) {
            cards[i].style.display = ""
        }
        // If no letter or word matches, it does not show any letter
        else {
            cards[i].style.display = "none"
        }
    }
}