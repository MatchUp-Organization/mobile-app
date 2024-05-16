import React, {useState, useEffect} from 'react';
import { Text, View, Image, StyleSheet, useWindowDimensions, TextInput, Button} from 'react-native';
import Logo from '../../../assets/images/NewLogo.png';
import CustomInput from '../../components/customInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import { useNavigation, useRoute } from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import axios from "axios";

const SingIn = (data) => {
    const {height} = useWindowDimensions();
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const navigation = useNavigation();

    const {
      control, 
      handleSubmit, formState:{errors},
    } = useForm();

    console.log(errors);

    const createUser = async (username, password) => {
       try {
        const response = await axios.post("http://localhost:3001/users", {
        //  const response = await axios.post("http://172.20.10.2:3001/users", {
          username,
          password,
         });
      } catch (error) {
        console.error('Error fetching data:', error);
        // handle error
      }
    };
    

    const onSignInPressed = (data) => {

    //const onSignInPressed = async (data) => {
      setUsername(data.username);
      setPassword(data.password);
      createUser(data.username, data.password);

        alert("Log In Successful");
        console.log("username "+ username);
        console.log("password " + password);
        navigation.navigate('Home', {username});
      }

    const onForgotPasswordPressed = () => {
      navigation.navigate('ForgotPassword');
    }

    const onSignUpAccountPressed = () => {
      navigation.navigate('SignUp');
    }

    return (
      <View style={styles.root}>
        <Image
          source={Logo}
          style={[styles.logo, { height: height * 0.3 }]} resizeMode="contain" 
          />
        <Controller
          name="username"
          control={control}
          defaultValue=""
          render={({ field: { onChange, onBlur, value } }) => (
          <CustomInput
          name="username"
          placeholder= "Username" 
          control={control} 
          rules={{required: 'Username is required'}}
          onChangeText={onChange}
          onBlur={onBlur}
          value={value}
          />
          )}
        />
        <CustomInput 
        name="password"
        placeholder= "Password" 
        control={control} 
        rules={{required: 'Password is required', 
        minLength:{value: 3, 
          message:'Password should be minimum 3 characters long',
        },
      }}
        secureTextEntry
        />
        <CustomButton text= "Sign In" 
        onPress={handleSubmit(onSignInPressed)}
        />
        <CustomButton 
        text= "Forgot Password" 
        onPress={onForgotPasswordPressed}
        type= "TERTIARY"
        />

        <SocialSignInButtons />
        <CustomButton 
        text= "Don't have an account? Create One" 
        onPress={onSignUpAccountPressed}
        type= "TERTIARY"
        />  
      </View>
    );
}

const styles = StyleSheet.create({
    root: {
        padding: 25,
        alignItems: 'center',
    },
    logo: {
        borderRadius: 100,
        width: '50%',
        maxWidth: 300,
        maxHeight: 200,
      },
});

export default SingIn;