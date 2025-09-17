# Configuración de Supabase

## Pasos para configurar la base de datos:

1. **Crear proyecto en Supabase**:
   - Ir a https://supabase.com
   - Crear cuenta gratuita
   - Nuevo proyecto: "tennis-travel-assistant"

2. **Configurar base de datos**:
   - Ir a SQL Editor
   - Ejecutar el contenido de `supabase/schema.sql`
   - Ejecutar el contenido de `supabase/seed.sql`

3. **Obtener credenciales**:
   - Project Settings > API
   - Copiar Project URL y anon/public key

4. **Configurar variables de entorno**:
   ```bash
   # Crear apps/web/.env.local
   NEXT_PUBLIC_SUPABASE_URL=tu_url_de_proyecto
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima
   ```

5. **Verificar conexión**:
   ```bash
   npm run dev
   # La app debería conectarse a Supabase
   ```
