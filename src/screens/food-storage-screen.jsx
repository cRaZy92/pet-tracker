import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useEffect } from 'react';
import FoodItem from '../components/food-item';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

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
    <View style={styles.container}>
      {
        foodList.map((food) =>
          <FoodItem key={food._id} id={food._id} {...food} />
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
  },
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
