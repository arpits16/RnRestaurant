import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  FlatList,
  View
} from 'react-native';


// AboutUs Component
class Favourites extends Component{

  constructor(props){
    super(props);

  }

  render(){
    return(
      <View>
        <Text>Favourites list is being shown now</Text>

        <FlatList
          data={[{title: 'Pind Balluchi', url:'https://5.imimg.com/data5/NR/NF/MY-18940164/pind-balluchi-a-unique-restaurant-125x125.jpg'},
          {title: 'Delhi Belly', url:'https://i.pinimg.com/170x/96/34/06/9634061ff3e9897934e40c8cd6114022.jpg'}]}
            renderItem={({item}) =>
            <View>
              <Text style={{paddingTop:10}}>{item.title}</Text>
            <Image source={{uri:item.url}} style={{width:150, height:150, paddingBottom:10}}/>
            </View>
          }
        />

      </View>
    );
  }
}

export default Favourites;
