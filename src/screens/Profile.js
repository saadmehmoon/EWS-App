import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { useTheme } from "@react-navigation/native";
import EncryptedStorage from "react-native-encrypted-storage";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import OctIcons from "react-native-vector-icons/Octicons";
import FeatherIcons from "react-native-vector-icons/Feather";

import { clearAuthToken } from "../authentication";

const Profile = ({ navigation, userData, setAuthToken }) => {
  const { colors } = useTheme();

  useEffect(() => {
    navigation.setOptions({
      headerButton: (
        <TouchableOpacity
          onPress={() => {
            clearAuthToken();
            setAuthToken(null);
            EncryptedStorage.removeItem("user");
          }}
        >
          <MaterialIcons name="logout" size={24} color={colors.text} />
        </TouchableOpacity>
      ),
    })
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FontAwesomeIcon name="user-circle-o" size={140} color="gray" style={[styles.spacing, { alignSelf: 'center' }]} />

      <View style={[styles.customCardContainer, styles.spacing, { backgroundColor: colors.background }]}>
        <View style={styles.cardInnerContainer}>
          <AntDesignIcon name="idcard" size={20} color={colors.text} />
          <Text style={[styles.cardContentSpacing, styles.profileDetailsText, { color: colors.text }]}>{`${userData.first_name} ${userData.last_name}`}</Text>
        </View>
      </View>

      <View style={[styles.customCardContainer, styles.spacing, { backgroundColor: colors.background }]}>
        <View style={styles.cardInnerContainer}>
          <FeatherIcons name="mail" size={20} color={colors.text} />
          <Text style={[styles.cardContentSpacing, styles.profileDetailsText, { color: colors.text }]}>{`${userData.email}`}</Text>
        </View>
      </View>

      <View style={[styles.customCardContainer, styles.spacing, { backgroundColor: colors.background }]}>
        <View style={styles.cardInnerContainer}>
          <OctIcons name="organization" size={20} color={colors.text} />
          <Text style={[styles.cardContentSpacing, styles.profileDetailsText, { color: colors.text }]}>{`${userData.organization}`}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  spacing: {
    marginTop: 28,
  },
  cardContentSpacing: {
    marginLeft: 20,
  },
  profileDetailsText: {
    fontWeight: '500',
    fontSize: 18,
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
    flexDirection: 'row',
    alignItems: 'center',
  }
});

export default Profile;
