import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  processColor
} from 'react-native';

import {BarChart} from 'react-native-charts-wrapper';
import { ChartBarConfig } from './ChartConfig';

class BarChartScreen extends React.Component {

  constructor() {
    super();

    this.state = ChartBarConfig(processColor);
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
          <BarChart
            style={styles.chart}
            data={this.state.data}
            xAxis={this.state.xAxis}
            animation={{durationX: 2000}}
            legend={this.state.legend}
            gridBackgroundColor={this.state.gridBackgroundColor}
            visibleRange={this.state.visibleRange}
            drawBarShadow={this.state.drawBarShadow}
            drawValueAboveBar={this.state.drawValueAboveBar}
            drawHighlightArrow={this.state.drawHighlightArrow}
            onSelect={this.handleSelect.bind(this)}
            highlights={this.state.highlights}
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

export default BarChartScreen;
