import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { RootStackParamList } from '../../App';
import { useData } from '../contexts/DataContext';

type ClassFormRouteProp = RouteProp<RootStackParamList, 'ClassForm'>;

interface FormData {
  titulo: string;
  fecha: string;
  instructor: string;
}

/**
 * Formulario para programar o editar clases. Incluye campos básicos como
 * título, fecha/hora e instructor. La fecha se ingresa como cadena ISO
 * para simplificar (ejemplo: 2025-12-31 18:00). En una aplicación real se
 * usaría un selector de fecha/hora como el de Expo DateTimePicker. Este
 * formulario se inspira en la funcionalidad de planificar rutinas
 * disponible en GymMonster【515637267304031†L0-L16】.
 */
export default function ClassFormScreen() {
  const route = useRoute<ClassFormRouteProp>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { classes, addClass, updateClass } = useData();
  const editing = Boolean(route.params?.id);

  const existingClass = editing ? classes.find(c => c.id === route.params?.id) : undefined;

  const schema = Yup.object().shape({
    titulo: Yup.string().required('El título es obligatorio'),
    fecha: Yup.string().required('La fecha es obligatoria'),
    instructor: Yup.string().required('El instructor es obligatorio'),
  });

  const { control, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      titulo: existingClass?.titulo ?? '',
      fecha: existingClass?.fecha ?? '',
      instructor: existingClass?.instructor ?? '',
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (existingClass) {
      reset({
        titulo: existingClass.titulo,
        fecha: existingClass.fecha,
        instructor: existingClass.instructor,
      });
    }
  }, [existingClass, reset]);

  const onSubmit = (data: FormData) => {
    if (editing && existingClass) {
      updateClass(existingClass.id, data);
    } else {
      addClass({ ...data });
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{editing ? 'Editar Clase' : 'Programar Clase'}</Text>
      <Controller
        control={control}
        name="titulo"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Título"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.titulo && <Text style={styles.error}>{errors.titulo.message}</Text>}
      <Controller
        control={control}
        name="fecha"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Fecha y hora (YYYY-MM-DD HH:mm)"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.fecha && <Text style={styles.error}>{errors.fecha.message}</Text>}
      <Controller
        control={control}
        name="instructor"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Instructor"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.instructor && <Text style={styles.error}>{errors.instructor.message}</Text>}
      <Button title="Guardar" onPress={handleSubmit(onSubmit)} />
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    backgroundColor: 'white',
  },
  error: {
    color: 'red',
    marginBottom: 8,
  },
});