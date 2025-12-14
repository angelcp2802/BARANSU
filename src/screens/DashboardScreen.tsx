import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { useData } from '../contexts/DataContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

/**
 * Pantalla principal (Panel). Muestra estadísticas básicas sobre el número de
 * alumnos inscritos y clases programadas, y ofrece accesos rápidos a las
 * secciones de Alumnos y Clases. Este enfoque de tablero se inspira en
 * aplicaciones de gestión deportiva como GymMonster, que exponen
 * funcionalidades clave de forma resumida【515637267304031†L0-L16】.
 */
export default function DashboardScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { students, classes } = useData();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Panel de Control</Text>
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Text style={styles.cardNumber}>{students.length}</Text>
          <Text style={styles.cardLabel}>Alumnos</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardNumber}>{classes.length}</Text>
          <Text style={styles.cardLabel}>Clases</Text>
        </View>
      </View>
      <Button title="Gestionar Alumnos" onPress={() => navigation.navigate('Students')} />
      <Button title="Gestionar Clases" onPress={() => navigation.navigate('Classes')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  cardContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  card: {
    flex: 1,
    marginHorizontal: 8,
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    alignItems: 'center',
  },
  cardNumber: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  cardLabel: {
    fontSize: 16,
    color: '#666',
  },
});