import React, { Component } from 'react';

import firebase from '../config/firebaseConnection';
import { Button, ActivityIndicator, View, StyleSheet, TextInput, ScrollView } from 'react-native';
import Swal from 'sweetalert2'; 

class UpdateComponent extends Component {
  constructor() {
    super();
    this.state = {
      key: '',
      name: '',
      course: '',
      isLoading: false
    };
  }
 
  componentDidMount() {
    const docRef = firebase.firestore().collection('students').doc(this.props.route.params.userkey)
    docRef.get().then((res) => {
      if (res.exists) {
        const user = res.data();
        this.setState({
          key: res.id,
          name: user.name,
          course: user.course,
          isLoading: false
        });
      } else {
        console.log("No document found.");
      }
    });
  }

  inputEl = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  editarProduto() {
    if(this.state.name === ''){
      Swal.fire({
        icon: 'info',
        text: 'É nescessario colocar um nome'
      })
    } else {
    this.setState({
      isLoading: true,
    });
    const docUpdate = firebase.firestore().collection('students').doc(this.state.key);
    docUpdate.set({
      name: this.state.name,
      course: this.state.course,
    }).then((docRef) => {
      this.setState({
        key: '',
        name: '',
        course: '',
        isLoading: false
      });
      Swal.fire({
        icon: 'success',
        text: 'Aluno atualizado com sucesso'
      })
      this.props.navigation.navigate('Listagem2');
    })
    .catch((error) => {
      console.error(error);
      this.setState({
        isLoading: false,
      });
    });
  }
  }

  deleteStudent() {
    const docRef = firebase.firestore().collection('students').doc(this.props.route.params.userkey)
      docRef.delete().then((res) => {
        Swal.fire({
          icon: 'success',
          text: 'Aluno deletado com sucesso'
        })
          this.props.navigation.navigate('Listagem2');
      })
  }

  alertDialog=()=>{
    Swal.fire({
      text: 'Deseja deletar este cadastro?',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Sim',
      denyButtonText: 'Não'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.deleteStudent()
      } else if (result.isDenied) {
        Swal.fire('', 'Não Foi deletado', 'info')
      }
    })
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
      <ScrollView style={styles.container}>
        <View style={styles.formEl}>
          <TextInput
              placeholder={'Nome'}
              value={this.state.name}
              onChangeText={(val) => this.inputEl(val, 'name')}
          />
        </View>
        <View style={styles.formEl}>
          <TextInput
              placeholder={'Course'}
              value={this.state.course}
              onChangeText={(val) => this.inputEl(val, 'course')}
          />
        </View>
        <View style={styles.button}>
          <Button
            title='Alterar'
            onPress={() => this.editarProduto()} 
            color="green"
          />
          </View>
         <View>
          <Button
            title='Excluir'
            onPress={this.alertDialog}
            color="red"
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35
  },
  formEl: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  loader: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',    
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  button: {
    marginBottom: 8, 
  }
})

export default UpdateComponent;