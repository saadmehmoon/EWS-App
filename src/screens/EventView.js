import { Image, StyleSheet, View, Text, Modal, ActivityIndicator } from "react-native";
import React, { useState } from "react";

const EventView = ({ route }) => {
  const eventFile = route.params.event.file;
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(0);

  return (
    <View style={styles.container}>
      <Modal visible={loading} transparent>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>{loaded}%</Text>
        </View>
      </Modal>
      <Image
        source={{ uri: eventFile }}
        style={styles.image}
        onLoadStart={() => setLoading(true)}
        onLoad={() => setLoading(false)}
        onProgress={({ nativeEvent: { loaded, total } }) =>
          setLoaded(Math.floor((100 * loaded) / total))
        }
      />
    </View>
  );
};

export default EventView;

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  image: {
    flex: 1,
    width: "100%",
    resizeMode: "contain",
    backgroundColor: "black",
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  loadingText: {
    paddingTop: 10,
    color: "white",
  },
});
