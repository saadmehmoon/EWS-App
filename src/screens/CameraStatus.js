import React, { useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { useTheme } from '@react-navigation/native'
import IonIcons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import IconInfo from '../components/CameraIconsInfo'

import CameraList from '../components/CameraList'

const CameraStatus = ({ navigation, infoModalVisible, setInfoModalVisible }) => {
  const { colors } = useTheme();

  useEffect(() => {
    navigation.setOptions({
      headerButton: (
        <TouchableOpacity onPress={() => setInfoModalVisible(!infoModalVisible)}>
          <IonIcons name='ios-information-circle-outline' size={24} color={colors.text} />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <IconInfo
        modalVisible={infoModalVisible}
        setModalVisible={setInfoModalVisible}
      />

      <View style={[styles.customCardContainer, styles.spacing, { backgroundColor: colors.background }]}>
        <View style={styles.cardInnerContainer}>
          <View style={styles.cameraActivityIconsContainer}>
            <MaterialCommunityIcons name="heart" size={24} color={colors.text} style={styles.cameraActivityIcons} />
          </View>
          <View style={styles.cameraActivityIconsContainer}>
            <MaterialCommunityIcons name="star" size={24} color="red" style={styles.cameraActivityIcons} />
          </View>
          <View style={styles.cameraActivityIconsContainer}>
            <MaterialCommunityIcons name="upload" size={24} color={colors.text} style={styles.cameraActivityIcons} />
          </View>
        </View>
      </View>

      <CameraList />
    </View>
  )
}

export default CameraStatus

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  spacing: {
    marginTop: 28,
  },
  customCardContainer: {
    elevation: 2,
    borderRadius: 10,
    marginRight: 24,
    marginLeft: 24,
  },
  cardInnerContainer: {
    paddingRight: 24,
    paddingLeft: 24,
    paddingTop: 20,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cameraActivityIconsContainer: {
    width: '23%',
    alignItems: "center",
  },
})