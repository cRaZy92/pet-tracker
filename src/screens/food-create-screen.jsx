import { Pressable, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import { useForm } from 'react-hook-form';
import BaseTextInput from '../components/form/base-text-input';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';

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

      <View style={styles.formActionsContainer}>
        <Pressable style={[styles.formButton, styles.formCancelButton]} onPress={onCancel}>
          <Text>Cancel</Text>
        </Pressable>
        <Pressable style={[styles.formButton, styles.formSubmitButton]} onPress={handleSubmit(onSubmit)}>
          <Text>Create</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formActionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: 40,
    marginTop: 10
  },
  formButton: {
    width: 60,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formSubmitButton: {
    backgroundColor: '#2f8f00',
  },
  formCancelButton: {
    backgroundColor: '#c20000',
  },
});
