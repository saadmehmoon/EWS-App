import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '@react-navigation/native'

const Header = ({ title, Button, Button1 = null, Button2 = null, Button3 = null }) => {
  const { colors } = useTheme()
  return (
    <View style={styles.headerContainer}>
      <View style={{ flexDirection: 'row', flex: 1 }}>
        {/* <View style={[styles.button, {marginRight: 24}]}>
          <Icon name='arrow-back' size={24} color='black' />
        </View> */}
        <Text style={[styles.title, { color: colors.text }]}>
          {title}
        </Text>
      </View>
      <View style={styles.button}>
        {Button3}
      </View>
      <View style={styles.button}>
        {Button2}
      </View>
      <View style={styles.button}>
        {Button1 ? Button1 : Button}
      </View>
    </View>
  )
}

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    height: 48,
    marginLeft: 24,
    marginRight: 24,
    paddingTop: 12,
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    textAlignVertical: 'center',
  },
  button: {
    justifyContent: 'center',
    paddingHorizontal: 5,
  }
})