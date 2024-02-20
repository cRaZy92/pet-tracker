import { ConvexProvider, ConvexReactClient } from "convex/react";
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FoodCreateScreen from './src/screens/food-create-screen';
import FoodStorageScreen from './src/screens/food-storage-screen';
import FoodStatsScreen from './src/screens/food-stats';

const Tab = createBottomTabNavigator();

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL, {
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
          <Tab.Screen name="Stats" component={FoodStatsScreen} options={{title: 'Stats'}} />
        </Tab.Navigator>
      </NavigationContainer>
    </ConvexProvider>
  );
}
