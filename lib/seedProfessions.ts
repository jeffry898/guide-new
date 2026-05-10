import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import path from 'path'

// Load environment variables for the script
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })
dotenv.config({ path: path.resolve(process.cwd(), '.env') })

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const PROFESSIONS = [
  {
    name: 'Hair Salon Owner',
    slug: 'hair-salon',
    price: 47,
    automation_risk: 54,
    industry_data: {
      icon: 'Scissors',
      psychological_title: 'The Silent Booking Machine',
      fear_title: 'Is Your Salon About to Lose Everything to AI?',
      ad_hook: 'Stop losing £2,300/month to empty chairs',
      pain_points: ['No-show clients', 'Slow seasons', 'Admin overload', 'Chain competition', 'Client retention'],
      industry_tools: ['Fresha', 'Vagaro', 'Square Appointments', 'WhatsApp Business', 'Instagram'],
      avg_revenue_client: '£45-£85',
      onboarding_questions: [
        { q: 'How many staff?', options: ['Just me', '2-5', '6+'] },
        { 
          q: 'Biggest challenge?', 
          options: ['Not enough bookings', 'Too many no-shows', 'Admin overload', 'Losing to competitors'] 
        },
        { q: 'Monthly booking target?', type: 'text', placeholder: 'e.g. 200 bookings/month' }
      ],
      geniuzlab_services: [
        { name: 'AI Booking Bot', icon: '🤖', description: 'WhatsApp bot handles bookings 24/7' },
        { name: 'No-Show Prevention', icon: '📱', description: 'Cuts no-shows by 80% automatically' },
        { name: 'Client Reactivation Engine', icon: '🔄', description: 'Brings back dormant clients with AI' }
      ],
      meta_title: 'AI Systems for Hair Salon Owners — 2026 Blueprint',
      meta_description: 'How salon owners are using AI to 3x bookings and eliminate no-shows completely'
    }
  },
  {
    name: 'Teacher',
    slug: 'teacher',
    price: 29,
    automation_risk: 27,
    industry_data: {
      icon: 'GraduationCap',
      psychological_title: 'The Infinite Lesson Engine',
      fear_title: 'Burnout is Optional: AI for the Modern Educator',
      ad_hook: 'Reclaim 15 Hours a Week with Classroom Intelligence',
      pain_points: ['Grading fatigue', 'Lesson planning time', 'Parent communication', 'Individualized learning', 'Admin tasks'],
      industry_tools: ['Canvas', 'Google Classroom', 'Turnitin', 'Quizlet', 'MagicSchool AI'],
      avg_revenue_client: 'Priceless / Emotional Stability',
      onboarding_questions: [
        { q: 'Grade level taught?', options: ['Primary', 'Secondary', 'Higher Ed'] },
        { q: 'Biggest time sink?', options: ['Grading', 'Planning', 'Emails', 'Data entry'] }
      ],
      geniuzlab_services: [
        { name: 'Instant Lesson Generator', icon: '📝', description: 'Create high-quality lessons in seconds' },
        { name: 'AI feedback Loop', icon: '💬', description: 'Personalized student feedback without the grind' },
        { name: 'Parent Comms Automator', icon: '📧', description: 'Keep parents informed with zero manual effort' }
      ],
      meta_title: 'AI Survival Guide for Teachers — Reclaim Your Time',
      meta_description: 'Discover how top educators are using AI to automate grading and planning'
    }
  },
  {
    name: 'Photographer',
    slug: 'photographer',
    price: 39,
    automation_risk: 38,
    industry_data: {
      icon: 'Camera',
      psychological_title: 'The Instant Cull Logic',
      fear_title: 'Shoot More, Edit Less: The Photographers AI Workflow',
      ad_hook: 'Eliminate the Culling Bottleneck and Deliver Galleries in Hours',
      pain_points: ['Editing backlog', 'Manual culling', 'Client management', 'Finding new leads', 'File management'],
      industry_tools: ['Lightroom', 'Aftershoot', 'Pixieset', 'Narrative Select', 'Imagen AI'],
      avg_revenue_client: '£500-£3,000',
      onboarding_questions: [
        { q: 'Primary niche?', options: ['Weddings', 'Portrait', 'Commercial', 'Events'] },
        { q: 'Average photos per shoot?', type: 'text', placeholder: 'e.g. 2000' }
      ],
      geniuzlab_services: [
        { name: 'Neural Culling Engine', icon: '🔍', description: 'Select 100 best shots from 2000 in 15 minutes' },
        { name: 'Style Synchronization', icon: '✨', description: 'Auto-edit your entire catalog to your exact aesthetic' },
        { name: 'Smart Portfolio Bot', icon: '🖼️', description: 'AI sorts and publishes your best work socially' }
      ],
      meta_title: 'AI Systems for Photographers — Deliver Galleries Instantly',
      meta_description: 'Automate your photography workflow from culling to delivery with AI'
    }
  },
  {
    name: 'Freelance Designer',
    slug: 'freelance-designer',
    price: 39,
    automation_risk: 35,
    industry_data: {
      icon: 'Palette',
      psychological_title: 'The Synthetic Creative Suite',
      fear_title: 'Design at the Speed of Thought',
      ad_hook: 'From Concept to Client Handoff: The Designers AI Sync',
      pain_points: ['Scope creep', 'Endless revisions', 'Finding high-paying clients', 'Repetitive asset creation', 'Moodboarding'],
      industry_tools: ['Figma', 'Relume', 'Midjourney', 'Adobe Firefly', 'Notion'],
      avg_revenue_client: '£1,000-£10,000',
      onboarding_questions: [
        { q: 'Main service?', options: ['Web Design', 'Branding', 'UI/UX', 'Graphics'] },
        { q: 'Target monthly income?', type: 'text', placeholder: 'e.g. £5000' }
      ],
      geniuzlab_services: [
        { name: 'Programmatic Wireframing', icon: '📐', description: 'Build full site structures in 60 seconds' },
        { name: 'Asset Expansion Hub', icon: '📦', description: 'Turn 1 logo into 50 social assets instantly' },
        { name: 'AI Feedback Buffer', icon: '🛡️', description: 'Pre-screen client feedback for consistency' }
      ],
      meta_title: 'AI Survival Guide for Designers — Build Faster',
      meta_description: 'Master the AI tools that allow you to design 5x faster than your competition'
    }
  },
  {
    name: 'Restaurant Owner',
    slug: 'restaurant-owner',
    price: 69,
    automation_risk: 73,
    industry_data: {
      icon: 'Utensils',
      psychological_title: 'The Autonomous Kitchen Ops',
      fear_title: 'High Margins in a High-Cost World',
      ad_hook: 'Reduce Food Waste and Optimize Staffing with Predict AI',
      pain_points: ['Food waste', 'Rising labor costs', 'Reviews management', 'Staff turnover', 'No-show bookings'],
      industry_tools: ['SevenRooms', 'Toast', 'Resy', 'MarketMan', 'Google Business'],
      avg_revenue_client: '£25-£150',
      onboarding_questions: [
        { q: 'Service type?', options: ['Fast Casual', 'Fine Dining', 'Bar/Bistro'] },
        { q: 'Average weekly covers?', type: 'text', placeholder: 'e.g. 500' }
      ],
      geniuzlab_services: [
        { name: 'Predictive Demand Engine', icon: '📅', description: 'Know your stock levels based on weather and events' },
        { name: 'Review Sentiment Guard', icon: '⭐', description: 'Automated responses that turn negative reviews into 5 stars' },
        { name: 'AI Scheduling Optimizer', icon: '⏰', description: 'Staff based on real-time traffic data, not guesses' }
      ],
      meta_title: 'AI Systems for Restaurants — Maximize Your Margins',
      meta_description: 'Streamline your restaurant operations and reduce costs with predictive AI'
    }
  },
  {
    name: 'Accountant',
    slug: 'accountant',
    price: 99,
    automation_risk: 94,
    industry_data: {
      icon: 'Calculator',
      psychological_title: 'The Zero-Error Ledger',
      fear_title: 'Accountants: Automate or Be Automated',
      ad_hook: 'Master Tax Complexity and Forensic Analysis with AI',
      pain_points: ['Manual data entry', 'Complex tax changes', 'Billable hour trap', 'Client document chasing', 'Compliance risk'],
      industry_tools: ['Xero', 'Dext', 'Karbon', 'Vic.ai', 'Microsoft Flow'],
      avg_revenue_client: '£150-£500 / month',
      onboarding_questions: [
        { q: 'Client niche?', options: ['Small Business', 'Corporate', 'Freelance/Tax'] },
        { q: 'Current billable hours?', type: 'text', placeholder: 'e.g. 40' }
      ],
      geniuzlab_services: [
        { name: 'Anomaly Detection Bot', icon: '🚨', description: 'Find transaction errors that humans miss in seconds' },
        { name: 'Adaptive Tax Parser', icon: '📑', description: 'Scan thousands of pages of law for specific client savings' },
        { name: 'Automated Doc Chaser', icon: '🏃', description: 'AI follows up with clients for receipts until they submit' }
      ],
      meta_title: 'AI Survival Guide for Accountants — Future Proofing',
      meta_description: 'How modern accountants are using AI to eliminate errors and boost client value'
    }
  },
  {
    name: 'Real Estate Agent',
    slug: 'real-estate-agent',
    price: 59,
    automation_risk: 86,
    industry_data: {
      icon: 'Home',
      psychological_title: 'The Property Lead Magnet',
      fear_title: 'Sell Houses While You Sleep',
      ad_hook: 'Master Listing Generation and Lead Nurturing on Autopilot',
      pain_points: ['Low lead conversion', 'Time spent on listings', 'Cold calling fatigue', 'Client follow-ups', 'Market updates'],
      industry_tools: ['Zillow', 'Rightmove', 'KVCore', 'Jasper', 'Chatbase'],
      avg_revenue_client: '£5,000-£50,000',
      onboarding_questions: [
        { q: 'Focus area?', options: ['Residential', 'Commercial', 'Luxury', 'Rentals'] },
        { q: 'Current average listings?', type: 'text', placeholder: 'e.g. 10' }
      ],
      geniuzlab_services: [
        { name: 'Generative Listing Suite', icon: '🏠', description: 'Create SEO-perfect descriptions and floorplans in seconds' },
        { name: 'Lead Nurture AI', icon: '🤖', description: 'Persona-based follow-ups that sound 100% human' },
        { name: 'Neighborhood Pulse Bot', icon: '📈', description: 'Automated market reports for your entire database' }
      ],
      meta_title: 'AI Systems for Real Estate — Sell More Houses',
      meta_description: 'listing generation and lead nurturing systems for modern agents'
    }
  },
  {
    name: 'Dentist',
    slug: 'dentist',
    price: 89,
    automation_risk: 31,
    industry_data: {
      icon: 'PlusSquare',
      psychological_title: 'The Frictionless Practice',
      fear_title: 'The AI-Optimized Dental Practice',
      ad_hook: 'Reduce Phone Traffic by 60% and Increase Patient Lifetime Value',
      pain_points: ['Phone call volume', 'Empty chair gaps', 'Insurance claim delays', 'Patient follow-up', 'Case acceptance rates'],
      industry_tools: ['Dentrix', 'Curve Dental', 'CareStack', 'Pearl AI', 'LocalMed'],
      avg_revenue_client: '£500-£15,000',
      onboarding_questions: [
        { q: 'Practice size?', options: ['Single Surgeon', 'Group Practice', 'Multi-Clinic'] },
        { q: 'Primary growth goal?', options: ['New Patients', 'High-Value Cases', 'Labor Reduction'] }
      ],
      geniuzlab_services: [
        { name: 'AI Receptionist (ARIA)', icon: '📞', description: 'Handles 100% of scheduling calls and basic triaging 24/7' },
        { name: 'Automated Case Follow-up', icon: '🏥', description: 'Personalized text/email nurture for high-value treatment plans' },
        { name: 'Revenue Recovery Bot', icon: '💰', description: 'Finds unscheduled treatments in your DB and reconnects patients' }
      ],
      meta_title: 'AI Systems for Dentists — Optimize Your Practice',
      meta_description: 'Streamline dental operations and patient communication with specialized AI'
    }
  },
  {
    name: 'Personal Trainer',
    slug: 'personal-trainer',
    price: 29,
    automation_risk: 35,
    industry_data: {
      icon: 'Dumbbell',
      psychological_title: 'The Infinite Coach',
      fear_title: 'Scale Your Coaching to 1,000 Clients',
      ad_hook: 'Automate Programs, Nutrition, and Checks-Ins via AI',
      pain_points: ['Trade time for money', 'Repetitive planning', 'Accountability gaps', 'Finding new leads', 'Admin overhead'],
      industry_tools: ['TrueCoach', 'Trainerize', 'MyFitnessPal', 'WhatsApp', 'Notion'],
      avg_revenue_client: '£50-£500 / month',
      onboarding_questions: [
        { q: 'Current client count?', type: 'text', placeholder: 'e.g. 15' },
        { q: 'Coaching style?', options: ['In-person', 'Online only', 'Hybrid'] }
      ],
      geniuzlab_services: [
        { name: 'Program Forge AI', icon: '🏋️', description: 'Generate 4-week custom blocks based on client biometric data' },
        { name: 'The Ghost Coach Bot', icon: '👻', description: 'Automated WhatsApp check-ins that feel personal and timely' },
        { name: 'Lead Generation Funnel', icon: '🧲', description: 'AI content engine that populates your social with fitness value' }
      ],
      meta_title: 'AI Survival Guide for PTs — Scale to 10k/Month',
      meta_description: 'Turn your personal training business into an automated coaching machine'
    }
  },
  {
    name: 'Hotel Owner',
    slug: 'hotel-owner',
    price: 129,
    automation_risk: 68,
    industry_data: {
      icon: 'Hotel',
      psychological_title: 'The Invisible Concierge',
      fear_title: 'The Direct-Booking Revolution',
      ad_hook: 'Beat the OTAs and Maximize Occupancy with Hospitality AI',
      pain_points: ['High OTA commissions', 'Labor shortages', 'Guest communication gaps', 'Dynamic pricing errors', 'Review management'],
      industry_tools: ['Cloudbeds', 'Mews', 'RevenueManagement.ai', 'WhatsApp Business', 'Revinate'],
      avg_revenue_client: '£100-£500 / night',
      onboarding_questions: [
        { q: 'Property size?', options: ['Boutique (1-10)', 'Mid-size (11-50)', 'Large (50+)'] },
        { q: 'Main booking source?', options: ['Expedia/Booking.com', 'Direct Website', 'Walk-ins'] }
      ],
      geniuzlab_services: [
        { name: 'OTA Diversion Engine', icon: '🚫', description: 'Convert OTA lookers into direct bookers via AI incentives' },
        { name: '24/7 Guest AI Agent', icon: '🛎️', description: 'Answers all guest FAQs instantly via WhatsApp/Webchat' },
        { name: 'Dynamic Yield Predictor', icon: '📊', description: 'Adjust room rates in real-time based on local events' }
      ],
      meta_title: 'AI Systems for Hotel Owners — Reclaim Direct Bookings',
      meta_description: 'Maximize your hotel revenue and guest satisfaction with hospitality AI'
    }
  },
  {
    name: 'Florist',
    slug: 'florist',
    price: 39,
    automation_risk: 61,
    industry_data: {
      icon: 'Flower2',
      psychological_title: 'The Perpetual Bloom System',
      fear_title: 'Fresher Flowers, Faster Bookings',
      ad_hook: 'Reduce Flower Waste and Master Wedding Inquiry Logic',
      pain_points: ['Wasted inventory', 'Inquiry overload', 'Holiday delivery chaos', 'Marketing fatigue', 'Portfolio updates'],
      industry_tools: ['Shopify', 'BloomNation', 'Instagram', 'Canva', 'WhatsApp'],
      avg_revenue_client: '£50-£5,000',
      onboarding_questions: [
        { q: 'Core business?', options: ['Daily Delivery', 'Weddings/Events', 'Subscriptions'] },
        { q: 'Biggest waste area?', options: ['Stock/Spoilage', 'Admin Time', 'Ad Spend'] }
      ],
      geniuzlab_services: [
        { name: 'Inventory Freshness Bot', icon: '🌸', description: 'Predictive buying based on seasonal trend data' },
        { name: 'Wedding Prospect Triage', icon: '💍', description: 'Qualify high-value event leads while you arrange bouquets' },
        { name: 'Auto-Portfolio Publisher', icon: '📸', description: 'AI takes your raw flower photos and makes them social-ready' }
      ],
      meta_title: 'AI Survival Guide for Florists — Stop The Waste',
      meta_description: 'How modern florists are using AI to manage inventory and wedding leads'
    }
  },
  {
    name: 'Lawyer',
    slug: 'lawyer',
    price: 149,
    automation_risk: 23,
    industry_data: {
      icon: 'Briefcase',
      psychological_title: 'The Synthetic Associate',
      fear_title: "Lawyers: Don't Get Replaced, Get Augmented",
      ad_hook: 'Cut Research Time by 90% and Master Precise Document Drafting',
      pain_points: ['Research fatigue', 'Document drafting time', 'Billable hour limits', 'Lead qualification', 'Admin overhead'],
      industry_tools: ['Clio', 'CoCounsel', 'Luminance', 'Ironclad', 'ChatPDF'],
      avg_revenue_client: '£250-£1,000 / hour',
      onboarding_questions: [
        { q: 'Practice area?', options: ['Corporate', 'Litigation', 'Family', 'Real Estate'] },
        { q: 'Average hours on research?', type: 'text', placeholder: 'e.g. 10' }
      ],
      geniuzlab_services: [
        { name: 'Neural Research Assistant', icon: '⚖️', description: 'Find relevant case law across 50 years in 30 seconds' },
        { name: 'Zero-Draft Engine', icon: '📝', description: 'Generate the first 80% of any contract or brief via AI' },
        { name: 'Lead Logic Triage', icon: '🎯', description: 'Screen potential clients for case viability automatically' }
      ],
      meta_title: 'AI Survival Guide for Lawyers — Research in Seconds',
      meta_description: 'The definitive guide to AI tools and workflows for modern legal practices'
    }
  },
  {
    name: 'Nurse',
    slug: 'nurse',
    price: 29,
    automation_risk: 29,
    industry_data: {
      icon: 'HeartPulse',
      psychological_title: 'The Fatigue Shield',
      fear_title: 'Reclaim the Care in Healthcare',
      ad_hook: 'Reduce Charting Time and Optimize Your Shift Schedule',
      pain_points: ['Charting burnout', 'Scheduling conflicts', 'Information overload', 'Continuing education', 'Physical fatigue'],
      industry_tools: ['Epic', 'Cerner', 'Medscape', 'ShiftKey', 'Scribe AI'],
      avg_revenue_client: 'Career Longevity / Wellness',
      onboarding_questions: [
        { q: 'Nursing specialty?', options: ['ER/ICU', 'Ward', 'Community', 'Private'] },
        { q: 'Hours spent charting?', type: 'text', placeholder: 'e.g. 3 per shift' }
      ],
      geniuzlab_services: [
        { name: 'Voice-to-Chart AI', icon: '🎤', description: 'Narrate your notes and let AI format them into clinical standards' },
        { name: 'Shift Optimizer Bot', icon: '📅', description: 'Trade and manage shifts with zero admin friction' },
        { name: 'Knowledge Synthesis Hub', icon: '🧠', description: 'Stay current on protocols with 2-minute AI summaries' }
      ],
      meta_title: 'AI Survival Guide for Nurses — Beat Charting Burnout',
      meta_description: 'How nurses are using AI to spend less time on screens and more time on care'
    }
  },
  {
    name: 'Plumber',
    slug: 'plumber',
    price: 49,
    automation_risk: 65,
    industry_data: {
      icon: 'Droplets',
      psychological_title: 'The Service Flow Engine',
      fear_title: 'Better Quotes, Zero Missed Calls',
      ad_hook: 'Stop losing £1,500/month to missed office calls',
      pain_points: ['Missed calls while on site', 'Quoting delay', 'Parts inventory', 'Marketing themselves', 'Route optimization'],
      industry_tools: ['ServiceTitan', 'Fergus', 'Jobber', 'QuickBooks', 'WhatsApp'],
      avg_revenue_client: '£150-£5,000',
      onboarding_questions: [
        { q: 'Business type?', options: ['Solo Operator', 'Small Fleet (2-5)', 'Large Team'] },
        { q: 'Biggest growth hurdle?', options: ['Getting more calls', 'Managing admin', 'Staffing'] }
      ],
      geniuzlab_services: [
        { name: 'AI Dispatcher (ARIA)', icon: '🔧', description: 'Answers every missed call and books the job into your calendar' },
        { name: 'Photo-to-Quote Engine', icon: '📷', description: 'Customer sends a photo; AI provides an initial range' },
        { name: 'The Review Generator', icon: '⭐', description: 'Automated text after every job that keeps you at 5 stars' }
      ],
      meta_title: 'AI Systems for Plumbers — Never Miss A Call Again',
      meta_description: 'Automate your plumbing business from booking to review with specialized AI'
    }
  },
  {
    name: 'Electrician',
    slug: 'electrician',
    price: 49,
    automation_risk: 63,
    industry_data: {
      icon: 'Zap',
      psychological_title: 'The High-Voltage Ops',
      fear_title: 'Safety, Speed, and Scale',
      ad_hook: 'Reduce admin hours by 12 per week per van',
      pain_points: ['Compliance paperwork', 'Parts sourcing', 'Quote accuracy', 'Late payments', 'Marketing'],
      industry_tools: ['Simpro', 'ServiceM8', 'Wholesale Marketplaces', 'Xero', 'WhatsApp'],
      avg_revenue_client: '£200-£10,000',
      onboarding_questions: [
        { q: 'Project focus?', options: ['Domestic', 'Industrial', 'Solar/Renewables'] },
        { q: 'Monthly turnover goal?', type: 'text', placeholder: 'e.g. £10,000' }
      ],
      geniuzlab_services: [
        { name: 'Automated Compliance Hub', icon: '📝', description: 'Generate safety certificates and reports in 30 seconds' },
        { name: 'Smart Inventory Sourcing', icon: '🔌', description: 'Find the cheapest/fastest parts across 5 wholesalers instantly' },
        { name: 'Invoice Chaser AI', icon: '💸', description: 'Polite but firm follow-ups that get your bills paid 40% faster' }
      ],
      meta_title: 'AI Systems for Electricians — Scale Your Trade',
      meta_description: 'Master the AI tools that handle your compliance, inventory, and invoices'
    }
  },
  {
    name: 'Marketing Manager',
    slug: 'marketing-manager',
    price: 69,
    automation_risk: 61,
    industry_data: {
      icon: 'Megaphone',
      psychological_title: 'The Omni-Channel Engine',
      fear_title: 'Marketing in the Age of Synthesis',
      ad_hook: 'Produce 10x more content with the same marketing budget',
      pain_points: ['Content saturation', 'Data fatigue', 'Proving ROI to clients', 'Endless meetings', 'Rapid platform changes'],
      industry_tools: ['HubSpot', 'AdCreative.ai', 'Copy.ai', 'Supermetrics', 'Brandmark'],
      avg_revenue_client: '£2,000-£20,000 / month',
      onboarding_questions: [
        { q: 'Marketing focus?', options: ['SEO/Content', 'Paid Ads', 'Brand Strategy', 'Full Stack'] },
        { q: 'Current team size?', type: 'text', placeholder: 'e.g. 5' }
      ],
      geniuzlab_services: [
        { name: 'Synthetic Creative Studio', icon: '🎨', description: 'Generate 1,000 ad variations with 1 click' },
        { name: 'The Sentiment Sentry', icon: '🕵️', description: 'Monitor all brand mentions and respond using AI brand voice' },
        { name: 'Programmatic SEO Engine', icon: '🚀', description: 'Publish 50 high-quality niche articles every week automatically' }
      ],
      meta_title: 'AI Survival Guide for Marketers — The Synthesis Era',
      meta_description: 'Learn how elite marketing managers are using AI to dominate their niches'
    }
  },
  {
    name: 'Virtual Assistant',
    slug: 'virtual-assistant',
    price: 29,
    automation_risk: 70,
    industry_data: {
      icon: 'UserCircle',
      psychological_title: 'The Augmented Executive',
      fear_title: 'VAs: 10x Your Productivity and Your Rates',
      ad_hook: 'Increase your effective hourly rate by 400%',
      pain_points: ['Low hourly rates', 'Repetitive tasks', 'Communication overload', 'Finding premium clients', 'Tools fatigue'],
      industry_tools: ['Zapier', 'Otter.ai', 'ChatGPT', 'Trello', 'Slack'],
      avg_revenue_client: '£15-£50 / hour',
      onboarding_questions: [
        { q: 'Current hourly rate?', type: 'text', placeholder: 'e.g. £20' },
        { q: 'Core service?', options: ['Admin', 'Social Media', 'Customer Service', 'Technical'] }
      ],
      geniuzlab_services: [
        { name: 'Workflow Automation Suite', icon: '⚙️', description: "Build 'Set & Forget' systems for every client you have" },
        { name: 'The Message Filter', icon: '📥', description: "AI sorts and drafts your client's entire inbox highlights" },
        { name: 'Resource Synthesis Hub', icon: '📊', description: 'Turn 1 hour of meeting audio into 5 action lists instantly' }
      ],
      meta_title: 'AI Survival Guide for VAs — From Tasker to Specialist',
      meta_description: 'How virtual assistants are using AI to handle 5x the clients with less effort'
    }
  },
  {
    name: 'Copywriter',
    slug: 'copywriter',
    price: 49,
    automation_risk: 55,
    industry_data: {
      icon: 'PenTool',
      psychological_title: 'The Persuasion Logic',
      fear_title: 'Write Copy That Converts, or AI Will',
      ad_hook: 'Go from research to final draft 5x faster',
      pain_points: ['Blank page syndrome', 'Low-cost AI competition', 'Endless research', 'Maintaining voice', 'Revisions'],
      industry_tools: ['Jasper', 'Claude', 'Grammarly', 'Hemingway', 'Ahrefs'],
      avg_revenue_client: '£250-£5,000',
      onboarding_questions: [
        { q: 'Copy focus?', options: ['Direct Response', 'Blog/Content', 'Email', 'Social'] },
        { q: 'Current project backlog?', type: 'text', placeholder: 'e.g. 3' }
      ],
      geniuzlab_services: [
        { name: 'Brand Voice Clone', icon: '👥', description: 'Train AI to write exactly like you (or your client)' },
        { name: 'Research Synthesis Hub', icon: '🧬', description: 'Extract 50 hooks from a 20-page transcript instantly' },
        { name: 'The Multi-Variant Engine', icon: '🔀', description: 'Generate 30 subject lines and 10 hooks in seconds' }
      ],
      meta_title: 'AI Survival Guide for Copywriters — Future of Writing',
      meta_description: 'How to use AI to write high-converting copy without losing your human edge'
    }
  },
  {
    name: 'Social Media Manager',
    slug: 'social-media-manager',
    price: 49,
    automation_risk: 58,
    industry_data: {
      icon: 'Share2',
      psychological_title: 'The Viral Momentum Engine',
      fear_title: 'Post More, Care Less, Grow Faster',
      ad_hook: 'Manage 3x more clients with half the screen time',
      pain_points: ['Constant algorithm changes', 'Creating daily content', 'Community management', 'Trend fatigue', 'Client reporting'],
      industry_tools: ['Canva', 'Later', 'Metricool', 'InVideo', 'CapCut'],
      avg_revenue_client: '£500-£3,000 / month',
      onboarding_questions: [
        { q: 'Primary platform?', options: ['Instagram', 'LinkedIn', 'TikTok', 'X'] },
        { q: 'Clients managed?', type: 'text', placeholder: 'e.g. 5' }
      ],
      geniuzlab_services: [
        { name: 'The Viral Scanner', icon: '📈', description: 'AI predicts which trends are about to explode in your niche' },
        { name: 'Batch Content Forge', icon: '🔨', description: 'Turn 1 video into 30 days of multi-format social content' },
        { name: 'Auto-Community Manager', icon: '💬', description: 'AI responds to comments using safe, pre-defined brand logic' }
      ],
      meta_title: 'AI Survival Guide for Social Managers — Scale Growth',
      meta_description: 'The proven AI workflows for social media management and growth'
    }
  },
  {
    name: 'Chef',
    slug: 'chef',
    price: 49,
    automation_risk: 43,
    industry_data: {
      icon: 'ChefHat',
      psychological_title: 'The Culinary Logic',
      fear_title: 'Master Your Menu, Minimize Your Waste',
      ad_hook: 'Cut food prep errors by 40% with better documentation',
      pain_points: ['Recipe consistency', 'Food cost variance', 'Supplier pricing', 'Staff training', 'Menu innovation fatigue'],
      industry_tools: ['Apicbase', 'MarketMan', 'ChatGPT', 'Pinterest', 'Google Sheets'],
      avg_revenue_client: 'Career Equity / Business Profit',
      onboarding_questions: [
        { q: 'Kitchen role?', options: ['Head Chef', 'Private Chef', 'Pastry/Specialty'] },
        { q: 'Biggest kitchen stress?', options: ['Costing', 'Inconsistency', 'Time'] }
      ],
      geniuzlab_services: [
        { name: 'AI Recipe Developer', icon: '🍳', description: 'Generate innovative pairings based on seasonal ingredient surplus' },
        { name: 'Dynamic Food Costing', icon: '🏷️', description: 'Real-time updates to your menu margins as supplier prices change' },
        { name: 'Standard Operating Bot', icon: '🤖', description: 'AI generates visual training manuals for staff in seconds' }
      ],
      meta_title: 'AI Survival Guide for Chefs — Engineering The Kitchen',
      meta_description: 'How modern chefs are using AI to optimize menus and reduce food costs'
    }
  }
]

async function seed() {
  console.log('Seeding professions...')
  const { error } = await supabase
    .from('professions')
    .upsert(PROFESSIONS, { onConflict: 'slug' })
  
  if (error) {
    console.error('Error seeding professions:', error)
  } else {
    console.log('✅ 20 professions seeded')
  }
}

seed()
