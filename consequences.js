let payload;

const decode = () => {
    let code = document.getElementById("code").value

    payload = JSON.parse(atob(code))

    switch(payload.state){
        case 0: 
            document.getElementById("text").innerHTML = "Her name was..."
            document.getElementById("input").placeholder = "Enter her name in here and click submit and pass the code to the next player..."
            break;
        case 1:
            document.getElementById("text").innerHTML = "They met at..."
            document.getElementById("input").placeholder = "Enter where they met in here and click submit and pass the code to the next player..."
            break;
        case 2:
            document.getElementById("text").innerHTML = "He said..."
            document.getElementById("input").placeholder = "Enter what he said in here and click submit and pass the code to the next player..."
            break;
        case 3:
            document.getElementById("text").innerHTML = "She said..."
            document.getElementById("input").placeholder = "Enter what she said in here and click submit and pass the code to the next player..."
            break;
        case 4:
            document.getElementById("text").innerHTML = "The consequence was..."
            document.getElementById("input").placeholder = "Enter what the consequence was in here and click submit and pass the code to the next player..."
            break; 
        case 5:
            document.getElementById("text").innerHTML = `His name was ${payload.hisName} and her name was ${payload.herName}, they met at ${payload.whereMet}, he said ${payload.heSaid} and she said ${payload.sheSaid} and the consequence was ${payload.consequence}`
            document.getElementById("input").placeholder = "Enter what he said in here and click submit and pass the code to the next player to begin again..."
            break;
    }

    document.getElementById("code").value = ""
    document.getElementById("outputCode").innerHTML = "";
}

const submit = () => {
    let text = document.getElementById("input").value
    if (payload === undefined){
        payload = {
            state: 0,
            hisName: text
        }
    }
    else{ 
        switch(payload.state){
            case 0: 
                payload.herName = text;
                payload.state++;
                break;
            case 1: 
                payload.whereMet = text;
                payload.state++;
                break;
            case 2: 
                payload.heSaid = text;
                payload.state++;
                break;
            case 3:
                payload.sheSaid = text;
                payload.state++;
                break;
            case 4:
                payload.consequence = text;
                payload.state++;
        }
    }

    let code = btoa(JSON.stringify(payload))

    document.getElementById("input").value = ""
    document.getElementById("outputCode").innerHTML = code;
}