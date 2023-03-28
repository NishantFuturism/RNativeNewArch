import React from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  processColor,
  LayoutAnimation
} from "react-native";
import update from "immutability-helper";

import { LineChart } from "react-native-charts-wrapper";
import { LineChartGradientConfig } from "./ChartConfig";

const greenBlue = "rgb(26, 182, 151)";
const petrel = "rgb(59, 145, 153)";

class LineChartScreen extends React.Component {
  constructor(props) {
    super(props);
    this.configuration = props.LineChartGradientConfig ? props.LineChartGradientConfig(processColor,petrel,greenBlue) : LineChartGradientConfig(processColor,petrel,greenBlue);
    this.state = {};
  }

  handleSelect(event) {
    let entry = event.nativeEvent;
    if (entry == null) {
      this.setState({ ...this.state, selectedEntry: null });
    } else {
      this.setState({ ...this.state, selectedEntry: JSON.stringify(entry) });
    }

    console.log(event.nativeEvent);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: 80 }}>
          <Text> selected entry</Text>
          <Text> {this.state.selectedEntry}</Text>
        </View>

        <View style={styles.container}>
          <LineChart
            style={styles.chart}
            data={this.configuration.data}
            marker={this.configuration.marker}
            xAxis={this.configuration.xAxis}
            yAxis={this.configuration.yAxis}
            animation={this.configuration.animation}
            chartDescription={{ text: "" }}
            legend={this.configuration.legend}
            autoScaleMinMaxEnabled={this.configuration.autoScaleMinMaxEnabled}
            drawGridBackground={this.configuration.drawGridBackground}
            drawBorders={this.configuration.drawBorders}
            touchEnabled={this.configuration.touchEnabled}
            dragEnabled={this.configuration.dragEnabled}
            scaleEnabled={this.configuration.scaleEnabled}
            scaleXEnabled={this.configuration.scaleXEnabled}
            scaleYEnabled={this.configuration.scaleYEnabled}
            pinchZoom={this.configuration.pinchZoom}
            doubleTapToZoomEnabled={this.configuration.doubleTapToZoomEnabled}
            dragDecelerationEnabled={this.configuration.dragDecelerationEnabled}
            dragDecelerationFrictionCoef={this.configuration.dragDecelerationFrictionCoef}
            keepPositionOnRotation={this.configuration.keepPositionOnRotation}
            onSelect={this.handleSelect.bind(this)}
            onChange={event => console.log(event.nativeEvent)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
    padding: 20
  },
  chart: {
    height: 250
  }
});

export default LineChartScreen;
