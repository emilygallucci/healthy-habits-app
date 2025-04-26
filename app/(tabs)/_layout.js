import { Tabs } from 'expo-router';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import FoodList from './food';
import RecipeDetail from './fooddetail';
import LoginScreen from './login';
import HabitScreen from './habits';
import PhotoScreen from './photogall';


const Stack = createNativeStackNavigator();

export default function Layout() {
  return (
    <>
      <Tabs />
      <NavigationIndependentTree>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={FoodList} />
            <Stack.Screen name="Recipe" component={RecipeDetail} />
          </Stack.Navigator>
        </NavigationContainer>
      </NavigationIndependentTree>
    </>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});