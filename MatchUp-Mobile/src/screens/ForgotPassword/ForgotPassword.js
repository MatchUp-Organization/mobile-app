import { View, Text, StyleSheet} from 'react-native'
import React, {useState} from 'react'
import CustomInput from '../../components/customInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import { useNavigation } from '@react-navigation/native';
import {useForm} from 'react-hook-form';

    const ForgotPassword = () => {

    const [username, setUsername] = useState('');
    
    const {control, handleSubmit, watch} = useForm ();
    
    const navigation =useNavigation();

    const onSendPressed = () => {
      navigation.navigate('NewPassword');
    };

    const onSignInPressed = () => {
      navigation.navigate('SignIn');
    };

    return (
      <View style={styles.root}>
        <Text style= {styles.title}>Reset Your Password
        </Text>

        <CustomInput
        name="username"
        control={control}
        placeholder= "Username"
        rules={{
          required: 'Username is required', 
          minLength: {
            value: 4, 
            message: 'Username should be at least 4 characters !',
          },
        }} 
        />
      

        <CustomButton text= "Send" onPress={handleSubmit(onSendPressed)}/>

        <CustomButton 
        text= "Back to Sign In" 
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
      padding: 25,
    },

    text: {
      color: 'grey',
      marginVertical: 10,
    },

    link:{
      color: '#FDB075',
    },
});

export default ForgotPassword;