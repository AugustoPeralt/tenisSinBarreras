# Estrategia de Datos de Torneos - Tennis Travel Assistant

## 🎯 Objetivo
Cargar todos los torneos ATP, WTA, ITF y Challenger desde sus APIs oficiales, mostrando solo los próximos y archivando los pasados.

## 📊 Estructura de Datos

### Categorías de Torneos:
1. **ATP Tour** (Profesional masculino)
   - Grand Slams (4 por año)
   - Masters 1000 (9 por año)
   - ATP 500 (13 por año)
   - ATP 250 (~40 por año)

2. **WTA Tour** (Profesional femenino)
   - Grand Slams (4 por año)
   - WTA 1000 (10 por año)
   - WTA 500 (12 por año)
   - WTA 250 (~30 por año)

3. **ITF** (Circuito desarrollo)
   - ITF Men's (M15, M25 World Tennis Tour)
   - ITF Women's (W15, W25, W60, W80, W100)
   - +1000 torneos por año

4. **ATP Challenger** (Circuito desarrollo masculino)
   - ~160 torneos por año

## 🔄 Estrategia de Sincronización

### Frecuencia:
- **Diaria**: Sincronización completa de próximos 30 días
- **Semanal**: Limpieza de torneos finalizados
- **Mensual**: Archivo completo de datos históricos

### Filtrado para UI:
```sql
-- Solo mostrar torneos próximos (30 días)
WHERE start_date >= CURRENT_DATE 
AND start_date <= CURRENT_DATE + INTERVAL '30 days'
AND status != 'completed'
```

### Archivado:
```sql
-- Marcar torneos como completados (mantener en BD)
UPDATE tournaments 
SET status = 'completed', archived_at = NOW()
WHERE end_date < CURRENT_DATE - INTERVAL '7 days'
```

## 🌐 APIs Disponibles

### 1. APIs Oficiales (Gratuitas pero requieren aprobación):
- **ATP Tour API**: https://www.atptour.com/en/api
- **WTA API**: https://www.wtatennis.com/api
- **ITF API**: https://www.itftennis.com/api

### 2. APIs Comerciales (Pago pero inmediatas):
- **SportRadar Tennis**: Cobertura completa ATP/WTA/ITF
- **RapidAPI Tennis APIs**: Múltiples proveedores
- **Tennis Live Data**: Datos en tiempo real

### 3. APIs Scraping (Legal):
- **Tennis Explorer**: Datos públicos
- **FlashScore**: Rankings y calendarios

## 🏗️ Implementación Técnica

### Base de Datos:
```sql
-- Agregar campos de estado y archivo
ALTER TABLE tournaments ADD COLUMN status TEXT DEFAULT 'upcoming';
ALTER TABLE tournaments ADD COLUMN archived_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE tournaments ADD COLUMN tournament_level TEXT; -- Grand Slam, Masters 1000, etc.
ALTER TABLE tournaments ADD COLUMN prize_money INTEGER;
ALTER TABLE tournaments ADD COLUMN draw_size INTEGER;
```

### Jobs de Sincronización:
1. **Daily Sync Job**: Actualizar próximos 30 días
2. **Archive Job**: Archivar torneos finalizados
3. **Cleanup Job**: Optimizar base de datos

### UI Strategy:
- **Vista Principal**: Solo próximos 30 días
- **Filtros**: Por categoría (ATP, WTA, ITF, Challenger)
- **Búsqueda**: Por nombre, ubicación, fecha
- **Vista Archivo**: Historial completo (página separada)

## 📅 Timeline de Implementación

### Semana 1: Configuración APIs
- Aplicar a APIs oficiales
- Configurar APIs comerciales de prueba
- Implementar sistema de fallback

### Semana 2: Sistema de Sincronización
- Jobs automáticos
- Manejo de rate limits
- Transformación de datos

### Semana 3: Filtrado y UI
- Vista optimizada (solo próximos)
- Sistema de archivado
- Búsqueda avanzada

### Semana 4: Optimización
- Caching
- Performance
- Monitoreo

## 💰 Costos Estimados (APIs Comerciales)

### SportRadar Tennis:
- Plan Developer: $100-500/mes
- Cobertura: ATP, WTA, ITF completa
- Rate limit: 1000 requests/hora

### RapidAPI Tennis:
- Plan Basic: $10-50/mes
- Cobertura: Variable por proveedor
- Rate limit: Variable

## ⚡ Quick Start (Próximos Pasos)

1. **Aplicar a ATP/WTA APIs** (proceso de aprobación: 2-4 semanas)
2. **Configurar SportRadar trial** (inmediato, 14 días gratis)
3. **Implementar sistema de archivado** (esta semana)
4. **Optimizar filtros de UI** (esta semana)
