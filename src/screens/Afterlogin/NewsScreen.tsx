import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView
} from 'react-native';
import {
  Text,
  Surface,
  TouchableRipple,
  IconButton,
} from 'react-native-paper';
import { LineChart } from 'react-native-chart-kit';
import { fp, hp, wp } from '../../utility/dimensions';
import FetchDataHooks from '../../common/customhooks';
import { useFeatureAlert } from '../../common/AlertHooks';

interface PopulationData {
  Year: number;
  Population: number;
}

interface ChartData {
  labels: string[];
  datasets: {
    data: number[];
    color: (opacity: number) => string;
  }[];
}

const NewsScreen: React.FC = () => {
  const { populationData, loading, error } = FetchDataHooks();
  const [selectedYear, setSelectedYear] = useState<PopulationData | null>(null);
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const showFeatureAlert = useFeatureAlert();

  const handleFeaturePress = () => {
    showFeatureAlert();
  };

  useEffect(() => {
    if (populationData?.data) {
      const sortedData = populationData.data.sort((a: PopulationData, b: PopulationData) => a.Year - b.Year);
      const processedChartData: ChartData = {
        labels: sortedData.map((item: { Year: { toString: () => any; }; }) => item.Year.toString()),
        datasets: [
          {
            data: sortedData.map((item: { Population: any; }) => item.Population),
            color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`,
          },
        ],
      };

      setChartData(processedChartData);
      setSelectedYear(sortedData[0]);
    }
  }, [populationData]);

  const handleYearSelect = (year: number) => {
    const selectedYearData = populationData && populationData.data.find((item: PopulationData) => item.Year === year);
    setSelectedYear(selectedYearData || null);
  };

  const renderContent = () => {
    if (loading) return <Text style={styles.loadingText}>Loading...</Text>;
    if (error) return <Text style={styles.errorText}>Error loading data</Text>;
    if (!chartData || !selectedYear) return null;

    return (
      <View style={styles.content}>
        <Text style={styles.title}>Population Trends</Text>
        <View style={{ left: wp(2) }}>
          <LineChart
            data={chartData}
            width={wp(95)}
            height={hp(40)}
            withDots
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
            contentContainerStyle={styles.scrollViewContent}
          >
            {chartData.labels.map((year) => (
              <TouchableRipple
                key={year}
                style={[
                  styles.yearSelector,
                  selectedYear.Year.toString() === year && styles.selectedYear,
                ]}
                onPress={() => handleYearSelect(year)}
              >
                <Text
                  style={[
                    styles.yearSelectorText,
                    selectedYear.Year.toString() === year && styles.yearSelectorText1,
                  ]}
                >
                  {year}
                </Text>
              </TouchableRipple>
            ))}
          </ScrollView>
        </View>
        <Surface style={styles.cardSubSectionModified}>
          <View style={styles.cardLeftContent}>
            <Text style={styles.cardTitle}>Total Growth</Text>
            <Text style={styles.cardYearText}>{selectedYear.Year}</Text>
          </View>
          <Text style={styles.cardValue}>{selectedYear.Population.toLocaleString()}</Text>
        </Surface>
        <Surface style={styles.cardSubSection}>
          <Text style={styles.subTitle}>Recent Growth Rate</Text>
          <View style={styles.growthRateContainer}>
            <Text style={styles.growthRate}>
              2024-2023:&nbsp;&nbsp; <Text style={{ color: '#00FF00' }}>0.41%</Text>
            </Text>
            <Text style={styles.growthRate}>
              2023-2022:&nbsp;&nbsp; <Text style={{ color: '#00FF00' }}>5.41%</Text>
            </Text>
            <Text style={styles.growthRate}>
              2022-2021:&nbsp;&nbsp; <Text style={{ color: '#00FF00' }}>2.41%</Text>
            </Text>
            <Text style={styles.growthRate}>
              2021-2020:&nbsp;&nbsp; <Text style={{ color: '#00FF00' }}>6.41%</Text>
            </Text>
            <Text style={styles.growthRate}>
              2020-2019:&nbsp;&nbsp; <Text style={{ color: '#00FF00' }}>3.41%</Text>
            </Text>
         
          </View>
        </Surface>
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
          <View >
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
  cardSubSectionModified: {
    width: '100%',
    marginTop: hp(2),
    backgroundColor: '#292929',
    borderRadius: wp(3),
    paddingRight: wp(3),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: wp(3),
    elevation: 4,
  },
  cardLeftContent: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  cardYearText: {
    color: 'gray',
    fontSize: fp(1.6),
    marginTop: hp(0.5),
  },
  cardTitle: {
    color: '#fff',
    fontSize: fp(2),
    fontWeight: '400',
  },
  cardValue: {
    color: '#00FF00',
    fontSize: fp(2.6),
    fontWeight: '500',
    marginVertical: hp(1),
  },
  cardSubSection: {
    width: '100%',
    marginTop: hp(2),
    backgroundColor: '#292929',
    paddingRight: wp(3),
    padding: wp(3),
    borderRadius: wp(3),
    elevation: 4,
  },
  subTitle: {
    color: '#fff',
    fontSize: fp(2),
    fontWeight: '500',
    marginBottom: hp(1),
  },
  growthRateContainer: {
    alignItems: 'flex-start',
  },
  growthRate: {
    color: 'gray',
    fontSize: fp(1.8),
    marginBottom: hp(0.5),
  },
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
  chart: {},
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

export default NewsScreen;