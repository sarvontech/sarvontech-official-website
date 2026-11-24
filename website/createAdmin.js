import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://utmbbiegcwpnrhyxpyyf.supabase.co';
const supabaseKey = 'sb_publishable_zQWXmpylUDFrtAx0FdCvyg_vVhWeNQH';
const supabase = createClient(supabaseUrl, supabaseKey);

async function createAdmin() {
  console.log('Creating initial admin user...');
  const { data, error } = await supabase.auth.signUp({
    email: 'admin@sarvontech.com',
    password: 'AdminPassword123!',
    options: {
      data: {
        full_name: 'Super Admin',
        role: 'admin'
      }
    }
  });

  if (error) {
    console.error('Error creating admin:', error.message);
  } else {
    console.log('Success! Admin user created.');
    console.log('Email: admin@sarvontech.com');
    console.log('Password: AdminPassword123!');
    console.log('Note: If "Confirm Email" is enabled in Supabase, you must disable it or verify the email before logging in.');
  }
}

createAdmin();
