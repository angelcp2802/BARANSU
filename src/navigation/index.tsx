import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importamos pantallas
import DashboardScreen from '../screens/DashboardScreen';
import StudentsScreen from '../screens/StudentsScreen';
import StudentFormScreen from '../screens/StudentFormScreen';
import ClassesScreen from '../screens/ClassesScreen';
import ClassFormScreen from '../screens/ClassFormScreen';
import AttendanceScreen from '../screens/AttendanceScreen';

/**
 * Este archivo define una navegación combinada de pestañas inferiores y
 * subpilas. Permite que las pantallas principales se presenten como
 * pestañas (panel, alumnos y clases) mientras que formularios y
 * asistencias se muestran como modales dentro de su propia pila. La
 * inspiración para esta estructura proviene de prácticas comunes en
 * aplicaciones de fitness y gestión de gimnasios, donde las secciones
 * principales están accesibles de forma rápida mediante tabs【700203265627610†L320-L330】.
 */

export type RootTabParamList = {
  DashboardTab: undefined;
  StudentsTab: undefined;
  ClassesTab: undefined;
};

export type StudentsStackParamList = {
  StudentsList: undefined;
  StudentForm: { id?: string } | undefined;
  Attendance: { classId: string };
};

export type ClassesStackParamList = {
  ClassesList: undefined;
  ClassForm: { id?: string } | undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();
const StudentsStack = createNativeStackNavigator<StudentsStackParamList>();
const ClassesStack = createNativeStackNavigator<ClassesStackParamList>();

function StudentsStackNavigator() {
  return (
    <StudentsStack.Navigator>
      <StudentsStack.Screen
        name="StudentsList"
        component={StudentsScreen}
        options={{ title: 'Alumnos' }}
      />
      <StudentsStack.Screen
        name="StudentForm"
        component={StudentFormScreen}
        options={{ title: 'Ficha de Alumno' }}
      />
      <StudentsStack.Screen
        name="Attendance"
        component={AttendanceScreen}
        options={{ title: 'Asistencia' }}
      />
    </StudentsStack.Navigator>
  );
}

function ClassesStackNavigator() {
  return (
    <ClassesStack.Navigator>
      <ClassesStack.Screen
        name="ClassesList"
        component={ClassesScreen}
        options={{ title: 'Clases' }}
      />
      <ClassesStack.Screen
        name="ClassForm"
        component={ClassFormScreen}
        options={{ title: 'Programar Clase' }}
      />
    </ClassesStack.Navigator>
  );
}

export default function NavigationTabs() {
  return (
    <Tab.Navigator
      // Para simplificar el ejemplo omitimos los iconos de pestaña. En una app
      // real se podría usar @expo/vector-icons para mostrar iconos en el tab.
      screenOptions={{}}
    >
      <Tab.Screen
        name="DashboardTab"
        component={DashboardScreen}
        options={{ title: 'Panel' }}
      />
      <Tab.Screen
        name="StudentsTab"
        component={StudentsStackNavigator}
        options={{ title: 'Alumnos' }}
      />
      <Tab.Screen
        name="ClassesTab"
        component={ClassesStackNavigator}
        options={{ title: 'Clases' }}
      />
    </Tab.Navigator>
  );
}