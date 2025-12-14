import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Student } from '../contexts/DataContext';

interface Props {
  student: Student;
  onPress: () => void;
  onDelete: () => void;
}

/**
 * Un componente reutilizable que muestra la información básica de un alumno
 * dentro de una lista y expone callbacks para editar y eliminar. Mantener
 * componentes separados ayuda a tener un código más modular y legible. El
 * patrón de separar componentes globales en una carpeta dedicada se inspira
 * en estructuras de proyectos como IgniteGym【700203265627610†L348-L367】.
 */
export default function StudentListItem({ student, onPress, onDelete }: Props) {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <View style={styles.info}>
        <Text style={styles.name}>{student.nombre}</Text>
        <Text style={styles.sub}>{student.cinturon}</Text>
      </View>
      <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
        <Text style={{ color: 'white' }}>Eliminar</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  sub: {
    color: '#666',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    padding: 8,
    borderRadius: 4,
  },
});