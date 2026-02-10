// Development phases following clinical trial progression
export enum DevelopmentPhase {
  DISCOVERY = "Discovery",
  PRECLINICAL = "Preclinical",
  PHASE_1 = "Phase 1",
  PHASE_2 = "Phase 2",
  PHASE_3 = "Phase 3",
  NDA_BLA = "NDA/BLA",
  APPROVED = "Approved",
  DISCONTINUED = "Discontinued",
}

// Therapeutic areas
export enum TherapeuticArea {
  ONCOLOGY = "Oncology",
  NEUROLOGY = "Neurology",
  CARDIOLOGY = "Cardiology",
  IMMUNOLOGY = "Immunology",
  INFECTIOUS_DISEASE = "Infectious Disease",
  RARE_DISEASE = "Rare Disease",
  METABOLIC = "Metabolic",
  RESPIRATORY = "Respiratory",
}

// Study status
export enum StudyStatus {
  NOT_STARTED = "Not Started",
  RECRUITING = "Recruiting",
  ACTIVE = "Active",
  COMPLETED = "Completed",
  SUSPENDED = "Suspended",
  TERMINATED = "Terminated",
}

// Milestone status
export enum MilestoneStatus {
  NOT_STARTED = "Not Started",
  IN_PROGRESS = "In Progress",
  COMPLETED = "Completed",
  DELAYED = "Delayed",
  AT_RISK = "At Risk",
}

// User roles for authorization
export enum UserRole {
  VIEWER = "Viewer",
  EDITOR = "Editor",
  ADMIN = "Admin",
}

// Milestone interface
export interface Milestone {
  id: string;
  programId: string;
  title: string;
  description: string;
  targetDate: string;
  completionDate?: string;
  status: MilestoneStatus;
  createdAt: string;
  updatedAt: string;
}

// Study interface
export interface Study {
  id: string;
  programId: string;
  studyNumber: string;
  title: string;
  phase: DevelopmentPhase;
  status: StudyStatus;
  indication: string;
  targetEnrollment: number;
  currentEnrollment: number;
  sitesCount: number;
  primaryEndpoint: string;
  startDate: string;
  estimatedCompletionDate: string;
  actualCompletionDate?: string;
  principalInvestigator: string;
  createdAt: string;
  updatedAt: string;
}

// Program interface (main asset)
export interface Program {
  id: string;
  code: string;
  name: string;
  description: string;
  therapeuticArea: TherapeuticArea;
  phase: DevelopmentPhase;
  targetIndication: string;
  mechanism: string;
  projectLead: string;
  therapeuticLead: string;
  startDate: string;
  estimatedApprovalDate?: string;
  priority: "High" | "Medium" | "Low";
  budget: number;
  budgetSpent: number;
  createdAt: string;
  updatedAt: string;
}

// Aggregated program data with related studies and milestones
export interface ProgramDetail extends Program {
  studies: Study[];
  milestones: Milestone[];
}

// Filter options
export interface FilterOptions {
  therapeuticAreas: TherapeuticArea[];
  phases: DevelopmentPhase[];
  priorities: ("High" | "Medium" | "Low")[];
  searchQuery: string;
}

// User interface
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
