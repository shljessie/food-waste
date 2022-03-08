import './App.css';

import * as d3 from 'd3';

import {useEffect, useState} from 'react'

import React from "react";
import foodWeight from './data/foodWeight.csv'

d3.csv(foodWeight, function(foodWeight) { console.log(foodWeight); });


function App() {
  let data;
  React.useEffect(() => {
    d3.csv(foodWeight).then((d) => {
      console.log(d)
      data=d;
      console.log(data)
      
      d3.select('#pgraphs').selectAll('p').data(data).enter().append('p').text(dt => dt.Commodity + ": " + dt.Kilo)
    });
    return () => undefined;

  }, [])
  
  return (
    <div className="App">
      <body>
        <div id="pgraphs"></div>
      </body>
    </div>
  );
}

export default App;
