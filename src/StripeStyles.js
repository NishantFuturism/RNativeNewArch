export default {
    CardSheet : {
        font: {
            family:
              Platform.OS === 'android' ? 'avenirnextregular' : 'AvenirNext-Regular',
          },
          shapes: {
            borderRadius: 12,
            borderWidth: 0.5,
          },
          primaryButton: {
            shapes: {
             borderRadius: 20,
            },
          },
          colors: {
            primary: '#fcfdff',
            background: '#ffffff',
            componentBackground: '#f3f8fa',
            componentBorder: '#f3f8fa',
            componentDivider: '#000000',
            primaryText: '#000000',
            secondaryText: '#000000',
            componentText: '#000000',
            placeholderText: '#73757b',
          },
    }
}