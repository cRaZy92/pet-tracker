import { Button, StyleSheet, Text, View } from 'react-native';
import { useEffect } from 'react';

export default function FoodTypesScreen({ navigation }) {
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => navigation.navigate('FoodTypeCreate')}
          title="New"
          color="#444"
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text>WIP</Text>
      <Text>Display all saved food types.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
