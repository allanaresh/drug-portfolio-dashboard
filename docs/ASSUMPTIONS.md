# Assumptions and Architectural Decisions

## Document Purpose

This document outlines the assumptions made during development and the reasoning behind key architectural decisions for the Drug Development Portfolio Dashboard.

## Business Assumptions

### User Personas

**Assumption**: The primary users are:

1. **Portfolio Managers**: Need overview of all programs, filtering, and analytics
2. **Project Leads**: Need detailed program information and ability to update
3. **Executives**: Need high-level analytics and reporting

**Reasoning**: Based on typical clinical R&D organizational structure where portfolio managers oversee multiple programs, project leads manage individual programs, and executives need strategic insights.

### Workflow Requirements

**Assumption**: Users need to:

- Quickly browse and search large numbers of programs
- Filter by therapeutic area and development phase
- View detailed information about programs, studies, and milestones
- Edit program metadata when authorized
- Analyze portfolio metrics

**Reasoning**: These are standard portfolio management activities in pharmaceutical R&D organizations, based on industry practices.

### Data Update Frequency

**Assumption**: Program data is updated periodically (daily/weekly) rather than in real-time.

**Reasoning**: Clinical trial data changes at a moderate pace. Real-time updates are not critical for this use case, allowing for simpler architecture.

### No Patient Data

**Assumption**: The system does not store or display individual patient data.

**Reasoning**:

- Complies with HIPAA regulations
- Reduces security and compliance burden
- Portfolio managers work with aggregate enrollment numbers, not individual patients
- Separates portfolio management from clinical data management systems

---

## Technical Assumptions

### Client-Side State Management

**Assumption**: Client-side state management is sufficient for this demo.

**Reasoning**:

- Simplifies deployment (no backend required)
- Faster development for demo purposes
- Rich interactivity without API latency
- Acceptable for datasets up to ~10,000 programs

**Production Note**: A production system would use server-side data fetching with API routes.

### Modern Browser Support

**Assumption**: Users have modern browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+).

**Reasoning**:

- Enterprise users typically have updated browsers
- Allows use of modern JavaScript features
- Reduces development complexity
- Matches industry standards for healthcare web applications

### Desktop/Tablet Focus

**Assumption**: Primary usage is on desktop or tablet devices (≥1024px width).

**Reasoning**:

- Portfolio managers typically work from desks with large monitors
- Complex data tables and charts are difficult to use on small screens
- Mobile access would be a secondary feature in production

### Synthetic Data

**Assumption**: Realistic synthetic data is sufficient for demonstration.

**Reasoning**:

- Protects patient privacy
- Eliminates compliance concerns
- Allows realistic scenarios without real data access
- Demonstrates system capabilities effectively

---

## Architectural Decisions

### Decision 1: Next.js with App Router

**Options Considered**:

1. Next.js (chosen)
2. Create React App
3. Vite + React
4. Vue.js / Nuxt
5. Angular

**Chosen**: Next.js with App Router

**Reasoning**:

- **Modern Framework**: Latest React Server Components support
- **Production Ready**: Battle-tested in enterprise applications
- **Performance**: Automatic code splitting, image optimization
- **Developer Experience**: Fast Refresh, TypeScript support, great documentation
- **Ecosystem**: Large community, extensive plugins
- **Future-Proof**: Can easily add API routes and server-side features later

**Trade-offs**:

- Slightly more complex than CRA
- Requires understanding of Next.js conventions

### Decision 2: TypeScript

**Options Considered**:

1. TypeScript (chosen)
2. JavaScript with JSDoc
3. JavaScript without types

**Chosen**: TypeScript

**Reasoning**:

- **Type Safety**: Catch errors at compile time
- **Better IDE Support**: Autocomplete, refactoring
- **Documentation**: Types serve as inline documentation
- **Maintainability**: Easier to refactor large codebases
- **Industry Standard**: Expected in modern React projects

**Trade-offs**:

- Initial setup overhead
- Learning curve for developers unfamiliar with TypeScript

### Decision 3: Tailwind CSS

**Options Considered**:

1. Tailwind CSS (chosen)
2. CSS Modules
3. Styled Components
4. Material-UI
5. Chakra UI

**Chosen**: Tailwind CSS

**Reasoning**:

- **Rapid Development**: Utility-first approach speeds up UI development
- **Consistency**: Design system tokens built-in
- **Performance**: Purges unused CSS automatically
- **Customization**: Easy to customize without fighting framework
- **No Runtime**: Pure CSS, no JavaScript runtime cost
- **Industry Adoption**: Widely used and supported

**Trade-offs**:

- Class names can be verbose
- Learning curve for developers new to utility-first CSS

### Decision 4: React Context API

**Options Considered**:

1. React Context API (chosen)
2. Redux / Redux Toolkit
3. Zustand
4. Jotai
5. Recoil

**Chosen**: React Context API

**Reasoning**:

- **Built-in**: No external dependencies
- **Sufficient Complexity**: State needs are moderate (auth + data)
- **Simple Mental Model**: Easy to understand and maintain
- **Local State**: Complements component-level useState
- **Performance**: Acceptable for this scale with proper context splitting

