import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  processColor
} from 'react-native';
import update from 'immutability-helper';

import _ from 'lodash';
import {BubbleChart} from 'react-native-charts-wrapper';
import { ChartBubbleConfig } from './ChartConfig';

class BubbleChartScreen extends React.Component {

  constructor() {
    super();
    const size = 10;
    this.configuration = ChartBubbleConfig(processColor,this._randomYValues,size);
    this.state = {
      legend: this.configuration.legend,
      animation: this.configuration.animation
    };
  }

  componentDidMount() {
    
    this.setState(
      update(this.state, {
        data: this.configuration.data
      })
    );
  }

  _randomYValues(range: number, size: number) {
    return _.times(size, (index) => {
      return {
        y: Math.random() * range,
        size: Math.random() * range
      };
    });
  }

  handleSelect(event) {
    let entry = event.nativeEvent
    if (entry == null) {
      this.setState({...this.state, selectedEntry: null})
    } else {
      this.setState({...this.state, selectedEntry: JSON.stringify(entry)})
    }

    console.log(event.nativeEvent)
  }

  render() {
    return (
      <View style={{flex: 1}}>

        <View style={{height:80}}>
          <Text> selected entry</Text>
          <Text> {this.state.selectedEntry}</Text>
        </View>


        <View style={styles.container}>
          <BubbleChart
            style={styles.chart}
            data={this.state.data}
            legend={this.state.legend}
            animation={this.state.animation}
            onSelect={this.handleSelect.bind(this)}
            onChange={(event) => console.log(event.nativeEvent)}
          />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  chart: {
    flex: 1
  }
});

export default BubbleChartScreen;
