import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

import iconBook from "./assets/iconBook.svg";
import iconSearch from "./assets/iconSearch.svg";
import iconPlay from "./assets/iconPlay.svg";
import iconMoon from "./assets/iconMoon.svg";
import iconSun from "./assets/iconSun.svg";

function App() {
  const AppRef = useRef(null);
  const audioRef = useRef(null);
  const sliderBallRef = useRef(null);

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const [searchedWord, setSearchedWord] = useState("");
  const [audioUrl, setAudioUrl] = useState(null);
  const [phonetics, setPhonetics] = useState("");

  const [isThemeToggled, setIsThemeToggled] = useState(false);
  const iconTheme = isThemeToggled ? iconMoon : iconSun;

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${searchedWord}`
      );

      if (!response.ok) {
        throw new Error("Word not found...");
      }

      const data = await response.json();
      setData(data);
      setAudioUrl(data[0].phonetics[0].audio);
      setPhonetics(data[0].phonetic);
      setApiError(null);

      console.log(data);
    } catch (error) {
      //alert(error);
      setApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTheme = () => {
    const sliderBall = sliderBallRef.current;
    sliderBall.classList.toggle("animateBall");

    isThemeToggled ? setIsThemeToggled(false) : setIsThemeToggled(true);
  };

  const toggleFont = (e) => {
    const App = AppRef.current;

    if (e.target.value === "roboto") {
      App.classList.add("font-roboto");
      App.classList.remove("font-playfair");
      App.classList.remove("font-raleway");
      App.classList.remove("font-poppins");
    }
    if (e.target.value === "playfair") {
      App.classList.add("font-playfair");
      App.classList.remove("font-roboto");
      App.classList.remove("font-raleway");
      App.classList.remove("font-poppins");
    }
    if (e.target.value === "raleway") {
      App.classList.add("font-raleway");
      App.classList.remove("font-playfair");
      App.classList.remove("font-roboto");
      App.classList.remove("font-poppins");
    }
    if (e.target.value === "poppins") {
      App.classList.add("font-poppins");
      App.classList.remove("font-playfair");
      App.classList.remove("font-raleway");
      App.classList.remove("font-roboto");
    }
  };

  const toggleAudio = () => {
    const audioPlayer = audioRef.current;
    if (audioPlayer.paused) {
      audioPlayer.play();
    } else {
      audioPlayer.pause();
    }
  };

  return (
    <div
      className={`App font-roboto ${isThemeToggled ? "darkMode" : "lightMode"}`}
      ref={AppRef}
    >
      <header>
        <img src={iconBook} alt="book icon" className="icon" />

        <div className="headerGrp">
          <select name="" id="selectFonts" onClick={toggleFont}>
            <option value="roboto">Roboto</option>
            <option value="raleway">Raleway</option>
            <option value="playfair">Playfair</option>
            <option value="poppins">Poppins</option>
          </select>

          <div className="themeGrp">
            <div className="slider" onClick={toggleTheme}>
              <div className="ball" ref={sliderBallRef}></div>
            </div>

            <img src={iconTheme} alt="theme icon" className="icon" />
          </div>
        </div>
      </header>

      <form
        className={`searchSection ${
          isThemeToggled ? "bg-white" : "bg-slate-200"
        }`}
        onSubmit={(e) => {
          e.preventDefault();
          fetchData();
        }}
      >
        <input
          type="text"
          className="textInput"
          value={searchedWord}
          onChange={(e) => setSearchedWord(e.target.value)}
        />
        <button className="searchBtn" onClick={fetchData}>
          <img src={iconSearch} className="icon" alt="search icon" />
        </button>
      </form>

      {/* IF API DATA IS LOADING */}
      {isLoading && (
        <div className="loadingScreen">
          <motion.div
            animate={{
              x: [-40, 40],
              y: [50, -10, 50],
              transition: {
                duration: 1,
                repeat: "Infinity",
                repeatType: "mirror",
                yoyo: Infinity,
              },
            }}
            className="loadingBall mb-10"
          ></motion.div>

          <motion.h1 className="text-4xl font-bold">LOADING...</motion.h1>

          <motion.div
            animate={{
              x: [40, -40],
              y: [-50, 10, -50],
              transition: {
                duration: 1,
                repeat: "Infinity",
                repeatType: "mirror",
                yoyo: Infinity,
              },
            }}
            className="loadingBall mt-10"
          ></motion.div>
        </div>
      )}

      {/* IF INPUT FIELD IS EMPTY */}
      {searchedWord === "" && (
        <div className="loadingScreen">
          <h1 className="text-4xl font-bold">Search for a word</h1>
        </div>
      )}

      {/* IF SEARCHED WORD IS NOT FOUND */}
      {apiError !== null && (
        <div className="loadingScreen">
          <h1 className="text-4xl font-bold">Word not found</h1>
        </div>
      )}

      {/* IF WORD HAS BEEN SEARCHED FOR AND DATA IS FINISHED LOADING */}
      {!isLoading &&
        searchedWord !== "" &&
        data !== null &&
        data !== undefined &&
        apiError === null && (
          <div className="resultsScreen">
            <div className="searchedWordGrp">
              <div>
                <h1 className="searchedWord">{searchedWord}</h1>
                <div className="phonetics">{phonetics}</div>
              </div>

              <audio ref={audioRef} src={audioUrl} />

              <button className="playSoundBtn" onClick={toggleAudio}>
                <img src={iconPlay} alt="play icon" className="icon" />
              </button>
            </div>

            {data.map((element, index) => (
              <div className="resultContainer" key={index}>
                {element.meanings.map((meaning, index) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.5 },
                    }}
                    className="loadedResult"
                    key={index}
                  >
                    <h3 className="partOfSpeech" key={index}>
                      {meaning.partOfSpeech}
                    </h3>

                    <h3 className="resultSubHeading">Meaning</h3>

                    <ul className="definitionContainer" key={index}>
                      {meaning.definitions.map((element, index) => (
                        <li className="definition" key={index}>
                          {element.definition}
                        </li>
                      ))}
                    </ul>

                    <div className="synonymGrp">
                      <h3 className="resultSubHeading">Synonyms</h3>

                      <ul className="synonymsContainer" key={index}>
                        {meaning.synonyms.map((element, index) => (
                          <li className="synonym" key={index}>
                            {element}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            ))}
          </div>
        )}
    </div>
  );
}

export default App;
