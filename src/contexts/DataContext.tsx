import React, { createContext, useContext, useState, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Tipos para describir las entidades de alumnos y clases
export interface Student {
  id: string;
  nombre: string;
  email: string;
  cinturon: string;
  activo: boolean;
}

export interface ClassItem {
  id: string;
  titulo: string;
  fecha: string; // ISO string de fecha
  instructor: string;
  alumnosIds: string[]; // IDs de alumnos inscritos
}

interface DataContextProps {
  students: Student[];
  classes: ClassItem[];
  addStudent: (data: Omit<Student, 'id'>) => void;
  updateStudent: (id: string, data: Partial<Student>) => void;
  removeStudent: (id: string) => void;
  addClass: (data: Omit<ClassItem, 'id' | 'alumnosIds'>) => void;
  updateClass: (id: string, data: Partial<ClassItem>) => void;
  removeClass: (id: string) => void;
  toggleAttendance: (classId: string, studentId: string) => void;
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

/**
 * Proveedor de datos. Almacena listas de alumnos y clases en estado local.
 * Este patrón se inspira en el uso de contextos y hooks para compartir
 * información entre pantallas descrito en proyectos de ejemplo como
 * IgniteGym【700203265627610†L320-L330】. En una aplicación real se podría
 * persistir la información en una base de datos o API.
 */
export function DataProvider({ children }: { children: ReactNode }) {
  const [students, setStudents] = useState<Student[]>([]);
  const [classes, setClasses] = useState<ClassItem[]>([]);

  function addStudent(data: Omit<Student, 'id'>) {
    const newStudent: Student = { id: uuidv4(), ...data };
    setStudents(prev => [...prev, newStudent]);
  }

  function updateStudent(id: string, data: Partial<Student>) {
    setStudents(prev => prev.map(s => (s.id === id ? { ...s, ...data } : s)));
  }

  function removeStudent(id: string) {
    // Cuando eliminamos un alumno, también lo retiramos de las clases
    setStudents(prev => prev.filter(s => s.id !== id));
    setClasses(prev => prev.map(c => ({ ...c, alumnosIds: c.alumnosIds.filter(a => a !== id) })));
  }

  function addClass(data: Omit<ClassItem, 'id' | 'alumnosIds'>) {
    const newClass: ClassItem = { id: uuidv4(), alumnosIds: [], ...data };
    setClasses(prev => [...prev, newClass]);
  }

  function updateClass(id: string, data: Partial<ClassItem>) {
    setClasses(prev => prev.map(c => (c.id === id ? { ...c, ...data } : c)));
  }

  function removeClass(id: string) {
    setClasses(prev => prev.filter(c => c.id !== id));
  }

  function toggleAttendance(classId: string, studentId: string) {
    setClasses(prev =>
      prev.map(c => {
        if (c.id !== classId) return c;
        const isPresent = c.alumnosIds.includes(studentId);
        return {
          ...c,
          alumnosIds: isPresent
            ? c.alumnosIds.filter(a => a !== studentId)
            : [...c.alumnosIds, studentId],
        };
      }),
    );
  }

  return (
    <DataContext.Provider
      value={{
        students,
        classes,
        addStudent,
        updateStudent,
        removeStudent,
        addClass,
        updateClass,
        removeClass,
        toggleAttendance,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData debe usarse dentro de DataProvider');
  }
  return context;
}