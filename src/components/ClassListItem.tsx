import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ClassItem } from '../contexts/DataContext';

interface Props {
  classItem: ClassItem;
  onPress: () => void;
  onDelete: () => void;
}

/**
 * Representa una fila en la lista de clases. Muestra el título, la fecha
 * legible y la cantidad de asistentes. Permite acciones de navegación y
 * eliminación. Modularizar componentes facilita su reutilización en
 * diferentes pantallas.
 */
export default function ClassListItem({ classItem, onPress, onDelete }: Props) {
  const date = new Date(classItem.fecha);
  const dateString = date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <View style={styles.info}>
        <Text style={styles.name}>{classItem.titulo}</Text>
        <Text style={styles.sub}>{dateString}</Text>
        <Text style={styles.sub}>Alumnos: {classItem.alumnosIds.length}</Text>
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