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

import {StackNavigator,NavigationActions} from 'react-navigation';

var RESTAURANTS_PER_ROW = 3;



//This class shows each Grid in the GridView....
class Restaurant extends Component {

  constructor(props){
    super(props)
    // props.title will contain text and id to be set to the navigation item
  }
  // currentObject=this.props.currentrestaurant.restaurant;
  //  navigationObject=this.props.navigation;
    render() {
      return (

        <View style={styles.restaurant} >


		<TouchableHighlight onPress={() => this.props.homeObj.showRestaurantDetails(this.props.currentrestaurant) }>

		<Image source={{uri: this.props.currentrestaurant.restaurant.thumb}}style={styles.thumbnail} />
		  </TouchableHighlight>

		<View >
            <Text style={styles.title} numberOfLines={3}>{this.props.currentrestaurant.restaurant.location.locality}</Text>
            <Text style={styles.year}>{this.props.currentrestaurant.restaurant.name}</Text>
    </View>

        </View>


      );
  }



}

class RnNavItemView extends Component{

    constructor(props){
      super(props)
      // props.title will contain text and id to be set to the navigation item
    }



  render(){

    return (
      <TouchableHighlight onPress={() => this.props.homeObj.onActionSelected(this.props.title,this.props.position) }>
        <Text style={{
          margin: 10,
          fontSize: 15,
          textAlign: 'center'
        }}>{this.props.title}</Text>
		</TouchableHighlight>);
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


  onActionSelected(title, position) {

  switch (position) {
    case 1:
      ToastAndroid.show("Restaurant selected", ToastAndroid.SHORT);
      this.showRestaurants();
      break;
    case 2:
    ToastAndroid.show("Favourite selected", ToastAndroid.SHORT);
      this.showFavourites();
      break;
    case 3:
    ToastAndroid.show("About Us selected", ToastAndroid.SHORT);
      this.showAboutUs();
      break;
    default:
      ToastAndroid.show("Invalid selection", ToastAndroid.SHORT);
      break;
  }
}

  showRestaurants(){
	  // TODO Add code specific to launch of home screen
  }

  showFavourites(){
    // This is method to show favourites
    this.closeDrawer();
    this.props.navigation.navigate('Favourites');
  }

  showAboutUs(){
    this.closeDrawer();
    // This is method to show about us
    this.props.navigation.navigate('AboutUs');
  }

  showRestaurantDetails(currentRestaurant){
    // Note : This marks loading is completed
      // Alert.alert( 'Alert Title:'+"RestaurantShow", "Title", [ {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
      // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}, {text: 'OK', onPress: () => console.log('OK Pressed')}, ], { cancelable: false } )

     myObj.props.navigation.navigate('ResDetails',{currentRestaurant});

  }
  componentDidMount() {
    // Note: This callback works and checked again. Removing Toast

    // Following is required to access the component context as inside the getCity function this would be pointing
    // to it. And we also needed to access the component state
    global.myObj = this;

    // Call api here
    apimod.getCity("1", "city", function(responseData) {

        myObj.setState({
            //dataSource: myObj.state.dataSource.cloneWithRows(responseData),
			dataSource: responseData,
            loaded: true,
        });


    });

  // Removing Toast from here as well. Checked for api call completion
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


        <RnNavItemView title="Restaurants" position={1} homeObj={this}></RnNavItemView>

        <RnNavItemView title="Favourites" position={2} homeObj={this}></RnNavItemView>

        <RnNavItemView title="About Us" position={3} homeObj={this}></RnNavItemView>


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
        renderItem={(item) => {return (
         <Restaurant currentrestaurant={item} homeObj={this}/>
        );}}
        style={styles.listView}
      />

	  </View>

        </MyNavigationDrawer>

        {/* We can still add onItemClickListener */}

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
listView: { paddingTop: 20, backgroundColor: '#F5FCFF', },
restaurant: {
    height: 150,
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
 }



});


export default Home;
