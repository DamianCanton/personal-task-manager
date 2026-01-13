# 🎯 Guía de Usuario - Nuevas Funciones Sprint 1

## ✨ ¿Qué hay de nuevo?

Después del Sprint 1, tu app tiene 2 mejoras principales:

1. **Estadísticas Validadas** - Los cálculos ahora son 100% confiables
2. **Gestión Completa de Hábitos** - Edita/elimina hábitos completos de una vez

---

## 🔄 Gestión de Hábitos - Cómo Usarlo

### Escenario: Tienes un hábito "Ejercicio - 08:00-09:00 Diario"

Creaste este hábito hace una semana y aparece todos los días. Ahora quieres cambiar la hora a las 7:00 AM.

#### ❌ **ANTES (Problema)**
- Tenías que editar CADA día manualmente
- Si eliminabas un día, seguía apareciendo al día siguiente
- Era imposible eliminar un hábito completamente

#### ✅ **AHORA (Solución)**

### 📝 Editar un Hábito

1. **Localiza el hábito** en cualquier día
2. **Hover sobre la tarjeta** del hábito
3. **Click en el ícono de Editar** ✏️
4. **Aparece un modal** preguntando:

```
🔄 Editar Hábito
"Ejercicio" es un hábito recurrente. ¿Qué deseas hacer?

┌─────────────────────────────────────────────┐
│ ✏️  Editar solo esta instancia              │
│   Solo modificar esta tarea específica      │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ ✏️  Editar todas las instancias futuras     │
│   Aplicar cambios a esta y todas las        │
│   instancias futuras                        │
└─────────────────────────────────────────────┘

            [ Cancelar ]
```

5. **Elige la opción que necesitas:**
   - **"Solo esta instancia"** → Cambia solo hoy (por ejemplo, si hoy hiciste ejercicio a diferente hora)
   - **"Todas las instancias futuras"** → Cambia HOY y TODOS LOS DÍAS SIGUIENTES

6. **Haz tus cambios** en el formulario (hora, categoría, notas, etc.)
7. **Guardar Cambios**
8. ✅ ¡Listo! Todos los hábitos futuros se actualizan instantáneamente

---

### 🗑️ Eliminar un Hábito

¿Ya no quieres seguir con un hábito? Ahora puedes eliminarlo completamente.

1. **Localiza el hábito** en cualquier día
2. **Hover sobre la tarjeta** del hábito
3. **Click en el ícono de Eliminar** 🗑️
4. **Aparece un modal** preguntando:

```
🗑️  Eliminar Hábito
"Ejercicio" es un hábito recurrente. ¿Qué deseas hacer?

┌─────────────────────────────────────────────┐
│ 🗑️  Eliminar solo esta instancia            │
│   Las próximas instancias seguirán          │
│   apareciendo                               │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ 🗑️  Eliminar todas las instancias futuras   │
│   Eliminar esta y todas las próximas        │
│   ocurrencias                               │
└─────────────────────────────────────────────┘

            [ Cancelar ]
```

5. **Elige la opción:**
   - **"Solo esta instancia"** → Elimina solo hoy (por ejemplo, si hoy descansaste)
   - **"Todas las instancias futuras"** → Elimina HOY y TODOS LOS DÍAS SIGUIENTES (ya no aparecerá más)

6. **Confirmar**
7. ✅ ¡Hábito eliminado!

---

## 📊 Estadísticas Mejoradas

### Rachas de Hábitos

Ahora tienes **2 rachas** en las estadísticas de hábitos:

#### 🔥 Racha Actual
- Muestra tu racha **activa**
- Se cuenta si completaste todos los hábitos **hoy o ayer**
- Si rompiste la racha hace 2+ días, muestra **0**

**Ejemplo:**
```
Lunes: ✅ Completado
Martes: ✅ Completado
Miércoles: ✅ Completado (hoy)

→ Racha Actual: 3 días
```

#### 🏆 Mejor Racha
- Muestra tu **récord histórico**
- No importa si está activa o no
- Te motiva a superar tu mejor marca

**Ejemplo:**
```
Hace 2 semanas: Tuviste 10 días seguidos
Luego rompiste la racha
Ahora tienes 3 días

→ Racha Actual: 3 días
→ Mejor Racha: 10 días
```

---

## 🎯 Casos de Uso Comunes

