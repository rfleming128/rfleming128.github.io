let cards;
let payload;
let result;

const startPlayers = [
    "Mike Roff",
    "Michelle Roff", 
    "Anna Baby",
    "Rosie Baby",
    "Ryan Fleming",
    "Josette Ardillo",
    "Madalyne Eddie"
]

const startWeapons = [
    "Muddy Shoes",
    "Spilled Drink",
    "Packet of Crisps",
    "Pencil Shavings",
    "Scuffed Walls",
    "Wet Umbrella"
]

const startRooms = [
    "Main Audatorium",
    "Downstairs Hallway", 
    "Staircase",
    "Kitchen",
    "Second School",
    "Overflow Audatorium",
    "Upstairs Hall",
    "Foyer",
    "Elevator"
]

let players, weapons, rooms, playerCards

const start = () => {
    players = [...startPlayers]
    
    weapons = [...startWeapons]
    
    rooms = [...startRooms]

    select_hidden_cards();

    generatePlayerCards();

    generatePlayerCodes();
}

const select_hidden_cards = () => {
    select_player = () => {
        let randomPlayerNum = Math.floor(Math.random() * players.length)
        let player = players[randomPlayerNum]
        players.splice(randomPlayerNum, 1);
        return player
    }
    
    select_room = () => {
        let randomRoomNum = Math.floor(Math.random() * rooms.length)
        let room = rooms[randomRoomNum]
        rooms.splice(randomRoomNum, 1);
        return room;
    }
    
    select_weapon = () => {
        let randomWeaponNum = Math.floor(Math.random() * weapons.length)
        let weapon = weapons[randomWeaponNum];
        weapons.splice(randomWeaponNum, 1);
        return weapon;
    }
    
    let weapon = select_weapon();
    let room = select_room();
    let murderer = select_player();

    result = {
        weapon,
        room,
        murderer
    }
        
    cards = [...players, ...weapons, ...rooms];
}

const select_card = () => {
    if(cards.length <= 0) return -1
    let randomCardNum = Math.floor(Math.random() * cards.length)
    let card = cards[randomCardNum];
    cards.splice(randomCardNum, 1);
    return card
}

const generatePlayerCards = () => {
    let numOfPlayers = document.getElementById("players").value

    playerCards = [];

    let cardsEach = Math.floor(cards.length / numOfPlayers)

    for(i = 0; i < numOfPlayers; i++){ 
        for(j = 0; j < cardsEach; j++){
            if(playerCards[i] == undefined){
                playerCards[i] = [select_card()]
            }
            else{
                playerCards[i].push(select_card());
            }
        }
    }

    let overflowCards = cards.length % numOfPlayers
    if(overflowCards > 0) {
        for(i = 0; i < overflowCards; i++){ 
            playerCards[i].push(select_card());
        }
    }

    console.log(playerCards);
}

const generatePlayerCodes = () => {
    document.getElementById("results").innerHTML = ""
    let codes = []

    for(var i = 0; i < playerCards.length; i++){ 
        let payload = { 
            cardOptions: [...startPlayers, ...startWeapons, ...startRooms],
            cards: playerCards[i], 
            result
        }

        codes.push(btoa(JSON.stringify(payload)));
    }

    for(var i = 0; i < codes.length; i++){
        let node = document.createElement("p")
        node.innerHTML = codes[i];
        document.getElementById("results").appendChild(node)
    }
}

const reveal = () => {
    document.getElementById("result").appendChild(generateCard(payload.result.murderer));
    document.getElementById("result").appendChild(generateCard(payload.result.room));
    document.getElementById("result").appendChild(generateCard(payload.result.weapon));
}

const decodePlayerCode = () => {
    if (document.getElementById("code").value === "")
        return;
        
    let code = document.getElementById("code").value;
    payload = JSON.parse(atob(code))
    let uiCards = document.getElementById("cards").getElementsByClassName("card")

    for(i = uiCards.length - 1; i >= 0; i--){
        document.getElementById("cards").removeChild(uiCards[i]);
    }

    for(var i = 0; i < payload.cards.length; i++){ 
        document.getElementById("cards").appendChild(generateCard(payload.cards[i]));
    }

    generateTickBoxes(payload.cardOptions, payload.cards);

    document.getElementById("revealButton").attributes.removeNamedItem("disabled");
}

const generateCard = card => {
    let cardNode = document.createElement("div");
    cardNode.className = "card"
    let cardBody = document.createElement("div");
    cardBody.className = "card-body"
    let cardText = document.createElement("h5");
    cardText.className = "card-title"
    cardText.innerHTML = card;
    cardBody.appendChild(cardText);
    cardNode.appendChild(cardBody);
    return cardNode;
}

const generateTickBoxes = (cardOptions, cards) => {
    let outerDiv = document.getElementById("options");
    for(let i = 0; i <cardOptions.length; i++){ 
        let divNode = document.createElement("div");
        divNode.className="form-check"
        let labelNode = document.createElement("label");
        labelNode.innerHTML = cardOptions[i];
        labelNode.className = "form-check-label"
        let inputNode = document.createElement("input");
        inputNode.type = "checkbox"
        inputNode.className = "form-check-input"
        for(let j = 0; j < cards.length; j++){ 
            if (cardOptions[i] == cards[j]){
                inputNode.checked = true;
                break;
            }
        }

        divNode.appendChild(inputNode);
        divNode.appendChild(labelNode);
        outerDiv.appendChild(divNode);
    }
}