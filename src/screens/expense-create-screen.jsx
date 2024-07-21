import { StyleSheet, ToastAndroid } from 'react-native';
import { useForm } from 'react-hook-form';
import BaseTextInput from '../components/form/base-text-input';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Button, ButtonText, HStack, Center, View } from '@gluestack-ui/themed';
import BaseDateInput from "@/components/form/base-date-input";

export default function ExpenseCreateScreen({navigation}) {
  const createNewExpense = useMutation(api.expenses.create);
  const {
    control, handleSubmit, reset,
    formState: {errors}
  } = useForm({
    defaultValues: {
      description: '',
      amount: '',
      date: new Date(),
    }
  });

  const onSubmit = data => {
    data.amount = parseInt(data.amount);
    data.date = data.date.getTime();

    createNewExpense(data).then((newExpenseId) => {
      console.log(`Saved new expense with ID ${newExpenseId}`);
      ToastAndroid.show('Money well spent!', ToastAndroid.SHORT);
      onCancel();
    }).catch((err) => {
      console.log(err);
      ToastAndroid.show('There was an error!', ToastAndroid.SHORT);
    });
  };

  const onCancel = () => {
    reset();
    navigation.navigate('Expenses');
  }

  return (
    <View style={styles.container}>
      <BaseTextInput control={control} rules={{ required: true }} name="description" errors={errors.description} label="Description"/>
      <BaseTextInput control={control} rules={{ required: true }} name="amount" errors={errors.amount} label="Amount"/>
      <BaseDateInput control={control} rules={{ required: true }} name="date" errors={errors.date} label="Date" />

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
