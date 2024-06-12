import React, {useState} from 'react';
import { Text, View, StyleSheet, useWindowDimensions, TextInput, Button} from 'react-native';
import CustomInput from '../../components/customInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import { useNavigation } from '@react-navigation/native';
import {useForm} from'react-hook-form';
import axios from 'axios';

const SignUp = () => {
    const {control, handleSubmit, watch} = useForm ();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email,  setEmail] = useState("");
    
    const pwd = watch('password');

    const navigation = useNavigation();

    const onRegisterPressed = async (data) => {
      setUsername(data.username);
      setPassword(data.password);
      setEmail(data.email);
      console.log(resp.data);
      alert("Registered  Successfully");
      navigation.navigate('Home');
    }

    const onSignInPressed = (data) => {
      setUsername(data.username);
      setPassword(data.password);
      setEmail(data.email);
      navigation.navigate('SignIn');
    }

    return (
      <View style={styles.root}>
        <Text style= {styles.title}>Create New account
        </Text>

        <CustomInput
        name="username"
        control={control}
        placeholder= "Username"
        type= "SECONDARY"
        rules={{
          required: 'Username is required', 
          minLength: {
            value: 4, 
            message: 'Username should be at least 4 characters !',
          },
        }} 
        />
        <CustomInput

        name="email"
        control={control}
        placeholder= "Email" 
        type= "SECONDARY"

       
        />
        <CustomInput
        name="password"
        control={control}
        type= "SECONDARY"
        placeholder= "Password" 
        secureTextEntry
        rules={{
          required: 'Password is required', 
          minLength: {
            value: 4, 
            message: 'Password should be at least 4 characters !',
          },
        }} 

        />
        <CustomInput
        name="password-repeat"
        type= "SECONDARY"

        control={control}
        placeholder= "Repeat Password" 
        secureTextEntry
        rules={{
          validate: value =>
          value == pwd || 'Password do not match',
        }} 
        />

        <CustomButton text= "Register" onPress={ handleSubmit(onRegisterPressed)}/>
        
        <Text style={styles.text}> By registering, you confirm that you accept 
        <Text style={styles.link}> our Terms of Use </Text> and 
        <Text style={styles.link}> Privacy Policy</Text>
        </Text>

        {/* <SocialSignInButtons /> */}


        <CustomButton 
text={
  <Text>
    Have an account ? <Text style={{ color: 'red' }}>Sign In</Text>
  </Text>
}        
        onPress={onSignInPressed}
        type= "TERTIARY"
        />  

      </View>

      
    );
  };


const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 25,

    },
    
    title: {
      fontSize: 24,
      fontWeight:'bold',
      color: '#051C60',
      margin: 10,
    },

    text: {
      color: 'grey',
      marginVertical: 10,
    },

    link:{
      color: '#FDB075',
    },
});


export default SignUp;