**Trade-offs**:

- Can cause unnecessary re-renders if not carefully structured
- No built-in devtools (unlike Redux)
- More boilerplate than some alternatives (Zustand)

**Mitigation**: Split into AuthContext and DataContext to minimize re-renders.

### Decision 5: Client-Side Data Generation

**Options Considered**:

1. Client-side synthetic data generation (chosen)
2. Static JSON files
3. Mock API server
4. Real database with seed data

**Chosen**: Client-side synthetic data generation

**Reasoning**:

- **Zero Dependencies**: No backend or API required
- **Reproducible**: Same data every time
- **Realistic**: Can generate large datasets
- **Educational**: Shows data structure clearly
- **Demo-Friendly**: Works in any environment (CodeSandbox, local, deployed)

**Trade-offs**:

- Initial load includes data generation cost (~100ms for 50 programs)
- Not representative of production architecture

---

## Design Decisions

### Decision 1: Clean, Professional Healthcare UI

**Approach**: Clean, data-focused interface with clinical aesthetic

**Reasoning**:

- **User Expectations**: Healthcare professionals expect professional, clean interfaces
- **Data Density**: Need to display lots of information without clutter
- **Trust**: Clean design builds confidence in data accuracy
- **Accessibility**: Simple layouts are easier to make accessible
- **Consistency**: Matches industry standards (FDA, EMA portals)

**Implementation**:

- White backgrounds with subtle borders
- Blue primary color (trustworthy, clinical)
- Generous whitespace
- Clear typography hierarchy
- Status indicators with both color and text

### Decision 2: Card-Based Program Display

**Options Considered**:

1. Card grid (chosen for main view)
2. Table only
3. List view

**Chosen**: Card grid with table toggle

**Reasoning**:

- **Visual Scanning**: Cards easier to scan than dense tables
- **Information Hierarchy**: Cards can show prioritized information
- **Flexibility**: Toggle allows power users to use table view
- **Modern Pattern**: Familiar from popular applications

**Trade-offs**:

- Cards take more vertical space
- Table better for comparing specific fields

**Mitigation**: Provide both views with toggle.

### Decision 3: Sidebar Filters

**Options Considered**:

1. Left sidebar (chosen)
2. Top bar filters
3. Modal/drawer filters
4. Inline filters

**Chosen**: Left sidebar

**Reasoning**:

- **Persistent Visibility**: Always visible, no need to open
- **Vertical Space**: Desktop screens have more horizontal than vertical space
- **Familiar Pattern**: Common in dashboards (e.g., AWS Console, GitHub)
- **Grouping**: Natural grouping of filter categories

### Decision 4: Color-Coded Status Indicators

**Approach**: Use color + text labels for all status indicators

**Reasoning**:

- **Accessibility**: Color alone is not accessible to colorblind users
- **Clarity**: Text removes ambiguity
- **Consistency**: All status badges follow same pattern
- **Industry Standard**: Common in healthcare applications

**Color Scheme**:

- Green: Positive status (Completed, Active)
- Yellow: Warning status (At Risk, Moderate priority)
- Red: Negative status (Delayed, Terminated)
- Blue: Neutral/In Progress
- Gray: Not Started / Low priority

---

## Data Model Decisions

### Decision 1: Hierarchical Structure (Program > Studies + Milestones)

**Approach**: Programs as top-level entities with child Studies and Milestones

**Reasoning**:

- **Natural Hierarchy**: Reflects real-world organization
- **Data Integrity**: Clear ownership and relationships
- **Query Patterns**: Most queries start at program level
- **Scalability**: Can query programs without loading all studies

**Alternative Considered**: Flat structure with program_id foreign keys

- Rejected: Less intuitive, harder to maintain referential integrity

### Decision 2: Enum-Based Categories

**Approach**: Use TypeScript enums for DevelopmentPhase, TherapeuticArea, etc.

**Reasoning**:

- **Type Safety**: Prevents invalid values
- **Autocomplete**: IDE can suggest valid values
- **Refactoring**: Easy to rename across codebase
- **Validation**: Compile-time checking

**Trade-offs**:

- Less flexible than string unions for runtime changes
- Must update code to add new values

**Mitigation**: In production, these could be database-driven while maintaining type safety through code generation.

### Decision 3: Separate User and Authorization

**Approach**: Simple role-based access control (Viewer, Editor, Admin)

**Reasoning**:

- **Sufficient Granularity**: Matches typical org structure
- **Simple Implementation**: Easy to understand and maintain
- **Demo Friendly**: Easy to demonstrate different permission levels
- **Expandable**: Can add more roles/permissions later

**Production Alternative**: Consider attribute-based access control (ABAC) for finer-grained permissions.

### Decision 4: Date Storage as ISO Strings

**Approach**: Store dates as ISO 8601 strings (YYYY-MM-DD)

**Reasoning**:

- **Simplicity**: No date parsing/serialization issues
- **Readability**: Human-readable in data
- **Sortable**: Lexicographic sorting works
- **JSON Compatible**: Works in JSON without transformation

