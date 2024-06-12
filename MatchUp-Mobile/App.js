import { StatusBar } from 'expo-status-bar';
import {SafeAreaView, StyleSheet, Text, View } from 'react-native';
import SingIn from './src/screens/SingIn';
import SignUp from './src/screens/SignUp';
import ForgotPassword from './src/screens/ForgotPassword';
import NewPassword from './src/screens/NewPassword';
import Navigation from './src/navigation/index';
import Axios from "axios";
import { CreateBottomTabNavigator} from  '@react-navigation/bottom-tabs';


const App = () => {
  return (
    <SafeAreaView style={styles.root}>
      <Navigation />

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
});

export default App;