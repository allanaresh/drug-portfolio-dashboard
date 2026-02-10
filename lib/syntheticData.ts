import {
  Program,
  Study,
  Milestone,
  DevelopmentPhase,
  TherapeuticArea,
  StudyStatus,
  MilestoneStatus,
  ProgramDetail,
} from "@/types";

// Synthetic names and descriptions
const mechanismTypes = [
  "Monoclonal Antibody",
  "Small Molecule Inhibitor",
  "Gene Therapy",
  "Cell Therapy",
  "RNA Interference",
  "CRISPR-based Therapy",
  "Protein Degrader",
  "Bispecific Antibody",
  "CAR-T Cell Therapy",
  "ADC (Antibody-Drug Conjugate)",
];

const indications: Record<TherapeuticArea, string[]> = {
  [TherapeuticArea.ONCOLOGY]: [
    "Non-Small Cell Lung Cancer",
    "Metastatic Breast Cancer",
    "Acute Myeloid Leukemia",
    "Glioblastoma",
    "Colorectal Cancer",
    "Multiple Myeloma",
  ],
  [TherapeuticArea.NEUROLOGY]: [
    "Alzheimer's Disease",
    "Parkinson's Disease",
    "Multiple Sclerosis",
    "Amyotrophic Lateral Sclerosis",
    "Epilepsy",
    "Migraine",
  ],
  [TherapeuticArea.CARDIOLOGY]: [
    "Heart Failure",
    "Atrial Fibrillation",
    "Hypertension",
    "Coronary Artery Disease",
    "Hyperlipidemia",
  ],
  [TherapeuticArea.IMMUNOLOGY]: [
    "Rheumatoid Arthritis",
    "Systemic Lupus Erythematosus",
    "Inflammatory Bowel Disease",
    "Crohn's Disease",
    "Psoriasis",
  ],
  [TherapeuticArea.INFECTIOUS_DISEASE]: [
    "HIV/AIDS",
    "Hepatitis C",
    "Tuberculosis",
    "COVID-19",
    "Influenza",
  ],
  [TherapeuticArea.RARE_DISEASE]: [
    "Duchenne Muscular Dystrophy",
    "Cystic Fibrosis",
    "Huntington Disease",
    "Spinal Muscular Atrophy",
    "Gaucher Disease",
  ],
  [TherapeuticArea.METABOLIC]: [
    "Type 2 Diabetes",
    "Non-Alcoholic Steatohepatitis",
    "Obesity",
    "Hypercholesterolemia",
  ],
  [TherapeuticArea.RESPIRATORY]: [
    "Chronic Obstructive Pulmonary Disease",
    "Asthma",
    "Idiopathic Pulmonary Fibrosis",
    "Pulmonary Arterial Hypertension",
  ],
};

const projectLeads = [
  "Dr. Sarah Chen",
  "Dr. Michael Rodriguez",
  "Dr. Aisha Patel",
  "Dr. James Wilson",
  "Dr. Maria Santos",
  "Dr. David Kim",
  "Dr. Jennifer Brown",
  "Dr. Robert Taylor",
];

const investigators = [
  "Prof. Elizabeth Anderson",
  "Dr. Thomas Moore",
  "Prof. Lisa Martinez",
  "Dr. Christopher Lee",
  "Prof. Amanda White",
  "Dr. Daniel Garcia",
  "Prof. Rachel Johnson",
  "Dr. William Davis",
];

// Helper to generate random date
function randomDate(start: Date, end: Date): string {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  )
    .toISOString()
    .split("T")[0];
}

// Helper to generate future date
function addMonths(date: Date, months: number): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

// Generate synthetic programs
function generatePrograms(count: number = 50): Program[] {
  const programs: Program[] = [];
  const therapeuticAreas = Object.values(TherapeuticArea);
  const phases = Object.values(DevelopmentPhase);
  const priorities: ("High" | "Medium" | "Low")[] = ["High", "Medium", "Low"];

  for (let i = 0; i < count; i++) {
    const therapeuticArea =
      therapeuticAreas[Math.floor(Math.random() * therapeuticAreas.length)];
    const phase = phases[Math.floor(Math.random() * phases.length)];
    const priority = priorities[Math.floor(Math.random() * priorities.length)];
    const startDate = new Date(2018, 0, 1);
    const endDate = new Date(2024, 11, 31);
    const programStartDate = randomDate(startDate, endDate);
    const budget = Math.floor(Math.random() * 150000000) + 10000000; // $10M - $160M
    const budgetSpent = Math.floor(budget * (Math.random() * 0.7 + 0.1)); // 10% - 80% spent

    programs.push({
      id: `PROG-${String(i + 1).padStart(4, "0")}`,
      code: `${therapeuticArea.substring(0, 3).toUpperCase()}-${String(i + 1).padStart(3, "0")}`,
      name: `${mechanismTypes[Math.floor(Math.random() * mechanismTypes.length)]} for ${
        indications[therapeuticArea][
          Math.floor(Math.random() * indications[therapeuticArea].length)
        ]
      }`,
      description: `Novel ${mechanismTypes[Math.floor(Math.random() * mechanismTypes.length)].toLowerCase()} targeting ${
        indications[therapeuticArea][
          Math.floor(Math.random() * indications[therapeuticArea].length)
        ]
      }. The compound demonstrates promising efficacy and safety profile in early studies.`,
      therapeuticArea,
      phase,
      targetIndication:
        indications[therapeuticArea][
          Math.floor(Math.random() * indications[therapeuticArea].length)
        ],
      mechanism:
        mechanismTypes[Math.floor(Math.random() * mechanismTypes.length)],
      projectLead:
        projectLeads[Math.floor(Math.random() * projectLeads.length)],
      therapeuticLead:
        projectLeads[Math.floor(Math.random() * projectLeads.length)],
      startDate: programStartDate,
      estimatedApprovalDate:
        phase !== DevelopmentPhase.DISCONTINUED
          ? addMonths(
              new Date(programStartDate),
              Math.floor(Math.random() * 48) + 24,
            )
              .toISOString()
              .split("T")[0]
          : undefined,
      priority,
      budget,
      budgetSpent,
      createdAt: programStartDate,
      updatedAt: new Date().toISOString().split("T")[0],
    });
  }

  return programs;
}

