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
import { LinkageChartConfig } from './ChartConfig';

class LinkageChartScreen extends React.Component {

  constructor() {
    super();
    this.configuration = LinkageChartConfig();
    this.state = {
      priceData: this.configuration.priceData,
      volumeData: this.configuration.volumeData
    }
  }

  // unfortunately, doubleTapToZoomEnabled is not supported in linkage chart,
  // because in iOS Charts, the double tap event is handled by Charts itself, and no callback/custom listener
  // so it is not possible to sync double tap event to other charts in the same group

  // charts will broadcast their operation to other charts in the same group
  // different chart should have different identifier
  // synX is enabled by default, and syncY is disabled by default
  render() {
    return (
      <View style={{flex: 1}}>

        <View style={{height:40}}>
          <Text>Drag or zoom chart</Text>
        </View>

        <View style={styles.container}>

          <LineChart
            style={styles.chart}
            data={this.state.priceData}
            xAxis={this.state.xAxis}
            group={this.configuration.group}
            identifier={this.configuration.identifierChart1}
            syncX={this.configuration.syncX}
            syncY={this.configuration.syncY}
            visibleRange={this.configuration.visibleRange}
            dragDecelerationEnabled={this.configuration.dragDecelerationEnabled}
            doubleTapToZoomEnabled={this.configuration.doubleTapToZoomEnabled}  // it has to be false!!
          />
        </View>

        <View style={styles.container}>
          <LineChart
            style={styles.chart}
            data={this.state.volumeData}
            xAxis={this.state.xAxis}
            group={this.configuration.group}
            identifier={this.configuration.identifierChart2}
            syncX={this.configuration.syncX}
            syncY={this.configuration.syncY}
            visibleRange={this.configuration.visibleRange}
            dragDecelerationEnabled={this.configuration.dragDecelerationEnabled}
            doubleTapToZoomEnabled={this.configuration.doubleTapToZoomEnabled}  // it has to be false!!
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

export default LinkageChartScreen;
