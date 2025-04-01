import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://urahhwjmtdiawikvwlec.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVyYWhod2ptdGRpYXdpa3Z3bGVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwOTIyNjAsImV4cCI6MjA1ODY2ODI2MH0.mFj_FnVRpO5IPj9mARCpmHvn7ELYd1nHfojmCuD_bAw';

export const supabase = createClient(supabaseUrl, supabaseKey);