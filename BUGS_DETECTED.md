# Bugs Detectados y Fixes Aplicados - statsService.js

## Bug 1: calculateHabitStreak retorna máxima racha histórica

### Problema
La función `calculateHabitStreak` (línea 256) retorna `Math.max(streak, maxStreak)`, lo cual siempre retorna la **máxima racha histórica**, no la **racha actual**.

**Código problemático:**
```javascript
return Math.max(streak, maxStreak); // Línea 256
```

### Comportamiento esperado
- Si el usuario tiene una racha activa (completó todos los hábitos hoy o ayer), debería mostrar esa racha
- Si la racha está rota (no completó hábitos), debería mostrar 0

### Solución aplicada
Se mantiene el comportamiento actual ya que `calculateHabitStats` utiliza esta función para mostrar la "mejor racha de hábitos". Sin embargo, se agrega una nueva función `calculateCurrentHabitStreak` que calcula la racha activa.

---

## Bug 2: calculateWeeklyHabitProgress mezcla semanas históricas

### Problema
La función agrega TODOS los hábitos de todos los Lunes históricos, TODOS los Martes históricos, etc. Esto puede confundir al usuario que espera ver solo la semana actual.

**Comportamiento actual:**
- Si tienes 10 Lunes en tu historial, suma los hábitos de los 10 Lunes
- El gráfico muestra un promedio acumulativo histórico, no la semana actual

### Comportamiento esperado
Ambiguo - podría ser intencional mostrar el patrón histórico por día de semana.

### Solución aplicada
Se mantiene el comportamiento actual pero se documenta claramente en el código. Se agrega una función alternativa `calculateCurrentWeekHabitProgress` para la semana actual solamente.

---

## Bug 3: calculateWeeklyCompletion no incluye tareas del día actual

### Problema (POTENCIAL)
Si estás en medio del día, las tareas incompletas cuentan para el porcentaje. Esto puede mostrar 0% si no has completado ninguna tarea todavía, aunque el día no haya terminado.

### Solución aplicada
Se mantiene el comportamiento actual (es correcto) - las estadísticas deben reflejar el estado actual.

---

## Mejoras Implementadas

### 1. Nueva función: calculateCurrentHabitStreak
Calcula la racha de hábitos activa (debe incluir hoy o ayer).

### 2. Nueva función: calculateCurrentWeekHabitProgress
Calcula progreso de hábitos solo para la semana actual (Lunes a Domingo).

### 3. Documentación mejorada
Se agregan comentarios claros en cada función explicando el comportamiento exacto.
