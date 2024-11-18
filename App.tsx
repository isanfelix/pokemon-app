import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PokemonList from './src/components/PokemonList';
import PokemonDetail from './src/components/PokemonDetail';
import PokemonCompare from './src/components/PokemonCompare';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="PokemonList" 
        component={PokemonList} 
        options={{ title: 'PokeApp-Naufal Ihsan' }}
      />
      <Stack.Screen 
        name="PokemonDetail" 
        component={PokemonDetail} 
        options={({ route }) => ({ title: route.params.pokemon.name })}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Compare') {
              iconName = focused ? 'swap-horizontal' : 'swap-horizontal-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          headerShown: false
        })}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeStack} 
        />
        <Tab.Screen 
          name="Compare" 
          component={PokemonCompare} 
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
