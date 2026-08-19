# IL Capo BarberShop — App de citas

Este es tu proyecto ya armado y listo para publicar en internet. Sigue estos pasos en orden, no necesitas saber programar.

## Paso 1 — Crear la base de datos (gratis, 5 minutos)

1. Ve a https://supabase.com y crea una cuenta gratis.
2. Crea un proyecto nuevo (elige cualquier nombre y contraseña, y una región cercana a ti).
3. Cuando el proyecto esté listo, ve a **SQL Editor** (menú izquierdo) → **New query**, pega esto y dale **Run**:

```sql
create table kv_store (
  key text primary key,
  value text not null,
  updated_at timestamptz default now()
);

alter table kv_store enable row level security;

create policy "allow all" on kv_store
  for all using (true) with check (true);
```

   Nota: esta configuración deja la tabla abierta a lectura/escritura sin necesitar contraseña, igual que la versión de prueba que usaste dentro de Claude. Es suficiente para un negocio pequeño, no para manejar datos ultra sensibles.

4. Ve a **Project Settings → API**. Copia dos cosas:
   - **Project URL**
   - **anon public key**

## Paso 2 — Conectar tu app a la base de datos

1. En este proyecto, copia el archivo `.env.example` y renómbralo a `.env`
2. Pega ahí lo que copiaste:

```
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-llave-larga-aqui
```

## Paso 3 — Probarla en tu computadora (opcional pero recomendado)

Necesitas tener [Node.js](https://nodejs.org) instalado (descarga la versión LTS). Luego, en la carpeta del proyecto:

```
npm install
npm run dev
```

Abre la dirección que te muestre en la terminal (algo como `http://localhost:5173`).

## Paso 4 — Publicarla en internet (gratis)

La forma más simple es con **Vercel**:

1. Ve a https://vercel.com y crea una cuenta gratis (puedes usar tu cuenta de GitHub, Google, etc.).
2. Sube este proyecto a GitHub (puedes arrastrar la carpeta directo en github.com/new si no usas Git — el botón "uploading an existing file").
3. En Vercel, dale **Add New → Project**, elige el repositorio que subiste.
4. En **Environment Variables**, agrega las mismas dos variables del paso 2 (`VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`).
5. Dale **Deploy**. En un par de minutos te da una URL pública, algo como `il-capo-barbershop.vercel.app`.

Esa es la dirección que compartes con tus clientes.

## Paso 5 — Que tus clientes la "instalen" (sin App Store)

Cuando un cliente abre tu URL desde su celular:

- **iPhone (Safari)**: toca el botón compartir → "Agregar a pantalla de inicio".
- **Android (Chrome)**: toca los tres puntos → "Instalar app" o "Agregar a pantalla de inicio".

Les queda un ícono como cualquier app, abre a pantalla completa, sin barra de navegador — sin pasar por revisión de Apple ni Google, y sin costo.

## Dominio propio (opcional)

Si más adelante compras un dominio (ej. `ilcapobarbershop.com`), lo conectas directo en Vercel → tu proyecto → **Settings → Domains**. Cuesta aparte (usualmente $10-15 USD/año en sitios como Namecheap o Google Domains).

## Si algo no funciona

- Pantalla en blanco → revisa que `.env` tenga las dos variables bien copiadas, sin espacios.
- Error de conexión en la app → revisa que ejecutaste el SQL del Paso 1 correctamente en Supabase.
- Cualquier otra duda, vuelve a preguntarme aquí mismo.
