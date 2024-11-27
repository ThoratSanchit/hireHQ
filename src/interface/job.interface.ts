export interface jobInterface {
    id?: string;
    logo?: string;
    job_title: string;
    location?: {
        city: string;
        state: string;
        country: string;
    };
    salary_range?: {
        min: number;
        max: number;
        currency: string;
        frequency: string; // e.g., per month, per year
    };
    company_name?: string;
    nps_score?: string; // Net Promoter Score e.g., -3/10
    job_type?: string; // e.g., Full Time, Part Time
    job_reference?: string;
    external_job_id?: string | number;
    skills_required?: string[]; // e.g., ['Java', 'Python']
    profile_match_percentage?: number; // e.g., 54
    job_description?: string;
    recruiter_details?: string;
    education_requirement?: string; // e.g., 'Masters - MCA'
    workplace_type?: string; // e.g., 'Onsite', 'Remote'
    experience_required?: {
        min_years: number;
        max_years: number;
    };
    number_of_openings?: number;
    experience_level?: string; // e.g., Entry Level, Mid Level
    start_date?: string; // Format: YYYY-MM-DD
    end_date?: string; // Format: YYYY-MM-DD
    duration?: string; // e.g., '4 Year(s)'
    benefits?: string; // e.g., 'Free'
    posted_by?: string; // e.g., 'Nikhil Dighe'
    is_posted?: boolean; // e.g., true/false
    posted_date?: string; // Format: YYYY-MM-DD
}
