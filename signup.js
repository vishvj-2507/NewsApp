import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  BackHandler,
  ImageBackground,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
export default function SignUp({navigation}) {
  const [Username, setUsername] = useState('');
  const [email, setEmail] = useState();
  const [Contact, setContact] = useState();
  const [Password, setPassword] = useState();
  const [CPassword, setCPassword] = useState();
  const [login, setlogin] = useState(0);
  async function store() {
    await AsyncStorage.setItem('Uname', Username);
    await AsyncStorage.setItem('Em', email);
    await AsyncStorage.setItem('Con', Contact);
  }
  function validateUsername(Username) {
    if (Username == '') {
      alert('Enter the valid username');
      navigation.navigate('Signup');
    } else {
      return true;
    }
  }
  function validateEmail(email) {
    if (!email) {
      alert('Enter valid Email id');
      navigation.navigate('Signup');
    }
    // else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    //    alert('Invalid email address');
    //    navigation.navigate('Signup');
    // }
    return true;
  }
  function log() {
    var log = 2;
    var log1 = log + 1;
    setlogin(log);
    // console.log(login);
  }
  function getcontact(Contact) {
    return Contact;
  }
  function validateContact() {
    let val = getcontact(Contact);
    if (val.length != 10 || val == '') {
      alert('Enter the valid contact number');
      navigation.navigate('Signup');
    }
  }
  function pass(Password, CPassword) {
    if (Password != CPassword) {
      alert('check the password');
      navigation.navigate('Signup');
    } else {
      return true;
    }
  }
  function handleBackButtonClick() {
    navigation.goBack();
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
  function full() {
    navigation.navigate('Navigator');
    validateUsername(Username);
    store();
    validateEmail('email');
    pass(Password, CPassword);
    validateContact();
    validateEmail(email);
    log();
  }
  return (
    <ImageBackground
      source={require('./assets/login_bg.png')}
      resizeMode="cover"
      style={styles.bgimage}>
      <ScrollView>
        <View style={styles.container}>
          <View>
            <Text style={styles.sign}>SignUp</Text>
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="UserName"
              placeholderTextColor="#003f5c"
              onChangeText={Username => setUsername(Username)}
            />
          </View>

          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Contact Number"
              placeholderTextColor="#003f5c"
              keyboardType="numeric"
              onChangeText={Contact => setContact(Contact)}
            />
          </View>

          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Email"
              placeholderTextColor="#003f5c"
              onChangeText={email => setEmail(email)}
            />
          </View>

          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Password"
              placeholderTextColor="#003f5c"
              secureTextEntry={true}
              onChangeText={Password => setPassword(Password)}
            />
          </View>

          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Confirm Password"
              placeholderTextColor="#003f5c"
              secureTextEntry={true}
              onChangeText={CPassword => setCPassword(CPassword)}
            />
          </View>

          <TouchableOpacity style={styles.signupBtn} onPress={() => full()}>
            <Text style={styles.loginText}>SIGNUP</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.ald}>Already have an account?</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: hp('110'),
    fontSize: RFValue(13),
  },
  inputView: {
    backgroundColor: '#FFC0CB',
    borderRadius: 30,
    width: wp('60'),
    height: hp('6'),
    marginBottom: 20,
    alignItems: 'center',
  },
  bgimage: {
    width: '100%',
    height: 750,
    resizeMode: 'cover',
    flex: 1,
  },
  sign: {
    alignItems: 'center',
    marginBottom: 30,
    // justifyContent: 'center',
    fontSize: 29,
    color: '#000',
    fontWeight: 'bold',
  },
  ald: {
    height: hp('6'),
    marginTop: 20,
    color: '#000',
  },
  signupBtn: {
    width: wp('45'),
    borderRadius: 25,
    height: hp('6'),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    backgroundColor: '#FF1493',
  },
  loginText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
