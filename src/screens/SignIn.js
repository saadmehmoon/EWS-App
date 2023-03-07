import React from 'react'
import { StyleSheet, View, ScrollView, Text, Alert, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useForm } from 'react-hook-form'
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions'

import CustomButton from '../components/CustomButton'
import CustomInput from '../components/CustomInput'
import Logo from '../assets/images/wwf_logo.png'
import LumsLogo from '../assets/images/lums_logo.png'
import { login } from '../authentication'

const SignIn = ({ setAuthToken, setLoading, setUserData }) => {
  const {height} = useWindowDimensions();
  const navigation = useNavigation();
  const {control, handleSubmit, formState} = useForm();

  const onSignIn = (data) => {
    setLoading(true)
    const user = {
      username: data.username,
      password: data.password,
    }
    login(user).then(data => {
      setLoading(false)
      if (data) {
        setAuthToken(data.auth_token)
        setUserData({
          first_name: data.user.first_name,
          last_name: data.user.last_name,
          email: data.user.email,
          organization: data.user.organization,
        })
      } else {
        Alert.alert("The username and/or password is incorrect!")
      }
    })
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
      <View style={styles.logoContainer}>
        <Image
          source={Logo}
          style={[styles.logo, { height: height * 0.3 }]}
          resizeMode="contain"
        />
      </View>

      <View style={styles.inputContainer}> 
        <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold', alignSelf: 'center', paddingBottom: '2.5%' }}>
          Sign in to your account!
        </Text>
        <CustomInput
          name='username'
          placeholder="Username"
          control={control}
          keyboardType='email-address'
          secureTextEntry={false}
          rules={{required: 'Username is required',}}
        />
        <CustomInput
          name='password'
          placeholder="Password"
          control={control}
          keyboardType='default'
          secureTextEntry
          rules={{required: 'Password is required', min: {value: 8, message: 'Your password must contain 8 characters'}}}
        />
      </View>
      
      <View style={styles.buttonContainer}>
        <CustomButton
          text='Sign In' 
          onPress={handleSubmit(onSignIn)}
          type='PRIMARY'
        />

        <CustomButton
          text='Forgot Password?'
          onPress={() => navigation.push('ForgotPassword')}
          type='SECONDARY'
        />
      </View>

      <View style={styles.bottomContainer}>
        <Text style = {{color: 'black', fontSize: 12, alignSelf: 'center', paddingHorizontal: 5}}>
          Powered by 
        </Text>

        <Image
          source={LumsLogo}
          style={{ width: '10%' }}
          resizeMode="contain"
        />
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView:{
    backgroundColor: '#ffffff',
    padding: '5%',
  },

  logoContainer:{
    paddingTop: '5%',
    justifyContent: 'center'
  },

  inputContainer:{
    paddingTop: '5%',
  },

  buttonContainer:{
    paddingTop: '5%',
  },

  bottomContainer:{
    paddingTop: '5%',
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center'
  },

  logo :{
    width: '70%',
    maxWidth: 300,
    maxHeight: 200,
    alignSelf: 'center'
  },

})

export default SignIn;
