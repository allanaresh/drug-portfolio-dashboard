# Drug Development Portfolio Dashboard

A modern, accessible web application for managing clinical R&D drug development portfolios. Built with Next.js, TypeScript, and Tailwind CSS.

## Overview

The Drug Development Portfolio Dashboard enables clinical R&D organizations to efficiently manage their drug development programs. Portfolio managers can browse programs, filter by therapeutic area and development phase, view detailed information including studies and milestones, and edit program metadata with proper authorization.

### Key Features

- **Comprehensive Program Management**: Browse, search, and filter drug development programs
- **Rich Analytics**: Portfolio metrics, phase distribution, budget analysis
- **Advanced Filtering**: Multi-criteria filtering by therapeutic area, phase, and priority
- **Responsive Design**: Optimized for desktop and tablet devices (1024px+)
- **Role-Based Access Control**: Viewer, Editor, and Admin roles
- **WCAG 2.1 Level AA Compliant**: Full keyboard navigation, screen reader support
- **High Performance**: Optimized for handling 1000+ programs
- **Professional UI**: Clean, healthcare-focused design

## Quick Start

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/allanaresh/drug-portfolio-dashboard.git
cd drug-portfolio-dashboard

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Login

Click "Login" in the top-right corner and select a role:

- **Viewer**: Read-only access
- **Editor**: Can edit program metadata
- **Admin**: Full access

## Architecture

### Technology Stack

**Next.js 15** - React framework with App Router
**React 18** - UI library  
**TypeScript** - Type safety  
**Tailwind CSS** - Styling

### Design Principles

1. **Component-Based Architecture**: Modular, reusable components
2. **Client-Side State Management**: React Context API for demo simplicity
3. **Type Safety**: Full TypeScript coverage
4. **Accessibility First**: WCAG 2.1 Level AA compliant
5. **Performance Optimized**: Efficient rendering and filtering

**Key Entities**:

- **Program**: Drug development program (primary entity)
- **Study**: Clinical trial associated with a program
- **Milestone**: Development milestone for tracking progress
- **User**: System user with role-based permissions

## Documentation

Comprehensive documentation is available in the `/docs` directory:

- **[User Guide](docs/USER_GUIDE.md)**: How to use the dashboard
- **[Technical Documentation](docs/TECHNICAL.md)**: Architecture, API, development guide
- **[Assumptions & Decisions](docs/ASSUMPTIONS.md)**: Architectural decisions and reasoning

## Features in Detail

### Dashboard View

- **Summary Cards**: Total programs, active programs, budget, utilization
- **Filter Panel**: Search and multi-select filters for therapeutic area, phase, priority
- **Program Grid/Table**: Toggle between card and table views
- **Detailed Program**: Click any program to view details

### Program Detail Page

Three comprehensive tabs:

1. **Overview**: Program metadata, financial info, timeline
2. **Studies**: Clinical trials with enrollment tracking
3. **Milestones**: Development milestones with status tracking

### Analytics Dashboard

- Portfolio value and budget metrics
- Program distribution by phase and therapeutic area
- Priority breakdown
- Budget allocation by phase
- Top programs by budget

### Editing (Editor/Admin Only)

Edit program fields including:

- Name and description
- Development phase
- Therapeutic area
- Target indication
- Mechanism of action
- Project leads
- Priority level

## Accessibility

The dashboard follows WCAG 2.1 Level AA guidelines:

- Keyboard navigation for all interactive elements
- Screen reader compatible (ARIA labels, semantic HTML)
- Color contrast ratios meet requirements (4.5:1 for text)
- Focus indicators on all interactive elements
- Color + text for status indicators (not color alone)

Test accessibility:

```bash
npm run build
npm start
# Open DevTools > Lighthouse > Accessibility
```

## Security & Compliance

### Current Implementation (Demo)

- Synthetic data only (no real patient data)
- No PII/PHI stored or transmitted
- Client-side demo with mock authentication

### Production Requirements

For production deployment, implement:

- Real authentication (Auth0, AWS Cognito)
- API with authorization checks
- HTTPS encryption
- Audit logging
- HIPAA compliance measures
- GxP validation documentation
- Data backup and recovery

See [Technical Documentation](docs/TECHNICAL.md) for details.

## Development

### Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Unit tests
npm run test

# Accessibility audit
npm run lighthouse
```

## Deployment

### Vercel

- Continuous Integration with Github Actions.

**Project Status**: Demo Complete  
**Version**: 1.0.0  
**Last Updated**: February 2026
