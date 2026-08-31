# 🚀 Guía para Subir y Publicar la Web en Vercel

Esta guía te muestra paso a paso cómo desplegar tu aplicación en **Vercel** de forma gratuita y en pocos minutos para que sea accesible públicamente en internet con HTTPS automático.

---

## Opción 1: Despliegue con GitHub y Vercel (Recomendado)

### Paso 1: Subir el proyecto a tu cuenta de GitHub
1. Abre tu terminal en la carpeta del proyecto y haz tu primer commit:
   ```bash
   git add .
   git commit -m "feat: bull logo and vercel ready"
   ```
2. Crea un nuevo repositorio en [GitHub](https://github.com/new) (puede ser público o privado).
3. Conecta y sube tu código a GitHub:
   ```bash
   git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
   git branch -M main
   git push -u origin main
   ```

### Paso 2: Importar en Vercel
1. Entra en [vercel.com](https://vercel.com) e inicia sesión con tu cuenta de GitHub.
2. Haz clic en el botón **"Add New..."** > **"Project"**.
3. Selecciona tu repositorio de GitHub y haz clic en **"Import"**.

### Paso 3: Configurar las Variables de Entorno en Vercel
En la sección **"Environment Variables"** antes de presionar Deploy, agrega las siguientes dos variables (copiadas de tu `.env.local`):

| Nombre de la Variable | Valor |
| :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | Tu URL de Supabase (ej: `https://tlfxkdpumbjpqcneglsj.supabase.co`) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Tu Clave Anon de Supabase |

### Paso 4: Desplegar
- Haz clic en **"Deploy"**.
- En aproximadamente 1 minuto, Vercel compilará tu aplicación y te dará tu enlace público oficial (ejemplo: `https://tu-gimnasio.vercel.app`).

---

## Opción 2: Despliegue directo desde la Terminal con Vercel CLI

Si prefieres no usar GitHub por ahora y subirlo directo desde la consola:

1. Ejecuta en la terminal:
   ```bash
   npx vercel
   ```
2. Sigue las preguntas en pantalla (inicia sesión con tu navegador).
3. Cuando te pregunte:
   - *Set up and deploy?* -> `Y`
   - *Which scope?* -> Elige tu usuario
   - *Link to existing project?* -> `N`
   - *Project name?* -> Presiona Enter
   - *In which directory is your code located?* -> `./`
4. Para incluir las variables de entorno en producción, corre:
   ```bash
   npx vercel env add NEXT_PUBLIC_SUPABASE_URL production
   npx vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
   ```
5. Despliega a producción final:
   ```bash
   npx vercel --prod
   ```

---

## 🔒 Acceso al Panel de Administración en Producción

Una vez desplegada en Vercel:
- Tu web pública estará en: `https://tu-proyecto.vercel.app`
- Tu panel de administración estará en: `https://tu-proyecto.vercel.app/admin/login`
- Podrás gestionar disciplinas, profesores, horarios, fotos y datos de contacto en tiempo real desde cualquier dispositivo.
