import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  processColor,
} from 'react-native';

import {PieChart} from 'react-native-charts-wrapper';
import { PieChartConfig } from './ChartConfig';

class PieChartScreen extends React.Component {

  constructor() {
    super();
    this.configuration = PieChartConfig(processColor);
    this.state = {
      legend: this.configuration.legend,
      data: this.configuration.data,
      highlights: this.configuration.highlights,
      description: this.configuration.description
    };
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
        <View>
          <Text>selected:</Text>
          <Text> {this.state.selectedEntry}</Text>
        </View>

        <View style={styles.container}>
          <PieChart
            style={styles.chart}
            chartDescription={this.state.description}
            data={this.state.data}
            legend={this.state.legend}
            highlights={this.state.highlights}
            logEnabled={this.configuration.logEnabled}
            chartBackgroundColor={this.configuration.chartBackgroundColor}
            extraOffsets={this.configuration.extraOffsets}
            entryLabelColor={this.configuration.entryLabelColor}
            entryLabelTextSize={this.configuration.entryLabelTextSize}
            // entryLabelFontFamily={'HelveticaNeue-Medium'}
            drawEntryLabels={this.configuration.drawEntryLabels}
            rotationEnabled={this.configuration.rotationEnabled}
            rotationAngle={this.configuration.rotationAngle}
            usePercentValues={this.configuration.usePercentValues}
            styledCenterText={this.configuration.styledCenterText}
            centerTextRadiusPercent={this.configuration.centerTextRadiusPercent}
            holeRadius={this.configuration.holeRadius}
            holeColor={this.configuration.holeColor}
            transparentCircleRadius={this.configuration.transparentCircleRadius}
            transparentCircleColor={this.configuration.transparentCircleColor}
            maxAngle={this.configuration.maxAngle}
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
  },
  chart: {
    flex: 1
  }
});

export default PieChartScreen;

