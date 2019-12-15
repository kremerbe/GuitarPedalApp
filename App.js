/**
 * Guitar Pedal React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { YellowBox } from 'react-native';
import { createBottomTabNavigator, createAppContainer, createSwitchNavigator, createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import Home from './src/GUI/Home';

const AppStack = createSwitchNavigator(
  {
    home: Home
  },
  {
    initialRouteName: "home"
  }
);

export default createAppContainer(AppStack);

// const AppTabStack = createMaterialTopTabNavigator({
//   Home: {screen: Home},
//   Loans: {screen: VictoryLoans},
//   Gravity: {screen: GravityRoom},
// }
// , {
//   initialRouteName: "Home",
//   swipeEnabled: false,
//   tabBarOptions: {
//     style: {
//       backgroundColor: "darkgreen",
//     },
//     pressColor: "yellow",
//     activeTintColor: "white",
//     inactiveTintColor: "palegreen",
//     labelStyle: {
//       fontFamily: "sans-serif",
//     }
//   }
// }
// );

// AppTabStack.navigationOptions = {
//   title: "Terminelvis - Practice Project",
// };

YellowBox.ignoreWarnings(['ViewPagerAndroid']);

// export default createAppContainer(AppTabStack);