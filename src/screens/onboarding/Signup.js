import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,  } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from '../../utility/icon';
import { colors } from '../../utility/colors';
import { fp, hp, wp } from '../../utility/dimensions';
import { Checkbox } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';


const SignUp = () => {
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
<TouchableOpacity style={{marginTop:hp(6),marginLeft:wp(-1)}} onPress={() => navigation.navigate('Login')} >
<Icon
              type={'AntDesign'}
              size={fp(3)}
              name={'left'}
              color={colors.BLACK}
            />
</TouchableOpacity>

      <Text style={styles.title}>Create an Account ✨</Text>
      <Text style={styles.subtitle}>Welcome! Please enter your details.</Text>

      {/* Email Input */}
      <Text style={styles.title1}>Name</Text>

<View style={styles.inputContainer}>
  <Ionicons name="person-outline" size={20} color="#ccc" style={styles.inputIcon} />
  <TextInput
    placeholder="Enter your Name"
    style={styles.input}
    keyboardType="email-address"
    placeholderTextColor={colors.DARK_GRAY}
  />
</View>
      <Text style={styles.title1}>Email</Text>

      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={20} color="#ccc" style={styles.inputIcon} />
        <TextInput
          placeholder="Enter your email"
          style={styles.input}
          keyboardType="email-address"
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
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            size={20}
            color="#ccc"
          />
        </TouchableOpacity>
      </View>

      {/* Remember Me and Forgot Password */}
      <View style={styles.row}>
        <View style={styles.rememberContainer}>
         
           <Checkbox
      status={remember ? 'checked' : 'unchecked'}
     color={colors.maincolor}
      onPress={(newValue) => setRemember(!remember)}
    />
          <Text style={styles.rememberText}>Must be at least 8 characters </Text>
        </View>
        
      </View>

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Social Login Options */}
      <View style={styles.container1}>
      <View style={styles.line} />
      <Text style={styles.orText}>Or Sign up with</Text>
      <View style={styles.line} />
    </View>
    <View style={styles.socialIconsContainer}>
        <TouchableOpacity style={styles.socialIcon}>
          <FontAwesome name="apple" size={fp(3)} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialIcon}>
          <FontAwesome name="google" size={fp(3)}color="#DB4437" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialIcon}>
          <FontAwesome name="facebook" size={fp(3)} color="#4267B2" />
        </TouchableOpacity>
      </View>

      {/* Sign Up Link */}
      <Text style={styles.footerText}>
        Don’t have an account?{' '}
        <Text style={styles.signUpText} onPress={() => navigation.navigate('Login')} >Log in</Text>
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
    padding: 15,
    borderRadius: 50,
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

export default SignUp;
