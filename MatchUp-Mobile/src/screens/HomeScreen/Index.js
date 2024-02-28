import { View, TouchableOpacity, StyleSheet, Image, Text, ScrollView, TextInput } from 'react-native'
 import CustomInput from '../../components/customInput';
 import SignIn from '../../screens/SingIn';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Modal } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons'

const tab = createBottomTabNavigator();

function SettingsScreen(){
  return (
    <View style={styles.container}>
      <Text> Settings</Text>
    </View>
  );
}

const HomeScreen = () => {
  const route = useRoute();
  //const {username} = route.params;
  const [avatarImage, setAvatarImage] = useState(null);
  const [ageVisible, setAgeVisible] = useState(false);
  const [age, setAge] = useState('');
  const [cityVisible, setCityVisible] = useState(false);
  const [city, setCity] = useState('');


  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setAvatarImage(result.uri);
    }
  };
return (
  <View style={styles.root}>
      <Text style={styles.root}> Profile</Text>

      <TouchableOpacity style={styles.avatarContainer} onPress={pickImage}>
        <Image source={avatarImage ? { uri: avatarImage } : require('../../../assets/images/circle.png')} style={styles.circle} />
      </TouchableOpacity>
      {/* <Text style={styles.username}>{username}</Text> */}
      <View style={styles.champContainer}>
        <TouchableOpacity style={styles.champLabelContainer} onPress={() => setAgeVisible(!ageVisible)}>
          <Text style={styles.champLabel}>Age:</Text>
          {ageVisible && <TextInput style={styles.champInput} placeholder="Enter age" value={age} onChangeText={text => setAge(text)} />}
          {age.length > 0 && !ageVisible && <Text style={styles.champValue}>{age}</Text>}
        </TouchableOpacity>
        <TouchableOpacity style={styles.champLabelContainer} onPress={() => setCityVisible(!cityVisible)}>
          <Text style={styles.champLabel}>City:</Text>
          {cityVisible && <TextInput style={styles.champInput} placeholder="Enter city" value={city} onChangeText={text => setCity(text)} />}
          {city.length > 0 && !cityVisible && <Text style={styles.champValue}>{city}</Text>}
        </TouchableOpacity>
        <Text style={styles.champ}>Sessions:</Text>
      </View>
      <Text style={styles.team}> Favorite Team</Text>
      <Text style={styles.team}> Favorites Sports</Text>

    </View>
);
};

const NavigationBar = () => {
  return (
    <NavigationContainer independent={true}>
    <tab.Navigator
  screenOptions={({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;
      if (route.name == "Home") {
        iconName = "home";
      } else if (route.name == "Settings") {
        iconName = "settings-outline";
      }
      return <Ionicons name={iconName} size={size} color={focused ? "green" : "black"} />;
    },
  })}
>
  <tab.Screen name="Home" component={HomeScreen} />
  <tab.Screen name="Settings" component={SettingsScreen} />
</tab.Navigator>
  </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 10,
    alignItems: 'center',
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  avatarContainer: {
    marginBottom: 20,
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'black',
  },
  username: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  team: {
    marginTop: 30,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  champContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  champLabelContainer: {
    width: '30%',
  },
  champLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  champInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  champ: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    width: '30%',
  },
  champValue: {
    fontSize: 14,
    fontWeight: 'bold',
    width: '30%',
  },
});

export default NavigationBar;