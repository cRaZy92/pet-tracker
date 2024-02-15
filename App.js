import { ConvexProvider, ConvexReactClient } from "convex/react";
import { CONVEX_URL } from "@env";
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FoodTypesScreen from './src/screens/foodTypesScreen';
import FoodStorageScreen from './src/screens/foodStorageScreen';
import FoodTypeCreateScreen from './src/screens/foodTypeCreateScreen';

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
          <Tab.Screen name="Types" component={FoodTypesScreen} options={{title: 'All food types'}} />
          <Tab.Screen name="Storage" component={FoodStorageScreen} options={{title: 'Available food'}} />
          <Tab.Screen name="FoodTypeCreate" component={FoodTypeCreateScreen} options={{tabBarItemStyle: {display: 'none'}, title: 'New Food Type'}} />
        </Tab.Navigator>
      </NavigationContainer>
    </ConvexProvider>
  );
}
