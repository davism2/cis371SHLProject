import { useEffect, useState } from "react";
import React from "react";
import "../App.css";
import axios, { AxiosResponse } from "axios";
import { top10Skater } from "../datatypes";

function Top10() {
  useEffect(() => {
    console.log("Mounting Dom!");
    getGoals();
  });

  const getGoals = () => {
    axios
      .request({
        method: "GET",
        url: "https://index.simulationhockey.com/api/v1/leaders/skaters/goals",
      })
      .then((r: AxiosResponse) => r.data)
      .then((r: top10Skater) => {
        console.log(r);
      });
  };

  return (
    <>
      <h1>Hello!</h1>
    </>
  );
}

export default Top10;
