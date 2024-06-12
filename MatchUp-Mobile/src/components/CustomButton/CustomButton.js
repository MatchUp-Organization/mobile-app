import { View, Text, StyleSheet, Pressable} from 'react-native'
import React from 'react'
import { Color, FontFamily, Border, FontSize } from "../../../GlobalStyles";
import Ionicons from 'react-native-vector-icons/Ionicons';
import google from '../../../assets/images/barca.png';


const CustomButton = ({ onPress, text, type = "PRIMARY", bgColor, fgColor }) => {
  return (
    <Pressable 
      onPress={onPress}
      style={[
        styles.container, 
        styles[`container_${type}`],
        bgColor ? { backgroundColor: bgColor } : {}
      ]}>
      {type === "SECONDARY" ? (
        <View style={{ flexDirection: 'row', alignItems: 'left',  }}>
          <Ionicons name="logo-google" size={16}  color= 'red' style={{ paddingRight: 8 }}/>
          
          <Text style={[styles.text, styles[`text_${type}`], fgColor ? { color: fgColor } : {}]}>
            {text}
          </Text>
        </View>
      ) : (
        <Text style={[styles.text, styles[`text_${type}`], fgColor ? { color: fgColor } : {}]}>
          {text}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create ({
    container: {
        width: '100%',
        padding: 15,
        marginVertical: 10,
        alignItems: 'center',
        borderRadius: 5,
        

    },

    container_PRIMARY:{
      backgroundColor: Color.colorSteelblue,
      width: '100%',
        padding: 15,
        marginVertical: 10,
        alignItems: 'center',
        borderRadius: 15,
        flex: 1,
        overflow: "hidden",
        borderColor: 'black',
    },

    container_TERTIARY:{
    },

    text: {
        fontWeight: ('bold', '300'),
        color: 'white',
        fontSize: 16,
        overflow: "hidden",
        flex: 1,

    },

    text_TERTIARY:{
      fontWeight: ('bold', "300"),
      color: 'grey',
      lineHeight: 16,
      fontFamily: FontFamily.robotoLight,
      fontSize: FontSize.size_base,
      marginTop: -25,

    },

    container_SECONDARY:{
      backgroundColor: 'white', // or any other color you want
      width: '100%',
      padding: 15,
      marginVertical: 10,
      alignItems: 'center',
      borderRadius: 10, // or any other border radius you want
      flex: 1,
      overflow: "hidden",
      borderColor: 'black', // or any other border color you want
      borderWidth: 1,
    },

      text_SECONDARY:{
      fontWeight: ('bold', "300"),
      color: 'black',
      lineHeight: 16,
      fontFamily: FontFamily.robotoLight,
      fontSize: FontSize.size_base,

    },

});
export default CustomButton