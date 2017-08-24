import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';

class Splash extends Component {
  render() {
    return (
      <View style={styles.splash_container}>
        <Image style={styles.logo} source={require('../images/ic_launcher.png')}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  splash_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  splash_logo:{
    width:100,
    height:100,
  }
});

export default Splash;
