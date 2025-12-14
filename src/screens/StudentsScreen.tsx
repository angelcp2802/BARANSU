import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { useData, Student } from '../contexts/DataContext';
import StudentListItem from '../components/StudentListItem';

/**
 * Pantalla que muestra la lista de alumnos registrados. Permite añadir,
 * editar y eliminar alumnos. Utiliza FlatList para mayor rendimiento en
 * listas grandes y navega hacia el formulario de alumnos al pulsar sobre
 * un elemento. Este comportamiento se asemeja al listado de alumnos o
 * ejercicios visto en aplicaciones de gimnasio como GymMonster【515637267304031†L0-L16】.
 */
export default function StudentsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { students, removeStudent } = useData();

  const renderItem = ({ item }: { item: Student }) => (
    <StudentListItem
      student={item}
      onPress={() => navigation.navigate('StudentForm', { id: item.id })}
      onDelete={() => removeStudent(item.id)}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Alumnos</Text>
        <Text style={styles.subtitle}>{students.length} {students.length === 1 ? 'alumno registrado' : 'alumnos registrados'}</Text>
      </View>

      <FlatList
        data={students}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>👥</Text>
            <Text style={styles.emptyText}>No hay alumnos registrados</Text>
            <Text style={styles.emptySubtext}>Comienza agregando tu primer alumno</Text>
          </View>
        }
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('StudentForm', {})}
          activeOpacity={0.8}
        >
          <Text style={styles.addButtonIcon}>+</Text>
          <Text style={styles.addButtonText}>Añadir Alumno</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#16c79a',
    fontWeight: '600',
  },
  listContent: {
    padding: 16,
    paddingBottom: 100,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 80,
    marginBottom: 16,
    opacity: 0.5,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: '#1a1a2e',
    borderTopWidth: 1,
    borderTopColor: '#0f3460',
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: '#16c79a',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#16c79a',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  addButtonIcon: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginRight: 8,
  },
  addButtonText: {
    color: '#1a1a2e',
    fontSize: 18,
    fontWeight: 'bold',
  },
});