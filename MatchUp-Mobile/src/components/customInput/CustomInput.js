import { View, Text, TextInput, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import { Controller } from 'react-hook-form';

const { width: screenWidth } = Dimensions.get('window');


const CustomInput = ({control, name, rules ={}, placeholder, secureTextEntry, type = "PRIMARY"}) => {
  return (
      <Controller 
        control={control}
        name={name}
        rules={rules}
        render={({field:{value, onChange, onBlur}, fieldState:{error}}) => (
        <>
        <View 
          style = {[
            styles.container, 
            {borderColor: error ? 'red': 'black'
          }]}>
        <TextInput 
        
          value={value} 
          onChangeText={onChange} 
          onBlur={onBlur} 
          placeholder={placeholder}
           
          style= {styles[`text_${type}`]}
          secureTextEntry={secureTextEntry}
          />
        </View>
        {error && (
        <Text style ={{color: 'red', alignSelf:'stretch'}}>{error.message || 'Error'}</Text>
        )}
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EDF6F2",
    maxWidth: screenWidth - 20,  // Max width is screen width minus 40 pixels
    width: '100%',  // Take up full width,
    borderWidth: 1,
    borderRadius: 20,
    borderStyle: "solid",
    paddingHorizontal: 10,
    marginVertical: 10,
    height: 60,
    

  },
  text_PRIMARY: {
    letterSpacing: 0.8,
    marginLeft: "6.31%",
    marginTop: "10%",
    
  },

  text_SECONDARY: {
    letterSpacing: 0.8,
    marginTop: "2%",
    marginLeft: "3%",


  },
});

export default CustomInput