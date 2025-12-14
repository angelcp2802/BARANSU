# App de gestión para academia de Brazilian Jiu‑Jitsu

Esta aplicación es un ejemplo de **sistema de gestión para una academia de Brazilian Jiu‑Jitsu (BJJ)** desarrollada con **React Native** y pensada para funcionar en **Android, iOS y web** a través de Expo. El objetivo es mostrar cómo se puede organizar el código y crear pantallas básicas para gestionar alumnos, programar clases y registrar asistencia utilizando tecnologías modernas.

## Inspiración y referencias

Para diseñar la estructura y las funcionalidades se investigaron distintos proyectos de código abierto relacionados con gimnasios y artes marciales. En la documentación del proyecto **Ignite Gym** se describe una serie de pantallas típicas de una app de entrenamiento: pantalla de inicio de sesión y registro, pantalla principal con lista de ejercicios, historial de entrenamiento y perfil de usuario【700203265627610†L248-L291】. El README también destaca el uso de componentes como **React Navigation**, **React Hook Form** para formularios, **Yup** para validación y el patrón de **contextos** para compartir datos entre pantallas【700203265627610†L320-L330】.  
Otro proyecto relevante es **GymMonster**, una app de entrenamiento que permite crear planes personalizados y programar rutinas. Su README lista características como *creación de planes de entrenamiento*, *programación de entrenamientos en fechas específicas* y *acceso a una biblioteca de ejercicios*【515637267304031†L0-L16】.  Estas ideas se adaptaron al contexto de una academia de BJJ para gestionar alumnos y clases en lugar de ejercicios.  
Por último, el proyecto **Gympoint** se centra en el control de asistencia y matrículas de un gimnasio, lo que resultó útil para concebir la pantalla de asistencia. Su descripción menciona que la aplicación sirve para *ayudar a la academia a gestionar la asistencia de alumnos y controlar las inscripciones*【134897491022202†L253-L255】.  

## Funcionalidades implementadas

Las pantallas incluidas en este ejemplo son:

- **Inicio de sesión**: autenticación básica con credenciales fijas (`admin/1234`).  
- **Panel de control**: vista general con el número de alumnos y de clases programadas.  
- **Gestión de alumnos**: lista de alumnos, con posibilidad de crear, editar o eliminar fichas. Cada ficha incluye nombre, correo electrónico, cinturón y estado activo.  
- **Gestión de clases**: lista de clases programadas, mostrando título, fecha/hora e instructor. Permite crear, editar o eliminar clases.  
- **Registro de asistencia**: para cada clase se muestra la lista de alumnos con un interruptor de asistencia; se puede marcar quién asistió a la clase.  
- **Contextos de datos y autenticación**: se usan contextos de React para almacenar la sesión del usuario y la base de datos en memoria, siguiendo las buenas prácticas de desacoplar la lógica de negocio de las pantallas【700203265627610†L320-L330】.

> **Nota:** Este proyecto es un ejemplo educativo. No existe conexión con un backend real; los datos se almacenan en memoria mediante contextos y se pierden al cerrar la aplicación. La estructura, no obstante, permite integrar fácilmente una API en el futuro.

## Estructura del proyecto

La organización del código se inspira en la estructura propuesta en el repositorio Ignite Gym, donde se separan **assets**, **componentes**, **contextos**, **pantallas**, **rutas**, **servicios**, **almacenamiento**, **tema** y **utilidades**【700203265627610†L348-L367】.  En este ejemplo se simplifican algunas carpetas, pero se conserva la idea de modularidad:

```
bjj-academy-app
│
├── App.tsx                  # Punto de entrada; envuelve navegaciones y contextos
├── package.json             # Dependencias y scripts para Expo
├── tsconfig.json            # Configuración de TypeScript
├── README.md                # Documentación (este archivo)
│
└── src
    ├── contexts             # Proveedores de estado global
    │   ├── AuthContext.tsx  # Maneja la sesión del usuario
    │   └── DataContext.tsx  # Gestiona listas de alumnos y clases
    │
    ├── navigation           # Configuración de navegación (tabs y pilas)
    │   └── index.tsx        # Definición de tabs y stacks
    │
    ├── screens              # Diferentes pantallas de la aplicación
    │   ├── LoginScreen.tsx      # Formulario de inicio de sesión
    │   ├── DashboardScreen.tsx  # Panel con estadísticas y accesos rápidos
    │   ├── StudentsScreen.tsx   # Lista de alumnos
    │   ├── StudentFormScreen.tsx# Formulario para crear/editar alumno
    │   ├── ClassesScreen.tsx    # Lista de clases
    │   ├── ClassFormScreen.tsx  # Formulario para programar/editar clase
    │   └── AttendanceScreen.tsx # Registro de asistencia por clase
    │
    ├── components           # Componentes reutilizables
    │   ├── StudentListItem.tsx  # Fila de la lista de alumnos
    │   └── ClassListItem.tsx    # Fila de la lista de clases
    │
    ├── services             # Abstracción de peticiones a la API
    │   └── api.ts           # Plantilla para implementar llamadas HTTP
    │
    └── utils                # Funciones auxiliares y esquemas de validación
        └── validation.ts    # Esquemas de Yup reutilizables
```

