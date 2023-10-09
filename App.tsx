import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import NoteScreen from './src/screens/NoteScreen';
import EditorScreen from './src/screens/EditorScreen';
import { LogBox } from 'react-native';
import { Note } from './src/@types';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state. Check:',
]);

export type RootStackParamList = {
  Home: undefined;
  Note: undefined;
  Editor: {
    item?: Note;
    onSubmit: (item: Omit<Note, 'id'>, id?: number) => { newData: Note };
    onDelete: (id: number) => void;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#007ee5',
          },
          headerTintColor: 'white',
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ header: () => null }}
        />
        <Stack.Screen name="Note" component={NoteScreen} />
        <Stack.Screen name="Editor" component={EditorScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
