/* eslint-disable consistent-return */
import React, { useEffect, useState } from "react";
import { levelStatesMethods } from "../../contexts/level-state-context";
import { firebaseMethods } from "../../contexts/firebase-context";
import { getTimerMethods } from "../../contexts/timer-context";
import RenderHighScore from "./components/render-scoreboard";
import RenderImage from "./components/render-image/render-image";
import PickIndicator from "../pick-indicator/pick-indicator";
import RenderTimer from "./components/render-timer";

function RenderLevel()
{
  const { selectedLevel } = levelStatesMethods();

  const { fetchSelectedLevelData } = firebaseMethods();

  const { startTimer } = getTimerMethods();

  const [levelData, setLevelData] = useState();

  const [isPageLoaded, setIsPageLoaded] = useState(false);

  const getData = async () =>
  {
    await fetchSelectedLevelData("Game data", selectedLevel)
      .then((res) => setLevelData(res))
      .catch((err) => console.log(err));
  };

  useEffect(() =>
  {
    getData();
  }, []);

  useEffect(() =>
  {
    if (isPageLoaded) return startTimer();
  }, [isPageLoaded]);

  return (
    <div>
      {
        levelData
          ? (
            <>
              <RenderHighScore />
              <RenderImage
                levelData={levelData}
                setIsPageLoaded={setIsPageLoaded}
              />
              <div className="sidebar">
                <PickIndicator levelData={levelData} />
                <RenderTimer />
              </div>
            </>
          )
          : <h1>Loading...</h1>
      }
    </div>
  );
}

export default RenderLevel;
