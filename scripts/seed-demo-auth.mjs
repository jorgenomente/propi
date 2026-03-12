import { createClient } from '@supabase/supabase-js';
import { config as loadEnv } from 'dotenv';

loadEnv({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

const client = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const DEMO_EMAIL = 'demo@propi.local';
const DEMO_PASSWORD = 'propi123';

async function main() {
  const usersResult = await client.auth.admin.listUsers();

  if (usersResult.error) {
    throw usersResult.error;
  }

  const existingUser = usersResult.data.users.find((user) => user.email === DEMO_EMAIL);

  if (existingUser) {
    const deleteResult = await client.auth.admin.deleteUser(existingUser.id);

    if (deleteResult.error) {
      throw deleteResult.error;
    }
  }

  const createResult = await client.auth.admin.createUser({
    email: DEMO_EMAIL,
    password: DEMO_PASSWORD,
    email_confirm: true,
    user_metadata: {
      seeded: true,
      source: 'scripts/seed-demo-auth.mjs',
    },
  });

  if (createResult.error) {
    throw createResult.error;
  }

  console.log(
    JSON.stringify(
      {
        email: createResult.data.user?.email,
        id: createResult.data.user?.id,
        password: DEMO_PASSWORD,
      },
      null,
      2,
    ),
  );
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
