import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './telas/home';
import Perfil from './telas/perfil'; 
import Anotacoes from './telas/anotacoes'; 
import Calendario from './telas/calendario';
import Tarefas from './telas/tarefas';
import maps from './telas/maps';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="perfil" component={Perfil} options={{ title: "Perfil" }} />
        <Stack.Screen name="anotacoes" component={Anotacoes} options={{ title: "Anotações" }} />       
        <Stack.Screen name="calendario" component={Calendario} options={{ title: "Calendário" }} />
        <Stack.Screen name="tarefas" component={Tarefas} options={{ title: "Tarefas" }} />
        <Stack.Screen name="maps" component={maps} options={{ title: "maps" }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
