import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Button,
  View, processColor
} from 'react-native';
import update from 'immutability-helper';

import {LineChart} from 'react-native-charts-wrapper';
import { LineChartConfig } from './ChartConfig';

class LineChartScreen extends React.Component {

  constructor() {
    super();
    this.configuration = LineChartConfig(processColor);
    this.state = {
      data: {},

      marker: this.configuration.marker,
      xAxis: this.configuration.xAxis,
      // visibleRange: {x: {min: 1, max: 2}}
    };
  }

  componentDidMount() {

    this.setState(
      update(this.state, {
        data: this.configuration.data
      })
    );


  }

  onPressLearnMore() {

    this.refs.chart.setDataAndLockIndex({
      dataSets: [{
        values: [
          {x: 1, y: 0.88},
          {x: 2, y: 0.77},
          {x: 3, y: 105},
          {x: 4, y: 135},
          {x: 5, y: 0.88},
          {x: 6, y: 0.77},
          {x: 7, y: 105},
          {x: 8, y: 135}
        ],
        label: 'A',
      }, {
        values: [
          {x: 1, y: 90},
          {x: 2, y: 130},
          {x: 3, y: 100},
          {x: 4, y: 105},
          {x: 5, y: 90},
          {x: 6, y: 130},
          {x: 7, y: 100},
          {x: 8, y: 105}
        ],
        label: 'B',
      }, {
        values: [
          {x: 1, y: 110},
          {x: 2, y: 105},
          {x: 3, y: 115},
          {x: 4, y: 110},
          {x: 5, y: 110},
          {x: 6, y: 105},
          {x: 7, y: 115},
          {x: 8, y: 110}],
        label: 'C',
      }],
    })
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

        <Button onPress={this.onPressLearnMore.bind(this)} title="Press to load more"/>

        <View style={{height: 80}}>
          <Text> selected entry</Text>
          <Text> {this.state.selectedEntry}</Text>
        </View>

        <View style={styles.container}>
          <LineChart
            style={styles.chart}
            data={this.state.data}
            chartDescription={{text: ''}}
            legend={this.state.legend}
            marker={this.state.marker}
            xAxis={this.state.xAxis}            
            drawGridBackground={this.configuration.drawGridBackground}
            borderColor={this.configuration.borderColor}
            borderWidth={this.configuration.borderWidth}
            drawBorders={this.configuration.drawBorders}
            autoScaleMinMaxEnabled={this.configuration.autoScaleMinMaxEnabled}
            touchEnabled={this.configuration.touchEnabled}
            dragEnabled={this.configuration.dragEnabled}
            scaleEnabled={this.configuration.scaleEnabled}
            scaleXEnabled={this.configuration.scaleXEnabled}
            scaleYEnabled={this.configuration.scaleYEnabled}
            pinchZoom={this.configuration.pinchZoom}
            doubleTapToZoomEnabled={this.configuration.doubleTapToZoomEnabled}
            highlightPerTapEnabled={this.configuration.highlightPerTapEnabled}
            highlightPerDragEnabled={this.configuration.highlightPerDragEnabled}
            // visibleRange={this.state.visibleRange}
            dragDecelerationEnabled={this.configuration.dragDecelerationEnabled}
            dragDecelerationFrictionCoef={this.configuration.dragDecelerationFrictionCoef}
            keepPositionOnRotation={this.configuration.keepPositionOnRotation}
            ref="chart"
            onSelect={this.handleSelect.bind(this)}            
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

export default LineChartScreen;
