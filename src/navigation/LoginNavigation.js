import React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignIn from '../screens/SignIn';
import ForgotPassword from '../screens/ForgotPassword';

const LoginNavigation = ({ setAuthToken, setLoading, setUserData }) => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SignIn">
          {() => (
            <SignIn
              setAuthToken={setAuthToken}
              setLoading={setLoading}
              setUserData={setUserData}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default LoginNavigation;