import { Card, Heading, Text, View } from '@gluestack-ui/themed';
import { useMemo } from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { differenceInCalendarDays, isThisYear } from "date-fns";

export default function ExpensesStats() {
  const expensesList = useQuery(api.expenses.list) || [];

  const stats = useMemo(() => {
    let last30Days = 0;
    let thisYear = 0;
    let allTime = 0;

    expensesList.forEach(expense => {
      const diff = differenceInCalendarDays(new Date(), new Date(expense.date));
      if(diff < 30) {
        last30Days += expense.amount;
      }
      if(isThisYear(new Date(expense.date))) {
        thisYear += expense.amount;
      }
      allTime += expense.amount;
    });

    return [
      {label: 'Last 30 days', value: last30Days },
      {label: 'This year', value: thisYear },
      {label: 'All time', value: allTime },
    ];
  }, [expensesList]);

  return (
    <View style={{display: 'flex', justifyContent: 'space-evenly', flexDirection: 'row', gap: 10, marginHorizontal: 4, marginVertical: 5}}>
      {
        stats.map((stat) => (
          <Card borderRadius="$lg" key={stat.label} style={{flex:1}}>
            <Heading
              fontSize="$md"
              fontStyle="normal"
              fontFamily="$heading"
              fontWeight="$normal"
              lineHeight="$sm"
              mb="$1"
              maxWidth="95%"
            >
              {stat.value}€
            </Heading>
            <Text size="sm" fontFamily="$heading">{stat.label}</Text>
          </Card>
        ))
      }
    </View>
  );
}
