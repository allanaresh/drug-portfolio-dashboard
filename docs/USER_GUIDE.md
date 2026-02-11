# Drug Development Portfolio Dashboard - User Guide

## Introduction

The Drug Development Portfolio Dashboard is a comprehensive web-based application designed for clinical R&D organizations to manage and track their drug development programs. The system enables portfolio managers to:

- Browse and search all development programs
- Filter programs by development phase and therapeutic area
- View detailed program information including studies and milestones
- Track enrollment progress and budget utilization
- Edit program metadata (with proper authorization)
- Analyze portfolio metrics and trends

**Key Features:**

- Real-time data filtering and search
- Role-based access control
- Responsive design for desktop and tablet devices
- Comprehensive analytics dashboard
- WCAG 2.1 Level AA compliant accessibility

---

## Getting Started

### Accessing the Dashboard

1. Navigate to the dashboard URL in a modern web browser (Chrome, Firefox, Safari, or Edge)
2. The homepage displays immediately - no registration required for this demo
3. Click the "Login" button in the top-right corner to access role-based features

### Login Process

The dashboard supports three user roles:

1. **Viewer**: Read-only access to all program data
2. **Editor**: Can view and edit program metadata
3. **Admin**: Full access including all editing capabilities

To log in:

1. Click the "Login" button
2. Select your role from the dropdown menu
3. Your role badge will appear in the header

---

## User Roles & Permissions

### Viewer

- **Permissions**: Read-only access
- **Capabilities**:
  - Browse all programs
  - Filter and search programs
  - View program details, studies, and milestones
  - Access analytics dashboard
- **Restrictions**: Cannot edit any data

### Editor

- **Permissions**: Read and write access to program metadata
- **Capabilities**:
  - All Viewer capabilities
  - Edit program information including:
    - Program name and description
    - Development phase
    - Therapeutic area
    - Target indication
    - Mechanism of action
    - Project leads
    - Priority level
- **Restrictions**: Cannot modify financial data, studies, or milestones

### Admin

- **Permissions**: Full system access
- **Capabilities**: All Editor capabilities plus future administrative functions

---

## Dashboard Overview

### Main Dashboard Components

#### 1. Header Navigation

- **Logo/Title**: Click to return to the main dashboard
- **Navigation Tabs**:
  - Dashboard: Main program listing
  - Analytics: Portfolio analytics and reporting
- **User Profile**: Shows current user role and logout option

#### 2. Filter Panel (Left Sidebar)

- **Search Bar**: Type to search by program name, code, indication, or lead
- **Therapeutic Area Filter**: Select one or more therapeutic areas
- **Development Phase Filter**: Filter by clinical development stage
- **Priority Filter**: Filter by High, Medium, or Low priority
- **Clear All**: Reset all filters

#### 3. Summary Cards

Display key portfolio metrics:

- **Total Programs**: Count of all programs in the portfolio
- **Active Programs**: Programs in active development (excluding Discontinued/Approved)
- **Total Budget**: Sum of all program budgets
- **Avg Utilization**: Average budget utilization across all programs

#### 4. Program Grid/Table View

- **Grid View**: Card-based layout with program highlights
- **Table View**: Tabular format for quick scanning
- **View Toggle**: Switch between grid and table views using icons in the top-right

### Program Cards

Each program card displays:

- Program code and priority badge
- Program name
- Current development phase (color-coded)
- Therapeutic area
- Target indication
- Project lead
- Budget utilization with visual progress bar

**Color Coding:**

- Budget utilization:
  - Green: 0-60% (on track)
  - Yellow: 60-80% (monitor)
  - Red: 80-100% (attention needed)

---

## Managing Programs

### Viewing Program Details

1. Click any program card or table row
2. The program detail page displays with three tabs:
   - **Overview**: Program metadata and key metrics
   - **Studies**: Associated clinical trials
   - **Milestones**: Development timeline and progress

