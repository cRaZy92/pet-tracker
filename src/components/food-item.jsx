import { ToastAndroid } from 'react-native';
import TestImage from '../../assets/test-image.png';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Box, Button, ButtonText, Card, Heading, Image, Text, VStack } from '@gluestack-ui/themed';

export default function FoodItem({ id, brand, name, weight, meatContent, amount }) {
  const updateFood = useMutation(api.food.update);

  const onAmountChange = changeAmount => {
    updateFood({ id: id, amount: amount, amountChange: changeAmount }).then(() => {
      console.log(`Food with ID ${id} was updated.`);
      ToastAndroid.show('Your pet is thankful!', ToastAndroid.SHORT);
    }).catch((err) => {
      console.log(err);
      ToastAndroid.show('Mission failed!', ToastAndroid.SHORT);
    });
  };

  return (
    <Card borderRadius="$lg" maxWidth="49%" m="$1">
      <Image
        mb="$3"
        h={120}
        width="$full"
        borderRadius="$md"
        source={TestImage}
        alt="food image"
      />
      <Text
        fontSize="$sm"
        fontStyle="normal"
        fontFamily="$heading"
        fontWeight="$normal"
        lineHeight="$sm"
        mb="$1"
      >
        {brand}
      </Text>
      <VStack mb="$3">
        <Heading size="md" fontFamily="$heading" mb="$2" width="98%">
          {name}
        </Heading>
        <Text size="sm" fontFamily="$heading">
          Weight: {weight}g ({meatContent}% meat)
        </Text>
      </VStack>
      <Box flexDirection="column">
        <Button
          px="$4"
          py="$2"
          fontFamily="$heading"
          mr="$0"
          mb="$3"
          isDisabled={amount < 1}
          onPress={() => onAmountChange(-1)}
        >
          <ButtonText size="sm">Nom Nom ({amount} left)</ButtonText>
        </Button>
        <Button
          px="$4"
          py="$2"
          variant="outline"
          fontFamily="$heading"
          action="positive"
          onPress={() => onAmountChange(1)}
        >
          <ButtonText
            size="sm"
            color="$textLight700"
            $dark-color="$textDark400"
          >
            Add more
          </ButtonText>
        </Button>
      </Box>
    </Card>
  );
}
