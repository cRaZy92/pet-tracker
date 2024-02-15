import { Pressable, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import { useForm } from 'react-hook-form';
import BaseTextInput from '../components/form/base-text-input';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';

export default function FoodTypeCreateScreen({ navigation }) {
  const {
    control, handleSubmit, reset,
    formState: { errors }
  }
    = useForm({
    defaultValues: {
      brand: '',
      name: '',
      calories: '0'
    }
  });
  const createFoodType = useMutation(api.foodTypes.create);

  const onSubmit = data => {
    console.log(data);
    data.calories = parseInt(data.calories);

    createFoodType(data).then((newFoodId) => {
      console.log(`Saved new food type with ID ${newFoodId}`);
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
      <BaseTextInput control={control} rules={{ required: true }} name="calories" errors={errors.calories} label="Calories" />

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
