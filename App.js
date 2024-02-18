import { StatusBar } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import Chat from './components/Chat';
import Router from './router';
import { ThemeProvider } from './contexts/ThemeContext';

export default function App() {

  return (
    <ThemeProvider>
      <StatusBar barStyle="light-content"/>
      <Router/>
    </ThemeProvider>
  );
}
