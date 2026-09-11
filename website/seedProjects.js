import { createClient } from '@supabase/supabase-js';
import { PROJECTS_DATA } from './src/data/servonData.js';

const supabaseUrl = 'https://mlmyvdcjwlrjgvalvfyy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1sbXl2ZGNqd2xyamd2YWx2Znl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODczOTcwMTAsImV4cCI6MjEwMjk3MzAxMH0.niX3R-IkMwBL-Sa0Ol2mkyGDh77gohRsAbWky43Iywg';
const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  console.log('Seeding projects...');
  for (const project of PROJECTS_DATA) {
    const payload = {
      name: project.name,
      slug: project.slug,
      category: project.category,
      industry: project.industry,
      summary: project.summary,
      live_url: project.liveUrl || '',
      image: project.image,
      challenge: project.challenge || '',
      approach: project.approach || '',
      solution: project.solution || '',
      features: project.features || [],
      is_featured: project.isFeatured ?? true,
      is_real_project: project.isRealProject ?? true,
    };

    console.log(`Inserting: ${project.name}`);
    const { error } = await supabase
      .from('projects')
      .upsert([payload], { onConflict: 'slug' });

    if (error) {
      console.error(`Failed to insert ${project.name}:`, error.message);
    } else {
      console.log(`Success: ${project.name}`);
    }
  }
  console.log('Done!');
}

seed();
