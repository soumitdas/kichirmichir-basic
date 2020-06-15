const form = document.getElementById('form')
const container = document.getElementById('postContainer')
const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('pid');
const url = "https://jsonbox.io/844bbad7_2772_467b_bf70_dbb529001cbf/" + myParam
//console.log(myParam)


if(!!myParam){
    getTweet()
}
else {
    container.innerHTML = `<h1 class="title has-text-centered">
    Something went wrong
    </h1><h2 class="subtitle has-text-centered">
    Back to <a href="https://kichirmichir.vercel.app/">Home</a>
    </h2>`
}


async function getTweet() {
    try {
        let response = await fetch(url)
        let result = await response.json()
        addDataToDOM(result)
    }   catch (err) {
        console.log(err)
    }
}
function addDataToDOM(data) {
    const link = window.location.href
    //const fblink = "https://www.facebook.com/sharer/sharer.php?u=" + link
    const whatsapplink = "whatsapp://send?text=" + encodeURI("Check out my recent post at Kichir Michir " + link)
    const postElement = document.createElement('div')
    postElement.classList.add('box')
    postElement.classList.add('py-5')
    postElement.classList.add('px-5')
    let tweetElement = `
    <div class="columns is-gapless">
    <div class="column is-10">
    <h5 class="title is-5 px-0 py-0">${data.name}</h5>
    </div>
    <div class="column">
    <h6 class="subtitle is-6 px-0 py-0">${data.timestamp}</h6>
    </div>
    </div>
    <p class="content is-medium">${data.text}</p>
    <div class="tags">
    `
    let tag = data.tags.split(/[ ,]+/).filter(Boolean)
    for (key in tag) {
        tweetElement += `
            <span class="tag is-primary is-light">${tag[key]}</span>
        `
    }
    tweetElement += `</div>
    <p class="buttons">
    <a href="${whatsapplink}" class="button is-success">
        <span class="icon">
        <i class="fa fa-whatsapp"></i>
        </span>
    </a>
    </p>
    `
    postElement.innerHTML = tweetElement
    container.appendChild(postElement)
    document.title = `${data.name} | Kichir Michir`        
}

