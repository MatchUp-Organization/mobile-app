import * as React from "react";
import { StyleSheet, View, Image, Text, Pressable, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, Border, FontSize } from "../../../GlobalStyles";

const Splashscreen = () => {
  const navigation = useNavigation();

  return (
      <View style={styles.root}>
      <Image
        style={styles.logoMatchup1Icon}
        resizeMode="cover"
        source={require("../../../assets/images/logo-simple.png")}
      />
      <Text style={styles.matchup}>MatchUp</Text>
      <Text style={styles.tonSportTa}>
        Ton sport, ta communauté, ton succès
      </Text>
       <Pressable
        style={[styles.signUpSection]}
        onPress={() => navigation.navigate("SignIn")}
      >
        <Text style={[styles.start]}>Start !</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 50,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    paddingBottom:25,
},
  
start: {
  color: Color.white,
  fontWeight: "600",
  fontSize: 32,
  lineHeight: 16,
  fontFamily: FontFamily.openSansSemiBold,
  paddingTop: "50%"
  

},
 signUpSection: {
  backgroundColor: Color.colorSteelblue,
  paddingHorizontal: 100,
  paddingBottom: 25,
  marginTop: 100,
  borderRadius: Border.br_xl,
  display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  // ...
},
  tonSportTa: {
    alignItems: 'center',
    textAlign: "center",
    fontSize: FontSize.size_base,
    fontWeight: "700",
    fontFamily: FontFamily.openSansBold,
    color: Color.colorBlack,
    lineHeight: 16,
  },
  logoMatchup1Icon: {
    alignItems: 'center',
    top: 135,
    width: 231,
    height: 246,
    position: "absolute",
    resizeMode: 'contain', // Use contain to scale the image
    marginBottom: 50,

  },
  matchup: {
    alignItems: 'center',
    fontSize: FontSize.size_5xl,
    fontFamily: FontFamily.latoRegular,
    color: Color.colorSteelblue,
    display: "flex",
    
    textAlign: "center",
    marginTop: "50%",
  },
  splashscreen: {
    width: '100%',
    height: '100%',
    overflow: "hidden",
    backgroundColor: Color.white,
    borderRadius: Border.br_xl,
  },
});



export default Splashscreen;