import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './src/contexts/AuthContext';
import { DataProvider } from './src/contexts/DataContext';
import LoginScreen from './src/screens/LoginScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import StudentsScreen from './src/screens/StudentsScreen';
import StudentFormScreen from './src/screens/StudentFormScreen';
import ClassesScreen from './src/screens/ClassesScreen';
import ClassFormScreen from './src/screens/ClassFormScreen';
import AttendanceScreen from './src/screens/AttendanceScreen';

// Definimos nuestro tipo de rutas para ayudar a TypeScript a validar la navegación.
export type RootStackParamList = {
  Login: undefined;
  Dashboard: undefined;
  Students: undefined;
  StudentForm: { id?: string };
  Classes: undefined;
  ClassForm: { id?: string };
  Attendance: { classId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * Punto de entrada de la aplicación. Envuelve la navegación con los contextos de
 * autenticación y datos. La navegación utiliza una pila de pantallas para
 * permitir transiciones y un historial de navegación consistente entre
 * plataformas (Android, iOS y web). La estructura se inspira en la
 * recomendación de React Navigation de usar un contenedor de navegación y
 * stacks. El uso de contextos facilita compartir datos y estado entre
 * pantallas sin tener que pasar props manualmente por cada componente.
 */
export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ title: 'Iniciar Sesión' }}
            />
            <Stack.Screen
              name="Dashboard"
              component={DashboardScreen}
              options={{ title: 'Panel' }}
            />
            <Stack.Screen
              name="Students"
              component={StudentsScreen}
              options={{ title: 'Alumnos' }}
            />
            <Stack.Screen
              name="StudentForm"
              component={StudentFormScreen}
              options={{ title: 'Ficha de Alumno' }}
            />
            <Stack.Screen
              name="Classes"
              component={ClassesScreen}
              options={{ title: 'Clases' }}
            />
            <Stack.Screen
              name="ClassForm"
              component={ClassFormScreen}
              options={{ title: 'Programar Clase' }}
            />
            <Stack.Screen
              name="Attendance"
              component={AttendanceScreen}
              options={{ title: 'Asistencia' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </DataProvider>
    </AuthProvider>
  );
}