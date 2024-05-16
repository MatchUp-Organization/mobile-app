import { View, Text } from 'react-native';
import React from 'react';
import CustomButton from '../CustomButton';
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from '@react-navigation/native';



const SocialSignInButtons = () => {
  const [userInfo, setUserInfo] = React.useState(null);
  WebBrowser.maybeCompleteAuthSession();
  const navigation = useNavigation();
  const [request, response, promptAsync] = Google.useAuthRequest({

    webClientId: "871816637044-ejvmsf74rnf29sludjqr7t60tne94sam.apps.googleusercontent.com",
    scopes: ["profile", "email"]
  });


  const onSignInGoogle = async () => {
    try {
      // Attempt to retrieve user information from AsyncStorage
      const userJSON = await AsyncStorage.getItem("user");
  
      if (userJSON) {
        // If user information is found in AsyncStorage, parse it and set it in the state
        setUserInfo(JSON.parse(userJSON));
      } else if (response?.type === "success") {
        // If no user information is found and the response type is "success" (assuming response is defined),
        // call getUserInfo with the access token from the response
        getUserInfo(response.authentication.accessToken);
      }
    } catch (error) {
      // Handle any errors that occur during AsyncStorage retrieval or other operations
      console.error("Error retrieving user data from AsyncStorage:", error);
    }
    console.log("user", user);

  //add it to a useEffect with response as a dependency 
  useEffect(() => {
    onSignInGoogle();
  }, [response]);
  
  //log the userInfo to see user details
  console.log(JSON.stringify(userInfo))
  };

  const getUserInfo = async (token) => {
    //absent token
    if (!token) return;
    //present token
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const user = await response.json();
      //store user information  in Asyncstorage
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
      
    } catch (error) {
      console.error(
        "Failed to fetch user data:",
        response.status,
        response.statusText
      );
    }
  };

    const onSignInFacebook = () => {
      console.warn("Facebook");
    }
    const onSignInApple= () => {
      console.warn("Apple");
      navigation.navigate('Home');
    }

  return (
  <>
      <CustomButton 
      text= "Sign In With Facebook" 
      onPress={onSignInFacebook}
      bgColor="#E7EAF4"
      fgColor="#4765A9"
      />
      
      <CustomButton 
      text= "Sign In With Google" 
      onPress={onSignInGoogle => {promptAsync()}}
      bgColor="#FAE9EA"
      fgColor="#DD4D44"
      />

      <CustomButton 
      text= "Sign In with Apple" 
      onPress={onSignInApple}
      bgColor="#E3E3E3"
      fgColor="#363636"
      />    
  </>
)
}

export default SocialSignInButtons