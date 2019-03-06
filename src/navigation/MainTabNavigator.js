import React from 'react';
import { Platform, View } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
//import Languages from '.././constants/Languages';

import TabBarIcon from '../components/TabBarIcon';
import NotificationTabBarIcon from '../components/NotificationTabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryScreen from '../screens/CategoryScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CartScreen from '../screens/CartScreen';
import ProductDetailScreen from '../screens/CartScreen';
import ListAllScreen from '../screens/CartScreen';
import OrdersScreen from '../screens/CartScreen';
import OrderScreen from '../screens/CartScreen';
import UpdateAccountScreen from '../screens/CartScreen';
import FavoritesScreen from '../screens/CartScreen';

const HomeStack = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    ListAllScreen: { screen: ListAllScreen },
    ProductDetail: { screen: ProductDetailScreen },
  },
  {
    navigationOptions: {
      tabBarLabel: 'الرئيسية',
      tabBarIcon: ({ focused }) => (
        <TabBarIcon
          focused={focused}
          name={
            Platform.OS === 'ios'
              ? `ios-home${focused ? '' : '-outline'}`
              : 'md-home'
          }
        />
      ),
    },
  }
);

const CartStack = createStackNavigator(
  {
    Cart: { screen: CartScreen },
    ProductDetail: { screen: ProductDetailScreen },
  },
  {
    navigationOptions: {
      tabBarLabel: 'السلة',
      tabBarIcon: ({ focused }) => (
        <View >
          <TabBarIcon
            focused={focused}
            name={
              Platform.OS === 'ios'
                ? `ios-cart${focused ? '' : ''}`
                : 'md-cart'
            }
          />
          <NotificationTabBarIcon />
        </View >
      ),
    },
  }
);

const CategoriesStack = createStackNavigator(
  {
    Categories: { screen: CategoriesScreen },
    Category: { screen: CategoryScreen },
    ProductDetail: { screen: ProductDetailScreen },
  },
  {
    navigationOptions: {
      tabBarLabel: 'التصنيفات',
      tabBarIcon: ({ focused }) => (
        <TabBarIcon
          focused={focused}
          name={
            Platform.OS === 'ios'? `ios-pricetags${focused ? '' : '-outline'}` : 'md-pricetags'
          }
        />
      ),
    },
  }
);

const OrdersStack = createStackNavigator(
  {
    Orders: { screen: OrdersScreen }, 
    OrderDetail: { screen: OrderScreen }, 
  },
  {
    navigationOptions: {
      tabBarLabel: 'طلباتي',
      tabBarIcon: ({ focused }) => (
        <TabBarIcon
          focused={focused}
          name={Platform.OS === 'ios' ? `ios-basket${focused ? '' : '-outline'}` : 'md-basket'}
        />
      ),
    },
  }
);

const ProfileStack = createStackNavigator(
  {
    Profile: { screen: ProfileScreen }, 
    Orders: { screen: OrdersScreen }, 
    Favorites: { screen: FavoritesScreen }, 
    UpdateAccount: { screen: UpdateAccountScreen }, 
  },
  {
    navigationOptions: {
      tabBarLabel: 'الملف الشخصي',
      tabBarIcon: ({ focused }) => (
        <TabBarIcon
          focused={focused}
          name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'}
        />
      ),
    },
  }
);

export default createBottomTabNavigator({
  HomeStack,
  CategoriesStack,
  CartStack,
  OrdersStack,
  ProfileStack
});
