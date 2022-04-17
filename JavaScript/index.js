// <|================================================ SUGGETION SEARCH BOX =====================================|>
// getting all required elements
const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector(".icon");
let linkTag = searchWrapper.querySelector("a");
let webLink;

// if user press any key and release
inputBox.onkeyup = (e)=>{
    let userData = e.target.value; //user enetered data
    let emptyArray = [];
    if(userData){
        icon.onclick = ()=>{
            webLink = `https://www.google.com/search?q=${userData}`;
            linkTag.setAttribute("href", webLink);
            linkTag.click();
        }
        emptyArray = suggestions.filter((data)=>{
            //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
            return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
        });
        emptyArray = emptyArray.map((data)=>{
            // passing return data inside li tag
            return data = `<li>${data}</li>`;
        });
        searchWrapper.classList.add("active"); //show autocomplete box
        showSuggestions(emptyArray);
        let allList = suggBox.querySelectorAll("li");
        for (let i = 0; i < allList.length; i++) {
            //adding onclick attribute in all li tag
            allList[i].setAttribute("onclick", "select(this)");
        }
    }else{
        searchWrapper.classList.remove("active"); //hide autocomplete box
    }
}

function select(element){
    let selectData = element.textContent;
    inputBox.value = selectData;
    icon.onclick = ()=>{
        webLink = `https://www.google.com/search?q=${selectData}`;
        linkTag.setAttribute("href", webLink);
        linkTag.click();
    }
    searchWrapper.classList.remove("active");
}

function showSuggestions(list){
    let listData;
    if(!list.length){
        userValue = inputBox.value;
        listData = `<li>${userValue}</li>`;
    }else{
      listData = list.join('');
    }
    suggBox.innerHTML = listData;
}



// <|================================================ Infinite Scrooling =====================================|>

const container = document.querySelector(".container");

const URL = "https://dog.ceo/api/breeds/image/random";


// get the images
let count = 1;
function loadImages(numImages = 25) {
  let i = 0;
  while (i < numImages) {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then((response) => response.json())
      .then((data) => {
        let breed = (data.message.slice(30));
        let breedName ="";
        for(let i = 0; i < breed.length; i++) {
          if(breed[i]==="/"){
            break;
          }
          else{
            breedName += breed[i];
          }
        }
        console.log(breedName);
        const parentDiv = document.createElement("div");
        const img = document.createElement("img");
        const div = document.createElement("div");
        img.src = `${data.message}`;
        count++;
        if(count%2===0){
            img.setAttribute("id", 'card-img-even');
        }
        else{
            img.setAttribute("id", 'card-img-odd');
        }
        div.appendChild(img);
        const bottomDiv = document.createElement("div");
        bottomDiv.textContent = "Breed : " + breedName;
        div.append(bottomDiv);
        parentDiv.appendChild(div)
        container.appendChild(parentDiv);
      });
    i++;
  }
}

loadImages();

// If the sum of scrollY and innerHeight is greater or equal to the scrollHeight,
//  it means we have reached the end of the document, and we need to load more images.
// listen for scroll event and load more images if we reach the bottom of window
window.addEventListener("scroll", () => {
  console.log("scrolled", window.scrollY); //scrolled from top
  console.log(window.innerHeight); //visible part of screen
  if(window.scrollY + window.innerHeight >= document.documentElement.scrollHeight){
    loadImages();
  }
});