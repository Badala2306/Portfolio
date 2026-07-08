// ─────────────────────────────────────────────────────────────────
// All editable site content lives here. Update projects, skills,
// certifications, and education by editing the arrays below —
// no need to touch component files for content changes.
// ─────────────────────────────────────────────────────────────────

export const profile = {
  name: "Manan Badala",
  title: "Data Analyst",
  tagline: "SQL · Excel · Power BI · Python",
  summary:
    "Electronics & Computer Engineering student who turns raw, messy data into decisions — SQL for the questions, Excel and Power BI for the story, Python for the rest. Five end-to-end analytics projects shipped independently, from schema design to KPI dashboards.",
  email: "mananbadala30@gmail.com",
  phone: "+91 9034853412",
  github: "https://github.com/Badala2306",
  githubUsername: "Badala2306",
  linkedin: "https://www.linkedin.com/in/manan-badala-0a4488297/",
  resumeFile: "/Manan_Badala_Resume.pdf"
};

export const education = {
  degree: "B.Tech in Electronics and Computer Engineering (ENC)",
  university: "Thapar Institute of Engineering and Technology",
  location: "Patiala, Punjab, India",
  cgpa: "8.37 / 10",
  graduation: "May 2027",
  coursework: [
    "Data Structures & Algorithms",
    "Database Management Systems",
    "Operating Systems",
    "AI / Machine Learning",
    "Computer Networks",
    "Object-Oriented Programming"
  ]
};

export const skills = {
  analytics: [
    { name: "SQL", level: 90 },
    { name: "Excel (Advanced)", level: 90 },
    { name: "Power BI", level: 80 },
    { name: "Power Query (M)", level: 75 },
    { name: "Python", level: 70 },
    { name: "Data Cleaning", level: 88 },
    { name: "Data Visualization", level: 85 },
    { name: "Dashboard Development", level: 85 },
    { name: "KPI Reporting", level: 82 },
    { name: "Exploratory Data Analysis", level: 80 }
  ],
  databases: ["MySQL", "PostgreSQL", "Joins & CTEs", "Window Functions", "Stored Procedures", "Triggers", "Schema Design"],
  tools: ["Git", "GitHub", "VS Code", "MySQL Workbench", "Power BI Desktop"],
  languages: ["Python", "C", "C++", "SQL", "HTML5/CSS3"],
  soft: ["Communication", "Teamwork", "Adaptability", "Critical Thinking", "Problem Solving"]
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  stack: string[];
  github: string;
  features: string[];
  metric: string;
};