// Generate synthetic studies for a program
function generateStudiesForProgram(
  program: Program,
  count: number = 3,
): Study[] {
  const studies: Study[] = [];
  const statuses = Object.values(StudyStatus);

  for (let i = 0; i < count; i++) {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const targetEnrollment = Math.floor(Math.random() * 800) + 50;
    const currentEnrollment =
      status === StudyStatus.COMPLETED
        ? targetEnrollment
        : Math.floor(targetEnrollment * (Math.random() * 0.7 + 0.1));
    const startDate = addMonths(new Date(program.startDate), i * 6);
    const estimatedCompletionDate = addMonths(
      startDate,
      Math.floor(Math.random() * 24) + 12,
    );

    studies.push({
      id: `${program.id}-STD-${String(i + 1).padStart(3, "0")}`,
      programId: program.id,
      studyNumber: `${program.code}-${String(i + 1).padStart(3, "0")}`,
      title: `${program.phase} Clinical Trial - ${program.targetIndication}`,
      phase: program.phase,
      status,
      indication: program.targetIndication,
      targetEnrollment,
      currentEnrollment,
      sitesCount: Math.floor(Math.random() * 50) + 5,
      primaryEndpoint:
        program.therapeuticArea === TherapeuticArea.ONCOLOGY
          ? "Overall Survival"
          : "Change from baseline in clinical assessment score",
      startDate: startDate.toISOString().split("T")[0],
      estimatedCompletionDate: estimatedCompletionDate
        .toISOString()
        .split("T")[0],
      actualCompletionDate:
        status === StudyStatus.COMPLETED
          ? estimatedCompletionDate.toISOString().split("T")[0]
          : undefined,
      principalInvestigator:
        investigators[Math.floor(Math.random() * investigators.length)],
      createdAt: startDate.toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    });
  }

  return studies;
}

// Generate synthetic milestones for a program
function generateMilestonesForProgram(
  program: Program,
  count: number = 5,
): Milestone[] {
  const milestones: Milestone[] = [];
  const statuses = Object.values(MilestoneStatus);
  const milestoneTemplates = [
    "IND Submission",
    "First Patient Enrolled",
    "Database Lock",
    "Primary Analysis Complete",
    "NDA/BLA Submission",
    "FDA Review Complete",
    "Manufacturing Scale-Up",
    "Safety Review Board Meeting",
  ];

  for (let i = 0; i < count; i++) {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const targetDate = addMonths(new Date(program.startDate), i * 4 + 2);

    milestones.push({
      id: `${program.id}-MS-${String(i + 1).padStart(3, "0")}`,
      programId: program.id,
      title: milestoneTemplates[i % milestoneTemplates.length],
      description: `Key milestone for ${program.name} development program`,
      targetDate: targetDate.toISOString().split("T")[0],
      completionDate:
        status === MilestoneStatus.COMPLETED
          ? targetDate.toISOString().split("T")[0]
          : undefined,
      status,
      createdAt: program.startDate,
      updatedAt: new Date().toISOString().split("T")[0],
    });
  }

  return milestones;
}

// Generate complete program details with studies and milestones
function generateProgramDetails(programs: Program[]): ProgramDetail[] {
  return programs.map((program) => ({
    ...program,
    studies: generateStudiesForProgram(program),
    milestones: generateMilestonesForProgram(program),
  }));
}

// Initialize all synthetic data
export function initializeSyntheticData() {
  const storedPrograms: string = localStorage.getItem("programs") ?? "";
  const storedProgramDetails: string =
    localStorage.getItem("programDetails") ?? "";

  if (storedPrograms && storedProgramDetails) {
    return {
      programs: JSON.parse(storedPrograms),
      programDetails: JSON.parse(storedProgramDetails),
    };
  }

  const programs = generatePrograms(50);
  const programDetails = generateProgramDetails(programs);

  localStorage.setItem("programs", JSON.stringify(programs));
  localStorage.setItem("programDetails", JSON.stringify(programDetails));

  return {
    programs,
    programDetails,
  };
}
