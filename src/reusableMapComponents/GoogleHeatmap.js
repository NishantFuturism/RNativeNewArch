import { Heatmap } from "react-native-maps";

const GoogleHeatmap = props => {
    return(
        <Heatmap points={props?.points ? props.points : []}
                         opacity={1}
                         radius={20}
                         maxIntensity={100}
                         gradientSmoothing={10}
                         heatmapMode={"POINTS_DENSITY"}/>
    )
}

//Just Paste this object inside Mapview Region prop to check heatmap with provided Points file data.
// {
//     latitude: 6.82646681,
//     longitude: 79.87121907,
//     latitudeDelta: 0.09,
//     longitudeDelta: 0.0121
//   }

export default GoogleHeatmap;