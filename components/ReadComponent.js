import React, { Component } from 'react';

import firebase from '../config/firebaseConnection';
import { StyleSheet, ScrollView, ActivityIndicator, View } from 'react-native';
import { ListItem } from 'react-native-elements'


class ReadComponent extends Component {
  constructor() {
    super();
    this.docs = firebase.firestore().collection('students');
    this.state = {
      isLoading: true,
      students: []
    };
  }

  componentDidMount() {
    this.unsubscribe = this.docs.onSnapshot(this.fetchCollection);
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  fetchCollection = (querySnapshot) => {
    const students = [];
    querySnapshot.forEach((res) => {
      const { name, course} = res.data();
      students.push({
        key: res.id,
        name,
        course
      });
    });
    this.setState({
      students,
      isLoading: false
   });
  }



  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="red"/>
        </View>
      )
    }    
    return (
      <ScrollView style={styles.wrapper}>
          {
            this.state.students.map((res, i) => {
              return (
                <ListItem 
                   key={i} 
                   onPress={() => {
                      this.props.navigation.navigate('Atualizar', {
                        userkey: res.key
                      });
                    }}                   
                   bottomDivider>
                  <ListItem.Content>
                    <ListItem.Title>{res.name}</ListItem.Title>
                    <ListItem.Subtitle>{res.course}</ListItem.Subtitle>
                  </ListItem.Content>
                  <ListItem.Chevron 
                     color="black" 
                  />
                </ListItem>
              );
            })
          }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
   flex: 1,
   paddingBottom: 20
  },
  loader: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',    
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  }
})

export default ReadComponent;