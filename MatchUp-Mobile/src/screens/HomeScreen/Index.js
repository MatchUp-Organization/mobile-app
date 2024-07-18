import { View, Dimensions, TouchableOpacity, StyleSheet, Image, Text, TextInput, Pressable, TouchableWithoutFeedback} from 'react-native'
import { useNavigation, useRoute} from '@react-navigation/native';
import React, { useState, useEffect, useRef} from 'react';
import * as ImagePicker from 'expo-image-picker';
import { NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons'
import moment from 'moment';
import Swiper from 'react-native-swiper';
import {useForm, Controller} from 'react-hook-form';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';


const tab = createBottomTabNavigator();
const { width, height } = Dimensions.get('window')

function SettingsScreen(){
  return (
    <View style={styles.container}>
      <Text style = {styles.text} >Settings</Text>
      <Text style = {styles.text} >Notification</Text>
      <Text style = {styles.text} >Share apps</Text>
      <Text style = {styles.text} >Privacy Policy</Text>
      <Text style = {styles.text} >Terms and Conditions</Text>
      <Text style = {styles.text} >Contact</Text>
      <Text style = {styles.text} >FeedBack</Text>
      <Text style = {[styles.text, styles.logout]} >Logout</Text>

    </View>
  );
}

function FootballScreen() {
  return (
    <View style={styles.footballContainer}>
      <Text style={styles.footballTitle}>Football</Text>
      <View style={styles.footballCardContainer}>
        <View style={styles.footballCard}>
          <Image source={require('../../../assets/images/football-player2.jpg.jpg')} style={styles.footballImage} />
          <View style={styles.footballCardContent}>
            <Text style={styles.footballCardTitle}>Football Teams</Text>
            <Text style={styles.footballCardDescription}>Create your teams.</Text>
            <TouchableOpacity style={styles.footballCardButton}>
              <Text style={styles.footballCardButtonText}>Go</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.footballCard}>
          <Image source={require('../../../assets/images/football-news.png')} style={styles.footballImage} />
          <View style={styles.footballCardContent}>
            <Text style={styles.footballCardTitle}>Football Scores</Text>
            <Text style={styles.footballCardDescription}>Check out the latest football scores and results.</Text>
            <TouchableOpacity style={styles.footballCardButton}>
              <Text style={styles.footballCardButtonText}>View Scores</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}


function BasketballScreen(){
  const [value, setValue] = useState(null);
  const [value_Field, setValue_Field] = useState(null); 
  
  const sport = [
    { label: 'Football', value: '1'},
    { label: 'Basketball', value: '2'},
    { label: 'Tennis', value: '3'},
    { label: 'Volleyball', value: '4'},
  ];

  const FootballField = [
    { label: 'Stade Foot a', value_Field: '1'},
    { label: 'Stade Foot b', value_Field: '2'},
    { label: 'Stade Foot c', value_Field: '3'},
    { label: 'Stade Foot d', value_Field: '4'},
  ];
  
  const BasketballField = [
    { label: 'Stade Basket a', value_Field: '1'},
    { label: 'Stade Basket b', value_Field: '2'},
    { label: 'Stade Basket c', value_Field: '3'},
    { label: 'Stade Basket d', value_Field: '4'},
  ];

  const [isFocus, setIsFocus] = useState(false);

  const { control, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission here
  };

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'blue' }]}>
          Select a sport
        </Text>
      );
    }
    return null;
  };
  
  const renderLabelField = () => {
    if (value_Field || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'blue' }]}>
          Select a Field
        </Text>
      );
    }
    return null;
  };
 

  const renderItem = item => {
    return (
      <View style={basket.item}>
        <Text style={basket.textItem}>{item.label}</Text>
        {item.value === value && (
          <AntDesign
            style={basket.icon2}
            color="green"
            name="Safety"
            size={20}
            
          />
        )}
      </View>
    );
  };

  const renderItemField = itemField => {
    return (
      <View style={basket.item}>
        <Text style={basket.textItem}>{itemField.label}</Text>
        {itemField.value_Field === value_Field && (
          <AntDesign
            style={basket.icon2}
            color="green"
            name="Safety"
            size={20}
            
          />
        )}
      </View>
    );
  };

  const [fieldData, setFieldData] = useState(FootballField);

  const handleSportChange = (item) => {
    setValue(item.value);
    if (item.value === '1') {
      setFieldData(FootballField);
    } else if (item.value === '2') {
      setFieldData(BasketballField);
    }
  };

  return (
    <View style={basket.container}>
      {/*... other components... */}

      <View style={basket.formContainer}>
      <Text style={[basket.formTitle, {textAlign: 'center'}]} >Create a game </Text>
        <Controller
          control={control}
          render={({ onChange, onBlur, value, placeholderTextColor}) => (
            <TextInput
              style={basket.input}
              placeholder="Name of the event"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholderTextColor={"black"}
            />
          )}
          name="name"
          rules={{ required: true }}
        />

{renderLabel()}
<Dropdown
      style={basket.dropdown}
      placeholderStyle={basket.placeholderStyle}
      selectedTextStyle={basket.selectedTextStyle}
      inputSearchStyle={basket.inputSearchStyle}
      iconStyle={basket.iconStyle}
      data={sport}
      search
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder="Select Sport"
      searchPlaceholder="Search..."
      value={value}
      onChange={handleSportChange}
      renderLeftIcon={() => (
        <AntDesign style={basket.icon} color="black" name="Safety" size={20} />
      )}
      renderItem={renderItem}
      />
{renderLabelField()}
<Dropdown
      style={basket.dropdown}
      placeholderStyle={basket.placeholderStyle}
      selectedTextStyle={basket.selectedTextStyle}
      inputSearchStyle={basket.inputSearchStyle}
      iconStyle={basket.iconStyle}
      data={fieldData}
      search
      maxHeight={300}
      labelField="label"
      valueField="value_Field"
      placeholder="Select Field"
      searchPlaceholder="Search..."
      value={value_Field}
      onChange={(item) => setValue_Field(item.value_Field)}
      renderLeftIcon={() => (
        <AntDesign style={basket.icon} color="black" name="Safety" size={20} />
      )}
      renderItem={renderItemField}
    />
      <Controller
          control={control}
          render={({ onChange, onBlur, value, placeholderTextColor}) => (
            <TextInput
              style={basket.input}
              placeholder="Price per person"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholderTextColor="black"

            />
          )}
          name="name"
          rules={{ required: true }}
        />


      </View>
    </View>
  );
}

