import { Controller } from 'react-hook-form';
import {
  AlertCircleIcon,
  FormControl,
  FormControlError,
  FormControlErrorIcon, FormControlErrorText,
  FormControlLabel, FormControlLabelText,
  Input,
  InputField,
} from '@gluestack-ui/themed';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useState } from 'react';

export default function BaseDateInput({ control, rules, name, label, errors}) {
  const [isShown, setIsShown] = useState(false);

  const hideDatePicker = () => setIsShown(false);

  return (
    <FormControl
      size="md"
      isDisabled={false}
      isInvalid={errors}
      isRequired={rules?.required}
    >
      <FormControlLabel mb="$1">
        <FormControlLabelText>{label}</FormControlLabelText>
      </FormControlLabel>
      <Input>
        <Controller
          control={control}
          name={name}
          render={({field: {onChange, value}}) => (
            <>
              <InputField disabled caretHidden value={new Date(value).toLocaleDateString('sk-SK')} onPress={() => setIsShown(true)} />
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
      </Input>
      <FormControlError>
        <FormControlErrorIcon as={AlertCircleIcon} />
        <FormControlErrorText>
          This is required.
        </FormControlErrorText>
      </FormControlError>
    </FormControl>



  );
}
