import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  ToolbarAndroid,
  View
} from 'react-native';


// AboutUs Component
class ResDetails extends Component{

 currentRestaurant=this.props.navigation.state.params.currentRestaurant;
  constructor(props){
    super(props);

  }

  render(){


    return(
    <View style={styles.home_container}>

    <ToolbarAndroid style={styles.home_toolbar} title="Details"  titleColor={'#e2f0f9'}/>


      <View>
        <Text style={{paddingTop:10}}>{this.currentRestaurant.restaurant.name}</Text>
        <Text style={{paddingTop:20}}>{this.currentRestaurant.restaurant.currency}</Text>
        <Text style={{paddingTop:30}}>{this.currentRestaurant.restaurant.cuisines}</Text>

      </View>

      </View>
    );
  }

}

const styles = StyleSheet.create({
  home_container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF'
  },
  home_toolbar: {
    backgroundColor: '#301f80',
    height: 56
  },
  home_content: {
    flex: 1,
    alignItems: 'center'
  },
  home_title: {
    margin: 10,
    fontSize: 25,
    textAlign: 'right'
  },

container: { flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5FCFF', },
title: { fontSize: 10, marginBottom: 8, textAlign: 'center', },
year: { textAlign: 'center', },
thumbnail: { width: 53, height: 81, },
});




export default ResDetails;
