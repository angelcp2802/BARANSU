import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
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
      <FlatList
        data={students}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>No hay alumnos registrados.</Text>}
      />
      <Button title="Añadir Alumno" onPress={() => navigation.navigate('StudentForm')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  empty: {
    padding: 16,
    textAlign: 'center',
    color: '#888',
  },
});