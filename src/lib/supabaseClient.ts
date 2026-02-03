import { createClient } from '@supabase/supabase-js'

<<<<<<< HEAD
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!//se o doc fosse em JavaScript não iria utilizar "!"
=======
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
>>>>>>> 0b564da4a4505c544984fed1958aea6f5b8c652d
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

//identificador da aplicação do supabase 