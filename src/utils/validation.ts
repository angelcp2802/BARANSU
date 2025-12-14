import * as Yup from 'yup';

/**
 * Define esquemas de validación reutilizables para formularios. Compartir
 * validaciones evita duplicar lógica en diferentes pantallas. Los esquemas
 * combinan propiedades y se exportan individualmente para usar con
 * React Hook Form y el resolver de Yup.
 */
export const studentSchema = Yup.object().shape({
  nombre: Yup.string().required('El nombre es obligatorio'),
  email: Yup.string().email('Correo no válido').required('El correo es obligatorio'),
  cinturon: Yup.string().required('El cinturón es obligatorio'),
  activo: Yup.boolean().required(),
});

export const classSchema = Yup.object().shape({
  titulo: Yup.string().required('El título es obligatorio'),
  fecha: Yup.string().required('La fecha es obligatoria'),
  instructor: Yup.string().required('El instructor es obligatorio'),
});