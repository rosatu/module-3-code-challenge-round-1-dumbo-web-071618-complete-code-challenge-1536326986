document.addEventListener('DOMContentLoaded', function() {

  const imageId = 83

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const imgContainer = document.getElementById("image_content")

  fetch(`${imageURL}`)
  .then(r=> r.json())
  .then(data =>{
    imgContainer.append(insertInfoIntoImgCard(data))
  })

function insertInfoIntoImgCard(image){
  let imgCard = document.createElement("div")
  imgCard.classList.add("my-beautiful-image")
  imgCard.dataset.id = image.id
  let myImg = document.createElement("img")
  myImg.src = image.url
  let myName = document.createElement("h1")
  myName.innerText = image.name
  let myLikes = document.createElement("h2")
  myLikes.innerText = image.like_count
  let likeButton = document.createElement("BUTTON")
  likeButton.classList.add("my-beautiful-button")
  likeButton.innerText = "Do you like this image? If so, click here"
  let myComments = document.createElement("div")
  image.comments.forEach(commentObj =>{
    let commentLi = document.createElement("LI")
     commentLi.innerText = commentObj.content
     myComments.append(commentLi)
  })
  imgCard.append(myImg, myName, myLikes, myComments, likeButton)
  return imgCard
}


document.addEventListener("click", (e) => {
  if(e.target.classList.contains("my-beautiful-button")){
      let parent = e.target.parentNode
      fetch(`${imageURL}`,{
        method: "PATCH",
        headers:{ 'Accept': 'application/json',
            'Content-Type': 'application/json'},
        body: JSON.stringify({
          like_count: parseInt(`${parent.children[2].innerText}`) + 1
        })
      })
      .then(r=> r.json())
      .then()
  }
})

//data => parent.children[2].innerText = data.like_count

})
