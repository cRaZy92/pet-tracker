import { useEffect } from 'react';
import FoodItem from '../components/food-item';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { FlatList, Button, ButtonText, ButtonIcon, AddIcon } from '@gluestack-ui/themed';

export default function FoodStorageScreen({ navigation }) {
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          size="md"
          variant="solid"
          action="positive"
          isDisabled={false}
          isFocusVisible={false}
          onPress={() => navigation.navigate('FoodCreate')}
        >
          <ButtonText>New </ButtonText>
          <ButtonIcon as={AddIcon} />
        </Button>
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
