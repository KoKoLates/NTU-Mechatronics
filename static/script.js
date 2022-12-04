let grabbed = false;
let complemented = false;

document.body.addEventListener('keydown', (event) => {
    console.log(event.key);
    changeKeyImages(event.key);
    const request = new XMLHttpRequest();
    request.open('POST', `/ProcessUserinfo/${JSON.stringify(event.key)}`);
    request.send();
})

document.body.addEventListener('keyup', (event) => {
    document.getElementById("move").src="/static/images/default.png";
})

function changeKeyImages(key) {
    let plus = document.getElementById("plus");
    let move = document.getElementById("move");
    let comp = document.getElementById("complemented");
    if(key === 'ArrowUp') {
        move.src="/static/images/up.png";
    }
    else if(key === 'ArrowLeft') {
        move.src="/static/images/left.png";
    }
    else if(key === 'ArrowDown') {
        move.src="/static/images/down.png";
    }
    else if(key === 'ArrowRight') {
        move.src="/static/images/right.png";
    }
    else if(key === '+') {
        grabbed ? ((plus.src="/static/images/release.png"), grabbed = false) :
        ((plus.src="/static/images/grab.png"), grabbed = true);
    }
    else if(key === 'c' || key === 'C') {
        complemented ? ((comp.src="/static/images/sunUnpress.png"), complemented = false) :
        ((comp.src="/static/images/sunPress.png"), complemented = true);
    }
}

function recieveSendInfo() {
    fetch('/ProcessSendinfo').then((response) => {
        let text = document.getElementById("temperature_text");
        response.json().then((data) => {
            data['data'] == "" ? text.innerHTML = "--" : text.innerHTML = data['data'];}) 
    });
}

setInterval(recieveSendInfo, 1000);
