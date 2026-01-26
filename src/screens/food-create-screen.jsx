import { StyleSheet, ToastAndroid, View, Pressable } from 'react-native';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import BaseTextInput from '../components/form/base-text-input';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Button, ButtonText, HStack, Center, Image, InputSlot, GripVerticalIcon, InputIcon } from '@gluestack-ui/themed';
import { launchImageLibraryAsync } from 'expo-image-picker';
import TestImage from "../../assets/test-image.png";
import {BarcodeScanner} from "@/components/barcode-scanner";

export default function FoodCreateScreen({ navigation }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const createNewFood = useMutation(api.food.create);
  const generateUploadUrl = useMutation(api.messages.generateUploadUrl);
  const [isScannerOpen, setScannerOpen] = useState(false);

  const {
    control, handleSubmit, reset, setValue,
    formState: { errors, isSubmitting, isLoading },
  }
    = useForm({
    defaultValues: {
      amountInBox: '12',
      ean: '',
    }
  });

  const onScanButton = () => {
    setScannerOpen(true);
  };

  const onScanComplete = (data) => {
    console.log('Scan complete', data);
    setScannerOpen(false);
    setValue("ean", data);
  }

  const onSubmit = async (data) => {
    try {
      data.weight = parseInt(data.weight);
      data.meatContent = parseInt(data.meatContent);
      data.amountInBox = parseInt(data.amountInBox);

      if (selectedImage) {
        const postUrl = await generateUploadUrl();
        const response = await fetch(selectedImage.uri);
        const blob = await response.blob();

        const sendPicture = await fetch(postUrl, {
          method: "POST",
          headers: {"Content-Type": selectedImage.mimeType ?? "image/jpeg"},
          body: blob,
        });

        if (!sendPicture.ok) throw new Error("Image upload failed");

        const {storageId} = await sendPicture.json();
        data.storageId = storageId;
      }

      createNewFood(data).then((newFoodId) => {
        console.log(`Saved new food with ID ${newFoodId}`);
        ToastAndroid.show('New food saved!', ToastAndroid.SHORT);
        onCancel(); // TODO: this final step takes too long and the submit button can be pressed multiple times before nav back
      }).catch((err) => {
        console.log(err);
        ToastAndroid.show('There was an error!', ToastAndroid.SHORT);
      });
    } catch (err) {
        console.error("Submission error:", err);
        ToastAndroid.show('There was an error! ' + err.message, ToastAndroid.LONG);
    }
  };

  const onCancel = () => {
    reset();
    setSelectedImage(null);
    navigation.goBack();
  }

  const pickImage = async () => {
    let result = await launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0]);
    }
  };

  if(isScannerOpen) {
    return (
      <BarcodeScanner onScan={onScanComplete} />
    );
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={pickImage}>
        <Image
          mb="$3"
          h={200}
          width="$full"
          margin="auto"
          borderRadius="$md"
          source={selectedImage ? {uri: selectedImage.uri} : TestImage}
          alt="food image"
        />
      </Pressable>

      <BaseTextInput control={control} rules={{ required: true }} name="brand" errors={errors.brand} label="Brand" />
      <BaseTextInput control={control} rules={{ required: true }} name="name" errors={errors.name} label="Name" />
      <BaseTextInput control={control} rules={{ required: true }} name="weight" errors={errors.weight} label="Weight (g)" />
      <BaseTextInput control={control} rules={{ required: true }} name="meatContent" errors={errors.meatContent} label="Meat Content (%)" />
      <BaseTextInput control={control} rules={{ required: true }} name="amountInBox" errors={errors.amountInBox} label="Amount in box" />
      <BaseTextInput control={control} rules={{ required: true }} name="ean" errors={errors.ean} label="EAN">
        <InputSlot className="pr-3" onPress={onScanButton}>
          <InputIcon as={GripVerticalIcon} w="$8" h="$8" />
        </InputSlot>
      </BaseTextInput>

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
            isDisabled={isSubmitting || isLoading}
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
  },
  image: {
    width: '100%',
    height: 100
  }
});