const basket = StyleSheet.create({
  formContainer: {
    padding: 20,
    
  },
  formTitle: {
  
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  
  },
  input: {
    height: 44,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 10,
    backgroundColor: "#B2D5FF",
    borderRadius: 8,
    maxWidth: width - 20,  // Max width is screen width minus 40 pixels
    borderWidth: 1,
    borderRadius: 20,
    borderStyle: "solid",
    color: 'black',
    placeholderTextColor:"black"

  },
  

  dropdown: {
    height: 44,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 10,
    backgroundColor: "#B2D5FF",
    borderRadius: 8,
    maxWidth: width - 20,  // Max width is screen width minus 40 pixels
    borderWidth: 1,
    borderRadius: 20,
    borderStyle: "solid",
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  icon2: {
    marginLeft: 'auto', 
    
    
  },
  item: {
    height: 44,
    marginHorizontal: 4,
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderColor: '#e3e3e3',
    flexDirection: 'row',
    justifyContent: 'flex-start', 
    alignItems: 'center', 
  },
  textItem: {
    fontSize: 16,
    textAlign: 'left',
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    borderRadius: 20,
  },
});

function TennisScreen(){
  return (
    <View style={styles.container}>
      <Text> Tennis</Text>
    </View>
  );
}

const HomeScreen = () => {
    const route = useRoute();
    const [avatarImage, setAvatarImage] = useState(null);
    //Calendar 
    const swiper = useRef();
    const [value, setValue] = useState(new Date());
    const [week, setWeek] = useState(0);
    //Calendar
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
    //Calendar
    const weeks = React.useMemo(() => {
        const start = moment().add(week, 'weeks').startOf('week');
        return [-1, 0, 1].map(adj => {
          return Array.from({ length: 7 }).map((_, index) => {
            const date = moment(start).add(adj, 'week').add(index, 'day');
            return {
              weekday: date.format('ddd'),
              date: date.toDate(),
            };
          });
        });
      }, [week]);
    //Calendar
    return (
        <View style={styles.container}>
            <View style={styles.header}>
            <View style={{ flexDirection: 'row', alignItems: 'center,'}}>
            <Text style={styles.title}>Hello</Text>
            <TouchableOpacity style={styles.avatarContainer} onPress={pickImage}>
            <Image source={avatarImage ? { uri: avatarImage } : require('../../../assets/images/circle.png')} style={styles.circle} />
            </TouchableOpacity>
            </View>
        </View>
            
            <View style={styles.picker}>
          <Swiper
            index={1}
            ref={swiper}
            loop={false}
            showsPagination={false}
            onIndexChanged={ind => {
              if (ind === 1) {
                return;
              }
              setTimeout(() => {
                const newIndex = ind - 1;
                const newWeek = week + newIndex;
                setWeek(newWeek);
                setValue(moment(value).add(newIndex, 'week').toDate());
                swiper.current.scrollTo(1, false);
              }, 100);
            }}>
            {weeks.map((dates, index) => (
              <View style={styles.itemRow} key={index}>
                {dates.map((item, dateIndex) => {
                  const isActive =
                    value.toDateString() === item.date.toDateString();
                  return (
                    <TouchableWithoutFeedback
                      key={dateIndex}
                      onPress={() => setValue(item.date)}>
                      <View
                        style={[
                          styles.item,
                          isActive && {
                            backgroundColor: '#111',
                            borderColor: '#111',
                          },
                        ]}>
                        <Text
                          style={[
                            styles.itemWeekday,
                            isActive && { color: '#fff' },
                          ]}>
                          {item.weekday}
                        </Text>
                        <Text
                          style={[
                            styles.itemDate,
                            isActive && { color: '#fff' },
                          ]}>
                          {item.date.getDate()}
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  );
                })}
              </View>
            ))}
          </Swiper>
        </View>
        <View style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 24 }}>
          <Text style={styles.subtitle}>{value.toDateString()}</Text>
          <View style={styles.placeholder}>
            <View style={styles.placeholderInset}>
              {/* Replace with your content */}
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}>
            <View style={styles.btn}>
              <Text style={styles.btnText}>Schedule</Text>
            </View>
          </TouchableOpacity>
        </View>
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
                } else if (route.name == "Football") {
                    iconName = "search-outline";
                } else if (route.name == "Basketball") {
                    iconName = "calendar-outline";
                } else if (route.name == "Tennis") {
                    iconName = "person-circle-outline";
                } else if (route.name == "Settings") {
                    iconName = "settings-outline";
                }
                return <Ionicons name={iconName} size={size} color={focused ? "blue" : "black"} />;
            },
        tabBarStyle: {
            borderRadius: 100,
            marginLeft: "10%",
            marginRight: "10%",
            marginBottom: "5%",
        },
        })}
        >
        <tab.Screen name="Home" component={HomeScreen} />
        <tab.Screen name="Football" component={FootballScreen} />
        <tab.Screen name="Basketball" component={BasketballScreen} />
        <tab.Screen name="Tennis" component={TennisScreen} />
        <tab.Screen name="Settings" component={SettingsScreen} />
        </tab.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
  },
  header: {
    paddingHorizontal: 16,
  },

  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 12,
    
  },
  avatarContainer: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    paddingLeft: '60%',
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 50,
   
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'black',
    
  },
  
  champContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  footballContainer: {
    flex: 1,
    paddingHorizontal: '5%', // 5% of the screen width
    paddingVertical: '2vh', // 2% of the screen height
  },
  footballTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  footballCardContainer: {
    flexDirection: 'row',
    justifyContent: 'pace-between',
    flexWrap: 'wrap',
  },
  footballCard: {
    width: '48%',
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  footballImage: {
    width: '100%',
    height: 300,
    resizeMode: "cover",
  },
  footballCardContent: {
    padding: 20,
  },
  footballCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  footballCardDescription: {
    fontSize: 14,
    marginBottom: 15,
  },
  footballCardButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  footballCardButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  picker: {
    maxHeight: 74,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#999999',
    marginBottom: 12,
  },
  footer: {
    marginTop: 'auto',
    paddingHorizontal: 16,
  },
  /** Item */
  item: {
    flex: 1,
    height: 50,
    marginHorizontal: 4,
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#e3e3e3',
    flexDirection: 'column',
    alignItems: 'center',
  },
  itemRow: {
    width: width,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  itemWeekday: {
    fontSize: 13,
    fontWeight: '500',
    color: '#737373',
    marginBottom: 4,
  },
  itemDate: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111',
  },
  /** Placeholder */
  placeholder: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    height: 400,
    marginTop: 0,
    padding: 0,
    backgroundColor: 'transparent',
  },
  placeholderInset: {
    borderWidth: 4,
    borderColor: '#e5e7eb',
    borderStyle: 'dashed',
    borderRadius: 9,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  /** Button */
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#007aff',
    borderColor: '#007aff',
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },


});

export default NavigationBar;