export type Language = 'ID' | 'EN';

export type ActiveTab = 'home' | 'search' | 'compare' | 'roadmap' | 'estimator' | 'assistant' | 'partner' | 'admin';

export interface ServiceItem {
  name: string;
  category: string;
  method: string;
  price: number;
  duration: string;
  sampleRequirement: string;
  outputReport: string;
}

export interface InstrumentItem {
  name: string;
  brand: string;
  model: string;
  specifications: string;
  image?: string;
}

export interface TeacherMentor {
  name: string;
  role: string;
  expertise: string;
}

export interface ReviewItem {
  user: string;
  rating: number;
  date: string;
  comment: string;
  tag?: string;
}

export interface LabItem {
  id: string;
  name: string;
  institution: string;
  location: string;
  city: string;
  accreditation: string[]; // e.g., 'KAN (ISO/IEC 17025)', 'ISO 9001:2015', 'BRIN Accredited'
  verified: boolean;
  rating: number;
  completedProjects: number;
  responseTimeMinutes: number;
  turnaroundTimeDays: string;
  startingPrice: number;
  image: string;
  description: string;
  services: ServiceItem[];
  instruments: InstrumentItem[];
  contact: {
    whatsapp: string;
    email: string;
    office: string;
    picName: string;
  };
  reviews: ReviewItem[];
}

export interface UserAccount {
  name: string;
  email: string;
  loggedIn: boolean;
}

export interface CostEstimateInput {
  title: string;
  objective: string;
  competitionType: string;
  productType: string;
  scienceField: string;
  targetOutcome: string;
  parameterUji?: string;
  metodeStandar?: string;
}

export interface CostItemBreakdown {
  testName: string;
  labCategory: string;
  minPrice: number;
  recPrice: number;
  compPrice: number;
  sampleQuantity: number;
  parameterUji?: string;
  metodeStandar?: string;
}

export interface CostEstimateOutput {
  title: string;
  requiredTests: string[];
  estimatedMin: number;
  estimatedRec: number;
  estimatedComp: number;
  breakdown: CostItemBreakdown[];
  logisticsCost: number;
  certificationCost: number;
  optimizationSuggestions: string[];
}

export interface RoadmapStep {
  phase: string;
  title: string;
  duration: string;
  budget: string;
  tasks: string[];
  laboratoryRequirements: string;
  resourcesNeeded: string;
}

export interface RoadmapOutput {
  title: string;
  competition: string;
  objectives: string[];
  methodology: string;
  requiredInstruments: string[];
  estimatedCost: number;
  phases: RoadmapStep[];
  references: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  data?: {
    roadmap?: RoadmapOutput;
    estimator?: CostEstimateOutput;
  };
}
