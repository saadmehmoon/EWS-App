import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import DatePicker from 'react-native-date-picker'
import { useTheme } from '@react-navigation/native'

const CustomDatePicker = ({ placeHolderText, date, setDate }) => {
  const { colors } = useTheme()
  const [showDatePicker, setShowDatePicker] = useState(false)

  return (
  <TouchableOpacity style={[styles.container, {borderColor: colors.border}]} onPress={() => setShowDatePicker(true)}>
    {date ? (
      <Text style={[styles.text, {fontWeight: 'bold', color: colors.text}]}>{date.toLocaleDateString()}</Text>
    ) : (
      <Text style={[styles.text, {color: colors.text}]}>{placeHolderText.toLocaleString()}</Text>
    )}
    <DatePicker
      modal={true}
      date={date ? date : new Date()}
      onDateChange={setDate}
      mode={'date'}
      open={showDatePicker}
      onConfirm={(date) => {
        setDate(date)
        setShowDatePicker(false)
      }}
      onCancel={() => {
        setShowDatePicker(false)
      }}
    />
  </TouchableOpacity>
  )
}

export default CustomDatePicker

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 42,
    borderRadius: 15,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: '2%',
  },
  text: {
    fontSize: 16,
  }
})