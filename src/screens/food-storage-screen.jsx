import { Pressable, StyleSheet, Text } from 'react-native';
import { useEffect } from 'react';
import FoodItem from '../components/food-item';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { FlatList } from '@gluestack-ui/themed';

export default function FoodStorageScreen({ navigation }) {
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() => navigation.navigate('FoodCreate')}
          style={styles.createNewButton}
        >
          <Text>New</Text>
        </Pressable>
      ),
    });
  }, [navigation]);

  const foodList = useQuery(api.food.list) || [];

  return (
    <FlatList
      data={foodList}
      numColumns={2}
      keyExtractor={(item) => item._id }
      renderItem={({ item }) =>
        <FoodItem id={item._id} {...item} />
      }
    />
  );
}

const styles = StyleSheet.create({
  createNewButton: {
    backgroundColor: '#3dbd00',
    color: '#fff',
    width: 60,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 22
  }
});
