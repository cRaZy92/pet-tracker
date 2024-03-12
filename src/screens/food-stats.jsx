import { StyleSheet, View } from 'react-native';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useMemo } from 'react';
import { Heading, VStack, Text } from '@gluestack-ui/themed';

export default function FoodStatsScreen() {
  const lastDaysLogs = useQuery(api.foodLogs.getLastSevenDays) || [];
  const allLogs = useQuery(api.foodLogs.getAll) || [];

  const lastSevenDaysStats = useMemo(() => {
    if(lastDaysLogs.length <= 0) {
      return {
        dailyAverage: 0,
        daysCount: 0,
        meatPercentage: 0
      };
    }

    let oldestDate = Math.min(...lastDaysLogs.map((log) => log._creationTime));

    const now = new Date();
    oldestDate = new Date(oldestDate);
    const TimeDiff = now.getTime() - oldestDate.getTime();
    const DaysDiff = Math.ceil(TimeDiff / (1000 * 3600 * 24));

    const weightSum = lastDaysLogs.reduce((accumulator, log) => {
      return accumulator + log.food.weight;
    }, 0);

    const meatSum = lastDaysLogs.reduce((accumulator, log) => {
      return accumulator + log.food.meatContent;
    }, 0);

    return {
      dailyAverage: Math.round(weightSum / DaysDiff),
      daysCount: DaysDiff,
      meatPercentage: Math.round(meatSum / lastDaysLogs.length),
      packets: lastDaysLogs.length
    }
  }, [lastDaysLogs]);

  const overallStats = useMemo(() => {
    if(allLogs.length <= 0) {
      return {
        dailyAverage: 0,
        trackingSince: new Date(),
        meatPercentage: 0,
        packets: 0,
        overallWeight: 0,
        weightPerPackage: 0
      };
    }

    let oldestDate = Math.min(...allLogs.map((log) => log._creationTime));

    const now = new Date();
    oldestDate = new Date(oldestDate);
    const TimeDiff = now.getTime() - oldestDate.getTime();
    const DaysDiff = Math.ceil(TimeDiff / (1000 * 3600 * 24));

    const weightSum = allLogs.reduce((accumulator, log) => {
      return accumulator + log.food.weight;
    }, 0);

    const meatSum = allLogs.reduce((accumulator, log) => {
      return accumulator + log.food.meatContent;
    }, 0);

    return {
      dailyAverage: Math.round(weightSum / DaysDiff),
      trackingSince: oldestDate,
      meatPercentage: Math.round(meatSum / allLogs.length),
      packets: allLogs.length,
      overallWeight: weightSum,
      weightPerPackage: Math.round(weightSum / allLogs.length)
    }
  }, [allLogs]);

  if (lastSevenDaysStats.daysCount < 1) {
    return (
      <View style={styles.container}>
        <Text>You need to track pet food usage for at least a day.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <VStack mb="$8">
        <Heading size="lg" fontFamily="$heading" mb="$2" width="98%">
          Daily average for past {lastSevenDaysStats.daysCount} days
        </Heading>
        <Text size="sm" fontFamily="$heading">
          {lastSevenDaysStats?.dailyAverage ?? 0}g (meat content {lastSevenDaysStats?.meatPercentage ?? 0}%) in {lastSevenDaysStats?.packets} food packages.
        </Text>
      </VStack>
      <VStack mb="$3">
        <Heading size="lg" fontFamily="$heading" mb="$2" width="98%">
          Random stats
        </Heading>
        <Text size="sm" fontFamily="$heading">
          Tracking since: {overallStats.trackingSince.toLocaleString()}
        </Text>
        <Text size="sm" fontFamily="$heading">
          Overall eaten: {overallStats.overallWeight}g
        </Text>
        <Text size="sm" fontFamily="$heading">
          Overall daily average: {overallStats.dailyAverage}g (meat content {overallStats?.meatPercentage ?? 0}%)
        </Text>
        <Text size="sm" fontFamily="$heading">
          Food packages eaten: {overallStats.packets}
        </Text>
        <Text size="sm" fontFamily="$heading">
          Average weight per food package: {overallStats.weightPerPackage}g
        </Text>
      </VStack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  }
});
