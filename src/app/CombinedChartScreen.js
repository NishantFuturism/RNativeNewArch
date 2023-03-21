/**
 * Created by xudong on 02/03/2017.
 */

import React, {Component} from 'react';
import {View, Text, StyleSheet, processColor} from 'react-native';

import {CombinedChart} from 'react-native-charts-wrapper';
import { ChartCombinedConfig } from './ChartConfig';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: 'transparent'
  }
});

export default class Combined extends Component {

  constructor() {
    super();
    this.state = ChartCombinedConfig(processColor);

  }

  componentDidMount() {
    // in this example, there are line, bar, candle, scatter, bubble in this combined chart.
    // according to MpAndroidChart, the default data sequence is line, bar, scatter, candle, bubble.
    // so 4 should be used as dataIndex to highlight bubble data.

    // if there is only bar, bubble in this combined chart.
    // 1 should be used as dataIndex to highlight bubble data.

    this.setState({...this.state, highlights: [{x: 1, y:150, dataIndex: 4}, {x: 2, y:106, dataIndex: 4}]})
  }


  static displayName = 'Combined';

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

        <View style={{height: 80}}>
          <Text> selected entry</Text>
          <Text> {this.state.selectedEntry}</Text>
        </View>


        <View style={styles.container}>
          <CombinedChart
            data={this.state.data}
            xAxis={this.state.xAxis}
            onSelect={this.handleSelect.bind(this)}
            onChange={(event) => console.log(event.nativeEvent)}
            marker={this.state.marker}
            highlights={this.state.highlights}
            highlightFullBarEnabled={false}
            drawOrder={['SCATTER','LINE','BAR']}
            style={styles.container}/>

        </View>
      </View>
    );
  }
}