### Descripción de archivos clave

- **App.tsx**: envuelve la aplicación con los proveedores `AuthProvider` y `DataProvider` y define las rutas mediante `React Navigation`.  
- **contexts/AuthContext.tsx**: gestiona el estado de autenticación y expone funciones `login` y `logout`. Actualmente usa credenciales fijas; en un futuro se podría conectar con un backend vía Axios【700203265627610†L320-L330】.  
- **contexts/DataContext.tsx**: contiene arrays de alumnos y clases y ofrece funciones para añadir, editar, eliminar y marcar asistencia.  
- **navigation/index.tsx**: configura un **tab navigator** con tres pestañas (panel, alumnos y clases) y para las pestañas de alumnos y clases define pilas independientes que permiten navegar hacia formularios o asistencia.  
- **screens/**: cada pantalla implementa una parte de la funcionalidad. Por ejemplo, `StudentsScreen` usa una `FlatList` para listar alumnos, un patrón común en apps de fitness【515637267304031†L0-L16】, y `StudentFormScreen` emplea **React Hook Form** junto con **Yup** para manejar formularios y validación【700203265627610†L320-L330】.  
- **components/**: componentes reutilizables para filas de listas, con botones para navegar o eliminar.  
- **services/api.ts**: archivo en el que se centralizarían las peticiones HTTP; actualmente contiene funciones de ejemplo.  
- **utils/validation.ts**: define esquemas de validación con Yup para no duplicar reglas entre formularios.

## Instalación y ejecución

1. Asegúrate de tener instalado **Node.js** y **npm** o **yarn** y el entorno de **Expo CLI** (`npm install -g expo-cli`).  
2. Clona o descarga este repositorio.  
3. Instala las dependencias ejecutando en la raíz del proyecto:

   ```bash
   npm install
   # o
   yarn
   ```

4. Inicia la aplicación con Expo:

   ```bash
   npm start
   # o
   yarn start
   ```

5. Expo abrirá un panel en tu navegador. Desde allí puedes lanzar la app en un emulador de Android/iOS o en el navegador seleccionando la opción *Run in web browser*.

## Próximos pasos y mejoras

Este proyecto sirve como base para una aplicación completa de gestión de academias. Algunas ideas para continuar el desarrollo:

* **Persistencia real**: conectar las funciones de `DataContext` a una API RESTful usando Axios, autenticada con JWT como se sugiere en el proyecto Ignite Gym【700203265627610†L320-L330】.  
* **Selección de fecha y hora**: sustituir los campos de texto para fechas por el componente `DateTimePicker` de Expo.  
* **Subida de fotos y videos**: permitir que cada alumno tenga foto y que las clases incluyan vídeos de técnicas. El proyecto BJJ LogApp muestra cómo almacenar videos en Firebase y servirlos con un CDN【894220237754845†L1-L20】.  
* **Notificaciones y recordatorios**: enviar recordatorios a los alumnos sobre próximas clases mediante Expo Notifications.  
* **Gestión de pagos**: incluir módulos de facturación y control de cuotas mensuales.  
* **Roles de usuario**: diferenciar entre instructores, administradores y alumnos y limitar el acceso según permisos.

## Conclusión

Este repositorio demuestra cómo organizar una aplicación de gestión de una academia de Brazilian Jiu‑Jitsu utilizando React Native, Expo, React Navigation, React Hook Form y Yup. Se inspira en proyectos de código abierto de gestión de gimnasios y apps de fitness, adaptando sus mejores prácticas al contexto de artes marciales. La estructura modular facilita ampliar la aplicación con nuevas funcionalidades y conectar con servicios backend en el futuro.