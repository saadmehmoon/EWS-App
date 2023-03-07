import {Modal, StyleSheet, Text, View, TouchableOpacity} from "react-native"
import React, {useState} from "react"
import EntypoIcons from 'react-native-vector-icons/Entypo'
import FeatherIcons from 'react-native-vector-icons/Feather'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const IconInfo = ({modalVisible, setModalVisible}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={()=>
        setModalVisible(!modalVisible)
      }
    >
      <View style={styles.modalBackGround}>
        <View style={styles.modalContainer}>

          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => {setModalVisible(!setModalVisible)}}>
              <EntypoIcons name='cross' size ={20} color="black" />
            </TouchableOpacity>
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.innerInfoContainer}> 
              <MaterialCommunityIcons name="heart" size={24} color="black" />
              <Text style={styles.text}>Last Seen</Text>
            </View>

            <View style={styles.innerInfoContainer}> 
              <MaterialCommunityIcons name="star" size={24} color="red" />
              <Text style={styles.text}>Last Event Captured</Text>
            </View>

            <View style={styles.innerInfoContainer}> 
              <MaterialCommunityIcons name="upload" size={24} color="black" />
              <Text style={styles.text}>Last Event Uploaded</Text>
            </View>

            <View style={styles.innerInfoContainer}> 
              <MaterialCommunityIcons name="circle" size={16} color="greenyellow" style={{marginHorizontal:3, textAlignVertical:'center'}}/>
              <Text style={styles.text}>Online</Text>
            </View>

          </View>

        </View>
      </View>
    </Modal>
  )
}

export default IconInfo

const styles = StyleSheet.create({
  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '75%',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
    elevation: 5,
    flexDirection: 'column',
  },
  infoContainer:{
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  innerInfoContainer:{
    flexDirection:'row',
    padding:10,
  },
  text:{
    color:'black',
    fontWeight:'bold',
    marginLeft: 24,
    marginVertical: 2.5,  
  },
})