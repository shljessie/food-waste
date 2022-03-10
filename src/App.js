import './App.css';

import * as d3 from 'd3';

import {useEffect, useState} from 'react'

import React from "react";
import foodWeight from './data/foodWeight.csv'
import rd3 from 'react-d3-library';

const BarChart = rd3.BarChart;

function App() {
  let data;
  let foodCat = [];
  let foodKilo = [];

  
  React.useEffect(() => {
    d3.csv(foodWeight).then((d) => {
      // console.log(d)
      data=d;
      // console.log(data)
      
      d3.select('#pgraphs').selectAll('p').data(data).enter().append('p').text(dt => dt.Commodity + ": " + dt.Kilo)

      for (let i = 0; i < data.length; i++) {
        foodCat.push(data[i].Commodity);
        foodKilo.push(data[i].Kilo);
      }

      console.log(foodCat);
      console.log(foodKilo);

      
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
        .style('width', '80px').style('margin-right', '10px').delay(300)
        
    var x = d3.scaleBand().rangeRound([0, 800]).paddingInner(0.05);

    var y = d3.scaleLinear().range([500, 0]);

     const xScale = d3.scaleBand()
        .domain(data.map(d => d.Commodity))
        .range([0, 500]);
        
     const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.Kilo)])
        .range([500, 0]);

    });
    return () => undefined;
  }, [])
  
  return (
    <div className="App">
      <body>
        <h3>Bar Chart of Food Waste Weight Average (Kilo)</h3>
        <div id="BarChart"></div>
        <div id="text"></div>
        <div id="pgraphs"></div>

      </body>
    </div>
  );
}

export default App;


// next steps 
// create input box under each of the bar graphs
// label amount below and on the bar
