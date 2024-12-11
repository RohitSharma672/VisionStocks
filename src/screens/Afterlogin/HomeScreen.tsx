import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {
  Text,
  Surface,
  TouchableRipple,
  IconButton,
  ActivityIndicator,
  useTheme,
} from 'react-native-paper';
import {LineChart} from 'react-native-chart-kit';
import {fp, hp, wp} from '../../utility/dimensions';
import FetchDataHooks from '../../common/customhooks';
import {useFeatureAlert} from '../../common/AlertHooks';
import AnimatedInstructionText from '../../common/AnimatedInstructionText';

interface PopulationData {
  Year: number;
  Population: number;
}

interface ChartData {
  labels: number[];
  datasets: {
    data: number[];
    color?: (opacity: number) => string;
  }[];
}

const USPopulationInsights: React.FC = () => {
  const {populationData, loading, error} = FetchDataHooks();
  const [selectedYear, setSelectedYear] = useState<PopulationData | null>(null);
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const showFeatureAlert = useFeatureAlert();
  const theme = useTheme();

  const handleFeaturePress = () => {
    showFeatureAlert();
  };

  useEffect(() => {
    if (populationData && populationData.data) {
      const sortedData = populationData.data.sort(
        (a: PopulationData, b: PopulationData) => a.Year - b.Year,
      );
      const processedChartData: ChartData = {
        labels: sortedData.map((item: {Year: any}) => item.Year),
        datasets: [
          {
            data: sortedData.map((item: {Population: any}) => item.Population),
            color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`,
          },
        ],
      };

      setChartData(processedChartData);
      setSelectedYear(sortedData[0]);
    }
  }, [populationData]);

  const handleYearSelect = (year: number) => {
    const selectedYearData = populationData.data.find(
      (item: PopulationData) => item.Year === year,
    );
    setSelectedYear(selectedYearData || null);
  };

  const renderContent = () => {
    if (loading)
      return (
        <ActivityIndicator animating={true} size="large" color={'#00FF00'} />
      );

    if (loading) return <Text style={styles.loadingText}>Loading...</Text>;
    if (error) return <Text style={styles.errorText}>Error loading data</Text>;
    if (!chartData || !selectedYear) return null;

    return (
      <View style={styles.content}>
        <Text style={styles.title}>US Population Insights</Text>
        <Text style={styles.population}>
          {selectedYear?.Population.toLocaleString()}
        </Text>
        <Text style={styles.growth}>
          +20,879,99 <Text style={styles.percentage}>(56%)</Text>{' '}
          <Text style={{color: 'lightgray'}}>since 17 Jun 2019</Text>
        </Text>
        <View style={{left: wp(2)}}>
          <LineChart
            data={chartData}
            width={wp(95)}
            height={hp(40)}
            withDots={true}
            withInnerLines={false}
            chartConfig={{
              backgroundColor: '#000000',
              backgroundGradientFrom: '#000000',
              backgroundGradientTo: '#000000',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              fillShadowGradient: 'rgba(0, 255, 0, 0.5)',
              fillShadowGradientOpacity: 1,
            }}
            bezier
            style={styles.chart}
          />
        </View>
        <View style={styles.yearSelectorContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewContent}>
            {chartData.labels.map(year => (
              <TouchableRipple
                key={year}
                onPress={() => handleYearSelect(year)}
                style={[
                  styles.yearSelector,
                  selectedYear.Year === year && styles.selectedYear,
                ]}>
                <Text
                  style={[
                    styles.yearSelectorText,
                    selectedYear.Year === year && styles.yearSelectorText1,
                  ]}>
                  {year}
                </Text>
              </TouchableRipple>
            ))}
          </ScrollView>
        </View>
        <AnimatedInstructionText />
        <View>
          <Text style={styles.statValue1}>Key Statistics</Text>
        </View>
        <View style={styles.statisticsContainer}>
          <Surface style={styles.statCard}>
            <Text style={styles.statLabel}>2019 to 2022</Text>
            <Text style={styles.statValue}>+1,372,112</Text>
            <Text style={styles.statPercentage}>0.41% increase</Text>
          </Surface>
          <Surface style={styles.statCard}>
            <Text style={styles.statLabel}>2019 to 2024</Text>
            <Text style={styles.statValue}>+1,372,112</Text>
            <Text style={styles.statPercentage}>5.41% increase</Text>
          </Surface>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <IconButton
          icon="magnify"
          iconColor="white"
          size={fp(3.5)}
          onPress={handleFeaturePress}
        />
        <View style={styles.header1}>
          <IconButton
            icon="heart-outline"
            iconColor="white"
            size={fp(3.5)}
            onPress={handleFeaturePress}
          />
          <View>
            <IconButton
              icon="close"
              iconColor="white"
              size={fp(3.5)}
              onPress={handleFeaturePress}
            />
          </View>
        </View>
      </View>
      {renderContent()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  header1: {
    flexDirection: 'row',
  },
  content: {
    flex: 1,
  },
  title: {
    color: '#fff',
    fontSize: fp(2.5),
    fontWeight: '600',
    marginBottom: 8,
  },
  population: {
    color: '#fff',
    fontSize: fp(3.5),
    fontWeight: '400',
  },
  growth: {
    color: '#00FF00',
    fontSize: 14,
    marginBottom: 16,
  },
  percentage: {
    color: '#00FF00',
  },
  chart: {},
  statisticsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: hp(2),
  },
  statCard: {
    backgroundColor: '#292929',
    borderRadius: wp(3),
    padding: wp(4),
    width: '48%',
    marginRight: wp(3),
    elevation: 4,
  },
  statValue: {
    color: '#fff',
    fontSize: fp(2.1),
    fontWeight: '500',
    textAlign: 'center',
    justifyContent: 'center',
  },
  statValue1: {
    color: '#fff',
    fontSize: fp(2.1),
    fontWeight: '700',
    marginTop: hp(3),
  },
  statLabel: {
    color: '#fff',
    fontSize: fp(2.2),
    marginTop: 4,
    textAlign: 'center',
    justifyContent: 'center',
  },
  statPercentage: {
    color: '#00FF00',
    fontSize: fp(1.8),
    marginTop: 4,
    textAlign: 'center',
    justifyContent: 'center',
  },
  yearSelectorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    bottom: hp(2),
  },
  scrollViewContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  yearSelector: {
    backgroundColor: '#121212',
    padding: wp(1),
    margin: wp(1),
  },
  selectedYear: {
    backgroundColor: 'black',
    borderRadius: wp(3),
    borderColor: 'white',
    borderWidth: 1,
  },
  yearSelectorText: {
    color: 'gray',
    fontSize: fp(1.5),
  },
  yearSelectorText1: {
    color: 'white',
    fontSize: fp(1.5),
  },
  loadingText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default USPopulationInsights;
