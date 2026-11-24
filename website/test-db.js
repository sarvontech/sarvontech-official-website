import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();
const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);
async function test() {
  const { data } = await supabase.from('page_contents').select('sections').eq('slug', 'blog').single();
  console.log(JSON.stringify(data.sections.blocks.find(b => b.type === 'heading'), null, 2));
}
test();
