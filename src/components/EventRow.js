import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { Chip } from "@react-native-material/core";
import { useNavigation, useTheme } from "@react-navigation/native";

const EventRow = ({ selected, setSelected, event }) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [cardBackgroundColor, setCardBackgroundColor] = useState(colors.background);

  const formatDate = new Date(event.date).toLocaleDateString()
  const formatTime = new Date(event.date).toLocaleTimeString()
  const selectedColor = '#b3e5fc';

  useEffect(() => {
    if (selected.includes(event.uuid)) {
      setCardBackgroundColor(selectedColor);
    } else {
      setCardBackgroundColor(colors.background);
    }
  }, [selected, colors])

  return (
    <TouchableOpacity
      style={[
        styles.customContainer,
        styles.spacing,
        {
          backgroundColor: cardBackgroundColor,
          borderColor: colors.border,
          borderWidth: colors.background === "#fff" ? 0 : 1,
        },
      ]}
      onPress={() => {
        if (selected.length === 0) {
          navigation.push("Event View", { event });
        } else if (selected.includes(event.uuid)) {
          setSelected(selected.filter((item) => item !== event.uuid));
        } else {
          setSelected([...selected, event.uuid]);
        }
      }}
      onLongPress={() => {
        if (!selected.includes(event.uuid)) {
          setSelected([...selected, event.uuid]);
        } else {
          setSelected(selected.filter((item) => item !== event.uuid));
        }
      }}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: event.thumbnail }} style={styles.image} />
      </View>

      <View style={styles.textContainer}>
        <View style={styles.cameraNameContainer}>
          <Text style={[styles.cameraName, { color: colors.text }]}>
            {event.camera_name}
          </Text>
        </View>
        <View style={styles.dateContainer}>
          <Text style={[styles.date, { color: colors.text }]}>
            {formatDate === "Invalid Date" ? event.date : formatDate + ' ' + formatTime}
          </Text>
        </View>
        <View style={styles.specieContainer}>
          {event.species.map((item, key) => (
            <Chip
              label={item.name}
              key={key}
              height={25}
              labelStyle={styles.specieText}
              style={{ backgroundColor: item.color }}
              color="white"
            />
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default EventRow;

const styles = StyleSheet.create({
  customContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 24,
    marginLeft: 24,
    elevation: 1.5,
    borderRadius: 10,
  },
  spacing: {
    marginTop: 28,
  },
  image: {
    flex: 1,
    borderRadius: 5,
  },
  imageContainer: {
    height: 105,
    width: 105,
    padding: 15,
    alignSelf: "center",
  },
  textContainer: {
    flex: 1,
    flexDirection: "column",
    padding: 15,
  },
  cameraNameContainer: {
    flex: 1,
  },
  cameraName: {
    fontWeight: "bold",
  },
  dateContainer: {
    flex: 1,
  },
  date: {
    paddingTop: 5,
    paddingBottom: 5,
  },
  specieContainer: {
    flex: 1,
    flexDirection: "row",
  },
  specieText: {
    fontSize: 12,
    marginTop: -8,
    marginLeft: -3,
    marginRight: -3,
  },
});
