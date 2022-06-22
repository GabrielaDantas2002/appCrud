import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CreateComponent from './components/CreateComponent';
import ReadComponent from './components/ReadComponent';
import UpdateComponent from './components/UpdateComponent';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
function Update()
{
  return(
  <Stack.Navigator>
  <Stack.Screen 
        name="Listagem2" 
        component={ReadComponent} 
        options={{ title: 'Listagem' }}
      />
      <Stack.Screen 
       name="Atualizar" 
       component={UpdateComponent} 
       options={{ title: 'Atualizar' }}
      />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    
    <NavigationContainer>
    <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Inserir') {
              iconName = focused
                ? 'add-circle-outline'
                : 'ios-add-circle';
            } else if (route.name === 'Listagem') {
              iconName = focused ? 'ios-list-circle' : 'ios-list-circle-outline';
            }else if(route.name === 'Atualizar')
            {
                iconName = focused ? 'cube' : 'cube-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          headerShown: false,
          tabBarActiveTintColor: "rgb(0, 150, 255)",
          tabBarInactiveTintColor: 'gray',
        })  
        }
      >
        <Tab.Screen name="Inserir" component={CreateComponent} />
        <Tab.Screen name="Listagem" component={Update} />
      </Tab.Navigator>
      </NavigationContainer>
  );
}