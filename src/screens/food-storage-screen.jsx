import { useEffect, useMemo, useState } from 'react';
import FoodItem from '../components/food-item';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { FlatList, Button, ButtonText, ButtonIcon, AddIcon, InputField, Input, Fab } from '@gluestack-ui/themed';
import { View, ToastAndroid } from "react-native";
import { BarcodeScanner } from "@/components/barcode-scanner";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function FoodStorageScreen({ navigation }) {
  const foodList = useQuery(api.food.list) || [];
  const getFoodByEan = useMutation(api.food.getByEan);
  const updateFood = useMutation(api.food.update);

  const [searchString, setSearchString] = useState('');
  const [isScannerOpen, setScannerOpen] = useState(false);

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

  const onScanComplete = async (data) => {
    setScannerOpen(false);
    if(!data) return

    const food = await getFoodByEan({ean: data});
    if(!food) {
      ToastAndroid.show(`Food with EAN ${data} was not found!`, ToastAndroid.LONG);
      return;
    }

    updateFood({ id: food._id, amount: food.amount, amountChange: food.amountInBox }).then(() => {
      console.log(`Food with ID ${food._id} was updated, added ${food.amountInBox}.`);
      ToastAndroid.show(`${food.amountInBox} packages of ${food.brand} - ${food.name} added!`, ToastAndroid.SHORT);
    }).catch((err) => {
      console.log(err);
      ToastAndroid.show('Mission failed!', ToastAndroid.SHORT);
    });
  }

  if(isScannerOpen) {
    return (
      <BarcodeScanner onScan={onScanComplete} />
    );
  }

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
      <Fab
        size="sm"
        placement="bottom right"
        style={{backgroundColor: '#5CB85C'}}
        onPress={() => setScannerOpen(true)}
      >
          <Ionicons
            name="scan"
            size={24}
          />
      </Fab>
    </>
  );
}
