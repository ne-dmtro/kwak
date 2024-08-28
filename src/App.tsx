import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "./components/Button";
import { DuckIcon } from "./components/icons";
import pondImage from "./pond.png";
import "./App.scss";

function App() {
  const [searchParams] = useSearchParams();
  const quack = searchParams.get('quack');

  const [sound, setSound] = useState(quack);

  const makeMusicMove = () => {
    const ducks = document.getElementsByClassName("duck__sound");
    const ducksArray = Array.from(ducks) as HTMLElement[];

    ducksArray.forEach((duck) => {
      const XYPosition = { x: 0, y: -50 };

      duck.style.setProperty("--final-x", `${XYPosition.x}px`);
      duck.style.setProperty("--final-y", `${XYPosition.y}px`);

      duck.classList.add("sound-animation");

      duck.addEventListener("animationend", () => {
        duck.classList.remove("sound-animation");
      });
    });
  };

  const makeSound = () => {
    const quackSound = document.getElementById(
      "quackSound"
    ) as HTMLAudioElement | null;

    if (quackSound) {
      quackSound.play();
      makeMusicMove();
    }
  };

  return (
    <div className="App">
      <header className="App-header"></header>
      <main>
        <div className="inputBox">
          <label>
            Type the QUAK meaning here:
            <input
              type="text"
              value={sound || "🎶💋"}
              onChange={(e) => setSound(e.target.value)}
            />
          </label>
        </div>

        <section>
          <div className="container">
            <img src={pondImage} className="pond" alt="pond" />

            {Array(5)
              .fill(0)
              .map((duck, indexDuck) => (
                <div key={indexDuck} className={`duck duck--${indexDuck + 1}`}>
                  <DuckIcon className={`duck__icon--${indexDuck + 1}`} />
                  {Array(1)
                    .fill(0)
                    .map((_, index) => (
                      <span
                        key={index}
                        className={`duck__sound duck__sound--${indexDuck + 1}`}
                      >
                        {sound}
                      </span>
                    ))}
                </div>
              ))}

            <div className="buttonContainer">
              <Button handleClick={makeSound} />
            </div>
          </div>

          <audio id="quackSound" src="quack.mp3" preload="auto"></audio>
        </section>
      </main>
    </div>
  );
}

export default App;
