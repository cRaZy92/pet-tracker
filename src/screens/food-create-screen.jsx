import { StyleSheet, ToastAndroid, View } from 'react-native';
import { useForm } from 'react-hook-form';
import BaseTextInput from '../components/form/base-text-input';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Button, ButtonText, HStack, Center } from '@gluestack-ui/themed';

export default function FoodCreateScreen({ navigation }) {
  const {
    control, handleSubmit, reset,
    formState: { errors }
  }
    = useForm({
    defaultValues: {
      amount: '0'
    }
  });
  const createNewFood = useMutation(api.food.create);

  const onSubmit = data => {
    data.weight = parseInt(data.weight);
    data.meatContent = parseInt(data.meatContent);
    data.amount = parseInt(data.amount);

    createNewFood(data).then((newFoodId) => {
      console.log(`Saved new food with ID ${newFoodId}`);
      ToastAndroid.show('New food saved!', ToastAndroid.SHORT);
      onCancel();
    }).catch((err) => {
      console.log(err);
      ToastAndroid.show('There was an error!', ToastAndroid.SHORT);
    });
  };

  const onCancel = () => {
    reset();
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <BaseTextInput control={control} rules={{ required: true }} name="brand" errors={errors.brand} label="Brand" />
      <BaseTextInput control={control} rules={{ required: true }} name="name" errors={errors.name} label="Name" />
      <BaseTextInput control={control} rules={{ required: true }} name="weight" errors={errors.weight} label="Weight (g)" />
      <BaseTextInput control={control} rules={{ required: true }} name="meatContent" errors={errors.meatContent} label="Meat Content (%)" />
      <BaseTextInput control={control} name="amount" errors={errors.amount} label="Amount" />

      <Center mt="$4">
        <HStack space="lg">
          <Button
            action="negative"
            onPress={onCancel}
          >
            <ButtonText>Cancel</ButtonText>
          </Button>
          <Button
            action="positive"
            onPress={handleSubmit(onSubmit)}
          >
            <ButtonText>Create</ButtonText>
          </Button>
        </HStack>
      </Center>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 40,
    paddingVertical: 20
  }
});