**Trade-offs**:

- No timezone information
- Must parse to Date object for calculations

**Mitigation**: Acceptable for demo; production would use proper datetime types with timezone support.

---

## Security & Compliance Assumptions

### HIPAA Compliance

**Assumption**: System does not need to be HIPAA compliant in demo form.

**Reasoning**:

- No real patient data (PHI)
- No real user data (PII)
- Synthetic data only

**Production Requirements**:

- Encryption at rest and in transit
- Audit logging
- Access controls
- Business Associate Agreements
- Validation documentation

### GxP Compliance

**Assumption**: System is not GxP validated in demo form.

**Reasoning**:

- Demo/prototype stage
- No regulatory submissions

**Production Requirements**:

- 21 CFR Part 11 compliance (electronic signatures)
- Validation documentation (IQ/OQ/PQ)
- Change control
- Data integrity (ALCOA+ principles)

### Data Privacy

**Assumption**: No personal data is collected or stored.

**Reasoning**:

- Complies with GDPR, CCPA without additional measures
- Simplifies demo deployment

**Production**: Would require privacy policy, consent management, data retention policies.

---

## Scalability Considerations

### Current Scale Assumptions

**Assumption**: System handles up to 1,000 programs efficiently in current form.

**Testing**: Performance tested with 50 programs in demo. Extrapolated to 1,000 based on:

- O(n) filtering complexity
- React rendering performance
- Browser memory limits

### Scaling to 10,000+ Programs

**Required Changes**:

1. **Virtual Scrolling**: Render only visible cards
2. **Server-Side Filtering**: Move filtering to backend
3. **Pagination**: Limit results per page
4. **Indexed Search**: Use ElasticSearch or similar
5. **Caching**: Implement Redis for frequently accessed data

### Database Considerations

**Assumption**: For production, PostgreSQL would be appropriate.

**Reasoning**:

- **Relational Data**: Clear relationships between entities
- **ACID Compliance**: Critical for clinical data
- **Mature Ecosystem**: Well-understood, widely supported
- **JSON Support**: Can store flexible metadata
- **Full-Text Search**: Built-in search capabilities

**Alternative**: MongoDB could work but less suitable for complex relationships.

---

## Trade-offs

### 1. Client-Side vs Server-Side

**Chosen**: Client-side state management

**Trade-off**:

- Faster development
- No backend infrastructure
- Works offline
- Data resets on refresh
- Not suitable for multi-user editing
- Scales poorly beyond ~10k records

**When to Reconsider**: Production deployment with real users and data.

### 2. Context API vs Redux

**Chosen**: React Context API

**Trade-off**:

- Simpler setup
- No external dependencies
- Sufficient for moderate complexity
- No time-travel debugging
- Can cause re-render issues
- Less performant at very large scale

**When to Reconsider**: If state management becomes complex or performance issues arise.

### 3. Tailwind vs Component Library

**Chosen**: Tailwind CSS

**Trade-off**:

- Full design control
- Smaller bundle size
- No runtime JavaScript
- Custom healthcare aesthetic
- More initial development time
- Manual accessibility implementation
- No built-in complex components

**When to Reconsider**: If rapid prototyping is more important than custom design.

### 4. TypeScript vs JavaScript

**Chosen**: TypeScript

**Trade-off**:

- Type safety
- Better tooling
- Self-documenting
- Initial learning curve
- More verbose
- Compile step required

**When to Reconsider**: Never for a production healthcare application.

### 5. Desktop-First vs Mobile-First

**Chosen**: Desktop-first (1024px+)

**Trade-off**:

- Better use of screen space for complex data
- Matches primary use case
- Easier data table design
- Less accessible on mobile
- Requires responsive design work for mobile

**When to Reconsider**: If mobile usage becomes significant.

---

## Validation of Assumptions

### How to Validate

1. **User Testing**: Test with actual portfolio managers
2. **Performance Testing**: Load test with realistic data volumes
3. **Accessibility Audit**: Third-party WCAG audit
4. **Security Review**: Penetration testing and code review
5. **Compliance Audit**: GxP and HIPAA compliance review

### Key Metrics to Track

- **Performance**: Page load time, filter response time
- **Usability**: Task completion rate, time-on-task
- **Accessibility**: WCAG compliance score, screen reader compatibility
- **Reliability**: Uptime, error rate
- **Adoption**: Daily active users, feature usage

---

## Conclusion

The architectural decisions documented here prioritize:

1. **Rapid Development**: Client-side architecture for quick demo
2. **Quality**: TypeScript, accessibility, professional design
3. **Scalability**: Designed with production evolution in mind
4. **Maintainability**: Clear structure, comprehensive documentation
5. **Healthcare Standards**: HIPAA-ready, GxP-ready architecture

All assumptions are documented with clear reasoning and known trade-offs, making it straightforward to evolve the system as requirements change.

---

**Document Version**: 1.0  
**Last Updated**: February 2026  
**Review Cycle**: Quarterly or on major architecture changes
