import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

function App() {
  const iconBook = (
    <svg
      className="w-6 h-6 text-gray-800 dark:text-white"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 16 20"
    >
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1, transition: { duration: 3 } }}
        stroke="#9EACAC"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M1 17V2a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M5 15V1m8 18v-4"
      />
    </svg>
  );

  const iconMoon = (
    <svg
      className="w-6 h-6 text-gray-800 dark:text-white"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 18 20"
    >
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1, transition: { duration: 3 } }}
        stroke="#9EACAC"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M8.509 5.75c0-1.493.394-2.96 1.144-4.25h-.081a8.5 8.5 0 1 0 7.356 12.746A8.5 8.5 0 0 1 8.509 5.75Z"
      />
    </svg>
  );

  const iconSun = (
    <svg
      className="w-6 h-6 text-gray-800 dark:text-white"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 20"
    >
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1, transition: { duration: 3 } }}
        stroke="#9EACAC"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M10 3V1m0 18v-2M5.05 5.05 3.636 3.636m12.728 12.728L14.95 14.95M3 10H1m18 0h-2M5.05 14.95l-1.414 1.414M16.364 3.636 14.95 5.05M14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
      />
    </svg>
  );

  const iconPlay = (
    <svg
      className="w-6 h-6 text-gray-800 dark:text-white"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 16 18"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M1 1.984v14.032a1 1 0 0 0 1.506.845l12.006-7.016a.974.974 0 0 0 0-1.69L2.506 1.139A1 1 0 0 0 1 1.984Z"
      />
    </svg>
  );

  const iconSearch = (
    <svg
      className="w-6 h-6 text-gray-800 dark:text-white"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 20"
    >
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1, transition: { duration: 3 } }}
        stroke="#E750E2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
      />
    </svg>
  );

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
  // const [iconTheme, setIconTheme] = useState(iconSun);

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
        <div className="iconBook">{iconBook}</div>

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

            <div className="iconTheme">{iconTheme}</div>
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
          {iconSearch}
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
                {iconPlay}
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
