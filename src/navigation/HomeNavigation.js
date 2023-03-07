import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import AllEvents from '../screens/AllEvents';
import EventView from "../screens/EventView";

const HomeScreenNavigator = (props) => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Events">
      <Stack.Screen
        name="Events"
        options={{ headerShown: false }}
      >
        {({ navigation }) => (
          <AllEvents {...props} navigation={navigation} />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="Event View"
        component={EventView}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const HomeNavigation = (props) => {
  const TopTabs = createMaterialTopTabNavigator();
  const [eventsReRender, setEventsReRender] = useState({
    all: false,
    archived: false,
    featured: false,
  })

  return (
    <TopTabs.Navigator initialRouteName='Home'>
      <TopTabs.Screen name="Home">
        {() => (
          <HomeScreenNavigator
            headerNav={props.navigation}
            eventsReRender={eventsReRender}
            setEventsReRender={setEventsReRender}
            type="NONE"
          />
        )}
      </TopTabs.Screen>
      <TopTabs.Screen name="Featured">
        {() => (
          <HomeScreenNavigator
            headerNav={props.navigation}
            eventsReRender={eventsReRender}
            setEventsReRender={setEventsReRender}
            type="FEATURED"
          />
        )}
      </TopTabs.Screen>
      <TopTabs.Screen name="Archived">
        {() => (
          <HomeScreenNavigator
            headerNav={props.navigation}
            eventsReRender={eventsReRender}
            setEventsReRender={setEventsReRender}
            type="ARCHIVED"
          />
        )}
      </TopTabs.Screen>
    </TopTabs.Navigator>
  )
}

export default HomeNavigation;