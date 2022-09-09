window.onload = function getUsers() {
    // Get the session storage array
    var sessionArray = sessionStorage.getItem('userData')
    var userData = JSON.parse(sessionArray)
    var para = new URLSearchParams(window.location.search)
    var pass = para.get("userNumber")
    var userLength = Object.keys(userData).length
    var text = ""
    var i = 0

    // Get element by id from html and writting on it
    document.getElementById("img_profile").innerHTML = '<img src="' + userData[pass].avatar + '" class="rounded-circle">'
    document.getElementById("name").innerHTML = userData[pass].first_name + " " + userData[pass].last_name + " - " + userData[pass].gender
    document.getElementById("date_of_birth").innerHTML = userData[pass].date_of_birth
    document.getElementById("employment").innerHTML = (userData[pass].employment.title + " - " + userData[pass].employment.key_skill).toString()
    document.getElementById("phoneNumber").innerHTML = "Phone Number: " + userData[pass].phone_number
    document.getElementById("social_insurance_number").innerHTML = "Social Insurance Number: " + userData[pass].social_insurance_number
    document.getElementById("credit_card").innerHTML = "Credit Card: " + userData[pass].credit_card.cc_number
    document.getElementById("subscription").innerHTML = userData[pass].subscription.plan + " - " + userData[pass].subscription.status + " - " + userData[pass].subscription.payment_method + " - " + userData[pass].subscription.term
    document.getElementById("id").innerHTML = '<input type="" id="username" class="form-control form-control-alternative" placeholder="Username" value="' + userData[pass].id + '" readonly>'
    document.getElementById("password").innerHTML = '<input type="" id="username" class="form-control form-control-alternative" placeholder="Username" value="' + userData[pass].password + '" readonly>'
    document.getElementById("usernames").innerHTML = '<input type="" id="username" class="form-control form-control-alternative" placeholder="Username" value="' + userData[pass].username + '" readonly>'
    document.getElementById("email").innerHTML = '<input type="" id="username" class="form-control form-control-alternative" placeholder="Username" value="' + userData[pass].email + '" readonly>'
    document.getElementById("first_name").innerHTML = '<input type="" id="username" class="form-control form-control-alternative" placeholder="Username" value="' + userData[pass].first_name + '" readonly>'
    document.getElementById("last_name").innerHTML = '<input type="" id="username" class="form-control form-control-alternative" placeholder="Username" value="' + userData[pass].last_name + '" readonly>'
    document.getElementById("address").innerHTML = '<input type="" id="username" class="form-control form-control-alternative" placeholder="Username" value="' + userData[pass].address.street_name + " - " + userData[pass].address.street_address + '" readonly>'
    document.getElementById("city").innerHTML = '<input type="" id="username" class="form-control form-control-alternative" placeholder="Username" value="' + userData[pass].address.city + '" readonly>'
    document.getElementById("country").innerHTML = '<input type="" id="username" class="form-control form-control-alternative" placeholder="Username" value="' + userData[pass].address.country + '" readonly>'
    document.getElementById("zip_code").innerHTML = '<input type="" id="username" class="form-control form-control-alternative" placeholder="Username" value="' + userData[pass].address.zip_code + '" readonly>'
    
    // Displaying cards with the same key_skill of the profile seen
    for (var i = userLength - 1; i > 0; i--) {
        if (userData[pass].employment.key_skill === userData[i].employment.key_skill) {
            if (userData[i].uid !== userData[pass].uid) {
                var para = new URLSearchParams();
                para.append("userNumber", i);
                text = text + '<li class="cards_item"><div class="card">'
                text = text + '<div class="card_image"><img rel="preload" src="' + userData[i].avatar + '"></div><div class="card_content">'
                text = text + '<h2 class="card_title">' + userData[i].first_name + " " + userData[i].last_name + '</h2>'
                text = text + '<p class="card_text">' + userData[i].username + '</p><p class="card_gender">' + userData[i].gender + '</p>'
                text = text + '<button class="btn card_btn" onclick="location.href = \'profilePage.html?' + para.toString() + '\'">Perfil Nº ' + i + '</button></div></div></li></div>'
            }
        }
    }
    // Get element by id from html and writting on it
    document.getElementById("cardList").innerHTML = text
}