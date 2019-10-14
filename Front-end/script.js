const house = [
    {
        "id": 1,
        "name": "Gryffindor",
        "founder": "Godric Gryffindor",
        "animal": "Lion",
        "colours": "Scarlet and gold",
        "traits": "Bravery, daring, nerve and chivalry",
        "head": "Minerva McGonagall",
        "ghost": "Nearly Headless Nick",
        "room": "Gryffindor Tower",
        "picture": "images/gryffindor.png"
    },
    {
        "id": 2,
        "name": "Hufflepuff",
        "founder": "Helga Hufflepuff",
        "animal": "Badger",
        "colours": "Yellow and black",
        "traits": "Hard work, dedication, patience, loyalty and fair play",
        "head": "Pomona Sprout",
        "ghost": "Fat Friar",
        "room": "Hufflepuff Basement",
        "picture": "images/hufflepuff.png"
    },
    {
        "id": 3,
        "name": "Ravenclaw",
        "founder": "Rowena Ravenclaw",
        "animal": "Eagle",
        "colours": "Blue and bronze",
        "traits": "Intelligence, knowledge and wit",
        "head": "Filius Flitwick",
        "ghost": "Grey Lady",
        "room": "Ravenclaw Tower",
        "picture": "images/ravenclaw.png"
    },
    {
        "id": 4,
        "name": "Slytherin",
        "founder": "Salazar Slytherin",
        "animal": "Basilisk",
        "colours": "Green and silver",
        "traits": "Ambition, cunning and resourcefulness",
        "head": "Severus Snape",
        "ghost": "Bloody Baron",
        "room": "Slytherin Dungeon",
        "picture": "images/Slytherin.png"
    }
]

/* ADD CONTENT (DIV, IMG AND TEXT) FOR EACH HOUSE */

function displayHouses() {
    let houses = document.getElementById('listHouses');

    for (let i = 0; i < house.length; i++){
        newDiv = document.createElement('div');
        newImage = document.createElement('img');
        newImage.src = house[i].picture;
        newImage.alt = house[i].name;
        newImage.classList = "zoom";
        newName = document.createElement('h1');
        newName.appendChild(document.createTextNode(house[i].name));

        newDiv.className = "houseDiv";

        newImage.onclick = function(){
            printData(i);
        };

        houses.appendChild(newDiv);
        newDiv.appendChild(newImage);
        newDiv.appendChild(newName);
        
    }
    
    document.getElementsByClassName('houseDiv')[0].className += " noMargin";
}

/* PRINT OUT DATA IN PRE TAG FOR THE HOUSE THAT'S SELECTED */

const newHouse = house.map(u => Object.keys(u).reduce((newObj, key) => key != 'picture' ? { ...newObj, [key]: u[key]} : newObj, {}));

function printData(i){
    let houseJSON = JSON.stringify(newHouse[i], null, 2);
    document.getElementById('output').innerHTML = houseJSON;
}

window.onload = function () {
    displayHouses();
    printData();
    displayAdmin();
}

/* DISPLAY LOGOUT ICON AND POST BUTTON WHEN USER IS LOGGED IN */

function displayAdmin() {
    if (localStorage.getItem('x-auth-token')) {
        document.getElementById('postBtn').style.display='block';
        document.getElementById('login-icon').style.display='none';
        document.getElementById('logout-icon').style.display='block';
        //you are logged in, hide the log in, show log out and show post button
    }
}

/*REFRESH THE PAGE 2 SECONDS AFTER THE LOG IN SO THAT THE displayAdmin FUNCTION CAN RUN*/

function timedRefresh(timeoutPeriod) {
	setTimeout("location.reload(true)",timeoutPeriod);
}

/* ADD SUBMIT FUNCTION TO THE A TAG 'BUTTON' */

document.getElementById("loginSubmit").onclick = function() {
    document.getElementById("loginForm").submit();
}

/* LINK TO BACK END */

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("postSubmit").addEventListener('click', function () {
        {
            fetch('http://des-iis.ucn.dk:8213/api/characters', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fname: document.getElementById('fname').value,
                    lname: document.getElementById('lname').value,
                    aka: document.getElementById('aka').value,
                    gender: document.getElementById('gender').value,
                    bloodstatus: document.getElementById('bloodstatus').value,
                    birthday: document.getElementById('birthday').value,
                    death: document.getElementById('death').value,
                    pet: document.getElementById('pet').value,
                    wand: document.getElementById('wand').value,
                    patronus: document.getElementById('patronus').value,
                    boggart: document.getElementById('boggart').value,
                    quote: document.getElementById('quote').value
                })
            })
        }
    });
},
false);

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("loginSubmit").addEventListener('click', function () {
        {
            fetch('http://des-iis.ucn.dk:8213/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: document.getElementById('emailInput').value,
                    password: document.getElementById('passwordInput').value
                })
            })
            .then(response => {
                if(response.status == 200) {
                    localStorage.setItem('x-auth-token', response.headers('x-auth-token'));
                    console.log('log-in succesful')
                }
            });
        }
    });
},
false);

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("getSubmit").addEventListener('click', function () {
        {
            fetch('http://des-iis.ucn.dk:8213/api' + document.getElementById('endpointInput').value, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((resp) => resp.json())
            .then(function(data) {
                let dataJSON = JSON.stringify(data, null, 2);
                document.getElementById('output').innerHTML = dataJSON;
            });
        }
    });
},
false);