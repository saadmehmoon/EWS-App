import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { useForm } from 'react-hook-form'

import CustomInput from '../components/CustomInput'
import CustomButton from '../components/CustomButton'


const ForgotPassword = () => {
  const {control, handleSubmit} = useForm()
  const onForgetPassword = () => {
    // FORGET PASSWORD FUNCTIONALITY
  }

  return (
    <View showsVerticalIndicator={false} style={styles.scrollView}>
      <View>
        <Text style={{ color: 'black', fontSize: 25, fontWeight: 'bold', alignSelf: 'center', paddingBottom: '2.5%' }}>
          Forgot your password?
        </Text>
      </View>

      <View>
        <CustomInput
          name='forgot password'
          placeholder="Enter your registered email"
          control={control}
          keyboardType='email-address'
          secureTextEntry={false}
          rules={{required: 'Email is Required',}}
        />
      </View>

      <View>
        <CustomButton
            text='Submit' 
            onPress={handleSubmit(onForgetPassword)}
            type='PRIMARY'
          />
      </View>
    </View>
  )
}

export default ForgotPassword

const styles = StyleSheet.create({
  scrollView:{
    flex:1,
    backgroundColor: '#ffffff',
    padding: '5%',
    justifyContent: 'center'
  },
  buttonContainer:{
    paddingTop: '5%',
  },
})