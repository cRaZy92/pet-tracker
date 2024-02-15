import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FoodTypesScreen from './src/screens/foodTypesScreen';
import FoodStorageScreen from './src/screens/foodStorageScreen';
import FoodTypeCreateScreen from './src/screens/foodTypeCreateScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Tab.Navigator >
        <Tab.Screen name="Types" component={FoodTypesScreen} options={{title: 'All food types'}} />
        <Tab.Screen name="Storage" component={FoodStorageScreen} options={{title: 'Available food'}} />
        <Tab.Screen name="FoodTypeCreate" component={FoodTypeCreateScreen} options={{tabBarItemStyle: {display: 'none'}, title: 'New Food Type'}} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
