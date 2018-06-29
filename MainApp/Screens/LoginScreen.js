import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, StatusBar, Alert, TextInput} from 'react-native';

import firebase from '../firebase';

class LoginScreen extends React.Component{
  constructor(props) {
     super(props);

     this.state = {
       email: '',
       password: '',
     };
   }

   onLogin() {
     this.setState({ error: '', loading: true });
     const { email, password } = this.state;
     firebase.auth().signInWithEmailAndPassword(email, password)
         .then(() => {
             this.setState({ error: '', loading: false });


         },(error) =>{
           Alert.alert(error.message);
         }
         )
         .catch(() => {
             this.setState({ error: 'Authentication failed', loading: false });

         })

     Alert.alert('Credentials', `${email} + ${password}`);
     this.props.navigation.navigate('AccountScreen')
   }

   onSignUp() {
     this.props.navigation.navigate('SignUpScreen')
   }

   render() {
     return (
       <View style={styles.container}>
         <TextInput
           value={this.state.email}
           onChangeText={ (email) => this.setState({ email })}
           placeholder={'email'}
           style={styles.input}
         />
         <TextInput
           value={this.state.password}
           onChangeText={(password) => this.setState({ password })}
           placeholder={'Password'}
           secureTextEntry={true}
           style={styles.input}
         />

         <Button
           title={'Login'}
           style={styles.input}
           onPress={this.onLogin.bind(this)}
         />
         <Button
           title={'New User? SignUp'}
           style={styles.input}
           onPress={this.onSignUp.bind(this)}
         />
       </View>
     );
   }
 }

export default LoginScreen;


const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  input: {
    borderRadius: 9,
    width: 300,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
});
