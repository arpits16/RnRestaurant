import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View
} from 'react-native';


// AboutUs Component
class AboutUs extends Component{



  render(){
    return(
      <View>
        <Text>About Us</Text>

        <Image source={require('../images/about_banner_img.png')}/>

        <Text>
        RnRestuarant lets you search for and discover
        restaurants to eat out at or order in from.
        Browse through restaurant menus, photos, user reviews
        and ratings to decide where you want to eat, and use
        the map feature to guide you there. {'\u2728'}
      </Text>

      </View>
    );
  }
}

export default AboutUs;
