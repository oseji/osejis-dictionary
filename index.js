"use strict";

const screen = document.getElementsByTagName("body")[0];

const logo = document.querySelector(".logo");
const searchBtn = document.querySelector(".search");
const themeIcon = document.querySelector(".themeIcon");
const fontSelection = document.querySelector(".fontSelection");

const word = document.querySelector(".inputText");
const searchedWordTitle = document.querySelector(".searchedWordTitle");
const displayWord = document.querySelector(".searchedWord");
const displayPhonetics = document.querySelector(".phonetics");
const playMusicBtn = document.querySelector(".playBtn");

let apiSearchWord;

console.log(screen);

//CODE
//
//
//SWITCHING THEMES
themeIcon.addEventListener("click", () => {
  console.log("clicked");
  screen.classList.toggle("darkMode");
  screen.classList.toggle("lightMode");

  if (screen.classList.contains("darkMode")) {
    themeIcon.src = `/images/moon-darkMode.png`;
    logo.src = `/images/book-darkMode.png`;
    screen.style.color = "white";
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

      if (!res.ok) throw new Error(`${res.status}`);
      return res.json();
    })
    .then((data) => {
      const [info] = data;
      console.log(info);

      displayWord.textContent = `${info.word}`;
      displayPhonetics.textContent = `${info.phonetic}`;

      info.meanings.forEach((text) => {
        console.log(text);
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
    })
    .catch((err) => console.error(err));
});
