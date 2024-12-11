import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withSequence, 
  withTiming,
  Easing
} from 'react-native-reanimated';
import { Text } from 'react-native-paper';
import { fp, hp } from '../utility/dimensions';

const AnimatedInstructionText = ({ 
  text = "Please Select the Year to Show Yearly Wise Data", 
  style = {},
  textStyle = {}
}) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.1, { 
          duration: 1000, 
          easing: Easing.bezier(0.4, 0.0, 0.2, 1) 
        }),
        withTiming(1, { 
          duration: 1000, 
          easing: Easing.bezier(0.4, 0.0, 0.2, 1) 
        })
      ),
      -1,
      true 
    );
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.7, { 
          duration: 1000, 
          easing: Easing.bezier(0.4, 0.0, 0.2, 1) 
        }),
        withTiming(1, { 
          duration: 1000, 
          easing: Easing.bezier(0.4, 0.0, 0.2, 1) 
        })
      ),
      -1, 
      true
    );
  }, []);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value
    };
  });

  return (
    <Animated.View style={[styles.container, style, animatedStyle]}>
      <Text 
        style={[
          styles.text, 
          textStyle
        ]}
      >
        {text}
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: fp(1.8),
    textAlign: 'center',
    fontWeight: '600',
    color: '#00FF00',
  }
});

export default AnimatedInstructionText;