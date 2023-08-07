"use strict";

const screen = document.getElementsByTagName("body")[0];

const logo = document.querySelector(".logo");
const searchBtn = document.querySelector(".search");
const themeIcon = document.querySelector(".themeIcon");
const fontSelection = document.getElementById("font");
const fontOptions = document.getElementsByTagName("option");

const word = document.querySelector(".inputText");
const searchedWordTitle = document.querySelector(".searchedWordTitle");
const displayWord = document.querySelector(".searchedWord");
const displayPhonetics = document.querySelector(".phonetics");
const playMusicBtn = document.querySelector(".playBtn");
const audio = document.querySelector(".audio");

let apiSearchWord;

console.log(fontOptions);

//CODE
//
//
//CHANGING FONTS
fontSelection.addEventListener("change", (e) => {
  console.log(fontSelection.value);
  if (fontSelection.value == "Nunito") {
    screen.classList.add("fontNunito");
    screen.classList.remove("fontPlayfair");
    screen.classList.remove("fontSlab");
    screen.classList.remove("fontMono");
  }
  if (fontSelection.value == "Playfair") {
    screen.classList.add("fontPlayfair");
    screen.classList.remove("fontSlab");
    screen.classList.remove("fontNunito");
    screen.classList.remove("fontMono");
  }
  if (fontSelection.value == "slab") {
    screen.classList.add("fontSlab");
    screen.classList.remove("fontNunito");
    screen.classList.remove("fontPlayfair");
    screen.classList.remove("fontMono");
  }
  if (fontSelection.value == "mono") {
    screen.classList.add("fontMono");
    screen.classList.remove("fontNunito");
    screen.classList.remove("fontPlayfair");
    screen.classList.remove("fontSlab");
  }
});

//
//
//SWITCHING THEMES
themeIcon.addEventListener("click", () => {
  console.log("clicked");
  screen.classList.toggle("darkMode");
  screen.classList.toggle("lightMode");

  if (screen.classList.contains("darkMode")) {
    themeIcon.src = `/images/sun.png`;
    logo.src = `/images/book-darkMode.png`;
    screen.style.color = "white";
    word.style.color = "black";
  } else {
    themeIcon.src = `/images/moon-light.png`;
    logo.src = `/images/book-light.png`;
    screen.style.color = "black";
  }
});

//
//
//SEARCHING FOR A WORD
searchBtn.addEventListener("click", function () {
  console.log("clicked");

  apiSearchWord = word.value;
  console.log(apiSearchWord);

  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${apiSearchWord}`)
    .then((res) => {
      console.log(res);

      if (!res.ok) {
        displayWord.textContent = `${apiSearchWord} not found`;
        displayPhonetics.textContent = `not found`;
        throw new Error(`${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      const [info] = data;
      console.log(info);

      displayWord.textContent = `${info.word}`;
      displayPhonetics.textContent = `${info.phonetic}`;

      info.meanings.forEach((text) => {
        //console.log(text);
        const html = `
          <div class="searchedResult">
            <h1 class="partOfSpeech">${text.partOfSpeech}</h1>
              <div class="meaningGrp">
                <h1 class="meaningHeading">meaning</h1>
                  <ul class="meaningsList">
                    <li class="meaning">
                      ${text.definitions[0].definition}
                    </li>
                  </ul>

                  <div class="synonymsGrp">
                    <h1 class="synonymHeading">Synonyms</h1>
                    <p class="synonyms">${text.synonyms[0]}</p>
                  </div>
              </div>
          </div>`;

        searchedWordTitle.insertAdjacentHTML("afterend", html);
      });

      //playing audio of the searched word
      audio.src = `${info.phonetics[0].audio}`;
      // console.log(info.phonetics[0].audio);
      // console.log(audio.src);
      playMusicBtn.addEventListener("click", () => {
        audio.play();
      });
    })
    .catch((err) => console.error(err));
});
