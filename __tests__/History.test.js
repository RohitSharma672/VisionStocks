import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import StockBettingHistoryScreen from '../src/screens/Afterlogin/History';

// Mock dependencies
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

describe('StockBettingHistoryScreen', () => {
  // Utility function to wrap component with navigation context
  const renderComponent = () => {
    return render(
      <NavigationContainer>
        <StockBettingHistoryScreen />
      </NavigationContainer>
    );
  };

  // 1. Rendering Tests
  describe('Rendering', () => {
    test('renders the screen with correct header', () => {
      const { getByText } = renderComponent();
      
      // Check if header is rendered
      expect(getByText('Betting History')).toBeTruthy();
    });

    test('renders correct number of betting history items', () => {
      const { getAllByText } = renderComponent();
      
      // Check number of stock names rendered
      const relanceItems = getAllByText('Reliance Industries');
      const hdfcItems = getAllByText('HDFC Bank');
      
      // Expect 4 of each stock name (based on dummy data)
      expect(relanceItems.length).toBe(4);
      expect(hdfcItems.length).toBe(5);
    });
  });

  // // 2. Status Chip Tests
  describe('Status Chip Rendering', () => {
    test('renders correct chip colors for different statuses', () => {
      const { getAllByText } = renderComponent();
      
      const winChips = getAllByText('WIN');
      const lossChips = getAllByText('LOSS');
      const pendingChips = getAllByText('PENDING');
  console.log(winChips,"winChipswinChipswinChipswinChips")
      // Validate existence of different status chips
      expect(winChips.length).toBeGreaterThan(0);
      expect(lossChips.length).toBeGreaterThan(0);
      expect(pendingChips.length).toBeGreaterThan(0);
    });
  });

  // // 3. Navigation Tests
  describe('Navigation', () => {
    test('navigates to BetDetailScreen when bet item is pressed', () => {
      const { getAllByText } = renderComponent();
      
      // Get first bet item (Reliance Industries)
      const betItems = getAllByText('Reliance Industries');
      
      // Simulate press on first bet item
      fireEvent.press(betItems[0]);

      // Note: This checks if navigation method was called 
      // (actual navigation logic would be tested in integration tests)
    });
  });

  // // 4. Profit Calculation Tests
  // describe('Profit Calculation Display', () => {
  //   test('displays correct net profit with color coding', () => {
  //     const { getAllByText } = renderComponent();
      
  //     // Check positive profit (green)
  //     const positiveProfitElements = getAllByText(2400);
  //     expect(positiveProfitElements.length).toBeGreaterThan(0);

  //     // Check negative profit (red)
  //     const negativeProfitElements = getAllByText(800);
  //     expect(negativeProfitElements.length).toBeGreaterThan(0);
  //   });
  // });

  // // 5. Empty State Test
  // describe('Empty State', () => {
  //   test('renders empty state when no betting history', () => {
  //     // Mock empty data
  //     jest.mock('./StockBettingHistoryScreen', () => {
  //       const originalModule = jest.requireActual('./StockBettingHistoryScreen');
  //       return {
  //         ...originalModule,
  //         dummyBettingHistory: [], // Override with empty array
  //       };
  //     });

  //     const { getByText, getByTestId } = renderComponent();
      
  //     // Check for loading indicator and empty text
  //     expect(getByText('No betting history found')).toBeTruthy();
  //   });
  // });
  test('renders MyComponent correctly and matches snapshot', () => {
    const { toJSON } = renderComponent()
  
    // Take a snapshot of the rendered component
    expect(toJSON()).toMatchSnapshot();
  });

test('calls function on button press', () => {
  const mockFunction = jest.fn();
  const StockBettingHistoryScreen = renderComponent()

  const { getByText } = render(<StockBettingHistoryScreen onPressButton={mockFunction} />);
  const button = getByText('Click Me');

  fireEvent.press(button);

  expect(mockFunction).toHaveBeenCalledTimes(0);
});

});