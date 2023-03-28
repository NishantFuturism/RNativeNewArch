import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Button,
  View,
  processColor
} from 'react-native';
import update from 'immutability-helper';

import _ from 'lodash';
import {CandleStickChart} from 'react-native-charts-wrapper';
import { ChartCandleStickConfig } from './ChartConfig';

class CandleStickChartScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = props.ChartCandleStickConfig ? props.ChartCandleStickConfig(processColor) :  ChartCandleStickConfig(processColor);

    this.x = 0;
  }

  componentDidMount() {
    this.setState(
      update(this.state, {
          xAxis: {
            $set: {
              drawLabels: true,
              drawGridLines: true,
              position: 'BOTTOM',
              yOffset: 5,

              limitLines: _.times(this.state.data.dataSets[0].values.length / 5, (i) => {
                return {
                  limit: 5 * (i + 1) + 0.5,
                  lineColor: processColor('darkgray'),
                  lineWidth: 1,
                  label: (i + 1).toString()
                };
              })
            }
          },
          yAxis: {
            $set: {
              left: {
                valueFormatter: '$ #',
                limitLines: [{
                  limit: 112.4,
                  lineColor: processColor('red'),
                  lineDashPhase: 2,
                  lineDashLengths: [10,20]
                }, {
                  limit: 89.47,
                  lineColor: processColor('red'),
                  lineDashPhase: 2,
                  lineDashLengths: [10,20]
                }]
              },
              right: {
                enabled: false
              },

            }
          },
          zoomXValue: {
            $set: 99999
          }
        }
      ));
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
          <CandleStickChart
            style={styles.chart}
            data={this.state.data}
            marker={this.state.marker}
            chartDescription={{text: 'CandleStick'}}
            legend={this.state.legend}
            xAxis={this.state.xAxis}
            yAxis={this.state.yAxis}
            maxVisibleValueCount={16}
            autoScaleMinMaxEnabled={true}
            // zoom={{scaleX: 2, scaleY: 1, xValue:  400000, yValue: 1}}
            zoom={{scaleX: 15.41, scaleY: 1, xValue:  40, yValue: 916, axisDependency: 'LEFT'}}
            onSelect={this.handleSelect.bind(this)}
            ref="chart"
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

export default CandleStickChartScreen;
