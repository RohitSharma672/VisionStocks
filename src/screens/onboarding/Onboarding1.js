import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Dimensions, 
  Image,
  Animated as RNAnimated,
  StyleSheet,
  StatusBar
} from 'react-native';

const Onboarding1 = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { width, height } = Dimensions.get('window');
  const intervalRef = useRef(null);
  const fadeAnim = useRef(new RNAnimated.Value(0)).current;
  const translateAnim = useRef(new RNAnimated.Value(50)).current;
  const navigation = useNavigation();

  const onboardingSteps = [
    {
      title: 'Smart Investment Tracking',
      description: 'Gain powerful insights into your portfolio with real-time analytics and performance monitoring.',
      image: require('../../assets/images/one.jpg'),
      backgroundColor: '#6a11cb'
    },
    {
      title: 'Instant Market Alerts',
      description: 'Stay ahead with personalized notifications about market trends, stock movements, and investment opportunities.',
      image: require('../../assets/images/two.jpg'),
      backgroundColor: '#ff6a00'
    },
    {
      title: 'Personalized Financial Journey',
      description: 'Tailored investment recommendations that align with your unique financial goals and risk tolerance.',
      image: require('../../assets/images/three.jpg'),
      backgroundColor: '#00b09b'
    }
  ];

  // Animate content
  useEffect(() => {
    // Reset animations
    fadeAnim.setValue(0);
    translateAnim.setValue(50);

    // Animate content in
    RNAnimated.parallel([
      RNAnimated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true
      }),
      RNAnimated.timing(translateAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true
      })
    ]).start();
  }, [currentStep]);

  // Automatic screen transition
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentStep((prev) => 
        prev < onboardingSteps.length - 1 ? prev + 1 : 0
      );
    }, 4000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleNext = () => {
    setCurrentStep((prev) => 
      prev < onboardingSteps.length - 1 ? prev + 1 : 0
    );
  };

  const handleSkip = () => {
    // Navigate to main app or login screen
    navigation.navigate('Login'); // or 'Login'

  };

  const handleContinue = () => {
    // Navigate to main app or login screen
    navigation.navigate('Login'); // or 'Login'

  };

  return (
    <View style={[styles.container, { width, height }]}>
      <StatusBar hidden />
      
      {/* Background with Color */}
      <View 
        style={[
          styles.backgroundColor, 
          { 
            backgroundColor: onboardingSteps[currentStep].backgroundColor,
            width, 
            height 
          }
        ]}
      >
        <Image 
          source={onboardingSteps[currentStep].image}
          style={[
            styles.backgroundImage, 
            { width, height: height * 0.6 }
          ]}
          resizeMode="cover"
        />
      </View>

      {/* Dimmer Overlay */}
      <View style={styles.overlay} />

      {/* Animated Content */}
      <RNAnimated.View 
        style={[
          styles.contentOverlay,
          { 
            opacity: fadeAnim,
            transform: [
              { translateY: translateAnim }
            ]
          }
        ]}
      >
        <Text style={styles.title}>
          {onboardingSteps[currentStep].title}
        </Text>
        
        <Text style={styles.description}>
          {onboardingSteps[currentStep].description}
        </Text>
      </RNAnimated.View>

      {/* Progress Indicators */}
      <View style={styles.progressContainer}>
        {onboardingSteps.map((_, index) => (
          <View 
            key={index} 
            style={[
              styles.progressDot, 
              currentStep === index ? styles.activeDot : styles.inactiveDot
            ]}
          />
        ))}
      </View>

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.skipButton}
          onPress={handleSkip}
        >
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>

        {currentStep < onboardingSteps.length - 1 ? (
          <TouchableOpacity 
            style={styles.nextButton}
            onPress={handleNext}
          >
            <Text style={styles.nextText}>Next</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            style={styles.continueButton}
            onPress={handleContinue}
          >
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    position: 'relative',
  },
  backgroundColor: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    opacity: 0.4,
    zIndex: 2,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 3,
  },
  contentOverlay: {
    position: 'absolute',
    bottom: '30%',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 4,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  description: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 26,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5,
  },
  progressContainer: {
    position: 'absolute',
    bottom: '20%',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    zIndex: 5,
  },
  progressDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 6,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  activeDot: {
    backgroundColor: 'white',
    width: 24,
  },
  inactiveDot: {
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 6,
  },
  skipButton: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skipText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  nextButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  nextText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  continueButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
  },
  continueText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Onboarding1;