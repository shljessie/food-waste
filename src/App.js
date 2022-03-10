import './App.css';

import * as d3 from 'd3';

import {useEffect, useState} from 'react'

import React from "react";
import foodWeight from './data/foodWeight.csv'

function App() {
  let data;
  let foodCat = [];
  let foodKilo = [];
  let width=800;
  let height=400;

  let x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
  let y = d3.scaleLinear().rangeRound([height, 0]);


  
  React.useEffect(() => {
    d3.csv(foodWeight).then((d) => {
      data=d;

      console.log(data);
      // d3.select('#pgraphs').selectAll('p').data(data).enter().append('p').text(dt => dt.Commodity + ": " + dt.Kilo)

      for (let i = 0; i < data.length; i++) {
        foodCat.push(data[i].Commodity);
        foodKilo.push(data[i].Kilo);
      }

      // console.log(foodCat);
      // console.log(foodKilo);

      x.domain(foodCat);
      y.domain([0, d3.max(foodKilo, function(d) { return d; })]);

      
      const getMax = () => { 
        let max = 0
        data.forEach((dt) => {
            max = dt.Kilo
        })
        return max
      }

      // Food Waste Average Bar display
      // Before bar animation (might have to delete later)
      d3.select('#BarChart')
        .selectAll('div')
        .data(data) 
        .enter()
        .append('div')
        .classed('bar', true)
        .style('height', `${(getMax()*20)+150 }px`)

  
      // After bar animation 
      d3.select('#BarChart')
        .selectAll('.bar')
        .transition()
        .duration(1000)
        .style('height', bar => `${(bar.Kilo*20)+150}px`)
        .style('width', '80px')
        .style('margin-right', '10px')
        .delay(300)
        

      // adding bar chart labeling
      d3.select('#BarChart')
        .selectAll('.bar') 
        .data(data) 
        .append('text')
        .text(function (d,i) { return data[i].Commodity  +"                     " + data[i].Kilo; })
        .attr('x',function (d,i) { return 80*i })
        .attr('y', function (d,i) { return data[i].Kilo*20; } )

      // adding bar chart input
      d3.select('#BarChart')
        .selectAll('.bar') 
        .data(data) 
        .append('text')
        .text('food amount: ')
        .append('input')
        .attr('class', function (d,i) { return i } )
        .attr('x',function (d,i) { return 0 })
        .attr('y', function (d,i) { return data[i].Kilo*20; } )
        .style('width', '70px')
        .style('height', '20px')


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



