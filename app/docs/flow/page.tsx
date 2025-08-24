'use client';

import { Navigation } from '@/components/ui/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { useI18n } from '@/lib/i18n';

export default function FlowDiagramsPage() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main id="main-content" className="pb-20 md:pb-8 md:pl-64">
        <div className="px-4 py-8">
          <div className="mx-auto max-w-6xl">
            <h1 className="mb-8 text-3xl font-bold text-navy">
              PickleBay Flow Diagrams
            </h1>

            <div className="space-y-8">
              {/* Booking Flow */}
              <Card>
                <CardHeader>
                  <CardTitle>Booking Flow</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <pre className="text-sm bg-gray-900 text-green-400 p-4 rounded-lg">
{`graph TD
    A[Home Page] --> B[Browse Venues]
    B --> C[Apply Filters]
    C --> D[Select Venue]
    D --> E[View Venue Details]
    E --> F[Select Date]
    F --> G[Choose Time Slots]
    G --> H{Slots Available?}
    H -->|Yes| I[Add to Selection]
    H -->|No| J[Choose Different Time]
    I --> K[Proceed to Checkout]
    K --> L[Enter Contact Info]
    L --> M[Choose Payment Method]
    M --> N[Confirm Booking]
    N --> O[Payment Processing]
    O --> P[Booking Confirmed]
    P --> Q[Generate Calendar File]
    Q --> R[Success Page]
    J --> G
    
    style A fill:#C8FF5A,stroke:#0B1B2B
    style R fill:#C8FF5A,stroke:#0B1B2B
    style P fill:#90EE90,stroke:#006400`}
                    </pre>
                  </div>
                </CardContent>
              </Card>

              {/* Account Flow */}
              <Card>
                <CardHeader>
                  <CardTitle>Account & Preferences Flow</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <pre className="text-sm bg-gray-900 text-green-400 p-4 rounded-lg">
{`graph TD
    A[Profile Page] --> B[Basic Information]
    A --> C[Preferences & Settings]
    A --> D[Activity Summary]
    
    B --> E[Update Name/Email/Phone]
    B --> F[Set Skill Level]
    B --> G[Choose Location]
    
    C --> H[Language Toggle]
    C --> I[Senior Mode Toggle]
    C --> J[Preferred Playing Times]
    
    D --> K[View Bookings]
    D --> L[View Tournament Registrations]
    D --> M[View Statistics]
    
    E --> N[Save to localStorage]
    F --> N
    G --> N
    H --> O[Apply Language Change]
    I --> P[Toggle Accessibility Mode]
    J --> N
    
    K --> Q[Show Booking History]
    L --> R[Show Registration History]
    M --> S[Display Stats Cards]
    
    N --> T[Profile Updated]
    O --> U[UI Language Changed]
    P --> V[Font Size & Spacing Adjusted]
    
    style A fill:#C8FF5A,stroke:#0B1B2B
    style T fill:#90EE90,stroke:#006400
    style U fill:#90EE90,stroke:#006400
    style V fill:#90EE90,stroke:#006400`}
                    </pre>
                  </div>
                </CardContent>
              </Card>

              {/* Tournament Registration Flow */}
              <Card>
                <CardHeader>
                  <CardTitle>Tournament Registration Flow</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <pre className="text-sm bg-gray-900 text-green-400 p-4 rounded-lg">
{`graph TD
    A[Browse Tournaments] --> B[Apply Filters]
    B --> C[Select Tournament]
    C --> D[View Tournament Details]
    D --> E{Registration Open?}
    E -->|Yes| F[Fill Registration Form]
    E -->|No| G[Show Registration Closed]
    F --> H[Enter Personal Info]
    H --> I[Select Skill Level]
    I --> J{Doubles Tournament?}
    J -->|Yes| K[Enter Partner Name]
    J -->|No| L[Review Registration]
    K --> L
    L --> M[Submit Registration]
    M --> N[Add to Participants List]
    N --> O{Enough Participants?}
    O -->|Yes| P[Generate Tournament Bracket]
    O -->|No| Q[Wait for More Participants]
    P --> R[Display Bracket]
    Q --> S[Show Participant Count]
    
    style A fill:#C8FF5A,stroke:#0B1B2B
    style R fill:#90EE90,stroke:#006400
    style G fill:#FFB6C1,stroke:#DC143C`}
                    </pre>
                  </div>
                </CardContent>
              </Card>

              {/* Venue Creation Flow */}
              <Card>
                <CardHeader>
                  <CardTitle>Venue Creation Flow (Organizer)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <pre className="text-sm bg-gray-900 text-green-400 p-4 rounded-lg">
{`graph TD
    A[Organizer Dashboard] --> B[Add New Venue]
    B --> C[Step 1: Basic Info]
    C --> D[Enter Name & Address]
    D --> E[Select City]
    E --> F[Add Contact Info]
    F --> G[Next Step]
    G --> H[Step 2: Venue Details]
    H --> I[Set Number of Courts]
    I --> J[Set Pricing]
    J --> K[Choose Amenities]
    K --> L[Add Description]
    L --> M[Set Operating Hours]
    M --> N[Next Step]
    N --> O[Step 3: Review]
    O --> P[Preview Venue Info]
    P --> Q{Information Correct?}
    Q -->|No| R[Go Back to Edit]
    Q -->|Yes| S[Create Venue]
    S --> T[Generate Venue ID]
    T --> U[Create Time Slots]
    U --> V[Add to Venue List]
    V --> W[Redirect to Dashboard]
    R --> C
    
    style A fill:#C8FF5A,stroke:#0B1B2B
    style W fill:#90EE90,stroke:#006400`}
                    </pre>
                  </div>
                </CardContent>
              </Card>

              {/* Data Flow */}
              <Card>
                <CardHeader>
                  <CardTitle>Data Management Flow</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <pre className="text-sm bg-gray-900 text-green-400 p-4 rounded-lg">
{`graph TD
    A[App Initialization] --> B[Check localStorage]
    B --> C{Data Exists?}
    C -->|No| D[Seed Initial Data]
    C -->|Yes| E[Load Existing Data]
    
    D --> F[Load JSON Fixtures]
    F --> G[Cities Data]
    F --> H[Venues Data]
    F --> I[Slots Data]
    F --> J[Events Data]
    F --> K[Products Data]
    
    G --> L[Store in localStorage]
    H --> L
    I --> L
    J --> L
    K --> L
    
    E --> M[Application Ready]
    L --> M
    
    M --> N[User Interactions]
    N --> O[Update Local State]
    O --> P[Persist Changes]
    P --> Q[Update localStorage]
    
    Q --> R{Data Sync Needed?}
    R -->|Yes| S[Sync with Server]
    R -->|No| T[Continue Operation]
    
    S --> U[Server Response]
    U --> T
    
    style A fill:#C8FF5A,stroke:#0B1B2B
    style M fill:#90EE90,stroke:#006400
    style T fill:#90EE90,stroke:#006400`}
                    </pre>
                  </div>
                </CardContent>
              </Card>

              {/* Implementation Notes */}
              <Card>
                <CardHeader>
                  <CardTitle>Implementation Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    <h3>Key Architectural Decisions</h3>
                    <ul>
                      <li><strong>Client-Side Storage:</strong> All data is stored in localStorage for this MVP, making it completely offline-capable</li>
                      <li><strong>Data Seeding:</strong> Initial data is loaded from JSON fixtures on first app load</li>
                      <li><strong>State Management:</strong> Simple React state with localStorage persistence, no complex state management needed</li>
                      <li><strong>Mock Payments:</strong> Payment flow is simulated, no real payment processing</li>
                    </ul>

                    <h3>User Experience Flow</h3>
                    <ul>
                      <li><strong>Progressive Disclosure:</strong> Information is revealed step by step to avoid overwhelming users</li>
                      <li><strong>Clear Visual Feedback:</strong> Loading states, success confirmations, and error messages guide the user</li>
                      <li><strong>Mobile-First:</strong> All flows are optimized for mobile interaction patterns</li>
                      <li><strong>Accessibility:</strong> Senior mode and keyboard navigation support throughout</li>
                    </ul>

                    <h3>Data Relationships</h3>
                    <ul>
                      <li><strong>Venues ↔ Cities:</strong> Each venue belongs to a city</li>
                      <li><strong>Venues ↔ Slots:</strong> Each venue has multiple time slots across different courts</li>
                      <li><strong>Events ↔ Venues:</strong> Tournament events are held at specific venues</li>
                      <li><strong>Bookings ↔ Slots:</strong> Bookings reference specific time slots</li>
                      <li><strong>Registrations ↔ Events:</strong> Tournament registrations link to events</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}