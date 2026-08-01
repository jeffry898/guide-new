export type Profession = {
  id: string;
  name: string;
  slug: string;
  icon: string;
  price: number;
  short_title: string;
  psychological_title?: string;
  fear_title?: string;
  headline: string;
  subheadline: string;
  guide_title: string;
  pain_points: string[];
  tech_stack: string[];
  ticket_value: string;
  questionnaire: {
    q: string;
    options?: string[];
    type?: string;
    placeholder?: string;
  }[];
  core_systems: {
    name: string;
    description: string;
  }[];
  roi_insight: string;
  transformation_statement: string;
  popularity_score: number;
  automation_risk: number;
  meta_title: string;
  meta_description: string;
};

export type GuideContent = {
  hero: {
    title: string;
    subtitle?: string;
    stat: string;
    stat_source: string;
  };
  reality_check: {
    headline: string;
    insight: string;
    chart: {
      title: string;
      labels: string[];
      admin_time: number[];
      core_work: number[];
      revenue_growth: number[];
    };
  };
  ai_systems: {
    title: string;
    description: string;
    time_saved_weekly?: number;
    free_tool?: string;
    free_tool_url?: string;
    prompt_snippet?: string;
    geniuzlab_upgrade?: string;
    icon?: string;
    architecture_steps?: string[];
  }[];
  prompt_templates?: {
    title: string;
    use_case: string;
    target_tool: string;
    prompt: string;
    variables?: string[];
    setup_instructions?: string;
  }[];
  roi: {
    hours_saved_weekly: number;
    annual_value: number;
    insight: string;
  };
  roadmap: {
    weeks: {
      week: number;
      theme: string;
      actions: string[];
      key_deliverable?: string;
      time_saved_estimate?: string;
    }[];
  };
  geniuzlab: {
    headline: string;
    body: string;
    services: {
      name: string;
      description: string;
      icon: string;
    }[];
    cta: string;
  };
  closing: {
    statement: string;
    share_text: string;
  };
};

