import { Card, Heading, Text, VStack, HStack } from '@gluestack-ui/themed';

export default function ExpenseItem({ description, amount, date }) {
  return (
    <Card borderRadius="$lg" m="$1">
      <HStack>
        <VStack mb="$3">
          <Heading
            fontSize="$md"
            fontStyle="normal"
            fontFamily="$heading"
            fontWeight="$normal"
            lineHeight="$sm"
            mb="$3"
            maxWidth="95%"
          >
            {description}
          </Heading>
          <Text size="sm" fontFamily="$heading">
            {new Date(date).toLocaleDateString('sk-SK')}
          </Text>
        </VStack>
        <Heading size="md" fontFamily="$heading" mb="$2" ml="auto" mr="0%">
          {amount}€
        </Heading>
      </HStack>
    </Card>
  );
}
