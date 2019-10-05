import React from 'react';
import { StyleSheet, View, ImageBackground, Image, Dimensions} from 'react-native';
import NavigationHeader from '../components/NavigationHeader';
import * as Font from 'expo-font';

var {height, width} = Dimensions.get('window');



export default class Background extends React.Component {
  state = {
    fontLoaded: false, 
  };

  async componentDidMount() {
    await Font.loadAsync({
      'advent-pro': require('../assets/fonts/AdventPro-Regular.ttf'),
    });
    this.setState({ fontLoaded: true });
  }
  render() {
    return (
      <View styles={{ flex: 1, backgroundColor: 'rgba(255,255,255,1)'}} >
        {
          this.state.fontLoaded ? (
            <ImageBackground style={{ height: '100%', backgroundColor:'rgb(255,255,255)'}} resizeMode="cover" source={require('../assets/img/background.jpg')}  >
              <NavigationHeader></NavigationHeader>
              {this.props.children}
            </ImageBackground>
          ) : null
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
});
