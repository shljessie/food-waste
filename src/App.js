import './App.css';

import * as d3 from 'd3';

import {useEffect, useState} from 'react'

import React from "react";
import foodWeight from './data/foodWeight.csv'

var userWasteSum;

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
        .attr('id', function (d,i) { return 'bar'+i } )
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
      d3.select('#Inputs')
        .selectAll('div')
        .data(data)
        .enter()
        .append('div')
        .append('text')
        .text('food amount: ')
        .append('input')
        .attr('class', function (d,i) { return 'input'+i } )
        .attr('x',function (d,i) { return 0 })
        .attr('y', function (d,i) { return data[i].Kilo*20; } )
        .style('width', '50px')
        .style('height', '20px')

        // create circle 
        // create svg element:
        var svg = d3.select("#nationCircle")
                    .append("svg")
                    .attr("width", 400)
                    .attr("height", 400)
                    .attr('id','nationCircle')

        // Add the path using this helper function
        svg.append('circle')
          .attr('cx', 150)
          .attr('cy', 150)
          .attr('r', 130)
          .attr('stroke', 'none')
          .attr('fill', 'lightgray');


        // create circle 
        // create svg element:
        var svg2 = d3.select("#userCircle")
        .append("svg")
        .attr("width", 400)
        .attr("height", 400)
        .attr('id','userCircle')

        // // Add the path using this helper function
        svg2.append('circle')
        .attr('cx', 150)
        .attr('cy', 150)
        .attr('r', 100)
        .attr('stroke', 'none')
        .attr('opacity', '50%')
        .attr('fill', 'red');
      
   
      const input0 = document.querySelector('.input0');
      const input1 = document.querySelector('.input1');
      const input2 = document.querySelector('.input2');
      const input3 = document.querySelector('.input3');
      const input4 = document.querySelector('.input4');
      const input5 = document.querySelector('.input5');
      const input6 = document.querySelector('.input6');
      const input7 = document.querySelector('.input7');
      const input8 = document.querySelector('.input8');
      const input9 = document.querySelector('.input9');
      const input10 = document.querySelector('.input10');
      const input11 = document.querySelector('.input11');
      const input12 = document.querySelector('.input12');
      const input13 = document.querySelector('.input13');
      // const log = document.getElementById('log');
      // console.log(input)

      input0.addEventListener('change', updateValue);
      input1.addEventListener('change', updateValue);
      input2.addEventListener('change', updateValue);
      input3.addEventListener('change', updateValue);
      input4.addEventListener('change', updateValue);
      input5.addEventListener('change', updateValue);
      input6.addEventListener('change', updateValue);
      input7.addEventListener('change', updateValue);
      input8.addEventListener('change', updateValue);
      input9.addEventListener('change', updateValue);
      input10.addEventListener('change', updateValue);
      input11.addEventListener('change', updateValue);
      input12.addEventListener('change', updateValue);
      input13.addEventListener('change', updateValue);

      function updateValue(e) {
        let className=e.target.className;
        let classNameNum=className[5];
        let classNameNumT=className[6];
        let value= e.target.value;

        // if one digit
        if(className.length === 20 || className.length === 6){
           // User's food waste display
            d3.select('#myWaste')
            .append('div')
            .attr('class',function (d,i) { return 'barTwo' } )
            .attr('id',function (d,i) { return 'barTwo'+ classNameNum} )
            .transition()
            .style('height', `${((value*20)+150) }px`)
            .style('margin-right', '10px')
            .style('width', '80px')
            .style('position', 'absolute')
        }else{
          // if twodigitnum
          // User's food waste display
          d3.select('#myWaste')
          .append('div')
          .attr('class',function (d,i) { return 'barTwo' } )
          .attr('id',function (d,i) { return 'barTwo'+ classNameNum + classNameNumT} )
          .transition()
          .style('height', `${((value*20)+150) }px`)
          .style('margin-right', '10px')
          .style('width', '80px')
          .style('position', 'absolute')
        }
      }
    });
    return () => undefined;
  }, [])

  function getWasteData(e) {
    e.preventDefault();

    let userWasteData=[];

    const input0 = parseInt(document.querySelector('.input0').value);
    const input1 = parseInt(document.querySelector('.input1').value);
    const input2 = parseInt(document.querySelector('.input2').value);
    const input3 = parseInt(document.querySelector('.input3').value);
    const input4 = parseInt(document.querySelector('.input4').value);
    const input5 = parseInt(document.querySelector('.input5').value);
    const input6 = parseInt(document.querySelector('.input6').value);
    const input7 = parseInt(document.querySelector('.input7').value);
    const input8 = parseInt(document.querySelector('.input8').value);
    const input9 = parseInt(document.querySelector('.input9').value);
    const input10 = parseInt(document.querySelector('.input10').value);
    const input11 = parseInt(document.querySelector('.input11').value);
    const input12 = parseInt(document.querySelector('.input12').value);
    const input13 =parseInt( document.querySelector('.input13').value);
    console.log('input2',input2)

    // add code that accounts for NaN values
    userWasteData=[input0,input1,input2,input3,input4,input5,input6,input7,input8,input9,input10,input11,input12,input13]

    userWasteSum= input0+input1+input2+input3+input4+input5+input6+input7+input8+input9+input10+input11+input12+input13
    console.log(userWasteSum)

    // create circle 
    // create svg element:
    var svg2 = d3.select("#userCircle")
                .append("svg")
                .attr("width", 400)
                .attr("height", 400)
                .attr('id','userCircle')

    // // Add the path using this helper function
    svg2.append('circle')
      .attr('cx', 150)
      .attr('cy', 150)
      .attr('r', 100)
      .attr('stroke', 'none')
      .attr('fill', 'red');

    console.log(userWasteData);
    return userWasteData
   
  }


  
  return (
    <div className="App">
      <body>
         <h3>Bar Chart of Food Waste Weight Average (Kilo)</h3>
         <h5>Insert the amount of food waste you produced in each category and press enter to record.</h5>
        <div id="container">
          <div id="BarChart"></div>
          <div id="myWaste"></div>
        </div>
        
        <div id="Inputs"></div>
        <button type="button" onClick={getWasteData}> Enter </button>

        <div id="circleContainer">
          <p id="nationalDescr">National Waste Total per year (gray): 123.8</p>
          <p id="c">Your Waste Total per year (red)</p>
          <div id="nationCircle"></div>
          <div id="userCircle"></div>
        </div>
        

      </body>
    </div>
  );
}

export default App;



