import React from 'react';
import { View, Text, StyleSheet, Switch, FlatList } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { useData } from '../contexts/DataContext';

type AttendanceRouteProp = RouteProp<RootStackParamList, 'Attendance'>;

/**
 * Pantalla para registrar la asistencia de una clase concreta. Muestra la
 * lista de alumnos inscritos y permite activar o desactivar la asistencia
 * mediante un interruptor. Este patrón replica la funcionalidad de
 * seguimiento de asistencia en sistemas de gestión de academias.
 */
export default function AttendanceScreen() {
  const route = useRoute<AttendanceRouteProp>();
  const { classes, students, toggleAttendance } = useData();
  const classItem = classes.find(c => c.id === route.params.classId);

  if (!classItem) {
    return (
      <View style={styles.container}>
        <Text>Clase no encontrada.</Text>
      </View>
    );
  }

  const data = students.map(student => ({
    ...student,
    present: classItem.alumnosIds.includes(student.id),
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Asistencia: {classItem.titulo}</Text>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View>
              <Text style={styles.name}>{item.nombre}</Text>
              <Text style={styles.sub}>{item.cinturon}</Text>
            </View>
            <Switch
              value={item.present}
              onValueChange={() => toggleAttendance(classItem.id, item.id)}
            />
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No hay alumnos inscritos.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  sub: {
    color: '#666',
  },
  empty: {
    padding: 16,
    textAlign: 'center',
    color: '#888',
  },
});