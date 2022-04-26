import { useEffect, useState } from "react";
import React from "react";
import "../App.css";
import axios, { AxiosResponse } from "axios";
import { top10Skater } from "../datatypes";

function Top10() {
  const [goals, setGoals] = useState([] as top10Skater[]);
  const [assists, setAssists] = useState([] as top10Skater[]);

  useEffect(() => {
    console.log("Mounting Dom!");
    getGoals();
    getAssists();
  }, []);

  const getGoals = () => {
    axios
      .request({
        method: "GET",
        url: "https://index.simulationhockey.com/api/v1/leaders/skaters/goals",
      })
      .then((r: AxiosResponse) => r.data)
      .then((r: top10Skater[]) => {
        setGoals(r);
      });
  };

  const getAssists = () => {
    axios
      .request({
        method: "GET",
        url: "https://index.simulationhockey.com/api/v1/leaders/skaters/assists",
      })
      .then((r: AxiosResponse) => r.data)
      .then((r: top10Skater[]) => {
        setAssists(r);
      });
  };

  return (
    <>
      <table>
        <tr>
          <th>Name</th>
          <th>Team</th>
          <th>Goals</th>
        </tr>
        {goals.map((val, pos) => (
          <tr key={pos}>
            <td>{val.name}</td>
            <td>{val.team.abbr}</td>
            <td>{val.stat}</td>
          </tr>
        ))}
      </table>

      <table>
        <tr>
          <th>Name</th>
          <th>Team</th>
          <th>Assists</th>
        </tr>
        {assists.map((val, pos) => (
          <tr key={pos}>
            <td>{val.name}</td>
            <td>{val.team.abbr}</td>
            <td>{val.stat}</td>
          </tr>
        ))}
      </table>
      <h1>Hello!</h1>
    </>
  );
}

export default Top10;
