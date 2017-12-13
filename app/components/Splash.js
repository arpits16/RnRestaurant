import React, {Component} from 'react';
import {View, Image, StyleSheet, ToastAndroid} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import {StackNavigator,NavigationActions} from 'react-navigation';
import Home from './Home';
import AboutUs from './AboutUs';
import Favourites from './Favourites';
import ResDetails from './ResDetails';
class Splash extends Component {

  constructor(props) {
    super(props)
    console.log("This is splash screen");
  }

  setBgTimer() {
    // function local constant
    //const {navigate} = this.props.navigation;


	const exit=NavigationActions.reset(
                 {
                    index: 0,
                    actions: [
                      NavigationActions.navigate({ routeName: 'Home'})
                    ]
                  });

    // Start a timer that runs once after some time
    const timeoutId = BackgroundTimer.setTimeout(() => {
      // this will be executed once after 1 seconds  even when app is the the background
      console.log('Timer is done. Good to launch next screen');

      ToastAndroid.show("Timer is completed. Good to launch next screen", ToastAndroid.SHORT);

        // Code to Remove this from back stack
		this.props.navigation.dispatch(exit);

    }, 1000);

    // Set it to a member variable
    this.updateTimeoutId = timeoutId;
  }

  componentDidMount() {
    this.setBgTimer();
  }

  componentWillUnmount() {
    // Cancel the timeout
    BackgroundTimer.clearTimeout(this.updateTimeoutId);
  }

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
  splash_logo: {
    width: 100,
    height: 100
  }
});


const App = StackNavigator({
  Splash: {
    screen: Splash
  },
  Home: {
    screen: Home
  },
  AboutUs: {
    screen: AboutUs
  },
  Favourites: {
    screen: Favourites
  },
  ResDetails:{
    screen:ResDetails
  }
}, {
  initialRouteName: 'Splash',
  headerMode: 'none' // none to hide for all screens and null to specific screen
});

// export default Splash;
export default App;
