import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

const CameraCard = ({ camera }) => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  function convertMsToHM(milliseconds) {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);

    seconds = seconds % 60;
    minutes = seconds >= 30 ? minutes + 1 : minutes;
    minutes = minutes % 60;
    hours = hours % 24;
    if (days > 0) {
      return hours === 0 ? `${days}d` : `${days}d ${hours}h`;
    } else if (hours > 0) {
      return minutes === 0 ? `${hours}h` : `${hours}h ${minutes}m`;
    } else {
      return minutes === 0 ? 'Just now' : `${minutes}m`;
    }
  }

  // convert a date to time ago format
  const convertDateToTimePassed = (date) => {
    if (date) {
      const timePassed = new Date() - new Date(date);
      return convertMsToHM(timePassed);
    }
    else {
      return 'Never';
    }
  }

  // check if it's day or night
  const isNight = () => {
    const currentTime = new Date();
    const currentHrs = parseInt(currentTime.getUTCHours() + "" + (String(currentTime.getUTCMinutes()).length === 1 ? "0" + currentTime.getUTCMinutes() : currentTime.getUTCMinutes()));
    const sunrise = new Date(camera.sunrise);
    const sunriseHrs = parseInt(sunrise.getUTCHours() + "" + (String(sunrise.getUTCMinutes()).length === 1 ? "0" + sunrise.getUTCMinutes() : sunrise.getUTCMinutes()));
    const sunset = new Date(camera.sunset);
    const sunsetHrs = parseInt(sunset.getUTCHours() + "" + (String(sunset.getUTCMinutes()).length === 1 ? "0" + sunset.getUTCMinutes() : sunset.getUTCMinutes()));
    return currentHrs < sunriseHrs || currentHrs > sunsetHrs;
  }

  return (
    <TouchableOpacity
      style={[
        styles.customCardContainer,
        styles.spacing,
        { flexDirection: "column", backgroundColor: colors.background },
      ]}
      onPress={() => navigation.push("Camera Details", { camera })}
    >
      <View style={[styles.cardInnerContainer, { paddingBottom: 5 }]}>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.cameraNameText, {color: colors.text}]}>{camera.description}</Text>
          <MaterialCommunityIcons
            name="circle"
            size={12}
            color={camera.live ? "greenyellow" : "darkgrey"}
            style={{textAlignVertical: 'center', marginLeft: 5}}
          />
        </View>

        <MaterialCommunityIcons
          name={isNight() ? "moon-waning-crescent" : "white-balance-sunny"}
          size={20}
          color={isNight() ? "grey" : "yellow"}
          style={styles.cameraActivityIcons}
        />
      </View>

      <View style={[styles.cardInnerContainer, { paddingTop: 5 }]}>
        <View style={styles.cameraActivityTextContainer}>
          <Text style={{ color: colors.text  }}>{convertDateToTimePassed(camera.last_reported_at)}</Text>
        </View>
        <View style={styles.cameraActivityTextContainer}>
          <Text style={{ color: colors.text  }}>{convertDateToTimePassed(camera.last_captured_at)}</Text>
        </View>
        <View style={styles.cameraActivityTextContainer}>
          <Text style={{ color: colors.text  }}>{convertDateToTimePassed(camera.last_uploaded_at)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CameraCard;

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
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cameraNameText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  cameraActivityTextContainer: {
    width: '23%',
    alignItems: "center",
  },
});
