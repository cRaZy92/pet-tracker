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

export default function BaseTextInput({ control, rules, name, label, errors}) {
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
          rules={rules}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputField onBlur={onBlur}
                        onChangeText={onChange}
                        value={value} />
          )}
          name={name}
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