### Caso 1: Cambiar hora de un hábito
**Situación:** Creaste "Correr - 18:00" pero prefieres correr por la mañana

**Solución:**
1. Editar el hábito → "Todas las instancias futuras"
2. Cambiar hora a 07:00
3. Guardar
4. ✅ Todas las instancias futuras ahora son a las 07:00

---

### Caso 2: Suspender temporalmente un hábito
**Situación:** Te vas de vacaciones 1 semana y no puedes hacer tu rutina

**Solución:**
- **Opción A (Recomendada):** Simplemente no completes el hábito esos días
  - Mantiene el historial
  - Tu racha se reinicia pero tu "mejor racha" se guarda
  
- **Opción B:** Eliminar "solo esta instancia" cada día
  - Limpia el calendario
  - No afecta días futuros

---

### Caso 3: Dejar un hábito permanentemente
**Situación:** Ya no quieres seguir con "Meditar 20 min"

**Solución:**
1. Eliminar → "Todas las instancias futuras"
2. Confirmar
3. ✅ El hábito desaparece de hoy en adelante
4. El historial pasado se mantiene (útil para estadísticas)

---

### Caso 4: Modificar un hábito gradualmente
**Situación:** Quieres aumentar "Leer 15 min" a "Leer 30 min"

**Solución:**
1. Editar → "Todas las instancias futuras"
2. Cambiar título a "Leer 30 min"
3. Cambiar tiempo de 20:00-20:15 a 20:00-20:30
4. Guardar
5. ✅ A partir de hoy, todas las instancias reflejan el nuevo objetivo

---

## ⚠️ Notas Importantes

### ✅ Cosas Que Puedes Hacer:
- Editar/eliminar instancias individuales sin afectar el resto
- Editar/eliminar todas las instancias futuras de un hábito
- Mantener historial pasado intacto (nunca se modifica el pasado)
- Cambiar cualquier propiedad: título, hora, categoría, notas, frecuencia

### ❌ Cosas Que NO Puedes Hacer:
- No puedes "editar todas las instancias pasadas" (el pasado es inmutable)
- No puedes modificar hábitos que ya completaste hoy (para mantener integridad)

### 💡 Tips:
- Si editas "todas las futuras", el cambio incluye el día actual
- Los IDs de cada instancia se mantienen únicos (importante para la app)
- Las tareas normales (no-hábitos) no se ven afectadas por estos cambios

---

## 🐛 Bugs Fixeados

### Bug 1: Racha de hábitos incorrecta
**Antes:** Siempre mostraba la racha máxima histórica, incluso si la habías roto

**Ahora:** 
- "Racha Actual" muestra solo tu racha activa
- "Mejor Racha" muestra el récord histórico

### Bug 2: No podías gestionar cadenas de hábitos
**Antes:** Eliminar un hábito solo eliminaba esa instancia, seguía apareciendo

**Ahora:** Puedes eliminar/editar toda la cadena de una vez

---

## 🚀 ¿Cómo Probar?

### Test Rápido (5 minutos):

1. **Crear un hábito de prueba**
   - Título: "Test Hábito"
   - Frecuencia: Diario
   - Guardar

2. **Navegar a mañana** (botón →)
   - Verifica que aparece el hábito

3. **Editar el hábito**
   - Click en Editar
   - Verás el modal nuevo con 2 opciones
   - Elige "Todas las instancias futuras"
   - Cambia el título a "Test Modificado"
   - Guardar

4. **Verificar cambios**
   - Navega varios días hacia adelante
   - ✅ Todos deberían decir "Test Modificado"

5. **Eliminar el hábito**
   - Click en Eliminar
   - Elige "Todas las instancias futuras"
   - Confirmar

6. **Verificar eliminación**
   - Navega hacia adelante
   - ✅ El hábito ya no debería aparecer

---

## 📖 Más Información

- **Documentación técnica:** Ver `SPRINT1_SUMMARY.md`
- **Bugs encontrados:** Ver `BUGS_DETECTED.md`
- **Tests:** Ver carpeta `src/tests/`

---

## 🎉 ¡Disfruta tu app mejorada!

Ahora tienes control total sobre tus hábitos. Ya no más ediciones tediosas ni hábitos que no puedes eliminar.

**¿Preguntas o problemas?** Revisa la documentación técnica en `SPRINT1_SUMMARY.md`
