export type PlanTier = 'free' | 'basic' | 'pro'
export type TemplateCategory = 'Modern' | 'Classic' | 'Minimal' | 'Bold' | 'Elegant' | 'Creative' | 'Professional' | 'Colorful'

export interface Template {
  id: string
  name: string
  category: TemplateCategory
  requiredPlan: PlanTier
  previewColors: {
    primary: string
    secondary: string
    accent?: string
  }
  sampleData: {
    name: string
    title: string
    company: string
    email: string
    phone: string
  }
  description: string
}

export const templates: Template[] = [
  // Free Templates (5)
  {
    id: 'classic-blue',
    name: 'Classic Blue',
    category: 'Classic',
    requiredPlan: 'free',
    previewColors: { primary: '#3B82F6', secondary: '#1E40AF' },
    sampleData: { name: 'John Smith', title: 'Business Consultant', company: 'Consulting Co.', email: 'john@example.com', phone: '+1 234 567 8900' },
    description: 'Full-width hero header with decorative patterns and minimal footer'
  },
  {
    id: 'minimal-gray',
    name: 'Minimal Gray',
    category: 'Minimal',
    requiredPlan: 'free',
    previewColors: { primary: '#6B7280', secondary: '#4B5563' },
    sampleData: { name: 'Sarah Johnson', title: 'Designer', company: 'Design Studio', email: 'sarah@example.com', phone: '+1 234 567 8901' },
    description: 'Geometric pattern header with center circle profile and text-only footer'
  },
  {
    id: 'elegant-purple',
    name: 'Elegant Purple',
    category: 'Elegant',
    requiredPlan: 'free',
    previewColors: { primary: '#9333EA', secondary: '#7C3AED' },
    sampleData: { name: 'Michael Chen', title: 'Marketing Manager', company: 'Marketing Pro', email: 'michael@example.com', phone: '+1 234 567 8902' },
    description: 'Sophisticated purple theme'
  },
  {
    id: 'simple-white',
    name: 'Simple White',
    category: 'Minimal',
    requiredPlan: 'free',
    previewColors: { primary: '#FFFFFF', secondary: '#F3F4F6', accent: '#6366F1' },
    sampleData: { name: 'Emily Davis', title: 'Accountant', company: 'Finance Corp', email: 'emily@example.com', phone: '+1 234 567 8903' },
    description: 'Side-by-side layout with photo on left and info on right'
  },
  {
    id: 'professional-black',
    name: 'Professional Black',
    category: 'Professional',
    requiredPlan: 'free',
    previewColors: { primary: '#1F2937', secondary: '#111827' },
    sampleData: { name: 'David Wilson', title: 'CEO', company: 'Tech Solutions', email: 'david@example.com', phone: '+1 234 567 8904' },
    description: 'Bold black professional design'
  },
  
  // Basic Templates (10)
  {
    id: 'modern-teal',
    name: 'Modern Teal',
    category: 'Modern',
    requiredPlan: 'basic',
    previewColors: { primary: '#14B8A6', secondary: '#0D9488' },
    sampleData: { name: 'Lisa Anderson', title: 'Product Manager', company: 'Innovation Labs', email: 'lisa@example.com', phone: '+1 234 567 8905' },
    description: 'Lightbulb icon header with large center circle profile and button-style footer'
  },
  {
    id: 'bold-orange',
    name: 'Bold Orange',
    category: 'Bold',
    requiredPlan: 'basic',
    previewColors: { primary: '#F97316', secondary: '#EA580C' },
    sampleData: { name: 'Robert Taylor', title: 'Sales Director', company: 'Sales Force', email: 'robert@example.com', phone: '+1 234 567 8906' },
    description: 'Geometric triangle pattern header with overlapping profile and horizontal icon bar footer'
  },
  {
    id: 'creative-pink',
    name: 'Creative Pink',
    category: 'Creative',
    requiredPlan: 'basic',
    previewColors: { primary: '#EC4899', secondary: '#DB2777' },
    sampleData: { name: 'Jessica Brown', title: 'Creative Director', company: 'Creative Agency', email: 'jessica@example.com', phone: '+1 234 567 8907' },
    description: 'Torn paper effect header with square profile top-left and decorative pattern footer'
  },
  {
    id: 'colorful-rainbow',
    name: 'Colorful Rainbow',
    category: 'Colorful',
    requiredPlan: 'basic',
    previewColors: { primary: '#8B5CF6', secondary: '#EC4899', accent: '#F59E0B' },
    sampleData: { name: 'Alex Martinez', title: 'Artist', company: 'Art Studio', email: 'alex@example.com', phone: '+1 234 567 8908' },
    description: 'Vibrant rainbow color scheme'
  },
  {
    id: 'elegant-gold',
    name: 'Elegant Gold',
    category: 'Elegant',
    requiredPlan: 'basic',
    previewColors: { primary: '#F59E0B', secondary: '#D97706' },
    sampleData: { name: 'Amanda White', title: 'Executive Assistant', company: 'Executive Suite', email: 'amanda@example.com', phone: '+1 234 567 8909' },
    description: 'Luxurious gold theme'
  },
  {
    id: 'modern-green',
    name: 'Modern Green',
    category: 'Modern',
    requiredPlan: 'basic',
    previewColors: { primary: '#10B981', secondary: '#059669' },
    sampleData: { name: 'Chris Lee', title: 'Environmental Consultant', company: 'Green Solutions', email: 'chris@example.com', phone: '+1 234 567 8910' },
    description: 'Split layout with photo on right side and minimal text footer'
  },
  {
    id: 'professional-navy',
    name: 'Professional Navy',
    category: 'Professional',
    requiredPlan: 'basic',
    previewColors: { primary: '#1E3A8A', secondary: '#1E40AF' },
    sampleData: { name: 'Jennifer Kim', title: 'Lawyer', company: 'Legal Partners', email: 'jennifer@example.com', phone: '+1 234 567 8911' },
    description: 'Cityscape silhouette header with circular profile centered and button footer'
  },
  {
    id: 'bold-red',
    name: 'Bold Red',
    category: 'Bold',
    requiredPlan: 'basic',
    previewColors: { primary: '#DC2626', secondary: '#B91C1C' },
    sampleData: { name: 'Mark Thompson', title: 'Sales Manager', company: 'Sales Pro', email: 'mark@example.com', phone: '+1 234 567 8912' },
    description: 'Bold red striking design'
  },
  {
    id: 'classic-brown',
    name: 'Classic Brown',
    category: 'Classic',
    requiredPlan: 'basic',
    previewColors: { primary: '#92400E', secondary: '#78350F' },
    sampleData: { name: 'Rachel Green', title: 'Real Estate Agent', company: 'Homes Realty', email: 'rachel@example.com', phone: '+1 234 567 8913' },
    description: 'Classic brown professional theme'
  },
  {
    id: 'minimal-beige',
    name: 'Minimal Beige',
    category: 'Minimal',
    requiredPlan: 'basic',
    previewColors: { primary: '#D4A574', secondary: '#C19A6B' },
    sampleData: { name: 'Kevin Park', title: 'Architect', company: 'Design Build', email: 'kevin@example.com', phone: '+1 234 567 8914' },
    description: 'Minimal beige neutral design'
  },
  
  // Pro Templates (15)
  {
    id: 'artist-creative',
    name: 'Artist Creative',
    category: 'Creative',
    requiredPlan: 'pro',
    previewColors: { primary: '#EC4899', secondary: '#BE185D', accent: '#F59E0B' },
    sampleData: { name: 'Jamie Arnold', title: 'Designer', company: 'Creative Studio', email: 'jamie@example.com', phone: '+1 234 567 8915' },
    description: 'Torn paper effect header with full-width hero profile and creative pattern footer'
  },
  {
    id: 'marketing-vibrant',
    name: 'Marketing Vibrant',
    category: 'Colorful',
    requiredPlan: 'pro',
    previewColors: { primary: '#F97316', secondary: '#1E40AF', accent: '#10B981' },
    sampleData: { name: 'Mario Dillon', title: 'Marketing Manager', company: 'Genius Marketers', email: 'mario@example.com', phone: '+1 234 567 8916' },
    description: 'Office scene background header with professional photo overlay and icon bar footer'
  },
  {
    id: 'banking-yellow',
    name: 'Banking Yellow',
    category: 'Bold',
    requiredPlan: 'pro',
    previewColors: { primary: '#FCD34D', secondary: '#F59E0B', accent: '#A855F7' },
    sampleData: { name: 'Aaron Johnson', title: 'Sr. Manager', company: 'Nova Bank', email: 'aaron@example.com', phone: '+1 234 567 8917' },
    description: 'Group photo header effect with inset profile circle and web links section footer'
  },
  {
    id: 'healthcare-teal',
    name: 'Healthcare Teal',
    category: 'Professional',
    requiredPlan: 'pro',
    previewColors: { primary: '#0D9488', secondary: '#14B8A6', accent: '#FFFFFF' },
    sampleData: { name: 'David Hann', title: 'Pediatrician', company: 'Global Healthcare', email: 'david@example.com', phone: '+1 234 567 8918' },
    description: 'Medical cross icon header with doctor photo and stethoscope, contact bar footer'
  },
  {
    id: 'realtor-blue',
    name: 'Realtor Blue',
    category: 'Professional',
    requiredPlan: 'pro',
    previewColors: { primary: '#1E40AF', secondary: '#1E3A8A', accent: '#FCD34D' },
    sampleData: { name: 'Evelyn McBride', title: 'Real Estate Agent', company: 'Secure Homes', email: 'evelyn@example.com', phone: '+1 234 567 8919' },
    description: 'Cityscape header with circular profile centered in cityscape and keys handoff scene footer'
  },
  {
    id: 'luxury-gold',
    name: 'Luxury Gold',
    category: 'Elegant',
    requiredPlan: 'pro',
    previewColors: { primary: '#FCD34D', secondary: '#F59E0B', accent: '#1F2937' },
    sampleData: { name: 'Victoria Stone', title: 'Luxury Consultant', company: 'Elite Services', email: 'victoria@example.com', phone: '+1 234 567 8920' },
    description: 'Luxurious gold premium design'
  },
  {
    id: 'tech-futuristic',
    name: 'Tech Futuristic',
    category: 'Modern',
    requiredPlan: 'pro',
    previewColors: { primary: '#6366F1', secondary: '#4F46E5', accent: '#EC4899' },
    sampleData: { name: 'Ryan Tech', title: 'Tech Lead', company: 'Tech Innovations', email: 'ryan@example.com', phone: '+1 234 567 8921' },
    description: 'Futuristic tech design'
  },
  {
    id: 'fashion-pink',
    name: 'Fashion Pink',
    category: 'Creative',
    requiredPlan: 'pro',
    previewColors: { primary: '#EC4899', secondary: '#DB2777', accent: '#FCD34D' },
    sampleData: { name: 'Sophia Fashion', title: 'Fashion Designer', company: 'Fashion House', email: 'sophia@example.com', phone: '+1 234 567 8922' },
    description: 'Elegant fashion design'
  },
  {
    id: 'education-blue',
    name: 'Education Blue',
    category: 'Professional',
    requiredPlan: 'pro',
    previewColors: { primary: '#3B82F6', secondary: '#2563EB', accent: '#10B981' },
    sampleData: { name: 'Dr. James Scholar', title: 'Professor', company: 'University', email: 'james@example.com', phone: '+1 234 567 8923' },
    description: 'Academic professional design'
  },
  {
    id: 'fitness-orange',
    name: 'Fitness Orange',
    category: 'Bold',
    requiredPlan: 'pro',
    previewColors: { primary: '#F97316', secondary: '#EA580C', accent: '#FFFFFF' },
    sampleData: { name: 'Mike Trainer', title: 'Fitness Coach', company: 'Fit Life', email: 'mike@example.com', phone: '+1 234 567 8924' },
    description: 'Energetic fitness design'
  },
  {
    id: 'music-purple',
    name: 'Music Purple',
    category: 'Creative',
    requiredPlan: 'pro',
    previewColors: { primary: '#9333EA', secondary: '#7C3AED', accent: '#EC4899' },
    sampleData: { name: 'Luna Music', title: 'Music Producer', company: 'Sound Studio', email: 'luna@example.com', phone: '+1 234 567 8925' },
    description: 'Creative music industry design'
  },
  {
    id: 'food-red',
    name: 'Food Red',
    category: 'Colorful',
    requiredPlan: 'pro',
    previewColors: { primary: '#DC2626', secondary: '#B91C1C', accent: '#F59E0B' },
    sampleData: { name: 'Chef Marco', title: 'Head Chef', company: 'Fine Dining', email: 'marco@example.com', phone: '+1 234 567 8926' },
    description: 'Appetizing food industry design'
  },
  {
    id: 'travel-cyan',
    name: 'Travel Cyan',
    category: 'Colorful',
    requiredPlan: 'pro',
    previewColors: { primary: '#06B6D4', secondary: '#0891B2', accent: '#F59E0B' },
    sampleData: { name: 'Travel Agent', title: 'Travel Consultant', company: 'World Travel', email: 'travel@example.com', phone: '+1 234 567 8927' },
    description: 'Vibrant travel theme'
  },
  {
    id: 'finance-green',
    name: 'Finance Green',
    category: 'Professional',
    requiredPlan: 'pro',
    previewColors: { primary: '#10B981', secondary: '#059669', accent: '#1F2937' },
    sampleData: { name: 'Finance Expert', title: 'Financial Advisor', company: 'Wealth Management', email: 'finance@example.com', phone: '+1 234 567 8928' },
    description: 'Professional finance design'
  },
  {
    id: 'premium-black',
    name: 'Premium Black',
    category: 'Elegant',
    requiredPlan: 'pro',
    previewColors: { primary: '#000000', secondary: '#1F2937', accent: '#FCD34D' },
    sampleData: { name: 'Elite Member', title: 'Executive', company: 'Premium Corp', email: 'elite@example.com', phone: '+1 234 567 8929' },
    description: 'Premium black elegant design'
  },
]

export function getTemplatesByCategory(): Record<TemplateCategory, Template[]> {
  const categorized: Record<string, Template[]> = {}
  templates.forEach(template => {
    if (!categorized[template.category]) {
      categorized[template.category] = []
    }
    categorized[template.category].push(template)
  })
  return categorized as Record<TemplateCategory, Template[]>
}

export function getTemplateById(id: string): Template | undefined {
  return templates.find(t => t.id === id)
}

export function getAllCategories(): TemplateCategory[] {
  return Array.from(new Set(templates.map(t => t.category))) as TemplateCategory[]
}

