import React, { useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Switch } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { RootStackParamList } from '../../App';
import { useData } from '../contexts/DataContext';

type StudentFormRouteProp = RouteProp<RootStackParamList, 'StudentForm'>;

interface FormData {
  nombre: string;
  email: string;
  cinturon: string;
  activo: boolean;
}

/**
 * Formulario de creación/edición de alumnos. Usa React Hook Form para
 * gestionar los campos y Yup para validar. Si la ruta incluye un id
 * existente, el formulario se inicializa con los datos del alumno. Las
 * opciones de cinturón se escriben manualmente para simplificar. En un
 * escenario real podrían cargarse dinámicamente desde una API o
 * configuración externa.
 */
export default function StudentFormScreen() {
  const route = useRoute<StudentFormRouteProp>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { students, addStudent, updateStudent } = useData();
  const editing = Boolean(route.params?.id);

  const existingStudent = editing ? students.find(s => s.id === route.params?.id) : undefined;

  const schema = Yup.object().shape({
    nombre: Yup.string().required('El nombre es obligatorio'),
    email: Yup.string().email('Correo no válido').required('El correo es obligatorio'),
    cinturon: Yup.string().required('El cinturón es obligatorio'),
    activo: Yup.boolean().required(),
  });

  const { control, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      nombre: existingStudent?.nombre ?? '',
      email: existingStudent?.email ?? '',
      cinturon: existingStudent?.cinturon ?? 'Blanco',
      activo: existingStudent?.activo ?? true,
    },
    resolver: yupResolver(schema),
  });

  // Actualiza el formulario cuando se recibe un alumno existente
  useEffect(() => {
    if (existingStudent) {
      reset({
        nombre: existingStudent.nombre,
        email: existingStudent.email,
        cinturon: existingStudent.cinturon,
        activo: existingStudent.activo,
      });
    }
  }, [existingStudent, reset]);

  const onSubmit = (data: FormData) => {
    if (editing && existingStudent) {
      updateStudent(existingStudent.id, data);
    } else {
      addStudent(data);
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{editing ? 'Editar Alumno' : 'Nuevo Alumno'}</Text>
      <Controller
        control={control}
        name="nombre"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.nombre && <Text style={styles.error}>{errors.nombre.message}</Text>}
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Correo"
            keyboardType="email-address"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
      <Controller
        control={control}
        name="cinturon"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Cinturón (Blanco, Azul, Púrpura, Marrón, Negro)"
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.cinturon && <Text style={styles.error}>{errors.cinturon.message}</Text>}
      <View style={styles.switchRow}>
        <Text>Activo</Text>
        <Controller
          control={control}
          name="activo"
          render={({ field: { onChange, value } }) => (
            <Switch value={value} onValueChange={onChange} />
          )}
        />
      </View>
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
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
});