import { ConvexProvider, ConvexReactClient } from "convex/react";
import { StatusBar } from 'expo-status-bar';
import { DefaultTheme, DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FoodCreateScreen from './src/screens/food-create-screen';
import FoodStorageScreen from './src/screens/food-storage-screen';
import FoodStatsScreen from './src/screens/food-stats';
import { ClockIcon, EditIcon, GluestackUIProvider, Icon } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import { useColorScheme } from 'react-native';

const Tab = createBottomTabNavigator();

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL, {
  unsavedChangesWarning: false,
});

export default function App() {
  const colorScheme = useColorScheme();

  return (
    <ConvexProvider client={convex}>
      <GluestackUIProvider config={config} colorMode={colorScheme}>
        <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <StatusBar style="auto" />
          <Tab.Navigator >
            <Tab.Screen name="Storage" component={FoodStorageScreen} options={{title: 'Available food', tabBarIcon: () => <Icon as={EditIcon} w="$6" h="$6" />}} />
            <Tab.Screen name="FoodCreate" component={FoodCreateScreen} options={{tabBarItemStyle: {display: 'none'}, title: 'Create New Food'}} />
            <Tab.Screen name="Stats" component={FoodStatsScreen} options={{title: 'Stats', tabBarIcon: () => <Icon as={ClockIcon} w="$6" h="$6" />}} />
          </Tab.Navigator>
        </NavigationContainer>
      </GluestackUIProvider>
    </ConvexProvider>
  );
}