### Program Overview Tab

**Key Metrics Section:**

- Development Phase
- Budget Utilization (with progress bar)
- Enrollment Progress across all studies
- Milestone completion status

**Program Details:**

- Therapeutic Area
- Target Indication
- Mechanism of Action
- Project Lead
- Therapeutic Lead

**Financial Information:**

- Total Budget
- Budget Spent
- Remaining Budget

**Timeline:**

- Start Date
- Estimated Approval Date

### Studies Tab

Each study card shows:

- Study number and status badge
- Study title
- Indication
- Number of sites
- Principal Investigator
- Primary Endpoint
- Enrollment Progress:
  - Current enrollment / Target enrollment
  - Visual progress bar

**Study Status Indicators:**

- Not Started (Gray)
- Recruiting (Blue)
- Active (Green)
- Completed (Emerald)
- Suspended (Yellow)
- Terminated (Red)

### Milestones Tab

Each milestone displays:

- Milestone title and status badge
- Description
- Target Date
- Completion Date (if completed)

**Milestone Status Indicators:**

- Not Started (Gray)
- In Progress (Blue)
- Completed (Green)
- Delayed (Red)
- At Risk (Yellow)

### Editing Programs (Editor/Admin Only)

1. Open any program detail page
2. Click the "Edit Program" button in the top-right
3. Fields become editable:
   - Program name (text input)
   - Description (text area)
   - Development phase (dropdown)
   - Therapeutic area (dropdown)
   - Target indication (text input)
   - Mechanism of action (text input)
   - Project lead (text input)
   - Therapeutic lead (text input)
   - Priority (displayed in overview, editable via select)
4. Make your changes
5. Click "Save Changes" to confirm or "Cancel" to discard

**Note:** Financial data, studies, and milestones cannot be edited through the UI for data integrity.

---

## Analytics & Reporting

### Accessing Analytics

Click "Analytics" in the main navigation to access the portfolio analytics dashboard.

### Analytics Components

#### 1. Summary Cards

- **Total Portfolio Value**: Sum of all program budgets
- **Total Spend**: Total budget spent across all programs
- **Remaining Budget**: Available funds for allocation

#### 2. Programs by Development Phase

Horizontal bar chart showing program distribution across:

- Discovery
- Preclinical
- Phase 1, 2, 3
- NDA/BLA
- Approved
- Discontinued

#### 3. Programs by Therapeutic Area

Horizontal bar chart showing program distribution across therapeutic areas, sorted by count.

#### 4. Programs by Priority

Visual breakdown of programs by priority level (High, Medium, Low) with counts.

#### 5. Budget Allocation by Phase

Shows budget allocation and utilization by development phase:

- Total budget per phase
- Budget spent (progress bar)
- Utilization percentage

#### 6. Top Programs by Budget

Table showing the 10 highest-budget programs with:

- Program code and name
- Development phase
- Therapeutic area
- Total budget
- Amount spent
- Utilization percentage with visual indicator

---

## Accessibility Features

The dashboard is designed to be accessible to all users, following WCAG 2.1 Level AA guidelines:

### Keyboard Navigation

- **Tab**: Navigate through interactive elements
- **Enter/Space**: Activate buttons and links
- **Arrow Keys**: Navigate within dropdowns and menus
- All interactive elements have visible focus indicators

### Screen Reader Support

- Semantic HTML structure
- ARIA labels on all interactive elements
- Alternative text for visual information
- Proper heading hierarchy

### Visual Accessibility

- Minimum 4.5:1 contrast ratio for text
- Color is not the only means of conveying information
- Status badges include text labels, not just colors
- Resizable text without loss of functionality

### Responsive Design

- Optimized for screens 1024px and wider
- Touch-friendly targets (minimum 44x44px)
- Readable text sizes (minimum 14px)

---

**Documentation Version**: 1.0  
**Last Updated**: February 2026
