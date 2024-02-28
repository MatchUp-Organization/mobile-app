import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native'
import React from 'react'

const NavigationBar = () => {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.iconContainer} activeOpacity={0.7}>
          <Text style={styles.iconText}>Home</Text>
        </TouchableOpacity>
  
        <TouchableOpacity style={styles.iconContainer} activeOpacity={0.7}>
          <Text style={styles.iconText}>Search</Text>
        </TouchableOpacity>
  
        <TouchableOpacity style={styles.iconContainer} activeOpacity={0.7}>
          <Text style={styles.iconText}>Chat</Text>
        </TouchableOpacity>
  
        <TouchableOpacity style={styles.iconContainer} activeOpacity={0.7}>
          <Text style={styles.iconText}>Users</Text>
        </TouchableOpacity>
      </View>
   );
  };

const styles = StyleSheet.create({
    container: {
       flexDirection: 'row',
       justifyContent: 'space-around',
       alignItems: 'center',
       backgroundColor: '#f0f0f0',
       paddingTop: 10,
       paddingBottom: 10,
       position: 'absolute',
       bottom: 0,
       left: 0,
       right: 0,
    },
    iconContainer: {
       alignItems: 'center',
       justifyContent: 'center',
       padding: 10,
    },
    iconText: {
       fontSize: 24,
    },
   });
  
  export default NavigationBar;
  