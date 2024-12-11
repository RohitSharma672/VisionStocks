import React, { useCallback } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const useFeatureAlert = () => {
  const navigation = useNavigation();

  const showFeatureAlert = useCallback(() => {
    Alert.alert(
      'Feature Unavailable', 
      'This feature is not working. Please try again some time.', 
      [
        {
          text: 'Back', 
          style: 'cancel'
        },
        {
          text: 'OK', 
          style: 'default'
        }
      ],
      { 
        cancelable: true,
      }
    );
  }, [navigation]);

  return showFeatureAlert;
};
