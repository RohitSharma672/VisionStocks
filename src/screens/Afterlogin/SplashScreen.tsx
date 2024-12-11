import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Text, Surface, useTheme} from 'react-native-paper';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';
import {fp} from '../../utility/dimensions';

const SplashScreen = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const scale = useSharedValue(0.5);
  const opacity = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    scale.value = withSpring(1, {damping: 10, stiffness: 100});
    opacity.value = withTiming(1, {
      duration: 1000,
      easing: Easing.bezier(0.4, 0.0, 0.2, 1),
    });

    const timer = setTimeout(() => {
      navigation.navigate('Main');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Surface style={styles.container}>
      <Animated.View style={[styles.content, animatedStyle]}>
        <Text style={[styles.title, {color: theme.colors.primary}]}>
          Hi Thinkle
        </Text>
        <Text style={[styles.subtitle, {color: theme.colors.secondary}]}>
          This is My Dummy Project for Assignment
        </Text>
      </Animated.View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  content: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: fp(3),
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: fp(2.5),
    marginBottom: 5,
    textAlign: 'center',
  },
});

export default SplashScreen;
