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

      
      const getMax = () => { 
        let max = 0
        data.forEach((dt) => {
            max = dt.Kilo
        })
        return max
      }

      // Food Waste Average Bar display
      // Before bar animation (might have to delete later)
      d3.select('#BarChart').selectAll('div').data(data) 
      .enter().append('div').classed('bar', true).style('height', `${(getMax()*20)+150 }px`)
  
      // After bar animation 
      d3.select('#BarChart').selectAll('.bar')
      .transition().duration(1000).style('height', bar => `${(bar.Kilo*20)+150}px`)
        .style('width', '80px').style('margin-right', '10px').delay(300) // Fix their width and margin

    });
    return () => undefined;
  }, [])
  
  return (
    <div className="App">
      <body>
        <h3>Bar Chart of Food Waste Weight Average (Kilo)</h3>
        <div id="BarChart"></div>
        <div id="pgraphs"></div>
      </body>
    </div>
  );
}

export default App;
