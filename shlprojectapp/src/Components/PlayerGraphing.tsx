import { ChangeEvent, useEffect, useState } from "react";
import React from "react";
import "../App.css";
import axios, { AxiosResponse } from "axios";
import { PlayerStats } from "../datatypes";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid } from "recharts";

function PlayerGraphing() {
  const [playerData, setPlayerData] = useState([] as PlayerStats[]);
  const [playerID, setPlayerID] = useState("700");
  const [playerName, setPlayerName] = useState("");

  useEffect(() => {
    console.log("Mounting Dom!");
    getGoals();
  }, []);

  const getGoals = () => {
    axios
      .request({
        method: "GET",
        url:
          "https://index.simulationhockey.com/api/v1/players/stats/" + playerID,
      })
      .then((r: AxiosResponse) => r.data)
      .then((r: PlayerStats[]) => {
        console.log(r);
        setPlayerData(r);
        setPlayerName(r[0].name);
      });
  };

  function updatePlayerID(ev: ChangeEvent<HTMLInputElement>) {
    setPlayerID(ev.target.value);
    getGoals();
  }

  return (
    <>
      <div>
        <input
          type="number"
          placeholder="Enter Player ID"
          onBlur={updatePlayerID}
        />
        <body>{playerName}</body>
        <ScatterChart width={400} height={400}>
          <CartesianGrid />
          <XAxis
            type="number"
            dataKey="season"
            domain={[52, 64]}
            label={{
              value: "Season",
              position: "insideBottom",
              offset: 0,
            }}
            // tickCount={goals.length + 2}
          />
          <YAxis
            type="number"
            dataKey="goals"
            label={{ value: "Goals", angle: -90, position: "insideLeft" }}
            tickCount={6}
          />
          <Scatter data={playerData} fill="green" />
        </ScatterChart>
      </div>
    </>
  );
}

export default PlayerGraphing;
