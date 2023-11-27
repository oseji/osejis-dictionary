import { useState, useEffect, useReducer, useRef } from "react";
import { motion } from "framer-motion";

function App() {
  const iconBook = (
    <svg
      class="w-6 h-6 text-gray-800 dark:text-white"
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
      class="w-6 h-6 text-gray-800 dark:text-white"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 18 20"
    >
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1, transition: { duration: 3 } }}
        stroke="#9EACAC"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M8.509 5.75c0-1.493.394-2.96 1.144-4.25h-.081a8.5 8.5 0 1 0 7.356 12.746A8.5 8.5 0 0 1 8.509 5.75Z"
      />
    </svg>
  );

  const iconSun = (
    <svg
      class="w-6 h-6 text-gray-800 dark:text-white"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        stroke="#9EACAC"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M10 3V1m0 18v-2M5.05 5.05 3.636 3.636m12.728 12.728L14.95 14.95M3 10H1m18 0h-2M5.05 14.95l-1.414 1.414M16.364 3.636 14.95 5.05M14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
      />
    </svg>
  );

  const iconPlay = (
    <svg
      class="w-6 h-6 text-gray-800 dark:text-white"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 16 18"
    >
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M1 1.984v14.032a1 1 0 0 0 1.506.845l12.006-7.016a.974.974 0 0 0 0-1.69L2.506 1.139A1 1 0 0 0 1 1.984Z"
      />
    </svg>
  );

  const iconPause = (
    <svg
      class="w-6 h-6 text-gray-800 dark:text-white"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 10 16"
    >
      <path
        fill-rule="evenodd"
        d="M0 .8C0 .358.32 0 .714 0h1.429c.394 0 .714.358.714.8v14.4c0 .442-.32.8-.714.8H.714a.678.678 0 0 1-.505-.234A.851.851 0 0 1 0 15.2V.8Zm7.143 0c0-.442.32-.8.714-.8h1.429c.19 0 .37.084.505.234.134.15.209.354.209.566v14.4c0 .442-.32.8-.714.8H7.857c-.394 0-.714-.358-.714-.8V.8Z"
        clip-rule="evenodd"
      />
    </svg>
  );

  const iconSearch = (
    <svg
      class="w-6 h-6 text-gray-800 dark:text-white"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 20"
    >
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1, transition: { duration: 3 } }}
        stroke="#E750E2"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
      />
    </svg>
  );

  const sliderBallRef = useRef(null);

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const [searchedWord, setSearchedWord] = useState("");
  const [pronunciation, setPronunciation] = useState(null);
  const [phonetics, setPhonetics] = useState("");

  const [iconTheme, setIconTheme] = useState(iconMoon);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${searchedWord}`
      );

      if (!response.ok) {
        throw new Error("Something went wrong with the response");
      }

      const data = await response.json();
      setData(data);
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
    console.log(sliderBall);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <header>
        <div className="iconBook">{iconBook}</div>

        <div className="headerGrp">
          <select name="" id="selectFonts">
            <option value="lorem">lorem</option>
            <option value="lorem">lorem</option>
            <option value="lorem">lorem</option>
            <option value="lorem">lorem</option>
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
        className="searchSection"
        onSubmit={(e) => {
          e.preventDefault();
          fetchData();
          //setHasSearched(true);
        }}
      >
        <input
          type="text"
          className="textInput"
          value={searchedWord}
          onChange={(e) => setSearchedWord(e.target.value)}
          onSubmit={() => {
            fetchData();
            setHasSearched(true);
          }}
        />
        <button className="searchBtn">{iconSearch}</button>
      </form>

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

          <motion.h1
            // initial={{ opacity: 0 }}
            // animate={{
            //   opacity: 1,
            //   transition: { duration: 1, repeat: Infinity, yoyo: Infinity },
            // }}
            className="text-4xl font-bold"
          >
            LOADING...
          </motion.h1>

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

      {searchedWord === "" && (
        <div className="loadingScreen">
          <h1 className="text-4xl font-bold">Search for a word</h1>
        </div>
      )}

      {!isLoading &&
        searchedWord !== "" &&
        data !== null &&
        data !== undefined && (
          <div className="resultsScreen">
            <div className="searchedWordGrp">
              <div>
                <h1 className="searchedWord">{searchedWord}</h1>
                <div className="phonetics">{phonetics}</div>
              </div>

              <button className="playSoundBtn">{iconPlay}</button>
            </div>

            {data.map((element, index) => (
              <div className="resultContainer" key={index}>
                {element.meanings.map((element, index) => (
                  <div className="loadedResult">
                    <h3 className="partOfSpeech" key={index}>
                      {element.partOfSpeech}
                    </h3>

                    <h3 className="resultSubHeading">Meaning</h3>

                    <ul className="definitionContainer" key={index}>
                      {element.definitions.map((element, index) => (
                        <li className="definition" key={index}>
                          {element.definition}
                        </li>
                      ))}
                    </ul>

                    <div className="synonymGrp">
                      <h3 className="resultSubHeading">Synonyms</h3>

                      <ul className="synonymsContainer" key={index}>
                        {element.synonyms.map((element, index) => (
                          <li className="synonym" key={index}>
                            {element}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}

                {/* <h3 className="resultSubHeading">Meaning</h3>

                {element.meanings.map((element, index) => (
                  <ul className="definitionContainer" key={index}>
                    {element.definitions.map((element, index) => (
                      <li className="definition" key={index}>
                        {element.definition}
                      </li>
                    ))}
                  </ul>
                ))} */}

                {/* <div className="synonymGrp">
                  <h3 className="resultSubHeading">Synonyms</h3>

                  {element.meanings.map((element, index) => (
                    <ul className="synonymsContainer" key={index}>
                      {element.synonyms.map((element, index) => (
                        <li className="synonym" key={index}>
                          {element}
                        </li>
                      ))}
                    </ul>
                  ))}
                </div> */}
              </div>
            ))}
          </div>
        )}

      {/* {!isLoading && (
        <div className="resultsScreen">
          <div className="searchedWordGrp">
            <div>
              <h1 className="searchedWord">{searchedWord}</h1>
              <div className="phonetics">{phonetics}</div>
            </div>

            <button className="playSoundBtn">{iconPlay}</button>
          </div>
        </div>
      )} */}
    </div>
  );
}

{
  /* <div className="searchedWordGrp">
            <div>
              <h1 className="searchedWord">{searchedWord}</h1>
              <div className="phonetics">{phonetics}</div>
            </div>

            <button className="playSoundBtn">{iconPlay}</button>
          </div>

          <div className="resultContainer" key={index}>
            <h3 className="partOfSpeech">{element.meanings.partOfSpeech}</h3>

            <h3 className="resultSubHeading">Meaning</h3>
            <ul className="definitionContainer">
              <li className="definition">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit,
                dignissimos!
              </li>
            </ul>
            <div className="synonymGrp">
              <h3 className="resultSubHeading">Synonyms</h3>
              <ul className="synonymsContainer">
                <li className="synonym">lorem</li>
              </ul>
            </div>
          </div> */
}

{
  /* {data.map((element, index) => (
            <div className="resultContainer" key={index}>
              <h3 className="partOfSpeech">{element.meanings.partOfSpeech}</h3>

              <h3 className="resultSubHeading">Meaning</h3>
              <ul className="definitionContainer">
                <li className="definition">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Odit, dignissimos!
                </li>
              </ul>
              <div className="synonymGrp">
                <h3 className="resultSubHeading">Synonyms</h3>
                <ul className="synonymsContainer">
                  <li className="synonym">lorem</li>
                </ul>
              </div>
            </div>
          ))} */
}

{
  /* <div className="resultContainer">
            <h3 className="partOfSpeech">noun</h3>

            <h3 className="resultSubHeading">Meaning</h3>
            <ul className="definitionContainer">
              <li className="definition">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit,
                dignissimos!
              </li>
            </ul>
            <div className="synonymGrp">
              <h3 className="resultSubHeading">Synonyms</h3>
              <ul className="synonymsContainer">
                <li className="synonym">lorem</li>
              </ul>
            </div>
          </div> */
}

export default App;
