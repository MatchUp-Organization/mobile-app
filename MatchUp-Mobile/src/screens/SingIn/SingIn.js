import React, {useState, useEffect} from 'react';
import { Text, View, Image, StyleSheet, useWindowDimensions, TextInput, Button} from 'react-native';
import Logo from '../../../assets/images/NewLogo.png';
import CustomInput from '../../components/customInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import { useNavigation, useRoute } from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import axios from "axios";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from 'react-native';
import { Color, FontFamily, Border, FontSize } from "../../../GlobalStyles";


const SingIn = (data) => {
    const {height} = useWindowDimensions();
    WebBrowser.maybeCompleteAuthSession();
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const [id, setId] = useState('');


    const [token, setToken] = useState("");
    const [userInfo, setUserInfo] = useState(null);
    const [request, response, promptAsync] = Google.useAuthRequest({
     //APIprincipale webClientId: "871816637044-ejvmsf74rnf29sludjqr7t60tne94sam.apps.googleusercontent.com",
      webClientId: "328673821687-j5kcj9rl3hm7230n3njt3qrnff4cof26.apps.googleusercontent.com",
    //expoClientId: "871816637044-74uvfa2epj1vpr0qc3883l4s8mv0q5g7.apps.googleusercontent.com",
      iosClientId: "871816637044-esekd2fr8ci43gp9l7aou6nlhdi6nnln.apps.googleusercontent.com",
      androidClientId: "871816637044-taf445l6c45fgje4odbc1hhvfisnmm5h.apps.googleusercontent.com",
      scopes: ["profile", "email"]
      },
    );

    useEffect(() => {
      handleEffect();
    }, [response, token]);
    async function handleEffect() {
      const user = await getLocalUser();
      console.log("user", user);
      if (!user) {
        if (response?.type === "success") {
          setToken(response.authentication.accessToken);
          getUserInfo(response.authentication.accessToken);
        }
      } else {
        setUserInfo(user);
        setUsername(user.name);
        setId(user.id);

        console.log("loaded locally");
      }
    }

    const getLocalUser = async () => {
      const data = await AsyncStorage.getItem("@user");
      if (!data) return null;
      return JSON.parse(data);
    };
  
    const getUserInfo = async (token) => {
      if (!token) return;
      try {
        const response = await fetch(
          "https://www.googleapis.com/userinfo/v2/me",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const user = await response.json();
        await AsyncStorage.setItem("@user", JSON.stringify(user));
        setUserInfo(user);
        setUsername(userInfo.name);
      } catch (error) {
        // Add your own error handler here
      }
    };

    const {
      control, 
      handleSubmit, formState:{errors},
    } = useForm();

    console.log(errors);

    


    const createUser = async (username, password) => {
       try {
        const response = await axios.post("http://localhost:3001/users", {
          //const response = await axios.post("http://172.20.10.2:3001/users", {
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
      //navigation.navigate('ForgotPassword');
      navigation.navigate('SplashScreen');
    }

    const onSignUpAccountPressed = () => {
      navigation.navigate('SignUp');
    }
    
    const onSignInGoogle = async (user) => {
      const userData = {
        name: user.name,
        email: user.email,
        picture: user.picture,
        id: user.id,
      };

      try {
        const response = await axios.post("http://localhost:3001/users", {
          //const response = await axios.post("http://172.20.10.2:3001/users", {
         });
      } catch (error) {
        console.error('Error fetching data:', error);
        // handle error
      }
    //navigation.navigate('Home', username)
    navigation.navigate('Home');    
    alert("HEY");      
    };

    return (
      <View style={styles.root}>
          <Text style={[styles.welcomeBack]}>Welcome Back !</Text>
          <Text style={[styles.pleasesign]}>Please Sign Into Your Account</Text>

          <ScrollView contentContainerStyle={styles.root}>

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
          placeholder= "Enter Username" 
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
        placeholder= "Enter Password" 
        control={control} 
    
        rules={{required: 'Password is required', 
        minLength:{value: 3, 
          message:'Password should be minimum 3 characters long',
        },
      }}
        secureTextEntry
        />
        <CustomButton 
        text= "Forgot Password" 
        onPress={onForgotPasswordPressed}
        type= "TERTIARY"
        fgColor={'red'}
        />

        <CustomButton text= "Sign In" 
        onPress={handleSubmit(onSignInPressed)}
        />
        
        <CustomButton
        text="Sign In With Google"  
        type="SECONDARY" 
        onPress={async () => {
          const response = await promptAsync({ useProxy: false, showInRecents: true });
          onSignInGoogle(response);
        }}        />

        {/* <SocialSignInButtons/> */}
        <View style={styles.root}>
      {!userInfo ? (
        <Button
      title="Sign in with Google"
      disabled={!request}
      onPress={async () => {
        const response = await promptAsync({ useProxy: false, showInRecents: true });
        onSignInGoogle(response);
      }}
    />
      ) : (
        <View style={styles.card}>
          {userInfo?.picture && (
            <Image source={{ uri: userInfo?.picture }} style={styles.image} />
          )}
          <Text style={styles.text}>Email: {userInfo.email}</Text>
          <Text style={styles.text}>
            Verified: {userInfo.verified_email ? "yes" : "no"}
          </Text>
          <Text style={styles.text}>Name: {userInfo.name}</Text>
          <Text style={styles.text}>Id: {userInfo.id}</Text>


          {/* <Text style={styles.text}>{JSON.stringify(userInfo, null, 2)}</Text> */}
        </View>
      )}
      <Button
        title="remove local store"
        onPress={async () => await AsyncStorage.removeItem("@user")}
      />

        </View>

        <CustomButton
  text={
    <Text>
      Don't have an account ? <Text style={{ color: 'red' }}>Sign Up</Text>
    </Text>
  }
  onPress={onSignUpAccountPressed}
  type="TERTIARY"
/>  
          </ScrollView>
          
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
        width: 216,
      },
      container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      },
      text: {
        fontSize: 20,
        fontWeight: "bold",
      },
      card: {
        borderWidth: 1,
        borderRadius: 15,
        padding: 15,
      },
      image: {
        width: 100,
        height: 100,
        borderRadius: 50,
      },
      welcomeBack: {
        fontSize: FontSize.size_5xl,
        fontFamily: FontFamily.openSansBold,
        fontWeight: "700",
        lineHeight: 24,
        top: 20,
        textAlign: "center",
        position: "absolute",
        fontSize: 32,
        alignItems: 'center',
      },
      pleasesign: {
        top: 40,
        left: 0,
        color: Color.colorGray_100,
        lineHeight: 16,
        fontFamily: FontFamily.robotoLight,
        fontWeight: "300",
        fontSize: FontSize.size_base,
      },
});

export default SingIn;