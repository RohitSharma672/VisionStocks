import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,  } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Icon from '../../utility/icon';
import { colors } from '../../utility/colors';
import { fp, hp, wp } from '../../utility/dimensions';
import { Checkbox } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from '../../context/AuthContext';


const LoginScreen = () => {

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [type, setType] = useState(false); // false for email, true for phone
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  const { setIsLoggedIn } = useContext(AuthContext);

  const handleLogin = async () => {
    // Basic validation
    if (type && !phone) {
      Alert.alert('Error', 'Please enter phone number');
      return;
    }

    if (!type && (!email || !password)) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    try {
      // Simulated login logic (replace with actual authentication)
      const loginCredentials = type 
        ? { phone, loginType: 'phone' } 
        : { email, password, loginType: 'email' };

      // Store login state
      await AsyncStorage.setItem('userCredentials', JSON.stringify(loginCredentials));
      
      // Update auth context
      setIsLoggedIn(true);

      // Optional: Store remember me preference
      if (remember) {
        await AsyncStorage.setItem('rememberMe', 'true');
      }

      // Navigate to home screen (assuming you have a Home screen)
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Login Error', 'An error occurred during login');
      console.error(error);
    }
  };
  return (
    <View style={styles.container}>
<View style={{marginTop:hp(6),marginLeft:wp(-1)}}>
<Icon
              type={'AntDesign'}
              size={fp(3)}
              name={'left'}
              color={colors.BLACK}
            />
</View>

      <Text style={styles.title}>Log in ✨</Text>
      <Text style={styles.subtitle}>Welcome back! Please enter your details.</Text>

      {/* Email Input */}
      {type ?
      <>
      <View style={{marginTop:hp(3)}}>

  
      <Text style={styles.title1}>Phone Number</Text>

      <View style={styles.inputContainer}>
        <AntDesign name="mobile1" size={20} color="#ccc" style={styles.inputIcon} />

        <TextInput
          placeholder="Enter your phone Number"
          style={styles.input}
          keyboardType="phone-pad"
          placeholderTextColor={colors.DARK_GRAY}
        />
      </View>
      </View>
</>
:
<>
<Text style={styles.title1}>Email</Text>

      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={20} color="#ccc" style={styles.inputIcon} />
        <TextInput
          placeholder="Enter your email"
          style={styles.input}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor={colors.DARK_GRAY}
        />
      </View>
      <Text style={styles.title1}>Password</Text>

      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={20} color="#ccc" style={styles.inputIcon} />
        <TextInput
          placeholder="Password"
          style={styles.input}
          placeholderTextColor={colors.DARK_GRAY}

          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            size={20}
            color="#ccc"
          />
        </TouchableOpacity>
      </View>
</>


      }
      {/* Remember Me and Forgot Password */}
      <View style={styles.row}>
        {/* <View style={styles.rememberContainer}>
         
           <Checkbox
      status={remember ? 'checked' : 'unchecked'}
     color={colors.maincolor}
      onPress={(newValue) => setRemember(!remember)}
    />
          <Text style={styles.rememberText}>Remember for 30 days</Text>
        </View> */}
           <TouchableOpacity style={{flexDirection:"row"}} onPress={() => settype(!type)}>


{type ?
          <Text style={styles.forgotText1}>Log in with Email</Text> :<Text style={styles.forgotText1}>Log in with Phone</Text> }

        
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.forgotText}>Forgot password</Text>
        </TouchableOpacity>
      </View>

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton}         onPress={handleLogin}
 >
        <Text style={styles.loginButtonText}>Log In</Text>
      </TouchableOpacity>

      {/* Social Login Options */}
      <View style={styles.container1}>
      <View style={styles.line} />
      <Text style={styles.orText}>Or log in with</Text>
      <View style={styles.line} />
    </View>
            <View style={styles.socialIconsContainer}>
        <TouchableOpacity style={styles.socialIcon}>
          <FontAwesome name="apple" size={fp(3)} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialIcon}>
          <FontAwesome name="google" size={fp(3)}  color="#DB4437" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialIcon}>
          <FontAwesome name="facebook" size={fp(3)}  color="#4267B2" />
        </TouchableOpacity>
      </View>

      {/* Sign Up Link */}
      <Text style={styles.footerText}>
        Don’t have an account?{' '}
        <Text style={styles.signUpText}   onPress={() => navigation.navigate('SignUp')}   >Sign up</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: wp(0.5),
    backgroundColor: '#ccc', // Adjust color as per your theme
    
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9fbff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 40,
    color: '#1A1A1A',
  },
  title1: {
    fontSize: fp(2),
    fontWeight: "400",
    color: '#1A1A1A',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginVertical: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 10,
    fontSize: 16,
    color:colors.TEXT_COLOR3
  },
  inputIcon: {
    marginRight: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberText: {
    fontSize: fp(1.8),
    color: '#6B7280',
    marginLeft: 5,
  },
  forgotText: {
    fontSize: fp(1.8),
    color: '#3b99ff',
  },
  forgotText1: {
    fontSize: fp(1.8),
    color: '#3b99ff',
    textDecorationLine:"underline",
  },
  loginButton: {
    backgroundColor: '#3b99ff',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 20,
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 14,
    color: '#6B7280',

  },
  socialIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 10,
  },
  socialIcon: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: wp(1),
    elevation: 3,
  },
  footerText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#6B7280',
    marginVertical: 20,
  },
  signUpText: {
    color: '#3b99ff',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
