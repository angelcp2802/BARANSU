import React from 'react';
import { View, FlatList, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { useData, ClassItem } from '../contexts/DataContext';
import ClassListItem from '../components/ClassListItem';

/**
 * Lista de clases programadas. Permite crear nuevas clases y navegar hacia
 * la pantalla de asistencia. Cada clase muestra su fecha y número de
 * alumnos. Este patrón replica el manejo de rutinas de entrenamiento y
 * calendario visto en la app GymMonster【515637267304031†L0-L16】.
 */
export default function ClassesScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { classes, removeClass } = useData();

  const renderItem = ({ item }: { item: ClassItem }) => (
    <ClassListItem
      classItem={item}
      onPress={() => navigation.navigate('Attendance', { classId: item.id })}
      onDelete={() => removeClass(item.id)}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={classes}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>No hay clases programadas.</Text>}
      />
      <Button title="Programar Clase" onPress={() => navigation.navigate('ClassForm')} />
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