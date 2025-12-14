/**
 * Este archivo centraliza las llamadas a la API. En esta versión de ejemplo
 * no existen llamadas reales porque los datos se almacenan en memoria
 * mediante el contexto `DataContext`. La creación de un módulo de servicios
 * permite aislar la lógica de comunicación y facilita migrar a un backend
 * real en el futuro. La lectura de proyectos como IgniteGym muestra que es
 * recomendable encapsular las peticiones en un servicio reutilizable【700203265627610†L320-L330】.
 */

export async function loginApi(username: string, password: string) {
  // En una implementación real, aquí se haría una solicitud HTTP con axios:
  // return axios.post('/login', { username, password });
  return { token: 'token-ficticio' };
}

export async function fetchStudents() {
  // Solicitaría datos al servidor
  return [];
}

export async function fetchClasses() {
  return [];
}