export const projects: Project[] = [
  {
    slug: "monday-coffee",
    title: "Monday Coffee Expansion Analysis",
    description:
      "Business-question-driven SQL analysis to identify optimal Indian cities for a coffee retailer's retail expansion, using sales, customer, product, and city-level data.",
    stack: ["PostgreSQL", "SQL", "CTEs", "Window Functions"],
    github: "https://github.com/Badala2306/Monday-Coffee-SQL-Analysis",
    features: [
      "Answered 10+ real business questions with multi-table JOINs",
      "Ranked cities by estimated consumers and rent-to-sales ratio",
      "Shortlisted top 3 cities for launch using window functions"
    ],
    metric: "10+ business questions solved"
  },
  {
    slug: "fnp-dashboard",
    title: "FNP Sales Analytics Dashboard",
    description:
      "Interactive Excel dashboard for a gifting e-commerce business, visualizing revenue, order volume, and top-selling products.",
    stack: ["Excel", "Power Query", "PivotTables", "Slicers"],
    github: "https://github.com/Badala2306/FNP-Excel-Sales-Dashboard",
    features: [
      "PivotTables, PivotCharts, and slicers for interactive exploration",
      "Cleaned raw transactional data with Power Query (M language)",
      "Resolved nulls, duplicates, and inconsistent date formats"
    ],
    metric: "Full data-cleaning-to-dashboard pipeline"
  },
  {
    slug: "dominos-sales",
    title: "Domino's Store Sales Analysis",
    description:
      "Time-series analysis of 12+ months of transactional sales data, paired with an interactive Power BI dashboard tracking core revenue KPIs.",
    stack: ["Power BI", "Excel", "SQL"],
    github: "https://github.com/Badala2306",
    features: [
      "Uncovered a 23% revenue spike during promotional periods",
      "Designed 10+ KPIs — Revenue, AOV, Order Volume, Growth Rate",
      "Cleaned 1,500+ null values, improving data quality by 98%"
    ],
    metric: "23% promo revenue spike surfaced"
  },
  {
    slug: "ecommerce-clv",
    title: "E-Commerce Customer Analytics Dashboard",
    description:
      "Executive-level Power BI dashboard aggregating 50,000+ transactions to surface insights on acquisition, retention, and lifetime value.",
    stack: ["Power BI", "Excel", "SQL"],
    github: "https://github.com/Badala2306/Ecommerce-Sales-Dashboard",
    features: [
      "RFM customer segmentation into 5 cohorts",
      "Tracked 8 revenue KPIs across the funnel",
      "Identified a 17% retention drop linked to checkout friction"
    ],
    metric: "50,000+ transactions analyzed"
  },
  {
    slug: "bookstore-db",
    title: "Bookstore Management System",
    description:
      "Normalized relational database schema with automated alerts via stored procedures and triggers, optimized for query performance.",
    stack: ["MySQL", "SQL"],
    github: "https://github.com/Badala2306/BookStore-Management-System",
    features: [
      "8+ table schema normalized to 3NF",
      "5+ stored procedures & triggers for automated alerts",
      "Indexing cut average query time on 10,000+ record datasets"
    ],
    metric: "3NF schema across 8+ tables"
  },
  {
    slug: "road-accident",
    title: "Road Accident Dashboard",
    description:
      "Interactive Excel dashboard analyzing 3.7 lakh+ accident records to uncover trends across time, location, and severity.",
    stack: ["Excel", "PivotTables", "KPI Cards"],
    github: "https://github.com/Badala2306/Road-Accident-Dashboard",
    features: [
      "PivotTables, PivotCharts, KPI Cards, Slicers, and Timelines",
      "Standardized raw data — resolved missing values & duplicates",
      "Surfaced trends enabling data-driven road-safety insights"
    ],
    metric: "370,000+ records cleaned & analyzed"
  }
];

export const certifications = [
  { name: "Data Analytics Job Simulation", issuer: "Deloitte (via Forage)" },
  { name: "Cyber Security Job Simulation", issuer: "Deloitte (via Forage)" },
  { name: "OCI AI Foundations", issuer: "Oracle" },
  { name: "PCB Design and Fabrication", issuer: "Thapar Institute" },
  { name: "Shape Detection Using Python (OpenCV)", issuer: "Self-directed" },
  { name: "IoT Fundamentals", issuer: "Self-directed" },
  { name: "WordPress Website Development", issuer: "Self-directed" }
];

export const achievements = [
  "CGPA 8.37/10 in Electronics and Computer Engineering",
  "Solved 100+ DSA problems across platforms — arrays, graphs, DP, tree traversals",
  "Independently designed and delivered 5 end-to-end analytics/database projects"
];

// DSA Journey — update these numbers manually as you progress,
// or wire up a coding-profile API (see README "Updating DSA stats").
export const dsa = {
  totalSolved: 100,
  breakdown: [
    { label: "Easy", value: 45, color: "#22D3EE" },
    { label: "Medium", value: 42, color: "#F5A524" },
    { label: "Hard", value: 13, color: "#F43F5E" }
  ],
  topics: [
    { name: "Arrays", progress: 85 },
    { name: "Trees", progress: 65 },
    { name: "Graphs", progress: 55 },
    { name: "Dynamic Programming", progress: 50 },
    { name: "Strings", progress: 70 }
  ],
  milestones: [
    { date: "Started", detail: "Began structured DSA practice alongside coursework" },
    { date: "50 solved", detail: "Comfortable with arrays, strings, and basic recursion" },
    { date: "100 solved", detail: "Regularly tackling trees, graphs, and DP problems" }
  ],
  note:
    "Consistent DSA practice sharpened the same pattern-recognition and structured problem-solving that now drives how I break down open-ended business questions into SQL and dashboard logic."
};
