import React from 'react';
import { render, screen } from '@testing-library/react';
import ProgramCard from '@/components/ProgramCard';
import { DevelopmentPhase } from '@/types';

const sampleProgram = {
  id: 'PROG-0001',
  code: 'ONC-001',
  name: 'Test Program',
  description: 'Desc',
  therapeuticArea: 'ONCOLOGY',
  phase: DevelopmentPhase.PHASE_2,
  targetIndication: 'Test Indication',
  mechanism: 'MoA',
  projectLead: 'Dr. Test',
  therapeuticLead: 'Dr. Lead',
  startDate: '2020-01-01',
  estimatedApprovalDate: '2025-01-01',
  priority: 'High',
  budget: 100,
  budgetSpent: 30,
  createdAt: '2020-01-01',
  updatedAt: '2020-01-01',
};

describe('ProgramCard', () => {
  test('renders program details and budget percent', () => {
    render(<ProgramCard program={sampleProgram as any} />);
    expect(screen.getByText(/Test Program/)).toBeInTheDocument();
    expect(screen.getByText(/Test Indication/)).toBeInTheDocument();
    expect(screen.getByText(/Dr. Test/)).toBeInTheDocument();
    expect(screen.getByText(/30.0%/)).toBeInTheDocument();
  });
});
