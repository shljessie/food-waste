import BarChart from 'react-bar-chart';
import React from 'react';

const data = [
  {text: 'Man', value: 500}, 
  {text: 'Woman', value: 300} 
];

const margin = {top: 20, right: 20, bottom: 30, left: 40};

const BarChartEx = React.createClass({
  getInitialState() {
    return { width: 500 };
  },

  componentDidMount: () => {
    window.onresize = () => {
     this.setState({width: this.refs.root.offsetWidth});
     console.log('inhere') 
    };
  },

  handleBarClick(element, id){ 
    console.log(`The bin ${element.text} with id ${id} was clicked`);
  },

  render() {
    return (
        <div ref='root'>
            <div style={{width: '50%'}}> 
                <BarChart ylabel='Quantity'
                  width={this.state.width}
                  height={500}
                  margin={margin}
                  data={data}
                  onBarClick={this.handleBarClick}/>
            </div>
        </div>
    );
  }
});

React.render(
  <BarChartEx/>,
  document.getElementById('react-container')
);

export default BarChartEx;