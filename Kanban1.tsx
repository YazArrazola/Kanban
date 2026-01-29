import { useEffect, useState } from "react";
import "./Kanban2.css";

type Estado = "pendiente" | "ejecucion" | "terminado";

interface Tarea {
  id: number;
  titulo: string;
  estado: Estado;
}

const columnas: Estado[] = ["pendiente", "ejecucion", "terminado"];

export default function App() {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [texto, setTexto] = useState("");
  const [mensaje, setMensaje] = useState(false);

  /* Cargar localStorage */
  useEffect(() => {
    const data = localStorage.getItem("tareas");
    if (data) setTareas(JSON.parse(data));
  }, []);

  /* Guardar localStorage */
  useEffect(() => {
    localStorage.setItem("tareas", JSON.stringify(tareas));
  }, [tareas]);

  const crearTarea = () => {
    if (!texto.trim()) return;

    const nueva: Tarea = {
      id: Date.now(),
      titulo: texto,
      estado: "pendiente",
    };

    setTareas([...tareas, nueva]);
    setTexto("");
    setMensaje(true);
    setTimeout(() => setMensaje(false), 2000);
  };

  const onDragStart = (id: number) => {
    return (e: React.DragEvent) => {
      e.dataTransfer.setData("id", id.toString());
    };
  };

  const onDrop = (estado: Estado) => {
    return (e: React.DragEvent) => {
      const id = Number(e.dataTransfer.getData("id"));
      setTareas((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, estado } : t
        )
      );
    };
  };

  const colorColumna = (estado: Estado) => {
    const count = tareas.filter((t) => t.estado === estado).length;
    if (count <= 2) return "libre";
    if (count <= 4) return "ocupado";
    return "saturado";
  };

  return (
    <div className="app">
      <h1>📋 Kanban TSX</h1>

      <div className="controls">
        <input
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Nueva tarea..."
        />
        <button onClick={crearTarea}>Agregar</button>
        {mensaje && <p className="mensaje">✔ Tarea creada</p>}
      </div>

      <div className="kanban">
        {columnas.map((col) => (
          <div
            key={col}
            className={`column ${colorColumna(col)}`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={onDrop(col)}
          >
            <h2>
              {col === "pendiente" && "Pendiente"}
              {col === "ejecucion" && "En Ejecución"}
              {col === "terminado" && "Terminado"}
            </h2>

            {tareas
              .filter((t) => t.estado === col)
              .map((t) => (
                <div
                  key={t.id}
                  className="task"
                  draggable
                  onDragStart={onDragStart(t.id)}
                >
                  {t.titulo}
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
