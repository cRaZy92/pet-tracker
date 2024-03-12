import { ToastAndroid } from 'react-native';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import {
  AlertCircleIcon,
  Button,
  ButtonText,
  CloseIcon,
  FormControl,
  FormControlError,
  FormControlErrorIcon, FormControlErrorText,
  FormControlLabel, FormControlLabelText,
  Heading,
  Icon,
  Input,
  InputField,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  VStack,
} from '@gluestack-ui/themed';
import { useMemo, useRef, useState } from 'react';

export default function FoodAddMoreModal({ id, brand, name, originalAmount }) {
  const [showModal, setShowModal] = useState(false)
  const ref = useRef(null)
  const updateFood = useMutation(api.food.update);
  const [newAmount, setNewAmount] = useState();
  const isInvalid = useMemo(() => {
    const parsedAmount = parseInt(newAmount);

    return Number.isNaN(parsedAmount) || parsedAmount < 1;
  }, [newAmount])

  const onSubmit = () => {
    updateFood({ id: id, amount: originalAmount, amountChange: parseInt(newAmount) }).then(() => {
      console.log(`Food with ID ${id} was updated, added ${newAmount}.`);
      ToastAndroid.show('Food was added to the storage!', ToastAndroid.SHORT);
      setShowModal(false);
    }).catch((err) => {
      console.log(err);
      ToastAndroid.show('Mission failed!', ToastAndroid.SHORT);
    });
  };

  return (
    <>
      <Button
        px="$4"
        py="$2"
        variant="outline"
        fontFamily="$heading"
        action="positive"
        onPress={() => setShowModal(true)}
        ref={ref}
      >
        <ButtonText
          size="sm"
          color="$textLight700"
          $dark-color="$textDark400"
        >
          Add more
        </ButtonText>
      </Button>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        finalFocusRef={ref}
      >
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <VStack>
              <Heading size="lg">Add more of </Heading>
              <Heading size="sm">{brand} - {name}</Heading>
            </VStack>
            <ModalCloseButton>
              <Icon as={CloseIcon}/>
            </ModalCloseButton>
          </ModalHeader>

          <ModalBody>
              <FormControl
                size="md"
                isDisabled={false}
                isInvalid={isInvalid}
                isRequired={true}
              >
                <FormControlLabel mb="$1">
                  <FormControlLabelText>Amount to add</FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <InputField type="number" placeholder="12" onChangeText={(text) => setNewAmount(text)} />
                </Input>
                <FormControlError>
                  <FormControlErrorIcon as={AlertCircleIcon} />
                  <FormControlErrorText>
                    Add at least 1.
                  </FormControlErrorText>
                </FormControlError>
              </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="outline"
              size="sm"
              action="secondary"
              mr="$3"
              onPress={() => setShowModal(false)}
            >
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button
              size="sm"
              action="positive"
              borderWidth="$0"
              onPress={onSubmit}
              isDisabled={isInvalid}
            >
              <ButtonText>Add!</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
