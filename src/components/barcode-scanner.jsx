import { useState } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Box, Button, ButtonText, Text, Center, Spinner, VStack } from "@gluestack-ui/themed";

export const BarcodeScanner = ({ onScan }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(null);

  if (!permission) {
    return <Center f={1}><Spinner /></Center>;
  }

  if (!permission.granted) {
    return (
      <Center f={1} p="$4">
        <VStack space="md" alignItems="center">
          <Text textAlign="center">We need your permission to show the camera</Text>
          <Button onPress={requestPermission}>
            <ButtonText>Grant Permission</ButtonText>
          </Button>
          <Button variant="outline" onPress={() => onScan(null)}>
            <ButtonText>Cancel</ButtonText>
          </Button>
        </VStack>
      </Center>
    );
  }

  const handleBarCodeScanned = ({ data }) => {
    setScanned(data);
  };

  const onConfirm = () => {
    onScan(scanned);
  }

  const onCancel = () => {
    onScan(null);
  }

  return (
      <CameraView
        style={{height: '100%', width: '100%'}}
        facing="back"
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["ean13", "ean8", "upc_a"],
        }}
      >
        {/* Viewfinder Overlay */}
        <Box f={1} bg="transparent" justifyContent="center" alignItems="center" style={{top: '20%'}}>
          <Box
            w={250}
            h={250}
            borderWidth={2}
            borderColor={scanned ? "$success500" : "$white"}
            borderRadius="$lg"
          />
          <Text color="$white" mt="$4" fontWeight="$bold" bgColor="#00000088" p="$2">
            {scanned ? `EAN: ${scanned}` : "Align barcode within the square"}
          </Text>
        </Box>

        {/* Controls */}
        <Box position="absolute" bottom="$10" left={0} right={0} px="$10">
          <VStack space="lg">
            {scanned && (
              <Button action="success" onPress={onConfirm}>
                <ButtonText>Confirm</ButtonText>
              </Button>
            )}
            <Button action="secondary" variant="outline" onPress={onCancel}>
              <ButtonText>Close Scanner</ButtonText>
            </Button>
          </VStack>
        </Box>
      </CameraView>
  );
};
