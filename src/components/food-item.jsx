import { Image, Pressable, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import TestImage from '../../assets/test-image.png';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';

export default function FoodItem({ id, brand, name, calories, amount }) {
  const updateFood = useMutation(api.food.update);

  const onAmountChange = changeAmount => {
    updateFood({id: id, amount: amount, amountChange: changeAmount}).then(() => {
      console.log(`Food with ID ${id} was updated.`);
      ToastAndroid.show('Food updated!', ToastAndroid.SHORT);
    }).catch((err) => {
      console.log(err);
      ToastAndroid.show('Mission failed!', ToastAndroid.SHORT);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{brand} - {name}</Text>
      <Text>Cals: {calories}</Text>
      <Image source={TestImage} style={styles.image} />
      <View style={styles.actionsContainer}>
        <Pressable style={[styles.actionButton, styles.actionSub]} onPress={() => onAmountChange(-1)}>
          <Text style={styles.actionText}>-</Text>
        </Pressable>
        <Text style={styles.actionText}>{amount}</Text>
        <Pressable style={[styles.actionButton, styles.actionAdd]} onPress={() => onAmountChange(1)}>
          <Text style={styles.actionText}>+</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display:'flex',
    flexDirection: 'column',
    width: '50%',
    padding: 5
  },
  title: {
    fontSize: 20,
    marginBottom: 4
  },
  image: {
    height: 100,
    width: 'auto'
  },
  actionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 4
  },
  actionButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8
  },
  actionAdd: {
    backgroundColor: '#008f00'
  },
  actionSub: {
    backgroundColor: '#ee0000'
  },
  actionText: {
    fontWeight: '300',
    fontSize: 30
  }
});
