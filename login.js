import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  BackHandler,
  ImageBackground,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Login({navigation}) {
  const [Username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  async function store() {
    await AsyncStorage.setItem('uname', Username);
  }
  function validateUsername(Username) {
    if (Username == '') {
      alert('Enter  valid username');
      navigation.navigate('Login');
    } else {
      return true;
    }
  }
  function pass(password) {
    if (!password) {
      alert('Enter valid password');
      navigation.navigate('Login');
    }
  }
  function full() {
    navigation.navigate('Navigator');
    store();
    validateUsername(Username);
    pass(password);
  }
  function handleBackButtonClick() {
    BackHandler.exitApp();
    return false;
  }
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);
  return (
    <ImageBackground
      source={require('./assets/login_bg.png')}
      resizeMode="cover"
      style={styles.bgimage}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require('./assets/login_logo.png')}
        />

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Username"
            placeholderTextColor="#003f5c"
            onChangeText={Username => setUsername(Username)}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Password"
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={password => setPassword(password)}
          />
        </View>

        <TouchableOpacity style={styles.loginBtn} onPress={() => full()}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('OTP')}>
          <Text style={styles.forgot_button}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.acc}>Create new account</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: RFValue(13),
    margin: 0,
  },
  bgimage: {
    width: '100%',
    height: 750,
    resizeMode: 'cover',
    flex: 1,
  },
  image: {
    marginBottom: 5,
    width: wp('95'),
    height: hp('45'),
  },

  inputView: {
    backgroundColor: '#FFC0CB',
    borderRadius: 30,
    width: wp('70'),
    height: hp('7'),
    marginBottom: 20,
    alignItems: 'center',
  },

  TextInput: {
    height: hp('30'),
    flex: 1,
    padding: 0,
    marginLeft: 0,
  },

  forgot_button: {
    height: hp('5'),
    //marginBottom:10
    color: '#000',
  },
  loginText: {
    color: '#000',
    fontSize: 15,
  },
  acc: {
    color: '#000',
  },
  cbutton: {
    height: hp('5'),
  },

  loginBtn: {
    width: wp('50'),
    borderRadius: 15,
    height: hp('7'),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    backgroundColor: '#FF1493',
    color: '#000',
  },
});
