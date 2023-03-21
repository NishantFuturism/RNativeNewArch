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
import {ScatterChart} from 'react-native-charts-wrapper';
import { ScatterChartConfig } from './ChartConfig';

class ScatterChartScreen extends React.Component {

  constructor() {
    super();
    const size = 30;
    const range = 20;
    this.configuration = ScatterChartConfig(processColor,this._randomYValues,size,range);
    this.state = {
      legend: this.configuration.legend,
      marker: this.configuration.marker
    };
  }

  componentDidMount() {
    

    this.setState(
      update(this.state, {
        data: this.configuration.data
      })
    );
  }

  _randomYValues(range, size) {
    return _.times(size, () => {
      return {y: Math.random() * range}
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
          <ScatterChart
            style={styles.chart}
            data={this.state.data}
            legend={this.state.legend}
            marker={this.state.marker}
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

export default ScatterChartScreen;
