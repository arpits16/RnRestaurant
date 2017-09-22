import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image, 
  ListView,
  Text,
  ToolbarAndroid,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
  TouchableWithoutFeedback, 
  ToastAndroid,
  ActivityIndicator,
  View
} from 'react-native';
import MyNavigationDrawer from './MyNavigationDrawer'

import GridView from 'react-native-grid-view'

import apimod from 'RnRestaurant/app/controller/apimod.js';

var RESTAURANTS_PER_ROW = 3;



//This class shows each Grid in the GridView....
class Restaurant extends Component {
  render() {
      return (
	  
        <View style={styles.restaurant} >
		<TouchableHighlight onPress={() => this.showDetails() }>
		<Image source={{uri: this.props.currentrestaurant.restaurant.thumb}}style={styles.thumbnail} />
		  </TouchableHighlight>
		
		<View >
            <Text style={styles.title} numberOfLines={3}>{this.props.currentrestaurant.restaurant.location.locality}</Text>
            <Text style={styles.year}>{this.props.currentrestaurant.restaurant.name}</Text>
          </View>
		  
        </View>
		
		
      );
  }
  
  showDetails(){
	  Alert.alert( 'Alert Title', "Title", [ {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
		{text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}, {text: 'OK', onPress: () => console.log('OK Pressed')}, ], { cancelable: false } )   
  }

}

// This will contains three main components that will shows the actionbar, navigation drawer and content layout
class Home extends Component {

  constructor(props) {
    super(props)
    this.props.title = 'Home';
	this.state = {
      dataSource: null,
      loaded: false,
    }
  }
  
   showRestaurants(){
	  Alert.alert( 'Alert Title', "Title", [ {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
		{text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}, {text: 'OK', onPress: () => console.log('OK Pressed')}, ], { cancelable: false } )   
  }

  
  componentDidMount() {
	  ToastAndroid.show("Component Did Mount start", ToastAndroid.SHORT);

    // Following is required to access the component context as inside the getCity function this would be pointing
    // to it. And we also needed to access the component state
    var myObj = this;

    // Call api here
    apimod.getCity("1", "city", function(responseData) {

        myObj.setState({
            //dataSource: myObj.state.dataSource.cloneWithRows(responseData),
			dataSource: responseData,
            loaded: true,
        });

    });
	ToastAndroid.show("Component Did Mount ", ToastAndroid.SHORT);
}

  

  // Simply opens the drawer
  openDrawer() {
    console.log('it is opened')
    this.refs['DRAWER'].openDrawer();
  }

  // Simply closes the drawer
  closeDrawer() {
    this.refs['DRAWER'].closeDrawer();
  }

  onActionSelected(position) {
      ToastAndroid.show("Selected position : ", ToastAndroid.SHORT);
  }

  

  
  
renderLoadingView() {
     return ( <View><ActivityIndicator size='large' color='#a2ae2a' /></View> );
  }
  
  render() {

    // This is a function defined to show navigtaionview
    var navigationView = (
      <View style={{
        flex: 1,
        backgroundColor: '#fff'
      }}>
	  <TouchableHighlight onPress={() => this.showRestaurants() }>
        <Text style={{
          margin: 10,
          fontSize: 15,
          textAlign: 'center'
        }}>Restaurants
		
		</Text>
		</TouchableHighlight>
        <Text style={{
          margin: 10,
          fontSize: 15,
          textAlign: 'center'
        }}>Favourites</Text>

        <Text style={{
          margin: 10,
          fontSize: 15,
          textAlign: 'center'
        }}>About Us</Text>
      </View>
    );
	
	if (!this.state.loaded) { return this.renderLoadingView(); }
	
	return (
      <View style={styles.home_container}>
        {/* Adding toolbar */}
        <ToolbarAndroid style={styles.home_toolbar} title="Home"
          navIcon={require('../images/ic_home_black.png')} titleColor={'#e2f0f9'}
          onIconClicked={() => this.openDrawer()}
          onActionSelected={this.onActionSelected}/>

          {/*using refs to open and closing drawer*/}
        <MyNavigationDrawer drawerWidth={200} drawerPosition={MyNavigationDrawer.positions.Left}
          renderNavigationView={() => navigationView} ref={'DRAWER'}>

          {/* Following is the content view */}

         <View>
		 
      <GridView
        items={this.state.dataSource}
        itemsPerRow={RESTAURANTS_PER_ROW}
        renderItem={this.renderItem}
        style={styles.listView}
      />
	  </View>
	  
        </MyNavigationDrawer>

        {/* We can still add onItemClickListener */}

      </View>
    );
	
	
	
	
  }
  
  
//This methods renders each restaurant in grid  
renderItem(item) {
	   return (
	   <Restaurant currentrestaurant={item} />
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
listView: { paddingTop: 20, backgroundColor: '#F5FCFF', }, 
restaurant: {
    height: 150,
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
 }
  
  
  
});

export default Home;
