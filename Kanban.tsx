type Estado = "pendiente" | "ejecucion" | "terminado";

interface Tarea {
  id: number;
  titulo: string;
  estado: Estado;
}
export const tareas: Tarea[] = [
  { id: 1, titulo: "Diseñar la interfaz de usuario", estado: "pendiente" },
  { id: 2, titulo: "Implementar la lógica de negocio", estado: "ejecucion" },
  { id: 3, titulo: "Realizar pruebas unitarias", estado: "terminado" },
  { id: 4, titulo: "Desplegar en el servidor", estado: "pendiente" },
  { id: 5, titulo: "Revisar el código", estado: "ejecucion" },
  { id: 6, titulo: "Actualizar la documentación", estado: "terminado" },
];
