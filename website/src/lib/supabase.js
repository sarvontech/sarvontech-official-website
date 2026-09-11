import { supabase, isSupabaseConfigured } from './supabaseClient';
import { 
  PROJECTS_DATA, 
  SERVICES_CATEGORIES, 
  SOLUTIONS_CATEGORIES, 
  PRODUCTS_HUMANIZED, 
  INDUSTRIES_HUMANIZED, 
  CAREERS_ROLES 
} from '../data/servonData';

export { supabase, isSupabaseConfigured };

/**
 * 1. Fetch Projects with fallback to static servonData.js
 */
export async function getLiveProjects() {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return PROJECTS_DATA;
    }
    return data;
  } catch (err) {
    console.warn('Supabase offline/unreachable, using static PROJECTS_DATA fallback.');
    return PROJECTS_DATA;
  }
}

/**
 * 2. Fetch Services with fallback to static servonData.js
 */
export async function getLiveServices() {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('num', { ascending: true });

    if (error || !data || data.length === 0) {
      return SERVICES_CATEGORIES;
    }
    return data;
  } catch (err) {
    console.warn('Supabase offline/unreachable, using static SERVICES_CATEGORIES fallback.');
    return SERVICES_CATEGORIES;
  }
}

/**
 * 3. Fetch Solutions with fallback to static servonData.js
 */
export async function getLiveSolutions() {
  try {
    const { data, error } = await supabase
      .from('solutions')
      .select('*')
      .order('created_at', { ascending: true });

    if (error || !data || data.length === 0) {
      return SOLUTIONS_CATEGORIES;
    }
    return data;
  } catch (err) {
    console.warn('Supabase offline/unreachable, using static SOLUTIONS_CATEGORIES fallback.');
    return SOLUTIONS_CATEGORIES;
  }
}

/**
 * 4. Fetch Products with fallback to static servonData.js
 */
export async function getLiveProducts() {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: true });

    if (error || !data || data.length === 0) {
      return PRODUCTS_HUMANIZED;
    }
    return data;
  } catch (err) {
    console.warn('Supabase offline/unreachable, using static PRODUCTS_HUMANIZED fallback.');
    return PRODUCTS_HUMANIZED;
  }
}

/**
 * 5. Fetch Industries with fallback to static servonData.js
 */
export async function getLiveIndustries() {
  try {
    const { data, error } = await supabase
      .from('industries')
      .select('*')
      .order('created_at', { ascending: true });

    if (error || !data || data.length === 0) {
      return INDUSTRIES_HUMANIZED;
    }
    return data;
  } catch (err) {
    console.warn('Supabase offline/unreachable, using static INDUSTRIES_HUMANIZED fallback.');
    return INDUSTRIES_HUMANIZED;
  }
}

/**
 * 6. Fetch Open Careers Roles with fallback to static servonData.js
 */
export async function getLiveCareersRoles() {
  try {
    const { data, error } = await supabase
      .from('careers_roles')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return CAREERS_ROLES;
    }
    return data;
  } catch (err) {
    console.warn('Supabase offline/unreachable, using static CAREERS_ROLES fallback.');
    return CAREERS_ROLES;
  }
}

/**
 * 7. Fetch Navigation Links
 */
export async function getLiveNavigationLinks() {
  try {
    const { data, error } = await supabase
      .from('navigation_links')
      .select('*')
      .eq('is_active', true)
      .order('order_index', { ascending: true });

    if (error || !data) {
      return null;
    }
    return data;
  } catch (err) {
    console.warn('Supabase offline/unreachable for navigation_links.');
    return null;
  }
}

/**
 * 8. Fetch Page Content by Slug (Inner Page Content Updator)
 */
export async function getLivePageContent(pageSlug) {
  try {
    const { data, error } = await supabase
      .from('page_contents')
      .select('*')
      .eq('slug', pageSlug)
      .maybeSingle();

    if (error || !data) {
      return null;
    }
    return data;
  } catch (err) {
    console.warn(`Supabase offline/unreachable for page_contents ${pageSlug}.`);
    return null;
  }
}

/**
 * Save / Update Page Content (Inner Page Content Updator)
 */
export async function savePageContent(pageSlug, pageData) {
  try {
    const payload = {
      slug: pageSlug,
      title: pageData.title,
      hero_title: pageData.hero_title,
      hero_subtitle: pageData.hero_subtitle,
      hero_image: pageData.hero_image,
      hero_video: pageData.hero_video,
      sections: pageData.sections || {},
      seo: pageData.seo || {},
      updated_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('page_contents')
      .upsert([payload], { onConflict: 'slug' });

    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.error('Error saving page content:', err);
    throw err;
  }
}

/**
 * Global Settings (Custom CSS / JS) stored as a special page slug 'global-settings'
 */
export async function getGlobalSettings() {
  try {
    const { data, error } = await supabase
      .from('page_contents')
      .select('*')
      .eq('slug', 'global-settings')
      .maybeSingle();
      
    if (error || !data) return null;
    return data;
  } catch (err) {
    return null;
  }
}

export async function saveGlobalSettings(settingsData) {
  try {
    const payload = {
      slug: 'global-settings',
      title: 'Global Settings',
      sections: settingsData, // Store css/js inside sections
      updated_at: new Date().toISOString()
    };
    const { data, error } = await supabase
      .from('page_contents')
      .upsert([payload], { onConflict: 'slug' });
    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.error('Error saving global settings:', err);
    throw err;
  }
}

/**
 * Upload Asset (Images, PDFs, Media) to Supabase Storage
 */
export async function uploadMediaAsset(file, folder = 'page-assets') {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${folder}/${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('project-images')
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('project-images')
      .getPublicUrl(fileName);

    return data.publicUrl;
  } catch (err) {
    console.error('Media upload error:', err);
    throw err;
  }
}

/**
 * 8. Submit Contact Inquiry / Consultation Request
 */
export async function submitInquiry(inquiryData) {
  try {
    const { data, error } = await supabase
      .from('inquiries')
      .insert([
        {
          full_name: inquiryData.fullName || inquiryData.name,
          email: inquiryData.email,
          phone: inquiryData.phone,
          service_category: inquiryData.serviceCategory || inquiryData.context || 'General Inquiry',
          project_budget: inquiryData.budget || 'Not specified',
          project_details: inquiryData.message || inquiryData.details || '',
          status: 'new'
        }
      ]);

    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.error('Inquiry submission error:', err);
    throw err;
  }
}

/**
 * 9. Submit Candidate Application to Supabase with resume PDF upload
 */
export async function submitJobApplication(applicationData, resumeFile) {
  try {
    let resumeUrl = 'no-file-attached';

    if (resumeFile) {
      const fileExt = resumeFile.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `resumes/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(filePath, resumeFile);

      if (uploadError) {
        console.error('Resume upload warning:', uploadError);
        resumeUrl = filePath;
      } else {
        resumeUrl = filePath;
      }
    }

    const { data, error } = await supabase
      .from('applications')
      .insert([
        {
          full_name: applicationData.fullName,
          email: applicationData.email,
          phone: applicationData.phone,
          role_title: applicationData.roleTitle || 'General Application',
          experience: applicationData.experience,
          portfolio_url: applicationData.portfolioUrl,
          resume_url: resumeUrl,
          short_message: applicationData.shortMessage,
        }
      ]);

    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.error('Application submission error:', err);
    throw err;
  }
}
