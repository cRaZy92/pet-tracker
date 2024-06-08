import { useEffect, useMemo, useState } from 'react';
import FoodItem from '../components/food-item';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { FlatList, Button, ButtonText, ButtonIcon, AddIcon, InputField, Input } from '@gluestack-ui/themed';
import { View } from "react-native";

export default function FoodStorageScreen({ navigation }) {
  const foodList = useQuery(api.food.list) || [];
  const [searchString, setSearchString] = useState('');

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          action="positive"
          onPress={() => navigation.navigate('FoodCreate')}
        >
          <ButtonText>New </ButtonText>
          <ButtonIcon as={AddIcon} />
        </Button>
      ),
    });
  }, [navigation]);

  const filteredFood = useMemo(() => {
    if(searchString.length < 1) return foodList;
    return foodList.filter((food) => {
      const foodBrand = food.brand.toLowerCase();
      const foodName = food.name.toLowerCase();
      const search = searchString.toLowerCase();

      return foodBrand.includes(search) || foodName.includes(search);
    });
  }, [foodList, searchString]);

  return (
    <>
      <View>
        <Input>
          <InputField onChangeText={(s) => setSearchString(s)} placeholder="Search..." value={searchString} />
        </Input>
      </View>
      <FlatList
          data={filteredFood}
          numColumns={2}
          keyExtractor={(item) => item._id }
          renderItem={({ item }) =>
              <FoodItem id={item._id} {...item} />
          }
      />
    </>
  );
}
