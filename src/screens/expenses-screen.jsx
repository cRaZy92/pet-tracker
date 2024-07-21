import { useEffect } from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { FlatList, Button, ButtonText, ButtonIcon, AddIcon } from '@gluestack-ui/themed';
import ExpenseItem from "@/components/expense-item";

export default function ExpensesScreen({ navigation }) {
  const expensesList = useQuery(api.expenses.list) || [];

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          action="positive"
          onPress={() => navigation.navigate('ExpenseCreate')}
        >
          <ButtonText>New </ButtonText>
          <ButtonIcon as={AddIcon} />
        </Button>
      ),
    });
  }, [navigation]);

  return (
    <FlatList
      data={expensesList}
      keyExtractor={(item) => item._id }
      renderItem={({ item }) =>
        <ExpenseItem {...item} />
      }
    />
  );
}
