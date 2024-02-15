import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Controller } from 'react-hook-form';

export default function BaseTextInput({ control, rules, name, label, errors}) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Controller
        control={control}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name={name}
      />
      {errors && <Text>This is required.</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display:'flex',
    flexDirection: 'column',
  },
  label: {
    fontSize: 22,
    marginBottom: 4
  },
  input: {
    color: '#fff',
    backgroundColor: '#222',
    fontSize: 20,
    minHeight: 50,
    minWidth: 200,
  }
});
