import React from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import Home from "../screens/userStudent/home";
import StudentPerformance from "../screens/userStudent/studentPerformance";
import ActivitiesProgress from "../screens/userStudent/activitiesProgress";
import Profile from "../screens/userStudent/profile";

const Tab = createBottomTabNavigator();

const GREEN = "#005A63";
const PINK = "#FFDDD2";

function iconByRoute(routeName) {
  switch (routeName) {
    case "Início":
      return "home";
    case "Desempenho":
      return "bar-chart";
    case "Em andamento":
      return "play-circle";
    case "Perfil":
      return "person";
    default:
      return "ellipse";
  }
}

export default function StudentTabs({ route }) {
  const { userId, tipoUser } = route.params || {};

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { height: 70, paddingTop: 10, paddingBottom: 12 },
        tabBarIcon: ({ focused }) => {
          const iconName = iconByRoute(route.name);
          if (!focused) return <Ionicons name={iconName} size={22} color={GREEN} />;

          return (
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: GREEN,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name={iconName} size={22} color={PINK} />
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Início" component={Home} initialParams={{ userId, tipoUser }} />
      <Tab.Screen name="Desempenho" component={StudentPerformance} initialParams={{ userId, tipoUser }} />
      <Tab.Screen name="Em andamento" component={ActivitiesProgress} initialParams={{ userId, tipoUser }} />
      <Tab.Screen name="Perfil" component={Profile} initialParams={{ userId, tipoUser }} />
    </Tab.Navigator>
  );
}