import { createClient } from "@supabase/supabase-js"

export default "DISABLE_DATABASE_DEV" in process.env && process.env.NODE_ENV === "development" ? null : createClient(
    process.env.SUPABASE_URL ? process.env.SUPABASE_URL : "",
    process.env.SUPABASE_KEY ? process.env.SUPABASE_KEY : ""
)