import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useEffect } from 'react';

export default function FoodTypesScreen({ navigation }) {
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() => navigation.navigate('FoodTypeCreate')}
          style={styles.createNewButton}
        >
          <Text>New</Text>
        </Pressable>
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
  },
  createNewButton: {
    backgroundColor: '#3dbd00',
    color: '#fff',
    width: 60,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 22
  }
});
