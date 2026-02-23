import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "../screens/userStudent/login/index";          
import StudentTabs from "./appTab";   
import Home from "../screens/userStudent/home/index";         

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="StudentTabs" component={StudentTabs} />
    </Stack.Navigator>
  );
}