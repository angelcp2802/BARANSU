import React, { createContext, useContext, useState, ReactNode } from 'react';

/**
 * Interface que define la forma de nuestro contexto de autenticación. Permite
 * acceder al usuario actual y realizar operaciones de inicio/cierre de
 * sesión. Un valor `null` en `user` indica que no existe sesión activa.
 */
interface AuthContextProps {
  user: { username: string } | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

/**
 * Proveedor de autenticación. Mantiene el estado del usuario y expone
 * funciones para iniciar y cerrar sesión. Para simplificar el ejemplo,
 * validamos un único usuario con credenciales estáticas. En una
 * implementación real, aquí se llamaría a un servicio externo o backend
 * mediante API (por ejemplo, usando Axios tal como se sugiere en
 * repositorios de ejemplos de gimnasio【700203265627610†L320-L330】).
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{ username: string } | null>(null);

  async function login(username: string, password: string) {
    // Simulación de autenticación. En producción se delegaría a un servidor.
    if (username === 'admin' && password === '1234') {
      setUser({ username });
      return true;
    }
    return false;
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook personalizado para acceder al contexto de autenticación. Facilita
 * el uso del contexto dentro de componentes de manera legible y previene
 * errores cuando el proveedor no está presente en la jerarquía de React.
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
}