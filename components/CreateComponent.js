import React, { Component } from 'react';
import { Button, StyleSheet, ScrollView, ActivityIndicator, View, TextInput, } from 'react-native';
import firebase from '../config/firebaseConnection';
import Swal from 'sweetalert2'; 


class CreateComponent extends Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection('students');
    this.state = {
      name: '',
      course: '',
      isLoading: false
    };
  }

  onValUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  addStudent() {
    if(this.state.name === ''){
      Swal.fire({
        icon: 'info',
        text: 'É nescessario colocar um nome'
      })
    } else {
      this.setState({
        isLoading: true,
      });      
      this.ref.add({
        name: this.state.name,
        course: this.state.course,
      }).then((res) => {
        this.setState({
            name: '',
            course: '',
            isLoading: false,
        });
        Swal.fire({
          icon: 'success',
          text: 'Aluno cadastrado com sucesso'
        })
        this.props.navigation.navigate('Listagem')
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          text: 'Um erro ocorreu'
        });
        console.error("Error occured: ", err);
        this.setState({
          isLoading: false,
        });
      });
    }
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="green"/>
        </View>
      )
    }
    return (
      <ScrollView style={styles.container}>
        <View style={styles.formEle}>
          <TextInput
              placeholder={'Nome'}
              value={this.state.name}
              onChangeText={(val) => this.onValUpdate(val, 'name')}
          />
        </View>
        <View style={styles.formEle}>
          <TextInput
              
              placeholder={'Curso'}
              value={this.state.course}
              onChangeText={(val) => this.onValUpdate(val, 'course')}
          />
        </View>
        <View style={styles.button}>
          <Button
            title='Salvar'
            onPress={() => this.addStudent()} 
            color="black"
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  formEle: {
    flex: 1,
    padding: 5,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#4e4e4e',
  },
  loading: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',    
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  }
})

export default CreateComponent;