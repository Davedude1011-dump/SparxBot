var SearchBar = document.querySelector(".search-bar-search")
var LastSearched = {
    Item: ""
}

SearchBar.addEventListener("input", function (e) {
    var SearchBarValue = e.target.value.toUpperCase();
    var MatchingElements = Array.from(document.querySelectorAll('[id*="' + SearchBarValue + '"]'));
    MatchingElements.forEach(element => {
        if (MatchingElements.length == 1) {
            console.log(element)
            scrollToElement(element)

            if (LastSearched.Item != "") { LastSearched.Item.style.outline = "none" }
            element.style.outline = "3px solid black"
            element.style.borderRadius = "5px"
            LastSearched.Item = element
        }
    });
    if (MatchingElements.length == 0) {
        if (LastSearched.Item != "") { LastSearched.Item.style.outline = "none" }
    }
})

function scrollToElement(element) {
    try {
        if (element) {
          var elementRect = element.getBoundingClientRect();
          var bodyRect = document.body.getBoundingClientRect();
          
          var scrollY = elementRect.top - (window.innerHeight / 2) + (elementRect.height / 2);
          var scrollX = elementRect.left - (window.innerWidth / 2) + (elementRect.width / 2);
          
          window.scrollTo({
            top: scrollY,
            left: scrollX,
            behavior: 'smooth'
          });
        } else {
          console.log("Element not found: " + element);
        }
    }
    catch (e) {
        console.log(e)
    }
      
  }
  
  // Usage example:
  scrollToElement('myElementId');

function DeleteImages() {
    var ElementToBeFoundByPython = document.createElement("div");
    ElementToBeFoundByPython.classList.add("delete-all-images-please");
    document.body.appendChild(ElementToBeFoundByPython)
}