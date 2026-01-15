# Personal Task Manager

Una aplicación de gestión de tareas personal con estilo Material Design 3 de Google.

## Características

### 📋 Gestión de Tareas
- Crear, editar y eliminar tareas
- Categorías: Trabajo, Estudio, Deporte, Personal
- Horario con hora de inicio y fin
- **Notas** para aclaraciones y detalles adicionales
- Indicador visual del progreso diario

### 🔄 Hábitos Recurrentes
- Tres tipos de frecuencia:
  - **Diario**: Se crea cada día
  - **Lunes-Viernes**: Solo días laborables
  - **Semanal**: Una vez por semana (cada lunes)
- Auto-creación de la siguiente instancia al completar un hábito
- Indicador visual de "Hábito" en las tarjetas

### 📊 Estadísticas
- Rachas actuales y mejores
- Tasa de cumplimiento semanal
- Distribución por categorías
- **Estadísticas de hábitos**: rachas, tasa de cumplimiento, desglose por frecuencia

## Tecnologías

- **React 19** - Framework UI
- **Vite** - Build tool
- **Tailwind CSS** - Estilos con sistema de diseño Material Design 3
- **Framer Motion** - Animaciones
- **Recharts** - Gráficos de estadísticas
- **Lucide React** - Iconos
- **Vitest** - Testing

## Instalación

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Producción
npm run build

# Testing
npm run test

# Linting
npm run lint
```

## Estructura del Proyecto

```
src/
├── components/
│   ├── common/          # Componentes reutilizables (Button, Card, Modal, etc.)
│   ├── layout/          # Header, TabBar
│   ├── stats/           # Componentes de estadísticas
│   └── tasks/           # TaskCard, TaskForm, TaskList
├── context/             # TaskContext (estado global)
├── hooks/               # useTasks, useStats, useLocalStorage
├── services/            # Servicios (taskService, statsService)
├── utils/               # Utilidades (dateHelpers, constants)
├── data/                # Mock data
└── tests/               # Tests unitarios
```

## Configuración

### Colores (Material Design 3)
Los colores siguen el sistema de Material Design 3 con tokens semánticos:
- `--md-sys-color-primary`: Azul principal
- `--md-sys-color-surface`: Superficies
- `--md-sys-color-on-surface`: Texto en superficies

### Persistencia
Los datos se almacenan en `localStorage` bajo las claves `tasks_YYYY-MM-DD`.
