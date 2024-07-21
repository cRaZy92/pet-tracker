import {StyleSheet, ToastAndroid} from 'react-native';
import {useState} from 'react';
import {useForm, Controller} from 'react-hook-form';
import BaseTextInput from '../components/form/base-text-input';
import {useMutation} from 'convex/react';
import {api} from '../../convex/_generated/api';
import {Button, ButtonText, HStack, Center, Text, View} from '@gluestack-ui/themed';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export default function ExpenseCreateScreen({navigation}) {
  const [isShown, setIsShown] = useState(false);
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

  const hideDatePicker = () => {
    setIsShown(false);
  };

  return (
    <View style={styles.container}>
      <BaseTextInput control={control} rules={{required: true}} name="description" errors={errors.description}
                     label="Description"/>
      <BaseTextInput control={control} rules={{required: true}} name="amount" errors={errors.amount} label="Amount"/>
      {/*
      <BaseDateInput control={control} rules={{ required: true }} name="date" errors={errors.date} label="Date" />
*/}
      {/* TODO: move this to the BaseDateInput component and add styles */}
      <Controller
        control={control}
        name="date"
        render={({field: {onChange, value}}) => (
          <>
            <Button
              onPress={() => setIsShown(true)}>
              <Text>{value.toString()}</Text>
            </Button>
            <DateTimePickerModal
              date={value}
              isVisible={isShown}
              mode="date"
              onConfirm={(date) => {
                onChange(date);
                hideDatePicker();
              }}
              onCancel={hideDatePicker}
            />
          </>
        )}
      />

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
