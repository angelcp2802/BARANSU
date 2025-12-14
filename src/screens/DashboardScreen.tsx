import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
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
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Bienvenido</Text>
        <Text style={styles.title}>Panel de Control</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={[styles.statCard, styles.statCardPrimary]}>
          <View style={styles.statIconContainer}>
            <Text style={styles.statIcon}>👥</Text>
          </View>
          <Text style={styles.statNumber}>{students.length}</Text>
          <Text style={styles.statLabel}>Alumnos Activos</Text>
        </View>

        <View style={[styles.statCard, styles.statCardSecondary]}>
          <View style={styles.statIconContainer}>
            <Text style={styles.statIcon}>📅</Text>
          </View>
          <Text style={styles.statNumber}>{classes.length}</Text>
          <Text style={styles.statLabel}>Clases Programadas</Text>
        </View>
      </View>

      <View style={styles.actionsContainer}>
        <Text style={styles.sectionTitle}>Acciones Rápidas</Text>

        <TouchableOpacity
          style={[styles.actionButton, styles.actionButtonPrimary]}
          onPress={() => navigation.navigate('Students')}
          activeOpacity={0.8}
        >
          <View style={styles.actionButtonContent}>
            <Text style={styles.actionButtonIcon}>👨‍🎓</Text>
            <View style={styles.actionButtonTextContainer}>
              <Text style={styles.actionButtonTitle}>Gestionar Alumnos</Text>
              <Text style={styles.actionButtonSubtitle}>Ver, agregar y editar alumnos</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.actionButtonSecondary]}
          onPress={() => navigation.navigate('Classes')}
          activeOpacity={0.8}
        >
          <View style={styles.actionButtonContent}>
            <Text style={styles.actionButtonIcon}>🥋</Text>
            <View style={styles.actionButtonTextContainer}>
              <Text style={styles.actionButtonTitle}>Gestionar Clases</Text>
              <Text style={styles.actionButtonSubtitle}>Programar y controlar asistencia</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  header: {
    padding: 24,
    paddingTop: 40,
    backgroundColor: '#0f3460',
  },
  greeting: {
    fontSize: 16,
    color: '#16c79a',
    fontWeight: '600',
    marginBottom: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 16,
  },
  statCard: {
    flex: 1,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  statCardPrimary: {
    backgroundColor: '#16c79a',
  },
  statCardSecondary: {
    backgroundColor: '#0f3460',
  },
  statIconContainer: {
    marginBottom: 12,
  },
  statIcon: {
    fontSize: 40,
  },
  statNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
    textAlign: 'center',
  },
  actionsContainer: {
    padding: 20,
    paddingTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  actionButton: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  actionButtonPrimary: {
    backgroundColor: '#16c79a',
  },
  actionButtonSecondary: {
    backgroundColor: '#0f3460',
  },
  actionButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButtonIcon: {
    fontSize: 48,
    marginRight: 16,
  },
  actionButtonTextContainer: {
    flex: 1,
  },
  actionButtonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  actionButtonSubtitle: {
    fontSize: 13,
    color: '#fff',
    opacity: 0.8,
  },
});