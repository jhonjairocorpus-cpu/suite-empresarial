window.QUANTROX_CLOUD = {
  enabled: false,
  supabaseUrl: "https://TU-PROYECTO.supabase.co",
  supabaseAnonKey: "TU-ANON-KEY"
};

// Para produccion:
// 1. Ejecutar database/supabase-schema.sql en Supabase.
// 2. Crear usuario en Authentication.
// 3. Ejecutar database/supabase-seed-demo.sql con el UUID del usuario.
// 4. Cambiar enabled a true y pegar URL + anon public key.
