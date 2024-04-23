import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import AcueillScrenn from "../screen/AcueillScrenn";
import GameScreen from "../screen/GameScrenn";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="=Aceuil"
      screenOptions={{
        headerStyle: { backgroundColor: '#F40075' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: "bold" },
        headerTitleAlign: "center"
      }}
    >
      <Stack.Screen name="Aceuil" component={AcueillScrenn} />
      <Stack.Screen name="Game" component={GameScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
