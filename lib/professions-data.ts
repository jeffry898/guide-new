export const PROFESSIONS = [
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
    }
  },
  {
    name: 'Financial Analyst',
    slug: 'financial-analyst',
    price: 89,
    automation_risk: 82,
    industry_data: {
      icon: 'BarChart3',
      psychological_title: 'The Algorithmic Capital Protocol',
      fear_title: 'Excel Models Are Being Automated 10x Faster by AI',
      ad_hook: 'Automate financial modeling, forecasting, and earnings reports in seconds',
      pain_points: ['Manual spreadsheet modeling', 'Data extraction lag', 'Quarterly report crunch', 'Regulatory updates'],
      industry_tools: ['Bloomberg Terminal', 'Excel', 'Python', 'FactSet', 'ChatGPT Enterprise'],
      avg_revenue_client: '£75,000 - £150,000 Salary / Fee',
      onboarding_questions: [
        { q: 'Primary focus?', options: ['Corporate Finance', 'Investment Banking', 'Asset Management'] },
        { q: 'Hours spent on Excel weekly?', type: 'text', placeholder: 'e.g. 25 hours' }
      ],
      geniuzlab_services: [
        { name: 'AI Financial Model Generator', icon: '📊', description: 'Build 3-statement financial models automatically' },
        { name: 'Earnings Call Synthesizer', icon: '🎙️', description: 'Extract sentiment & key KPIs from 100-page earnings transcripts' }
      ],
      meta_title: 'AI Survival Guide for Financial Analysts — 2026 Edition',
      meta_description: 'How financial analysts are using AI to build models 10x faster'
    }
  },
  {
    name: 'Software Engineer',
    slug: 'software-engineer',
    price: 99,
    automation_risk: 65,
    industry_data: {
      icon: 'Code',
      psychological_title: 'The AI System Architect Blueprint',
      fear_title: 'Code Generation Is Free: Modern Engineers Must Architect Systems',
      ad_hook: 'Shift from syntax writer to AI system orchestrator and 10x your output',
      pain_points: ['Legacy code refactoring', 'Boilerplate overhead', 'Bug hunting', 'System design pressure'],
      industry_tools: ['GitHub Copilot', 'Cursor', 'Claude 3.5 Sonnet', 'Docker', 'PostgreSQL'],
      avg_revenue_client: '£80,000 - £180,000 Salary',
      onboarding_questions: [
        { q: 'Primary stack?', options: ['Fullstack TS/React', 'Python/Backend', 'DevOps/Cloud'] }
      ],
      geniuzlab_services: [
        { name: 'Autonomous Coding Pipeline', icon: '⚡', description: 'Deploy self-testing AI coding agents' }
      ],
      meta_title: 'AI Survival Guide for Software Engineers — 2026 Architecture',
      meta_description: 'How software developers leverage AI agents for system design'
    }
  },
  {
    name: 'Data Scientist',
    slug: 'data-scientist',
    price: 99,
    automation_risk: 72,
    industry_data: {
      icon: 'Database',
      psychological_title: 'The Neural Pipeline Engine',
      fear_title: 'AutoML Is Replacing Manual Model Tuning',
      ad_hook: 'Build production ML pipelines and LLM apps in days instead of months',
      pain_points: ['Data cleaning bottleneck', 'Model deployment lag', 'Stakeholder reporting'],
      industry_tools: ['Python', 'PyTorch', 'Databricks', 'Snowflake', 'LangChain'],
      avg_revenue_client: '£90,000 - £160,000 Salary',
      onboarding_questions: [
        { q: 'Primary domain?', options: ['LLMs & RAG', 'Computer Vision', 'Predictive Analytics'] }
      ],
      geniuzlab_services: [
        { name: 'RAG Pipeline Builder', icon: '🧠', description: 'Deploy enterprise search & vector retrieval systems' }
      ],
      meta_title: 'AI Survival Guide for Data Scientists — 2026 Pipeline',
      meta_description: 'Transform from model trainer to enterprise AI system architect'
    }
  },
  {
    name: 'HR Manager',
    slug: 'hr-manager',
    price: 59,
    automation_risk: 58,
    industry_data: {
      icon: 'Users',
      psychological_title: 'The People Intelligence Engine',
      fear_title: 'Automate Onboarding, Compliance, & Screenings 24/7',
      ad_hook: 'Reduce hiring overhead by 60% with AI applicant screening',
      pain_points: ['Resume screening overload', 'Policy documentation', 'Employee onboarding friction'],
      industry_tools: ['Workday', 'BambooHR', 'Greenhouse', 'Notion AI', 'ChatGPT'],
      avg_revenue_client: '£55,000 - £95,000 Salary',
      onboarding_questions: [
        { q: 'Company size?', options: ['1-50', '51-200', '200+'] }
      ],
      geniuzlab_services: [
        { name: 'AI Resume Ranker', icon: '📄', description: 'Screen 500 applicants against exact role criteria in 60 seconds' }
      ],
      meta_title: 'AI Survival Guide for HR Managers — 2026 Hiring Automation',
      meta_description: 'Automate talent acquisition and HR compliance using modern AI'
    }
  },
  {
    name: 'Architect',
    slug: 'architect',
    price: 89,
    automation_risk: 42,
    industry_data: {
      icon: 'Compass',
      psychological_title: 'The Generative Structural Logic',
      fear_title: 'Generative BIM & AI Rendering Are Reshaping Architecture',
      ad_hook: 'Turn sketches into 8K photorealistic renders and CAD models in seconds',
      pain_points: ['Rendering wait times', 'Client revision cycles', 'Zoning & building code compliance'],
      industry_tools: ['Revit', 'Rhino', 'Midjourney', 'LookX AI', 'AutoCAD'],
      avg_revenue_client: '£5,000 - £50,000 Project Fee',
      onboarding_questions: [
        { q: 'Focus area?', options: ['Residential', 'Commercial', 'Urban Planning'] }
      ],
      geniuzlab_services: [
        { name: 'Generative Render Engine', icon: '🏛️', description: 'Convert floor plans into 8K 3D renders instantly' }
      ],
      meta_title: 'AI Survival Guide for Architects — Generative Design 2026',
      meta_description: 'How top architects use AI for rapid conceptualization and rendering'
    }
  },
  {
    name: 'Graphic Designer',
    slug: 'graphic-designer',
    price: 49,
    automation_risk: 68,
    industry_data: {
      icon: 'Palette',
      psychological_title: 'The Creative Synthesis Engine',
      fear_title: 'Move Beyond Canvas Design: Become a Creative Director',
      ad_hook: 'Scale from single assets to 100-page brand systems using AI vector generation',
      pain_points: ['Client micro-revisions', 'Asset resizing fatigue', 'Stock photo costs'],
      industry_tools: ['Photoshop', 'Figma', 'Midjourney', 'Kling AI', 'Illustrator'],
      avg_revenue_client: '£1,000 - £10,000 Brand Fee',
      onboarding_questions: [
        { q: 'Design focus?', options: ['Brand Identity', 'UI/UX', 'Marketing Assets'] }
      ],
      geniuzlab_services: [
        { name: 'AI Brand System Engine', icon: '🎨', description: 'Generate multi-platform ad creative variations in 1-click' }
      ],
      meta_title: 'AI Survival Guide for Graphic Designers — 2026 Edition',
      meta_description: 'How graphic designers leverage generative AI to 5x client output'
    }
  },
  {
    name: 'Executive Assistant',
    slug: 'executive-assistant',
    price: 39,
    automation_risk: 78,
    industry_data: {
      icon: 'Briefcase',
      psychological_title: 'The Executive Command Protocol',
      fear_title: 'AI Agents Are Taking Over Calendar & Travel Management',
      ad_hook: 'Become an indispensable Chief of Staff by managing AI executive bots',
      pain_points: ['Inbox overflow', 'Complex scheduling conflicts', 'Meeting transcript synthesis'],
      industry_tools: ['Google Calendar', 'Superhuman', 'Otter.ai', 'Notion', 'ChatGPT'],
      avg_revenue_client: '£40,000 - £80,000 Salary',
      onboarding_questions: [
        { q: 'Executive count supported?', options: ['1 C-Suite', '2-3 Executives', 'Team'] }
      ],
      geniuzlab_services: [
        { name: 'Autonomous Inbox Triage', icon: '📥', description: 'Draft 90% of email replies using executive tone' }
      ],
      meta_title: 'AI Survival Guide for Executive Assistants — 2026 Command',
      meta_description: 'Transform from scheduling assistant to AI-powered Chief of Staff'
    }
  },
  {
    name: 'Project Manager',
    slug: 'project-manager',
    price: 79,
    automation_risk: 61,
    industry_data: {
      icon: 'Kanban',
      psychological_title: 'The Predictive Execution Engine',
      fear_title: 'Automate Status Reports & Risk Tracking Instantly',
      ad_hook: 'Eliminate 80% of manual Jira/Asana updates with AI project agents',
      pain_points: ['Status meeting fatigue', 'Scope creep detection', 'Resource allocation lag'],
      industry_tools: ['Jira', 'Asana', 'Monday.com', 'Notion AI', 'Slack AI'],
      avg_revenue_client: '£65,000 - £120,000 Salary',
      onboarding_questions: [
        { q: 'Methodology?', options: ['Agile/Scrum', 'Waterfall', 'Hybrid'] }
      ],
      geniuzlab_services: [
        { name: 'AI Status Report Generator', icon: '📝', description: 'Auto-synthesize weekly progress from Slack & commits' }
      ],
      meta_title: 'AI Survival Guide for Project Managers — 2026 Blueprint',
      meta_description: 'How project managers use predictive AI to eliminate status meetings'
    }
  },
  {
    name: 'Paralegal',
    slug: 'paralegal',
    price: 69,
    automation_risk: 89,
    industry_data: {
      icon: 'Scale',
      psychological_title: 'The Case Research Engine',
      fear_title: 'Document Review & Contract Discovery Are 90% Automated',
      ad_hook: 'Review 500-page case files and extract precedent in under 3 minutes',
      pain_points: ['Contract discovery grind', 'Citation formatting', 'Filing deadline stress'],
      industry_tools: ['LexisNexis', 'Westlaw', 'Harvey AI', 'Casetext', 'Microsoft Word'],
      avg_revenue_client: '£45,000 - £75,000 Salary',
      onboarding_questions: [
        { q: 'Legal practice area?', options: ['Corporate', 'Litigation', 'Real Estate'] }
      ],
      geniuzlab_services: [
        { name: 'Contract Redline Bot', icon: '📜', description: 'Flag risky clauses & draft revisions in 30 seconds' }
      ],
      meta_title: 'AI Survival Guide for Paralegals — Legal Automation 2026',
      meta_description: 'Discover how top paralegals use AI for instant legal research'
    }
  },
  {
    name: 'Translator',
    slug: 'translator',
    price: 39,
    automation_risk: 91,
    industry_data: {
      icon: 'Globe',
      psychological_title: 'The Cultural Localization Engine',
      fear_title: 'Raw Translation Is Free: Pivot to Cultural Localization & AI Supervision',
      ad_hook: 'Loculate 50,000 words a day with human nuance and AI speed',
      pain_points: ['Price per word collapse', 'MTPE fatigue', 'Tight turnarounds'],
      industry_tools: ['DeepL', 'Trados', 'MemSource', 'Claude 3.5', 'ChatGPT Enterprise'],
      avg_revenue_client: '£30,000 - £70,000 Income',
      onboarding_questions: [
        { q: 'Language pairs?', type: 'text', placeholder: 'e.g. EN -> DE, ES, FR' }
      ],
      geniuzlab_services: [
        { name: 'Cultural Nuance Tuner', icon: '🌐', description: 'Adapt AI translations for exact regional idioms' }
      ],
      meta_title: 'AI Survival Guide for Translators — 2026 Localization Engine',
      meta_description: 'How translators pivot to high-paid AI localization specialists'
    }
  },
  {
    name: 'Cybersecurity Analyst',
    slug: 'cybersecurity-analyst',
    price: 99,
    automation_risk: 35,
    industry_data: {
      icon: 'Shield',
      psychological_title: 'The Neural Defense Protocol',
      fear_title: 'AI-Driven Cyber Threats Demand AI Defense Engines',
      ad_hook: 'Automate SOC log triage, threat hunting, and incident response in real time',
      pain_points: ['Alert fatigue', 'False positive overload', 'Zero-day vulnerability velocity'],
      industry_tools: ['Splunk', 'CrowdStrike', 'Wireshark', 'Python', 'ChatGPT Enterprise'],
      avg_revenue_client: '£85,000 - £160,000 Salary',
      onboarding_questions: [
        { q: 'Security domain?', options: ['SOC Triage', 'Penetration Testing', 'Cloud Security'] }
      ],
      geniuzlab_services: [
        { name: 'AI Threat Triage Engine', icon: '🛡️', description: 'Filter 10,000 SIEM alerts per minute automatically' }
      ],
      meta_title: 'AI Survival Guide for Cybersecurity Analysts — 2026 Defense',
      meta_description: 'Automate SOC log analysis and threat hunting using AI'
    }
  },
  {
    name: 'Content Creator',
    slug: 'content-creator',
    price: 39,
    automation_risk: 49,
    industry_data: {
      icon: 'Video',
      psychological_title: 'The Multi-Platform Media Engine',
      fear_title: 'Turn 1 Video into 50 Pieces of Content Instantly',
      ad_hook: 'Automate scriptwriting, editing workflows, and multi-channel publishing',
      pain_points: ['Content burnout', 'Editing bottleneck', 'Multi-platform adaptation'],
      industry_tools: ['Premiere Pro', 'Descript', 'Midjourney', 'CapCut', 'ChatGPT'],
      avg_revenue_client: '£30,000 - £150,000+ Revenue',
      onboarding_questions: [
        { q: 'Primary channel?', options: ['YouTube', 'TikTok/Instagram', 'Newsletter/Blog'] }
      ],
      geniuzlab_services: [
        { name: 'AI Script & Repurposer', icon: '🎬', description: 'Convert long videos into viral short scripts in seconds' }
      ],
      meta_title: 'AI Survival Guide for Content Creators — 2026 Media Scaling',
      meta_description: 'How top creators leverage AI to scale content 10x with zero burnout'
    }
  },
  {
    name: 'Talent Recruiter',
    slug: 'recruiter',
    price: 59,
    automation_risk: 76,
    industry_data: {
      icon: 'Users',
      psychological_title: 'The Executive Sourcing Engine',
      fear_title: 'Sourcing & Cold Outreach Are Being Automated by AI Bots',
      ad_hook: 'Source, qualify, and message 200 passive candidates per day automatically',
      pain_points: ['Low candidate response rates', 'Manual LinkedIn Recruiter boolean searches', 'Candidate ghosting'],
      industry_tools: ['LinkedIn Recruiter', 'Greenhouse', 'Interseller', 'ChatGPT', 'Apollo.io'],
      avg_revenue_client: '£5,000 - £25,000 Placement Fee',
      onboarding_questions: [
        { q: 'Recruiting sector?', options: ['Tech/Engineering', 'Finance/Legal', 'Healthcare'] }
      ],
      geniuzlab_services: [
        { name: 'AI Candidate Outreach Bot', icon: '✉️', description: 'Send hyper-personalized outreach that converts at 35%' }
      ],
      meta_title: 'AI Survival Guide for Recruiters — 2026 Sourcing Engine',
      meta_description: 'Automate candidate sourcing and outreach with higher response rates'
    }
  },
  {
    name: 'Supply Chain Manager',
    slug: 'supply-chain-manager',
    price: 79,
    automation_risk: 64,
    industry_data: {
      icon: 'Truck',
      psychological_title: 'The Autonomous Logistics Engine',
      fear_title: 'Predict Inventory Bottlenecks Before They Cause Delays',
      ad_hook: 'Automate inventory forecasting, supplier tracking, and freight routing',
      pain_points: ['Inventory stockouts', 'Supplier delay friction', 'Freight cost volatility'],
      industry_tools: ['SAP SCM', 'Oracle SCM', 'Excel', 'Python', 'ChatGPT'],
      avg_revenue_client: '£70,000 - £130,000 Salary',
      onboarding_questions: [
        { q: 'Supply chain scale?', options: ['Regional', 'National', 'Global Multi-tier'] }
      ],
      geniuzlab_services: [
        { name: 'Predictive Stock Forecasting', icon: '📦', description: 'Forecast demand volatility 60 days in advance' }
      ],
      meta_title: 'AI Survival Guide for Supply Chain Managers — 2026 Logistics',
      meta_description: 'How logistics leaders use predictive AI to eliminate stockouts'
    }
  },
  {
    name: 'Veterinarian',
    slug: 'veterinarian',
    price: 89,
    automation_risk: 22,
    industry_data: {
      icon: 'HeartPulse',
      psychological_title: 'The Clinical Diagnostic Assistant',
      fear_title: 'Automate Medical Charting & Client Follow-Ups Instantly',
      ad_hook: 'Reclaim 10 hours a week from SOAP note drafting and lab review',
      pain_points: ['SOAP note paperwork', 'Client phone triage overload', 'Diagnostic review lag'],
      industry_tools: ['eVetPractice', 'Cornerstone', 'ChatGPT Enterprise', 'Otter.ai'],
      avg_revenue_client: '£60,000 - £110,000 Salary',
      onboarding_questions: [
        { q: 'Practice type?', options: ['Small Animal', 'Equine/Livestock', 'Specialty Surgical'] }
      ],
      geniuzlab_services: [
        { name: 'AI SOAP Note Scribe', icon: '📋', description: 'Draft comprehensive clinical notes from ambient audio in seconds' }
      ],
      meta_title: 'AI Survival Guide for Veterinarians — Clinical Efficiency 2026',
      meta_description: 'Automate vet clinical notes and client triage with AI scribes'
    }
  },
  {
    name: 'Physiotherapist',
    slug: 'physiotherapist',
    price: 49,
    automation_risk: 25,
    industry_data: {
      icon: 'Activity',
      psychological_title: 'The Biometric Rehab Protocol',
      fear_title: 'Generate Personalized Home Exercise Programs in 30 Seconds',
      ad_hook: 'Boost patient adherence by 50% with AI video rehab plans',
      pain_points: ['Patient compliance dropoff', 'Manual documentation', 'Home exercise plan creation'],
      industry_tools: ['Physiotec', 'Cliniko', 'ChatGPT', 'Canva'],
      avg_revenue_client: '£45,000 - £85,000 Income',
      onboarding_questions: [
        { q: 'Specialty?', options: ['Sports Rehab', 'Orthopedic', 'Neurological'] }
      ],
      geniuzlab_services: [
        { name: 'AI Rehab Plan Generator', icon: '🏃‍♂️', description: 'Generate custom exercise protocols with video guidance' }
      ],
      meta_title: 'AI Survival Guide for Physiotherapists — 2026 Rehab Tech',
      meta_description: 'Automate rehab documentation and boost patient adherence with AI'
    }
  },
  {
    name: 'Fitness Coach',
    slug: 'fitness-coach',
    price: 39,
    automation_risk: 32,
    industry_data: {
      icon: 'Dumbbell',
      psychological_title: 'The High-Performance Scaling Engine',
      fear_title: 'Scale From 20 to 200 Clients Without Burnout',
      ad_hook: 'Automate meal plans, workout logging, and check-ins with AI assistants',
      pain_points: ['Client check-in fatigue', 'Macro plan creation time', 'Client churn'],
      industry_tools: ['Trainerize', 'MyFitnessPal', 'WhatsApp', 'ChatGPT'],
      avg_revenue_client: '£150 - £600 / month per client',
      onboarding_questions: [
        { q: 'Coaching format?', options: ['Online 1-on-1', 'In-Person Gym', 'Group Fitness'] }
      ],
      geniuzlab_services: [
        { name: 'AI Client Check-in Assistant', icon: '💪', description: 'Analyze client weekly data & draft feedback in 10 seconds' }
      ],
      meta_title: 'AI Survival Guide for Fitness Coaches — 2026 Client Scaling',
      meta_description: 'How online fitness coaches use AI to scale client capacity 5x'
    }
  },
  {
    name: 'Tax Consultant',
    slug: 'tax-consultant',
    price: 99,
    automation_risk: 88,
    industry_data: {
      icon: 'Calculator',
      psychological_title: 'The Tax Code Synthesis Protocol',
      fear_title: 'Automate Tax Prep & Deduction Discovery Instantly',
      ad_hook: 'Scan tax filings, find hidden deductions, and draft audit responses in minutes',
      pain_points: ['Tax code complexity', 'Tax season 80-hour work weeks', 'Manual receipt audit'],
      industry_tools: ['Drake Tax', 'UltraTax CS', 'Excel', 'ChatGPT Enterprise'],
      avg_revenue_client: '£800 - £5,000 per filing',
      onboarding_questions: [
        { q: 'Client focus?', options: ['Individual High-Net-Worth', 'Corporate/SMB', 'International Tax'] }
      ],
      geniuzlab_services: [
        { name: 'AI Deduction Discovery Bot', icon: '🧾', description: 'Scan 100 bank statements & extract valid deductions automatically' }
      ],
      meta_title: 'AI Survival Guide for Tax Consultants — 2026 Automation',
      meta_description: 'Automate tax return prep and deduction analysis using AI'
    }
  },
  {
    name: 'Mortgage Broker',
    slug: 'mortgage-broker',
    price: 69,
    automation_risk: 81,
    industry_data: {
      icon: 'Home',
      psychological_title: 'The Underwriting Speed Engine',
      fear_title: 'AI Underwriting Bots Are Processing Loans in 60 Seconds',
      ad_hook: 'Collect documents, qualify borrowers, and find best rates automatically',
      pain_points: ['Document chase fatigue', 'Lender criteria matching lag', 'Borrower ghosting'],
      industry_tools: ['Encompass', 'Zapier', 'WhatsApp', 'ChatGPT'],
      avg_revenue_client: '£1,500 - £6,000 Commission per deal',
      onboarding_questions: [
        { q: 'Primary loan type?', options: ['Residential Mortgage', 'Commercial/BTL', 'Refinance'] }
      ],
      geniuzlab_services: [
        { name: 'AI Document Pre-Qualifier', icon: '📑', description: 'Verify income & bank statements in under 2 minutes' }
      ],
      meta_title: 'AI Survival Guide for Mortgage Brokers — 2026 Underwriting',
      meta_description: 'How top mortgage brokers use AI to close loans 3x faster'
    }
  },
  {
    name: 'Public Relations Specialist',
    slug: 'public-relations-specialist',
    price: 59,
    automation_risk: 53,
    industry_data: {
      icon: 'Megaphone',
      psychological_title: 'The Crisis & Pitch Engine',
      fear_title: 'Generate Targeted Journalist Pitches & Press Releases in Seconds',
      ad_hook: 'Increase media placement rates by 40% with AI-personalized press pitches',
      pain_points: ['Media outreach burnout', 'Journalist list building', 'Press release drafting'],
      industry_tools: ['Cision', 'Muck Rack', 'ChatGPT', 'Grammarly'],
      avg_revenue_client: '£2,000 - £10,000 / month retainer',
      onboarding_questions: [
        { q: 'PR focus?', options: ['Tech & B2B', 'Consumer/Lifestyle', 'Crisis Communications'] }
      ],
      geniuzlab_services: [
        { name: 'AI Journalist Pitch Personalizer', icon: '📰', description: 'Match pitch angle to a journalist\'s recent articles automatically' }
      ],
      meta_title: 'AI Survival Guide for PR Specialists — 2026 Media Pitching',
      meta_description: 'How PR pros use AI to personalize pitches and secure top media'
    }
  },
  {
    name: 'Interior Designer',
    slug: 'interior-designer',
    price: 59,
    automation_risk: 46,
    industry_data: {
      icon: 'Sparkles',
      psychological_title: 'The Spatial Vision Engine',
      fear_title: 'Turn Client Mood Boards into Photorealistic 3D Renders Instantly',
      ad_hook: 'Generate 10 interior design concepts and mood boards in 5 minutes',
      pain_points: ['Client visualization lag', 'Sourcing furniture delays', '3D CAD rendering time'],
      industry_tools: ['AutoCAD', 'SketchUp', 'Midjourney', 'LookX AI', 'Pinterest'],
      avg_revenue_client: '£2,000 - £20,000 Project Fee',
      onboarding_questions: [
        { q: 'Design style?', options: ['Luxury Residential', 'Commercial/Office', 'Hospitality'] }
      ],
      geniuzlab_services: [
        { name: 'Generative Interior Render Engine', icon: '🛋️', description: 'Convert room photos into photorealistic renovated concepts' }
      ],
      meta_title: 'AI Survival Guide for Interior Designers — 2026 Spatial Design',
      meta_description: 'How interior designers use AI for instant 3D room rendering'
    }
  },
  {
    name: 'Audio Engineer',
    slug: 'audio-engineer',
    price: 49,
    automation_risk: 57,
    industry_data: {
      icon: 'Mic',
      psychological_title: 'The Acoustic Mastering Logic',
      fear_title: 'AI Stem Separation & Automated Mastering Are Changing Sound',
      ad_hook: 'Speed up mixing, noise restoration, and stem extraction by 80%',
      pain_points: ['Manual noise cleanup', 'Vocal tuning time', 'Client revision fatigue'],
      industry_tools: ['Pro Tools', 'Logic Pro', 'iZotope RX', 'LALAL.AI', 'Suno AI'],
      avg_revenue_client: '£300 - £2,500 Track/Project',
      onboarding_questions: [
        { q: 'Primary role?', options: ['Music Mixing/Mastering', 'Podcast/Voiceover', 'Film Sound Design'] }
      ],
      geniuzlab_services: [
        { name: 'AI Noise & Stem Cleaner', icon: '🎧', description: 'Isolate vocals & remove background hum in 1-click' }
      ],
      meta_title: 'AI Survival Guide for Audio Engineers — 2026 Sound Tech',
      meta_description: 'How audio engineers use AI for rapid mixing and stem separation'
    }
  },
  {
    name: 'Video Editor',
    slug: 'video-editor',
    price: 59,
    automation_risk: 63,
    industry_data: {
      icon: 'Film',
      psychological_title: 'The Timeline Speed Protocol',
      fear_title: 'AI Text-Based Editing & Auto-Cut Algorithms Are Here',
      ad_hook: 'Edit 1-hour interviews in 10 minutes with transcript-driven cutting',
      pain_points: ['Rough cut assembly time', 'B-roll searching', 'Color grading latency'],
      industry_tools: ['Premiere Pro', 'DaVinci Resolve', 'Descript', 'Runway AI', 'CapCut'],
      avg_revenue_client: '£500 - £5,000 Video',
      onboarding_questions: [
        { q: 'Video format?', options: ['YouTube Long-Form', 'Commercial/Corporate', 'Social Shorts/Reels'] }
      ],
      geniuzlab_services: [
        { name: 'Transcript Rough Cut Engine', icon: '✂️', description: 'Auto-cut silence, filler words & assemble rough edits from text' }
      ],
      meta_title: 'AI Survival Guide for Video Editors — 2026 Editing Speed',
      meta_description: 'How video editors leverage AI text-based editing to 5x turnarounds'
    }
  },
  {
    name: 'Business Analyst',
    slug: 'business-analyst',
    price: 79,
    automation_risk: 74,
    industry_data: {
      icon: 'PieChart',
      psychological_title: 'The Requirements & Logic Engine',
      fear_title: 'Automate Requirements Docs & User Stories Instantly',
      ad_hook: 'Generate BRDs, user stories, and process flowcharts in seconds with AI',
      pain_points: ['Requirements gathering delay', 'Manual process mapping', 'Stakeholder alignment'],
      industry_tools: ['Jira', 'Confluence', 'Lucidchart', 'Python', 'ChatGPT Enterprise'],
      avg_revenue_client: '£60,000 - £110,000 Salary',
      onboarding_questions: [
        { q: 'Industry domain?', options: ['Financial Services', 'Tech/SaaS', 'Retail/E-commerce'] }
      ],
      geniuzlab_services: [
        { name: 'AI User Story Generator', icon: '📋', description: 'Convert stakeholder transcripts into Jira user stories automatically' }
      ],
      meta_title: 'AI Survival Guide for Business Analysts — 2026 Requirements',
      meta_description: 'Automate BRD creation and requirements documentation with AI'
    }
  },
  {
    name: 'SEO Specialist',
    slug: 'seo-specialist',
    price: 59,
    automation_risk: 67,
    industry_data: {
      icon: 'TrendingUp',
      psychological_title: 'The Search Intent & pSEO Engine',
      fear_title: 'AI Search Overviews Are Changing SEO Strategy',
      ad_hook: 'Scale programmatic pSEO pages and schema markup to rank #1 on Google & Perplexity',
      pain_points: ['Keyword research grind', 'Content optimization velocity', 'Google algorithm updates'],
      industry_tools: ['Ahrefs', 'SEMrush', 'Screaming Frog', 'ChatGPT', 'Search Console'],
      avg_revenue_client: '£1,000 - £8,000 / month retainer',
      onboarding_questions: [
        { q: 'SEO focus?', options: ['Programmatic pSEO', 'Local SEO', 'Enterprise Content'] }
      ],
      geniuzlab_services: [
        { name: 'Programmatic pSEO Forge', icon: '🚀', description: 'Generate 500 high-converting keyword landing pages safely' }
      ],
      meta_title: 'AI Survival Guide for SEO Specialists — 2026 Search Growth',
      meta_description: 'How SEO strategists leverage AI for programmatic pSEO and AIO ranking'
    }
  },
  {
    name: 'Event Planner',
    slug: 'event-planner',
    price: 49,
    automation_risk: 48,
    industry_data: {
      icon: 'Calendar',
      psychological_title: 'The Event Logistics Engine',
      fear_title: 'Automate Vendor Sourcing, Run of Show, & RSVPs',
      ad_hook: 'Plan 500-person corporate events with 70% less administrative hassle',
      pain_points: ['Vendor communication overload', 'Run-of-show schedule changes', 'RSVP tracking'],
      industry_tools: ['Cvent', 'Eventbrite', 'Excel', 'ChatGPT', 'Canva'],
      avg_revenue_client: '£2,000 - £25,000 Planning Fee',
      onboarding_questions: [
        { q: 'Event scale?', options: ['Corporate Conferences', 'Weddings/Private', 'Trade Shows'] }
      ],
      geniuzlab_services: [
        { name: 'AI Run-of-Show Architect', icon: '⏱️', description: 'Generate minute-by-minute event schedules & vendor alerts' }
      ],
      meta_title: 'AI Survival Guide for Event Planners — 2026 Logistics',
      meta_description: 'Automate vendor coordination and event schedules with AI'
    }
  },
  {
    name: 'Insurance Broker',
    slug: 'insurance-broker',
    price: 69,
    automation_risk: 84,
    industry_data: {
      icon: 'Shield',
      psychological_title: 'The Policy Risk Comparison Engine',
      fear_title: 'Instant Policy Comparisons Are Replacing Manual Quote Checks',
      ad_hook: 'Compare 20 carrier policies and generate client proposals in under 2 minutes',
      pain_points: ['Carrier portal hopping', 'Manual policy comparison', 'Client renewal churn'],
      industry_tools: ['Applied Epic', 'HawkSoft', 'Excel', 'ChatGPT Enterprise'],
      avg_revenue_client: '£1,000 - £15,000 Commission per policy',
      onboarding_questions: [
        { q: 'Insurance line?', options: ['Commercial Property/Casualty', 'Life & Health', 'Personal Lines'] }
      ],
      geniuzlab_services: [
        { name: 'AI Policy Coverage Matcher', icon: '📑', description: 'Extract exclusions & coverage limits from PDF carrier quotes' }
      ],
      meta_title: 'AI Survival Guide for Insurance Brokers — 2026 Edition',
      meta_description: 'How insurance brokers use AI to compare policies and close clients faster'
    }
  },
  {
    name: 'UX Designer',
    slug: 'ux-designer',
    price: 69,
    automation_risk: 52,
    industry_data: {
      icon: 'Layout',
      psychological_title: 'The Wireframe & User Test Engine',
      fear_title: 'Generative UI & AI Prototype Generators Are Shifting Design',
      ad_hook: 'Convert user research into Figma wireframes and copy in seconds',
      pain_points: ['User research synthesis time', 'Figma component management', 'Usability testing lag'],
      industry_tools: ['Figma', 'Relume AI', 'v0.dev', 'Midjourney', 'Maze'],
      avg_revenue_client: '£3,000 - £25,000 Design Sprint',
      onboarding_questions: [
        { q: 'Product type?', options: ['Mobile Apps', 'SaaS Dashboards', 'E-commerce'] }
      ],
      geniuzlab_services: [
        { name: 'AI UX Research Synthesizer', icon: '📱', description: 'Extract key user pain points & wireframe concepts from 20 user interviews' }
      ],
      meta_title: 'AI Survival Guide for UX Designers — Generative UI 2026',
      meta_description: 'How UX designers leverage AI for instant user research synthesis'
    }
  },
  {
    name: 'Civil Engineer',
    slug: 'civil-engineer',
    price: 79,
    automation_risk: 38,
    industry_data: {
      icon: 'HardHat',
      psychological_title: 'The Infrastructure Logic Protocol',
      fear_title: 'Automate Structural Calculations & Environmental Compliance',
      ad_hook: 'Speed up site feasibility studies and permit documentation by 60%',
      pain_points: ['Permit review lag', 'Environmental assessment paperwork', 'Site inspection reporting'],
      industry_tools: ['AutoCAD Civil 3D', 'Bentley OpenRoads', 'Excel', 'ChatGPT'],
      avg_revenue_client: '£65,000 - £120,000 Salary',
      onboarding_questions: [
        { q: 'Engineering domain?', options: ['Transportation/Roads', 'Structural/Buildings', 'Water/Environmental'] }
      ],
      geniuzlab_services: [
        { name: 'AI Permit & Site Study Assistant', icon: '🏗️', description: 'Extract local planning codes & compliance requirements in 30 seconds' }
      ],
      meta_title: 'AI Survival Guide for Civil Engineers — 2026 Infrastructure',
      meta_description: 'Automate site studies and environmental compliance using AI'
    }
  },
  {
    name: 'Pharmacist',
    slug: 'pharmacist',
    price: 89,
    automation_risk: 51,
    industry_data: {
      icon: 'Pill',
      psychological_title: 'The Clinical Interaction Engine',
      fear_title: 'Automate Drug Interaction Audits & Patient Counseling',
      ad_hook: 'Streamline prescription reviews and patient consultations with AI accuracy',
      pain_points: ['Prescription entry paperwork', 'Drug interaction warnings', 'Insurance prior authorization'],
      industry_tools: ['PioneerRx', 'Micro Merchant Systems', 'Lexicomp', 'ChatGPT Enterprise'],
      avg_revenue_client: '£55,000 - £100,000 Salary',
      onboarding_questions: [
        { q: 'Pharmacy setting?', options: ['Retail/Community', 'Hospital/Clinical', 'Compounding'] }
      ],
      geniuzlab_services: [
        { name: 'AI Interaction & Prior Auth Assistant', icon: '💊', description: 'Generate prior authorization letters & patient advisory guides' }
      ],
      meta_title: 'AI Survival Guide for Pharmacists — 2026 Clinical Efficiency',
      meta_description: 'Streamline prescription reviews and prior auths with AI'
    }
  }
]


