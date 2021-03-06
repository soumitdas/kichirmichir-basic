const form = document.getElementById('form')
const url = 'https://jsonbox.io/844bbad7_2772_467b_bf70_dbb529001cbf'
const container = document.getElementById('postContainer')
const formContainer = document.getElementById('notificationshow')
getTweet()

form.addEventListener('submit',function(e){
    e.preventDefault();

    let name = document.getElementById('name').value
    let text = document.getElementById('text').value
    let tags = document.getElementById('tags').value

    let post = {
        name: name,
        text: text,
        tags: tags,
        timestamp: new Date().toLocaleString()
    }
    postTweet(post)
})
async function postTweet(data) {
    try {
        let response = await fetch('/api/post', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
        let result = await response.json()
        postSuccess(true, 'Posted successfully, the page will reload.....')
    }   catch (err) {
        console.log(err)
        postSuccess(false, 'Sorry, something went wrong!')
    }
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
    for(key in data){
        const link = window.location.href + "post/?pid=" + data[key]._id
        //const fblink = "https://www.facebook.com/sharer/sharer.php?u=" + link
        const whatsapplink = "whatsapp://send?text=" + encodeURI("Check out my recent post at Kichir Michir " + link)
        const postElement = document.createElement('div')
        postElement.classList.add('box')
        postElement.classList.add('py-5')
        postElement.classList.add('px-5')
        let tweetElement = `
        <div class="columns is-gapless">
        <div class="column is-10">
        <h5 class="title is-5 px-0 py-0">${data[key].name}</h5>
        </div>
        <div class="column">
        <h6 class="subtitle is-6 px-0 py-0">${data[key].timestamp}</h6>
        </div>
        </div>
        <p class="content is-medium">${data[key].text}</p>
        <div class="tags">
        `
        let tag = data[key].tags.split(/[ ,]+/).filter(Boolean)
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
        <a href="${link}" class="button is-link">Link</a>
        </p>
        `
        postElement.innerHTML = tweetElement
        container.appendChild(postElement);        
    }	
}
function postSuccess(status, msg) {
    form.reset()
    formContainer.innerHTML = `<div class="notification is-success is-light">
        <button class="delete"></button>
        ${msg}</div>`
    if (status) { setTimeout(() => window.location.reload(),2000) }
    document.querySelectorAll('.notification .delete').forEach(($delete) => {
        $notification = $delete.parentNode;
        $delete.addEventListener('click', () => {
          $notification.parentNode.removeChild($notification)
        });
      });
}
