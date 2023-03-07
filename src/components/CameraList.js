import React, { useEffect, useState } from 'react'
import { View, StyleSheet, FlatList, RefreshControl, ActivityIndicator } from 'react-native'

import { getCameraStatus } from '../api'
import CameraCard from './CameraCard'

const CameraList = () => {
  const [cameras, setCameras] = useState([])
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const getCameraDetails = async () => {
    const res = await getCameraStatus()
    setCameras(res)
    setRefreshing(false)
    setLoading(false)
  }

  useEffect(()=> {
    getCameraDetails()
  }, [])

  const onRefresh = () => {
    setRefreshing(true)
    getCameraDetails();
  };

  return (
    <View style={styles.container}>
    {loading ? <ActivityIndicator/> : null}
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        data={cameras}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <CameraCard camera={item}/>
        )}
        ListFooterComponent={() => (
          <View style={{height: 30}}/>
        )}
      />
    </View>

  )
}

export default CameraList

const styles = StyleSheet.create({
  container: {
    height: "100%",
    paddingTop: 5,
    paddingBottom: '20%',
  }
})