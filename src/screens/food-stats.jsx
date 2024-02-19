import { StyleSheet, Text, View } from 'react-native';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useMemo } from 'react';

export default function FoodStatsScreen() {
  const foodLogs = useQuery(api.foodLogs.getLastSevenDays) || [];

  const computedStats = useMemo(() => {
    if(foodLogs.length <= 0) {
      return {
        dailyAverage: 0,
        daysCount: 0,
        meatPercentage: 0
      };
    }

    let oldestDate = Math.min(...foodLogs.map((log) => log._creationTime));

    const now = new Date();
    oldestDate = new Date(oldestDate);
    const TimeDiff = now.getTime() - oldestDate.getTime();
    const DaysDiff = Math.ceil(TimeDiff / (1000 * 3600 * 24));

    const weightSum = foodLogs.reduce((accumulator, log) => {
      return accumulator + log.food.weight;
    }, 0);

    const meatSum = foodLogs.reduce((accumulator, log) => {
      return accumulator + log.food.meatContent;
    }, 0);

    return {
      dailyAverage: weightSum / DaysDiff,
      daysCount: DaysDiff,
      meatPercentage: Math.round(meatSum / foodLogs.length)
    }
  }, [foodLogs]);

  return (
    <View style={styles.container}>
      <View>
        <Text style={{fontSize: 18}}>Daily Average for past {computedStats?.daysCount ?? 0} days</Text>
        <Text style={{fontSize: 16}}>{computedStats?.dailyAverage ?? 0}g (meat content {computedStats?.meatPercentage ?? 0}%)</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    padding: 10
  }
});
