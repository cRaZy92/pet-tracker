import { ConvexProvider, ConvexReactClient } from "convex/react";
import { CONVEX_URL } from "@env";
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FoodCreateScreen from './src/screens/food-create-screen';
import FoodStorageScreen from './src/screens/food-storage-screen';

const Tab = createBottomTabNavigator();

const convex = new ConvexReactClient(CONVEX_URL, {
  unsavedChangesWarning: false,
});

export default function App() {
  return (
    <ConvexProvider client={convex}>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Tab.Navigator >
          <Tab.Screen name="Storage" component={FoodStorageScreen} options={{title: 'Available food'}} />
          <Tab.Screen name="FoodCreate" component={FoodCreateScreen} options={{tabBarItemStyle: {display: 'none'}, title: 'Create New Food'}} />
        </Tab.Navigator>
      </NavigationContainer>
    </ConvexProvider>
  );
}
