
//"'images\G42.png', 'images\H52.png', 'images\J62.png', 'images\K72.png', 'images\L82.png'"

var SRCdata = []

function UpdateArray() {
    document.querySelector(".image-area").innerHTML = ""
  var ListOfSources = SRCdata
  console.log(ListOfSources)

  for (let i = 0; i < ListOfSources.length; i++) {
    var imageCode = ListOfSources[i].match(/\/(...)\./)[1]
    console.log(ListOfSources[i])

    var newImage = document.createElement('img');
    newImage.src = "../../" + ListOfSources[i];
    newImage.classList.add('block');
    newImage.id = imageCode;
  
    var newTitle = document.createElement('div');
    newTitle.textContent = imageCode;
    newTitle.classList.add('block-title');
    
    document.querySelector(".image-area").appendChild(newTitle);
    document.querySelector(".image-area").appendChild(newImage);
  }
}