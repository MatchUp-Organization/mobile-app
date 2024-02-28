import { View, Text, StyleSheet} from 'react-native'
import React, {useState} from 'react'
import CustomInput from '../../components/customInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import { useNavigation } from '@react-navigation/native';
import {useForm} from'react-hook-form';


    const NewPassword = () => {

    const {control, handleSubmit, watch} = useForm ();

    //const [code, setCode] = useState('');
    //const [NewPassword, setNewPassword] = useState ('');
    const navigation =useNavigation();

    const onSubmitPressed = () => {
      navigation.navigate('Home');
    };

    const onSignInPressed = () => {
      navigation.navigate('SignIn');
    };

    return (
      <View style={styles.root}>
        <Text style= {styles.title}>New Password
        </Text>

        <CustomInput 
        name="code"
        control={control}
        placeholder= "Code" 
        //value={code} 
        //setValue={setCode}
        />

        <CustomInput
        name="new-password"
        control={control}
        placeholder= "New Password" 
        secureTextEntry
        rules={{
          required: 'Password is required', 
          minLength: {
            value: 4, 
            message: 'Password should be at least 4 characters !',
          },
        }} 
        /> 
      

        <CustomButton text= "Submit" onPress={ handleSubmit(onSubmitPressed)}/>

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

export default NewPassword;