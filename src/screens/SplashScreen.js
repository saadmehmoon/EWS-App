import { StyleSheet, Image, View } from 'react-native'
import React from 'react'
import { Flex } from '@react-native-material/core'

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/wwf_logo.png')} style={styles.image} />
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    marginBottom: 100,
  }
})