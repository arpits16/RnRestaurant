import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  ToolbarAndroid,
  View,
  TouchableHighlight,
  ToastAndroid
} from 'react-native';


// AboutUs Component
class ResDetails extends Component{

 currentRestaurant=this.props.navigation.state.params.currentRestaurant;
  constructor(props){
    super(props);

    // TODO update the following initial value to get its value from the async store saved against the id
    this.state = {
      fabState : false
    }
  }

  onToggle(){
    // Update the state
    this.setState({fabState: !(this.state.fabState)});
    ToastAndroid.show("Toggle happened : "+this.state.fabState, ToastAndroid.SHORT);
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

      {/* // Add a favourite toggle image */}
      <TouchableHighlight onPress={() => this.onToggle()} underlayColor='rgba(0,0,0,0)'>
        <Image source={(this.state.fabState ? require('../images/ic_fab_normal.png'):require('../images/ic_fab_selected.png'))}
        style={{width:40, height:40, paddingBottom:2}}/>
      </TouchableHighlight>

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
