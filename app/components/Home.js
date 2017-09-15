import React, {Component} from 'react';
import {View, StyleSheet,  Text, ToolbarAndroid,
  TouchableWithoutFeedback, ToastAndroid} from 'react-native';

import MyNavigationDrawer from './MyNavigationDrawer'

// This will contains three main components that will shows the actionbar, navigation drawer and content layout
class Home extends Component {

  constructor(props) {
    super(props)
    this.props.title = 'Home';
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

  render() {

    // This is a function defined to show navigtaionview
    var navigationView = (
      <View style={{
        flex: 1,
        backgroundColor: '#fff'
      }}>
        <Text style={{
          margin: 10,
          fontSize: 15,
          textAlign: 'center'
        }}>Restaurants</Text>

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

          <View style={styles.home_content}>

            <Text style={styles.home_title}>All Grid Items</Text>

            <TouchableWithoutFeedback onPress={() => this.openDrawer()}>
              <View>
                <Text>Open drawer</Text>
              </View>
            </TouchableWithoutFeedback>

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
  }
});

export default Home;
