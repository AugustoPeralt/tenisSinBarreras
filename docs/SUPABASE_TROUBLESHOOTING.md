# Supabase Setup Troubleshooting

## Permission Error: "You do not have permission to create a project"

**CAUSA COMÚN: Cuenta vinculada a GitHub con organizaciones**

Si vinculaste tu cuenta de Supabase con GitHub, es probable que esté intentando crear el proyecto en una organización de GitHub donde no tienes permisos.

### Solución Rápida: Cambiar Contexto de Cuenta

1. **Ve a Supabase Dashboard:**
   - Abre [app.supabase.com](https://app.supabase.com)
   - Mira en la esquina superior derecha tu avatar/nombre

2. **Cambia de Organización a Personal:**
   - Haz clic en el selector de organización (arriba a la izquierda)
   - Verás algo como "aydkpgjakmmdxqltjkzl" (organización)
   - **Cambia a tu cuenta personal** (tu nombre de usuario de GitHub)

3. **Ahora crea el proyecto:**
   - Click "New Project"
   - Debería funcionar sin problemas

### Si el problema persiste:

### Option 1: Create Project in Personal Account (Recommended)
1. Go to [supabase.com](https://supabase.com)
2. Make sure you're signed in to your **personal account** (not an organization)
3. Click on your profile icon (top right)
4. If you see organization names, click on your personal account name
5. Now click "New Project" - this should work in your personal space

### Option 2: Request Organization Access
If you need to use the organization account:
1. Contact the organization owner/administrator
2. Request "Project Creator" or "Owner" permissions
3. Wait for approval before proceeding

### Option 3: Use Different Email
If you must use an organization but don't have access:
1. Create a new Supabase account with a different email
2. Use that account for development
3. Transfer the project later if needed

## Recommended Next Steps

**For Development (Choose Option 1):**
1. Sign in to your personal Supabase account
2. Create a new project called "tennis-travel-assistant"
3. Copy the Project URL and anon key
4. Continue with the setup in `.env.local`

## Alternative: Local Development Setup

If you can't access Supabase right now, you can set up local development:

```bash
# Install Supabase CLI
npm install -g supabase

# Initialize local Supabase
cd c:\Users\Usuario\Desktop\TenisSinBarreras
supabase init

# Start local development
supabase start
```

This will give you a local Supabase instance for development.
