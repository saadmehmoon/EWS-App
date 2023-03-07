import React, { useEffect, useState } from "react";
import { ActivityIndicator, View, StatusBar, useColorScheme, TouchableOpacity } from "react-native";
import { NavigationContainer, DefaultTheme, DarkTheme, useTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import EncryptedStorage from "react-native-encrypted-storage";

import EntypoIcons from "react-native-vector-icons/Entypo";
import IonIcons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome";

import Profile from "../screens/Profile";
import SplashScreen from "../screens/SplashScreen";
import CameraStatus from "../screens/CameraStatus";
import CameraDetails from "../screens/CameraDetails";
import Header from "../components/Header";
import HomeNavigation from "./HomeNavigation";
import { getAuthToken, getUserInfo } from "../authentication";
import { clearAuthToken } from "../authentication";
import LoginNavigation from "./LoginNavigation";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const blankFilters = { startDate: null, endDate: null, specie: [], camera: [] };

const Navigation = () => {
  const colorScheme = useColorScheme();
  DefaultTheme.colors.background = "#fff";
  const { colors } = useTheme();

  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const [authToken, setAuthToken] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const [infoModalVisible, setInfoModalVisible] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const token = await getAuthToken();
        const userData = await getUserInfo(token);
        setAuthToken(token);
        setUserData(userData);
        setShowSplashScreen(false);
      } catch { }
    })();
  }, []);

  useEffect(() => {
    StatusBar.setBackgroundColor(colorScheme === "dark" ? "#000" : "#fff");
    StatusBar.setBarStyle(colorScheme === "dark" ? "light-content" : "dark-content");
  }, [colorScheme]);

  return (
    loading ? (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size={"large"} animating={loading} />
      </View>
    ) : showSplashScreen ? (
      <SplashScreen />
    ) : authToken ? (
      <NavigationContainer theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Tab.Navigator
          screenOptions={{
            header: ({ options }) => <Header title={options.headerTitle} Button={options.headerButton} Button1={options.headerButton1} Button2={options.headerButton2} Button3={options.headerButton3} />,
            tabBarStyle: {},
            tabBarShowLabel: false,
            tabBarInactiveTintColor: "gray",
          }}
          initialRouteName="Events"
        >
          <Tab.Screen
            name="Events"
            options={{
              headerTitle: "Events",
              tabBarIcon: ({ color, size }) => (
                <EntypoIcons name="home" color={color} size={size} />
              ),
            }}
          >
            {({ navigation }) => (
              <HomeNavigation
                navigation={navigation}
              />
            )}
          </Tab.Screen>
          <Tab.Screen
            name="Camera"
            options={{
              headerTitle: "Camera Status",
              tabBarIcon: ({ color, size }) => (
                <IonIcons name="stats-chart" color={color} size={size} />
              ),
            }}
          >
            {({navigation}) => (
              <Stack.Navigator initialRouteName="Camera Status">
                <Stack.Screen
                  name="Camera Status"
                  options={{
                    headerShown: false,
                  }}
                >
                  {() => (
                    <CameraStatus infoModalVisible={infoModalVisible} setInfoModalVisible={setInfoModalVisible} navigation={navigation} />
                  )}
                </Stack.Screen>
                <Stack.Screen
                  name="Camera Details"
                  component={CameraDetails}
                  options={{ headerShown: false, title: null }}
                />
              </Stack.Navigator>
            )}
          </Tab.Screen>
          <Tab.Screen
            name="Profile"
            options={{
              headerTitle: "Profile",
              tabBarIcon: ({ color, size }) => (
                <FontAwesome5 name="user-circle-o" color={color} size={size} />
              ),
            }}
          >
            {({ navigation }) => (
              <Profile userData={userData} navigation={navigation} setAuthToken={setAuthToken} />
            )}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    ) : (
      <LoginNavigation setAuthToken={setAuthToken} setLoading={setLoading} setUserData={setUserData} />
    )
  )
};

export default Navigation;
