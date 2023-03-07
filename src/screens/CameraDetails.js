import { StyleSheet, Text, View, SafeAreaView, SectionList } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";

const CameraDetails = ({ route, navigation }) => {
  const { colors } = useTheme();
  const camera = route.params.camera;
  const last_reported_at = new Date(camera.last_reported_at);

  const description = [
    { title: "Camera name: ", data: camera.description },
    { title: "Test: ", data: camera.test ? "Yes" : "No" },
    { title: "Live: ", data: camera.live ? "Yes" : "No" },
  ];
  const stats = [
    { title: "Last Reported: ", data: last_reported_at.toTimeString() },
    { title: "Remaining Storage: ", data: camera.remaining_storage },
  ];
  const captureSettings = [
    { title: "Frames per sec: ", data: camera.frames_per_sec },
    { title: "Image Width: ", data: camera.image_width },
    { title: "Image Height: ", data: camera.image_height },
  ];
  const threshold = [
    { title: "Day Threshold: ", data: camera.day_threshold },
    { title: "Night Threshold: ", data: camera.night_threshold },
    { title: "Iou Threshold: ", data: camera.iou_threshold },
  ];
  const site = [
    { title: "Latitude: ", data: camera.latitude },
    { title: "Longitude: ", data: camera.longitude },
  ];
  const pins = [{ title: "Infrared: ", data: camera.infrared }];
  const intervals = [
    { title: "Update After: ", data: camera.update_after },
    { title: "Video Interval: ", data: camera.video_interval },
    { title: "Rest Interval: ", data: camera.rest_interval },
    { title: "Motion Interval: ", data: camera.motion_interval },
  ];

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.background}]}>
      <SectionList
        style={{ marginTop: 28 }}
        sections={[
          { title: "Description", data: description },
          { title: "Stats", data: stats },
          { title: "Capture Settings", data: captureSettings },
          { title: "Threshold", data: threshold },
          { title: "Site", data: site },
          { title: "Pins", data: pins },
          { title: "Intervals", data: intervals },
        ]}
        renderItem={({ item }) => (
          <View style={[styles.sectionCardContainer, styles.spacing, , {backgroundColor: colors.background}]}>
            <View style={styles.cardInnerContainer}>
              <Text style={{ color: colors.text, fontWeight: "bold" }}>
                {item.title}{" "}
              </Text>
              <Text style={{ color: colors.text }}>{item.data} </Text>
            </View>
          </View>
        )}
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeader}>
            <Text style={{ color: colors.text, fontSize: 18, fontWeight: "bold" }}>
              {section.title}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default CameraDetails;

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  spacing: {
    marginTop: 5,
    marginBottom: 5,
  },
  sectionCardContainer: {
    elevation: 1,
    borderRadius: 10,
    marginRight: 24,
    marginLeft: 24,
  },
  cardInnerContainer: {
    paddingRight: 24,
    paddingLeft: 24,
    paddingTop: 15,
    paddingBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sectionHeader: {
    fontWeight: "bold",
    fontSize: 16,
    marginRight: 24,
    marginLeft: 24,
  },
});
