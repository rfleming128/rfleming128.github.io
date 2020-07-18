let result;

let cards;
let payload;

const start = () => {
    const players = [
        "Miss Scarlet",
        "Rev Green", 
        "Colonel Mustard",
        "Professor Plum",
        "Mrs Peacock",
        "Mrs White"
    ]
    
    const weapons = [
        "Candlestick",
        "Dagger",
        "Lead Pipe",
        "Revolver",
        "Rope",
        "Wrench"
    ]
    
    const rooms = [
        "Kitchen",
        "Ballroom", 
        "Conservatory",
        "Dining Room",
        "Billiard Room",
        "Library",
        "Lounge",
        "Hall",
        "Study"
    ]
    
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
        let randomWeaponNum = Math.floor(Math.random() * rooms.length)
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

select_card = () => {
    let randomCardNum = Math.floor(Math.random() * cards.length)
    let card = cards[randomCardNum];
    cards.splice(randomCardNum, 1);
    return card
}

const generatePlayerCode = () => {
    payload = {
        cards: [
            select_card(),
            select_card(),
            select_card()
        ],
        result
    }
    let code = btoa(JSON.stringify(payload))
    document.getElementById("code").value = code
}

const reveal = () => {
    document.getElementById("result").innerText += payload.result.murderer + " in the " + payload.result.room + " with the " + payload.result.weapon
}

const decodePlayerCode = () => {
    let code = document.getElementById("code").value;
    payload = JSON.parse(atob(code))

    document.getElementById("card1").innerText += payload.cards[0];
    document.getElementById("card2").innerText += payload.cards[1];
    document.getElementById("card3").innerText += payload.cards[2];
}