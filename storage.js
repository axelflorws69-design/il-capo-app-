import { createClient } from "@supabase/supabase-js";

// Estas dos variables se configuran en el archivo .env (ver README.md)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase = null;
if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
}

function ensureSupabase() {
  if (!supabase) {
    throw new Error(
      "Supabase no está configurado. Revisa el archivo .env (VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY) — ver README.md."
    );
  }
}

// ---- Datos personales de este dispositivo/navegador (equivalente a shared=false) ----
function localGet(key) {
  const v = window.localStorage.getItem(key);
  if (v === null) throw new Error(`Clave "${key}" no encontrada`);
  return { key, value: v, shared: false };
}
function localSet(key, value) {
  window.localStorage.setItem(key, value);
  return { key, value, shared: false };
}
function localList(prefix = "") {
  const keys = Object.keys(window.localStorage).filter((k) => k.startsWith(prefix));
  return { keys, prefix, shared: false };
}
function localDelete(key) {
  window.localStorage.removeItem(key);
  return { key, deleted: true, shared: false };
}

// ---- Datos compartidos entre todos los usuarios (equivalente a shared=true), en Supabase ----
async function sharedGet(key) {
  ensureSupabase();
  const { data, error } = await supabase.from("kv_store").select("value").eq("key", key).maybeSingle();
  if (error) throw error;
  if (!data) throw new Error(`Clave "${key}" no encontrada`);
  return { key, value: data.value, shared: true };
}
async function sharedSet(key, value) {
  ensureSupabase();
  const { error } = await supabase
    .from("kv_store")
    .upsert({ key, value, updated_at: new Date().toISOString() });
  if (error) throw error;
  return { key, value, shared: true };
}
async function sharedList(prefix = "") {
  ensureSupabase();
  let query = supabase.from("kv_store").select("key");
  if (prefix) query = query.like("key", `${prefix}%`);
  const { data, error } = await query;
  if (error) throw error;
  return { keys: (data || []).map((r) => r.key), prefix, shared: true };
}
async function sharedDelete(key) {
  ensureSupabase();
  const { error } = await supabase.from("kv_store").delete().eq("key", key);
  if (error) throw error;
  return { key, deleted: true, shared: true };
}

// Misma forma que window.storage dentro de Claude, para que App.jsx casi no cambie.
export const storage = {
  async get(key, shared = false) {
    return shared ? sharedGet(key) : localGet(key);
  },
  async set(key, value, shared = false) {
    return shared ? sharedSet(key, value) : localSet(key, value);
  },
  async list(prefix = "", shared = false) {
    return shared ? sharedList(prefix) : localList(prefix);
  },
  async delete(key, shared = false) {
    return shared ? sharedDelete(key) : localDelete(key);
  },
};
