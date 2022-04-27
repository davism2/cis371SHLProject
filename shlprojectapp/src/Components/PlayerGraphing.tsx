import { ChangeEvent, useEffect, useState } from "react";
import React from "react";
import "../App.css";
import axios, { AxiosResponse } from "axios";
import { PlayerStats } from "../datatypes";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid } from "recharts";

function PlayerGraphing() {
  const [goals, setGoals] = useState([] as PlayerStats[]);
  const [playerID, setPlayerID] = useState("700");

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
        setGoals(r);
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

        <ScatterChart width={400} height={400}>
          <CartesianGrid />
          <XAxis
            type="number"
            dataKey="season"
            domain={[56, 65]}
            label={{
              value: "Season",
              position: "insideBottom",
              offset: 0,
            }}
          />
          <YAxis
            type="number"
            dataKey="goals"
            label={{ value: "Goals", angle: -90, position: "insideLeft" }}
          />
          <Scatter data={goals} fill="green" />
        </ScatterChart>
      </div>

      {/* <table>
        <tr>
          <th>Season</th>
          <th>Team</th>
          <th>Name</th>
          <th>Goals</th>
        </tr>
        {goals.map((val, pos) => (
          <tr key={pos}>
            <td>{val.season}</td>
            <td>{val.team}</td>
            <td>{val.name}</td>
            <td>{val.goals}</td>
          </tr>
        ))}
      </table> */}
    </>
  );
}

export default PlayerGraphing;
