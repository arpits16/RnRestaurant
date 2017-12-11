import React, {Component} from 'react';
import {DrawerLayoutAndroid} from 'react-native';



class MyNavigationDrawer extends DrawerLayoutAndroid {

  constructor(props) {
    super(props);
    console.log('Inside my navigation drawer');
    this.mydrawerOpened = false;
  }

  onDrawerOpen(){
    this.mydrawerOpened = true;
    return super.onDrawerOpen();
  }

  onDrawerClose(){
    this.mydrawerOpened = false;
    return super.onDrawerClose();
  }
}


export default MyNavigationDrawer;
