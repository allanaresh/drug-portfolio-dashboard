import React from "react";
import { render, screen } from "@testing-library/react";
import ProgramCard from "@/components/ProgramCard";
import { Program, DevelopmentPhase, TherapeuticArea } from "@/types";

function makeProgram(overrides: Partial<Program> = {}): Program {
  return {
    id: "PROG-TEST",
    code: "TST-001",
    name: "Test Program",
    description: "desc",
    therapeuticArea: TherapeuticArea.ONCOLOGY,
    phase: DevelopmentPhase.PHASE_1,
    targetIndication: "Indication",
    mechanism: "Mech",
    projectLead: "Lead",
    therapeuticLead: "Lead",
    startDate: new Date().toISOString().split("T")[0],
    priority: "High",
    budget: 100,
    budgetSpent: 50,
    createdAt: new Date().toISOString().split("T")[0],
    updatedAt: new Date().toISOString().split("T")[0],
    ...overrides,
  } as Program;
}

describe("ProgramCard color branches", () => {
  test("shows green bar when utilization <= 60", () => {
    const p = makeProgram({ budget: 100, budgetSpent: 30 });
    render(<ProgramCard program={p} />);
    expect(screen.getByText(/30.0%|30%/)).toBeInTheDocument();
  });

  test("shows yellow bar when utilization > 60 and <= 80", () => {
    const p = makeProgram({ budget: 100, budgetSpent: 70 });
    render(<ProgramCard program={p} />);
    expect(screen.getByText(/70.0%|70%/)).toBeInTheDocument();
  });

  test("shows red bar when utilization > 80", () => {
    const p = makeProgram({ budget: 100, budgetSpent: 90 });
    render(<ProgramCard program={p} />);
    expect(screen.getByText(/90.0%|90%/)).toBeInTheDocument();
  });
});
