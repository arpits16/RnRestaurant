import React, {
  Component
} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  ToolbarAndroid,
  View,
  AsyncStorage,
  TouchableHighlight,
  ToastAndroid
} from 'react-native';


// AboutUs Component
class ResDetails extends Component {

  currentRestaurant = this.props.navigation.state.params.currentRestaurant;
  constructor(props) {
    super(props);

    // TODO update the following initial value to get its value from the async store saved against the id
    this.state = {
      fabState: false
    }
    this.isFavourite();
  }


  async isFavourite() {
    try {
      value = await AsyncStorage.getItem(this.currentRestaurant.restaurant.id);
      if (value !== null) {
        // We have data!!
        //ToastAndroid.show("Is favourite:"+value, ToastAndroid.SHORT);
        this.setState({
          fabState: !(this.state.fabState)
        });
      }
    } catch (error) {
      // Error retrieving data
      ToastAndroid.show("Error in  isFavourite:" + error, ToastAndroid.SHORT);

    }
    //ToastAndroid.show("Is favourite after setting:" +this.state.fabState, ToastAndroid.SHORT);
  }

  async onToggle() {
    // Update the state

    //Saving to favourites
    if (!this.state.fabState) {
      try {
        await AsyncStorage.setItem(this.currentRestaurant.restaurant.id, 'true');
        //ToastAndroid.show("Restaurant Saved to Favourites: "+this.currentRestaurant.restaurant.id,ToastAndroid.SHORT);
        idvalue = await AsyncStorage.getItem(this.currentRestaurant.restaurant.id);
        console.log("The id retrieved is " + idvalue);
        //ToastAndroid.show("Restaurant id from asyncstorage: "+idvalue,ToastAndroid.SHORT);
      } catch (error) {
        // Error saving data
        ToastAndroid.show("Error in saving to Favourites: " + this.currentRestaurant.restaurant.id + error, ToastAndroid.SHORT);
      }
    } else {
      try {
        await AsyncStorage.removeItem(this.currentRestaurant.restaurant.id);
        //ToastAndroid.show("Restaurant removed from  Favourites: "+this.currentRestaurant.restaurant.id,ToastAndroid.SHORT);
      } catch (error) {
        // Error saving data
        ToastAndroid.show("Error in removing from Favourites: " + this.currentRestaurant.restaurant.id, ToastAndroid.SHORT);
      }
    }

    //Toggle the fab button state
    this.setState({
      fabState: !(this.state.fabState)
    });

    //ToastAndroid.show("New State Toggled : "+this.state.fabState, ToastAndroid.SHORT);

  }

  render() {

    return ( <
      View style = {
        styles.home_container
      } >

      <
      ToolbarAndroid style = {
        styles.home_toolbar
      }
      title = "Details"
      titleColor = {
        '#e2f0f9'
      }
      />

      <
      Image style = {
        {
          alignSelf: 'center',
          height: 150,
          width: 150,
          paddingTop: 50,
          borderWidth: 1,
          borderRadius: 75
        }
      }
      source = {
        {
          uri: this.currentRestaurant.restaurant.thumb
        }
      }
      resizeMode = "stretch" /
      >
      <
      View >
      <
      Text style = {
        {
          paddingTop: 10,
          alignSelf: 'center'
        }
      } > {
        this.currentRestaurant.restaurant.name
      } < /Text> <
      Text style = {
        {
          paddingTop: 20,
          alignSelf: 'center'
        }
      } > {
        this.currentRestaurant.restaurant.currency
      } < /Text> <
      Text style = {
        {
          paddingTop: 30,
          alignSelf: 'center'
        }
      } > {
        this.currentRestaurant.restaurant.cuisines
      } < /Text> < /
      View >

      { /* // Add a favourite toggle image */ } <
      TouchableHighlight style = {
        {
          paddingTop: 50,
          alignSelf: 'center'
        }
      }
      onPress = {
        () => this.onToggle()
      }
      underlayColor = 'rgba(0,0,0,0)' >
      <
      Image source = {
        (this.state.fabState ? require('../images/ic_fab_selected.png') : require('../images/ic_fab_normal.png'))
      }
      style = {
        {
          width: 40,
          height: 40,
          paddingBottom: 2
        }
      }
      /> < /
      TouchableHighlight >

      <
      /View>
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

  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 10,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
});




export default ResDetails;
