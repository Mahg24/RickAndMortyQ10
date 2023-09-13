import "react-native-gesture-handler";
import React from "react";
import "react-native-reanimated";
import "react-native-safe-area-context";
import "react-native-screens";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Main from "./src/components/Main";
import CharacterDetail from "./src/components/CharacterDetail";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Main} />
        <Stack.Screen
          name="CharacterDetail"
          component={CharacterDetail}
          options={({ route }) => ({ title: route.params.characterName })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
