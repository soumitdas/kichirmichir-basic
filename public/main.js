const form = document.getElementById('form')
const url = "https://jsonbox.io/box_149fe061b9cb5e4a9b3d"
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
    if (!data.name) {
        data.name = "Anonymous"
    }
    if (!data.tags) {
        data.tags = "notag"
    }
    try {
        let response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
        let result = await response.json()
        postSuccess('Posted successfully. Please refresh to view your post')
    }   catch (err) {
        console.log(err)
        postSuccess('Sorry, something went wrong!')
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
function postSuccess(msg) {
    form.reset()
    formContainer.innerHTML = `<div class="notification is-success is-light">
        <button class="delete"></button>
        ${msg}</div>`
    document.querySelectorAll('.notification .delete').forEach(($delete) => {
        $notification = $delete.parentNode;
        $delete.addEventListener('click', () => {
          $notification.parentNode.removeChild($notification)
        });
      });
}
