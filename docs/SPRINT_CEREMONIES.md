# SPRINT CEREMONIES & AGILE RITUALS

**Executive Summary:** Comprehensive guide to structured Scrum ceremonies and agile rituals for the Lavus Restaurant App development lifecycle. This document provides detailed agendas, facilitation scripts, expected outcomes, and best practices for each ceremonial touchpoint, ensuring consistent execution and maximum value extraction from collaborative team events.

**Last Updated:** 2025-11-12  
**Document Owner:** Scrum Master / Agile Coach  
**Review Frequency:** Monthly or as team composition/process evolves

---

## Foundational Principles of Effective Ceremonies

### Purpose & Value of Scrum Ceremonies

Scrum ceremonies serve as structured collaboration frameworks that:

1. **Establish Rhythmic Cadence:** Creating predictable touchpoints that structure work and communication patterns
2. **Foster Transparency:** Providing visibility into progress, challenges, and decision-making processes
3. **Enable Inspection:** Creating opportunities to examine work artifacts, processes, and team dynamics
4. **Facilitate Adaptation:** Empowering teams to adjust course based on empirical evidence and feedback
5. **Build Shared Understanding:** Aligning team members and stakeholders on priorities, constraints, and expectations
6. **Strengthen Team Cohesion:** Creating collaborative spaces that build trust, communication, and collective ownership

### Ceremony Anti-Patterns to Avoid

⚠️ **Common Pitfalls:**

- **Status Report Meetings:** Ceremonies devolving into one-way information broadcasts rather than collaborative discussions
- **Over-Timeboxing:** Rigidly cutting off valuable discussions to meet arbitrary time limits without flexibility
- **Poor Preparation:** Participants arriving unprepared, forcing unproductive use of ceremony time
- **Dominance by Few:** Limited voices controlling discussions while others remain passive observers
- **Lack of Follow-Through:** Failing to act on decisions or action items identified during ceremonies
- **Meeting Fatigue:** Over-ceremonialization creating excessive overhead without proportional value

### Modified Ceremonies for Solo Development

For solo developers or very small teams (1-3 people):

- **Compress Timeboxes:** Reduce ceremony duration proportionally to team size
- **Combine Related Activities:** Merge planning and grooming when appropriate
- **Asynchronous Components:** Document findings rather than holding formal meetings for some ceremonies
- **AI Pair Programming Integration:** Leverage AI assistants (GitHub Copilot, ChatGPT) as virtual team members for rubber duck debugging and technical discussion

---

## 1. Sprint Planning Ceremony

### Sprint Planning Overview

**Primary Objective:** Collaboratively establish the sprint goal, select user stories from the product backlog, decompose work into actionable tasks, and commit to a realistic sprint scope that balances ambition with achievability.

**Participants:**

- **Product Owner (Required):** Clarifies business priorities, acceptance criteria, and stakeholder expectations
- **Development Team (Required):** Estimates effort, identifies technical dependencies, and commits to deliverables
- **Scrum Master (Required):** Facilitates discussion, manages timebox, removes impediments

**Timebox:** 60-90 minutes (adjust based on sprint duration: 1 hour per week of sprint)

**Prerequisites (Definition of Ready):**

- Product backlog prioritized by Product Owner with top stories detailed
- Acceptance criteria defined for candidate stories
- Technical dependencies identified and documented
- Team capacity calculated based on availability and historical velocity

---

### Sprint Planning Agenda Structure

#### Phase 1: Context Setting & Business Alignment (10 minutes)

**Activities:**

1. **Product Owner Opening:** Present sprint business objectives and strategic context
2. **Review Previous Sprint:** Quick retrospective on carryover items and lessons learned
3. **Declare Team Capacity:** Calculate available hours/points based on PTO, meetings, and velocity trends

**Facilitation Script:**

```text
Scrum Master: "Welcome to Sprint <<SPRINT_NUMBER>> Planning. Before we dive in, let's align on capacity.
              Based on the team's 3-sprint rolling average of 38 points and accounting for [Developer B]'s
              2-day PTO, our planning capacity is approximately 32-35 points. [Product Owner], please share
              the business goals for this sprint."

Product Owner: "Our primary goal this sprint is to enhance the reservation flow, enabling users to select
               date and time slots more intuitively. Secondary goals include implementing menu filtering
               by dietary preferences and addressing three critical bugs from production monitoring."

Scrum Master: "Excellent. Let's review the top-priority items in the backlog."
```

---

#### Phase 2: Backlog Review & Story Clarification (20 minutes)

**Activities:**

1. **Story Walkthrough:** Product Owner presents top-priority user stories with business value explanation
2. **Acceptance Criteria Review:** Team asks clarifying questions to eliminate ambiguity
3. **Dependency Identification:** Surface technical dependencies, API contracts, design asset needs
4. **DoR Validation:** Confirm each candidate story meets Definition of Ready criteria

**Key Questions to Address:**

- What is the user problem being solved?
- What does success look like from a user perspective?
- Are there edge cases or error scenarios to handle?
- What are the API contracts or data requirements?
- Are design assets (Figma screens) finalized and accessible?
- Are there dependencies on external teams or services?

**Sample Exchange:**

```text
Developer A: "For the reservation date selection story, will the API return available time slots
             based on restaurant capacity, or should we show all slots with availability status?"

Product Owner: "The backend will return only available slots. The endpoint is
               GET /api/reservations/slots?date=YYYY-MM-DD&partySize=N, returning an array of
               {time, capacity} objects. I'll link the API documentation in the story description."

Developer B: "Are we handling timezone considerations, or is everything in local restaurant time?"

Product Owner: "Local restaurant time only for MVP. We'll add timezone support in Q2."

Scrum Master: "Great clarification. Let's document that assumption in the acceptance criteria."
```

---

#### Phase 3: Effort Estimation (20 minutes)

**Activities:**

1. **Planning Poker:** Team estimates story points using modified Fibonacci sequence (1, 2, 3, 5, 8, 13, 20)
2. **Divergence Discussion:** When estimates vary significantly (>3 points difference), discuss assumptions
3. **Consensus Building:** Converge on agreed estimate or break story into smaller pieces
4. **Complexity Flagging:** Identify stories >13 points for decomposition

**Estimation Guidelines:**

| Story Points   | Effort Interpretation | Typical Complexity                             |
| -------------- | --------------------- | ---------------------------------------------- |
| **1 point**    | ~4 hours              | Trivial change (color adjustment, text update) |
| **2 points**   | ~8 hours              | Small feature (new button with action)         |
| **3 points**   | ~12 hours             | Medium feature (form with validation)          |
| **5 points**   | ~20 hours             | Complex feature (API integration + UI)         |
| **8 points**   | ~32 hours             | Very complex (multi-screen flow)               |
| **13 points**  | ~52 hours             | Should be decomposed into smaller stories      |
| **20+ points** | Epic-level            | Must be broken down before sprint commitment   |

**Estimation Dialogue Example:**

```text
Scrum Master: "Let's estimate the reservation time slot selection story. Please show your cards."

[Team reveals: Developer A = 5, Developer B = 3, Developer C = 8]

Scrum Master: "We have some divergence. Developer C, why 8 points?"

Developer C: "I'm concerned about handling real-time slot updates if another user books simultaneously.
             We'll need optimistic locking or polling logic."

Developer A: "That's fair, but the requirements don't mention real-time updates. I assumed a simple
            fetch on page load. Product Owner, can you clarify?"

Product Owner: "For MVP, we're okay with stale data with a refresh button. Real-time updates are v2."

Developer C: "In that case, I'll revise to 5 points."

Developer B: "Actually, I initially underestimated the UI complexity with different time slot layouts.
            I'll also go with 5."

Scrum Master: "Consensus at 5 points. Moving on to the next story..."
```

---

#### Phase 4: Capacity Alignment & Scope Refinement (15 minutes)

**Activities:**

1. **Calculate Committed Points:** Sum estimated points of selected stories
2. **Capacity Check:** Ensure commitment aligns with team capacity (typically 80-90% of velocity to allow buffer)
3. **Scope Adjustment:** Add or remove stories to fit capacity envelope
4. **Risk Buffer:** Reserve 10-20% capacity for unforeseen complexity or production issues

**Capacity Calculation Example:**

```text
Team Capacity: 35 points (based on 3-sprint rolling average and current availability)

Selected Stories:
1. Reservation date/time selection - 5 points
2. Dietary preference filters - 8 points
3. Menu search functionality - 5 points
4. Profile photo upload - 3 points
5. Bug fix: Rewards point calculation - 2 points
6. Bug fix: Navigation back stack issue - 2 points
7. Technical debt: Refactor auth flow - 5 points

Total Committed: 30 points (85.7% of capacity)
Buffer: 5 points (14.3% for unforeseen issues)

Scrum Master: "We're at 30 committed points with a healthy 5-point buffer. This aligns with our
              capacity planning principles. Are we comfortable with this scope?"

Team: [Thumbs up consensus]
```

---

#### Phase 5: Sprint Goal Definition (10 minutes)

**Activities:**

1. **Synthesize Themes:** Identify common thread across committed stories
2. **Craft Goal Statement:** Create concise, outcome-focused goal (1-2 sentences)
3. **Validate Alignment:** Ensure goal reflects business priorities and technical reality
4. **Document Visibly:** Post sprint goal in team workspace and project management tool

**Sprint Goal Characteristics:**

- **Outcome-Oriented:** Focuses on user value, not tasks
- **Concise:** Fits on a sticky note or tweet (< 280 characters)
- **Measurable:** Success can be demonstrated in sprint review
- **Aligned:** Reflects product roadmap priorities

**Sprint Goal Examples:**

✅ **Good:**

> "Enable users to make restaurant reservations by selecting their preferred date, time, and party size with real-time availability feedback, improving conversion from browse to book."

✅ **Good:**

> "Implement comprehensive menu discovery features including search, dietary filtering, and category browsing to reduce time-to-order by 30%."

❌ **Poor (Too Vague):**

> "Work on the reservation system."

❌ **Poor (Task-Focused, Not Outcome):**

> "Complete stories #45, #47, #52, and #61."

---

#### Phase 6: Risk Identification & Mitigation Planning (10 minutes)

**Activities:**

1. **Technical Risks:** Identify integration dependencies, infrastructure concerns, technical unknowns
2. **Resource Risks:** Flag PTO, team capacity constraints, external dependencies
3. **Scope Risks:** Note stories with high uncertainty or potential for scope creep
4. **Mitigation Strategies:** Define proactive actions to address each identified risk

**Risk Register Template:**

| Risk Description                              | Probability | Impact | Mitigation Strategy                                     | Owner |
| --------------------------------------------- | ----------- | ------ | ------------------------------------------------------- | ----- |
| Backend API for time slots not ready by Day 2 | Medium      | High   | Front-load API contract discussion; prepare mock data   | Dev A |
| Figma designs for dietary filters pending     | Low         | Medium | Use wireframes for structure; apply final styling later | Dev B |
| Real-device testing unavailable               | Low         | Low    | Extended emulator testing; request device from PO       | SM    |

---

#### Phase 7: Task Decomposition & Assignment (15 minutes)

**Activities:**

1. **Break Down Stories:** Decompose each user story into granular technical tasks
2. **Volunteer Ownership:** Team members self-assign tasks based on expertise and interest
3. **Pairing Opportunities:** Identify complex tasks suitable for pair programming
4. **Update Board:** Move committed stories to "Ready" column; create task cards if using task-level tracking

**Task Breakdown Example:**

**User Story:** Reservation date/time selection (5 points)

- [ ] Design data models for slot availability (1h) - Dev A
- [ ] Implement API client for `/api/reservations/slots` (2h) - Dev A
- [ ] Create DatePicker component with calendar UI (4h) - Dev B
- [ ] Build TimeSlotSelector component (3h) - Dev B
- [ ] Integrate components with reservation flow (3h) - Dev A
- [ ] Write unit tests for components (2h) - Dev B
- [ ] Write integration tests for booking flow (3h) - Dev C
- [ ] Update reservation screen with new components (2h) - Dev C

---

### Sprint Planning Outputs & Artifacts

**Mandatory Deliverables:**

1. **Sprint Goal Statement:** Published in team workspace and project management tool
2. **Committed Stories List:** User stories selected for sprint with story point estimates
3. **Sprint Backlog:** Detailed task breakdown with assignments
4. **Risk Register:** Documented risks with mitigation plans and owners
5. **Capacity Allocation:** Record of planned vs. available capacity

**Documentation Template:**

```markdown
# Sprint <<SPRINT_NUMBER>> Plan

**Sprint Duration:** <<START_DATE>> to <<END_DATE>>  
**Sprint Goal:** <<GOAL_STATEMENT>>

## Team Capacity

- **Available Capacity:** <<POINTS>> story points
- **Committed Scope:** <<COMMITTED_POINTS>> points
- **Buffer:** <<BUFFER_POINTS>> points (<<PERCENTAGE>>%)

## Committed User Stories

1. [#<<ISSUE>>] <<STORY_TITLE>> - <<POINTS>> points - <<ASSIGNEE>>
2. [#<<ISSUE>>] <<STORY_TITLE>> - <<POINTS>> points - <<ASSIGNEE>>
   ...

## Identified Risks

| Risk                 | Mitigation          | Owner     |
| -------------------- | ------------------- | --------- |
| <<RISK_DESCRIPTION>> | <<MITIGATION_PLAN>> | <<OWNER>> |

## Definition of Done Reminder

- [ ] All acceptance criteria met
- [ ] Code reviewed and approved
- [ ] Tests written with ≥70% coverage
- [ ] Documentation updated
- [ ] No critical bugs or blockers
```

---

## 2. Daily Standup

### Tujuan

Sinkron status & hambatan.

### Timebox

15 menit.

### Format 3 Pertanyaan

1. Apa yang dikerjakan kemarin?
2. Apa yang akan dikerjakan hari ini?
3. Ada hambatan?

### Contoh

```text

---

## 2. Daily Standup (Daily Scrum)

### Daily Standup Overview

**Primary Objective:** Synchronize team activities, surface impediments requiring immediate attention, and maintain transparency on sprint progress through brief, focused daily touchpoints.

**Participants:**
- **Development Team (Required):** All team members actively working on sprint backlog
- **Scrum Master (Optional but Recommended):** Facilitates and captures impediments for resolution
- **Product Owner (Optional):** Attends to stay informed; should not direct daily work

**Timebox:** 15 minutes maximum (strictly enforced)

**Cadence:** Daily at consistent time (typically morning to set daily direction)

**Format:** Stand-up (or virtual equivalent) to maintain energy and brevity

---

### The Three-Question Framework

Each team member addresses three focused questions:

#### 1. What did I accomplish yesterday?

**Purpose:** Share completed work to maintain team awareness and celebrate progress

**Guidance:**
- Focus on completed user stories, tasks, or tangible progress
- Reference specific work items (e.g., "Completed story #45 - MenuCard component")
- Highlight blockers that were resolved

**Example:**
> "Yesterday I completed the implementation of the MenuCard component with all props configured and unit tests achieving 85% coverage. I also resolved the API integration issue we discussed on Monday by adding proper error boundary handling."

---

#### 2. What will I work on today?

**Purpose:** Communicate daily intentions and identify potential collaboration opportunities

**Guidance:**
- Be specific about planned activities and work items
- Signal if you'll need support or collaboration from teammates
- Align daily work with sprint goal

**Example:**
> "Today I'm starting on the dietary filter feature, specifically building the FilterChipGroup component. I'll also need to pair with [Developer B] this afternoon to finalize the API contract for the filter endpoint."

---

#### 3. Are there any impediments blocking my progress?

**Purpose:** Surface blockers early for rapid resolution

**Guidance:**
- Distinguish between blockers (preventing progress) and challenges (slowing progress)
- Be specific about what's blocked and what would unblock it
- Avoid solving problems during standup; defer detailed discussions

**Examples:**

✅ **Good (Specific):**
> "I'm blocked on the reservation API integration because the staging environment has been returning 500 errors since yesterday evening. I need DevOps support to investigate server logs."

✅ **Good (Action-Oriented):**
> "The Figma designs for the rewards screen aren't finalized yet, which is blocking story #52. I can proceed with wireframes for now, but I'll need final designs by Wednesday to avoid rework."

❌ **Poor (Too Vague):**
> "Everything is fine, no blockers."

❌ **Poor (Solution Discussion):**
> "The API is slow, so maybe we should refactor the caching layer and implement Redis, or perhaps switch to GraphQL subscriptions..."

---

### Facilitation Best Practices

#### Maintaining Energy & Focus

- **Start Promptly:** Begin exactly at scheduled time; latecomers catch up asynchronously
- **Use Timer:** Visible countdown timer to maintain awareness of timebox
- **Park Discussions:** Redirect detailed technical conversations to "parking lot" for post-standup discussion
- **Rotate Facilitator:** Distribute facilitation responsibility to build team ownership

#### Common Anti-Patterns to Avoid

⚠️ **Status Report to Manager:** Team members speaking TO the Scrum Master rather than WITH each other
⚠️ **Problem-Solving Session:** Attempting to resolve complex issues during the 15-minute window
⚠️ **Excessive Detail:** Describing every code change rather than outcome-focused updates
⚠️ **Passive Participation:** Team members multitasking or disengaged during others' updates
⚠️ **Irregular Attendance:** Inconsistent participation undermining synchronization value

---

### Sample Standup Dialogue

```text
Scrum Master: "Good morning team. Let's start our standup. We have 15 minutes. [Developer A], please begin."

Developer A: "Yesterday I completed the MenuCard component implementation with all unit tests passing.
             Today I'm integrating the component with the menu listing screen and adding loading states.
             One challenge: the staging API is responding slowly with 2-3 second latency, which makes
             testing difficult. Not blocked yet, but if it persists I may need mock data."

Scrum Master: "Noted. Let's check API performance post-standup. [Developer B]?"

Developer B: "I finished the date picker UI yesterday and started on the time slot selector component.
             Today I'll complete the time slot logic and write integration tests. I'm currently blocked
             on the API contract - I need clarification on how unavailable slots are represented in the
             response. [Product Owner], can we sync after standup?"

Product Owner: "Yes, I'll share the updated API documentation right after this meeting."

Developer C: "Yesterday I resolved the navigation back stack bug (#67) and submitted PR for review.
             Today I'm addressing review comments and starting on the profile photo upload feature.
             No blockers, but I'll need [Developer A] to review my PR by end of day if possible."

Developer A: "I'll prioritize your PR review before lunch."

Scrum Master: "Excellent. Quick board check: we have 18 points remaining with 5 days left in the sprint.
              We're slightly behind ideal burndown but within recovery range. Three items in code review
              need attention. Let's focus on unblocking those today. [Developer B] and [Product Owner],
              please connect on API contracts. [Developer A], let me know if API performance doesn't
              improve by midday. Meeting adjourned. Parking lot topics: API performance investigation."
````

---

### Solo Developer / Small Team Adaptations

For solo developers or 2-3 person teams:

**Async Standup Alternative:**

- Post daily update in shared doc or Slack channel
- Include: Yesterday's progress, Today's plan, Blockers
- Review team updates at start of workday

**Example Async Update:**

```markdown
## Daily Update - 2025-11-12

### ✅ Yesterday (Completed)

- Implemented MenuCard component with responsive sizing
- Added unit tests (87% coverage)
- Fixed API error handling in useFetchMenu hook

### 🎯 Today (Planned)

- Integrate MenuCard into MenuListScreen
- Add loading and empty states
- Begin dietary filter chip UI

### 🚧 Blockers / Challenges

- Staging API latency (2-3s responses) - will use mock data if persists
- Awaiting final Figma designs for filter UI - using wireframes for now
```

---

## 3. Backlog Refinement (Grooming) Ceremony

### Backlog Refinement Overview

**Primary Objective:** Collaboratively prepare upcoming backlog items for future sprint planning by clarifying requirements, decomposing large stories, estimating effort, and ensuring Definition of Ready compliance.

**Participants:**

- **Product Owner (Required):** Provides business context and clarifies requirements
- **Development Team (Required):** Asks clarifying questions and provides estimation
- **Scrum Master (Facilitator):** Guides discussion and timebox management

**Timebox:** 30-60 minutes (typically mid-sprint)

**Cadence:** Weekly or as needed (typically 5-10% of sprint capacity)

**Prerequisites:** Product Owner has drafted user stories with initial business context

---

### Backlog Refinement Agenda Structure

#### Phase 1: Prioritization Review (5 minutes)

**Activities:**

- Product Owner shares any shifts in backlog priority since last session
- Team notes any newly added stories or changed dependencies
- Confirm which stories to refine in this session (focus on top of backlog)

---

#### Phase 2: Story Walkthrough & Clarification (20-30 minutes)

**Activities:**

1. **Business Context:** Product Owner explains user problem and business value
2. **Acceptance Criteria Review:** Team validates clarity and testability of criteria
3. **Technical Discussion:** Team surfaces implementation approaches and dependencies
4. **Edge Case Identification:** Collaborative exploration of error scenarios and boundary conditions
5. **Definition of Ready Validation:** Ensure story meets readiness criteria

**Clarifying Questions to Ask:**

- Who is the target user for this feature?
- What problem does this solve from the user's perspective?
- What does success look like? How will we measure it?
- Are there design mockups or wireframes available?
- What are the API dependencies or data requirements?
- Are there performance, security, or accessibility considerations?
- What happens when [edge case scenario]?

**Sample Refinement Dialogue:**

```text
Product Owner: "Next story is implementing a favorites feature allowing users to save preferred menu
               items for quick reordering. The business value is reducing browse-to-order time and
               increasing order frequency for repeat customers."

Developer A: "Will favorites be persisted server-side or locally on device?"

Product Owner: "Server-side with local caching. We want favorites accessible across devices."

Developer B: "What's the maximum number of favorite items a user can have?"

Product Owner: "Good question. Let's say 50 items max to prevent database bloat. I'll add that to
               acceptance criteria."

Developer C: "Should favoriting happen optimistically with offline support, or require network connection?"

Product Owner: "Optimistic with sync when online. If offline, show favorites from cache and sync
               changes when connection returns."

Scrum Master: "That sounds like additional complexity. Should we capture offline sync as a separate
             technical story?"

Team: [Discussion ensues, decision to split into: (1) Basic favorites with network requirement,
      (2) Offline sync enhancement for follow-up sprint]
```

---

#### Phase 3: Story Decomposition (10-15 minutes)

**Activities:**

1. **Identify Large Stories:** Flag stories estimated >13 points or with uncertain scope
2. **Decomposition Strategies:** Apply vertical slicing, workflow steps, or architectural layers
3. **Create Sub-Stories:** Break down into independently deliverable pieces
4. **Maintain Value:** Ensure each piece delivers user value or enables future value

**Decomposition Techniques:**

| Technique                     | Description                            | Example                                                                                     |
| ----------------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------- |
| **Workflow Steps**            | Split by user journey stages           | Favorites: (1) Add to favorites, (2) View favorites list, (3) Remove from favorites         |
| **CRUD Operations**           | Separate Create, Read, Update, Delete  | Menu Admin: (1) Create menu item, (2) Edit item, (3) Delete item, (4) List all items        |
| **Happy Path vs. Edge Cases** | Basic flow first, error handling later | Reservation: (1) Happy path booking, (2) Error handling & validation, (3) Cancellation flow |
| **Architectural Layers**      | Front-end, back-end, integration       | Payment: (1) UI components, (2) API integration, (3) State management                       |
| **Device/Platform**           | iOS-specific, Android-specific, shared | Push Notifications: (1) Android setup, (2) iOS setup, (3) Shared notification logic         |

---

#### Phase 4: Preliminary Estimation (10-15 minutes)

**Activities:**

1. **Relative Sizing:** Use Planning Poker or affinity estimation for refined stories
2. **Confidence Levels:** Capture estimation uncertainty (high/medium/low confidence)
3. **Spike Identification:** Flag stories requiring technical investigation before accurate estimation
4. **Defer Precision:** Initial ballpark estimates acceptable; formal estimation occurs in sprint planning

**Estimation Confidence Levels:**

- **High Confidence:** Similar to previously completed work; clear technical approach
- **Medium Confidence:** Some unknowns but general approach understood
- **Low Confidence:** Significant technical uncertainty; consider spike story

---

#### Phase 5: Definition of Ready Validation (5 minutes)

**Activities:**

Confirm each refined story meets Definition of Ready criteria:

- [ ] **User Story Format:** Written as "As a [user], I want [goal], so that [benefit]"
- [ ] **Acceptance Criteria:** Clear, testable success conditions defined
- [ ] **Dependencies Identified:** External team, API, or design dependencies documented
- [ ] **Estimation Completed:** Story points assigned with reasonable confidence
- [ ] **Design Assets Available:** Mockups, wireframes, or style guide references linked
- [ ] **Size Appropriate:** Story sized for completion within single sprint (≤13 points)
- [ ] **Business Value Clear:** Team understands user problem and business justification

**Mark Ready:** Stories meeting all criteria move to "Ready for Sprint Planning" status

---

### Backlog Refinement Outputs

**Deliverables:**

1. **Refined Backlog:** Top 2-3 sprints worth of stories meeting Definition of Ready
2. **Decomposed Stories:** Large epics broken into sprint-sized increments
3. **Preliminary Estimates:** Story point estimates (to be confirmed in sprint planning)
4. **Clarified Requirements:** Updated acceptance criteria and requirement details
5. **Identified Spikes:** Technical investigation stories for uncertain areas

---

## 4. Sprint Review (Sprint Demo)

### Sprint Review Overview

**Primary Objective:** Demonstrate completed increment to stakeholders, gather feedback on delivered functionality, and inform product backlog prioritization based on stakeholder input and market learnings.

**Participants:**

- **Development Team (Required):** Demonstrates completed work
- **Product Owner (Required):** Contextualizes work and accepts deliverables
- **Scrum Master (Facilitator):** Guides agenda and captures feedback
- **Stakeholders (Invited):** Business sponsors, end users, customer representatives, executives

**Timebox:** 30-60 minutes (proportional to sprint length)

**Cadence:** End of each sprint (last day, typically afternoon)

**Environment:** Working software in demo environment (not PowerPoint presentations)

---

### Sprint Review Agenda Structure

#### Phase 1: Sprint Context & Goals (5 minutes)

**Activities:**

- Product Owner recaps sprint goal and business objectives
- Review sprint metrics: committed vs. completed points, velocity trend
- Acknowledge carryover items and reason for incompletion (if applicable)

**Opening Script Example:**

```text
Product Owner: "Welcome to the Sprint <<SPRINT_NUMBER>> review. Our sprint goal was to enhance the
               reservation experience by enabling date/time selection and dietary filtering. We
               committed to 35 story points and successfully delivered 32 points, with one 3-point
               story carried over due to API dependency delays. Let's dive into what we've built."
```

---

#### Phase 2: Live Feature Demonstration (20-30 minutes)

**Activities:**

1. **Demonstrate Working Software:** Walk through completed user stories in realistic usage scenarios
2. **User Journey Focus:** Show features in context of end-to-end workflows
3. **Interactive Exploration:** Allow stakeholders to try features hands-on if possible
4. **Highlight Value:** Emphasize user problems solved and business outcomes achieved

**Demonstration Best Practices:**

✅ **Do:**

- Use realistic test data that stakeholders recognize
- Demonstrate on actual devices (phone/tablet) when possible
- Walk through user personas' typical workflows
- Show both happy path and error handling
- Highlight performance, accessibility, or quality improvements

❌ **Don't:**

- Read PowerPoint slides about what was built
- Show incomplete or buggy features
- Spend time on technical architecture (save for tech demos)
- Make excuses for missing features

**Sample Demonstration Flow:**

```text
Developer A: "Let me show you the enhanced reservation flow. I'm logged in as Sarah, a returning
             customer who wants to book dinner for 4 people this Friday evening.

             [Navigates to Reservation screen]

             You'll notice the new calendar date picker here. I'll select Friday, November 15th.

             [Selects date]

             The system now queries available time slots based on our party size and date. You can see
             available slots highlighted in green, with unavailable times grayed out.

             [Selects 7:00 PM slot]

             The confirmation screen summarizes our reservation details. If I need to change anything,
             I can tap 'Edit' to return to the previous step without losing progress.

             [Demonstrates edit flow]

             Now let's test an error scenario. What happens if I try to book a slot that just became
             unavailable?

             [Simulates concurrent booking conflict]

             You can see the friendly error message explaining the slot is no longer available, with
             alternative time suggestions."

Stakeholder: "This looks great! One question - can users set a dietary preference to filter available
             menu items when they arrive?"

Product Owner: "Excellent suggestion. That's actually our next sprint priority. Let's capture that as
               feedback and I can show you the wireframes after this demo."
```

---

#### Phase 3: Stakeholder Feedback Collection (10-15 minutes)

**Activities:**

1. **Open Discussion:** Invite stakeholder questions, observations, and suggestions
2. **Capture Feedback:** Scrum Master documents all input for backlog consideration
3. **Prioritization Input:** Product Owner notes which feedback aligns with strategic priorities
4. **Avoid Commitment:** Don't commit to implementing suggestions on the spot; defer to backlog refinement

**Feedback Capture Template:**

| Feedback Item                           | Source        | Priority | Product Owner Action            |
| --------------------------------------- | ------------- | -------- | ------------------------------- |
| Add dietary preference filtering        | Stakeholder A | High     | Add to next sprint              |
| Increase font size on time slot buttons | End User B    | Medium   | Create accessibility story      |
| Export reservation confirmation as PDF  | Stakeholder C | Low      | Defer to backlog for evaluation |

---

#### Phase 4: Release Decision & Metrics Review (5-10 minutes)

**Activities:**

1. **Release Readiness Discussion:** Product Owner proposes release timing and scope
2. **Risk Assessment:** Team highlights any known issues or limitations
3. **Metrics Preview:** Share relevant business metrics or acceptance test results
4. **Go/No-Go Decision:** Product Owner decides whether to release increment to production

**Release Decision Criteria:**

- [ ] All must-have acceptance criteria met
- [ ] No Critical or High severity open bugs
- [ ] Performance benchmarks satisfied
- [ ] Security review completed (if applicable)
- [ ] Stakeholder approval obtained
- [ ] Production environment ready

---

### Sprint Review Outputs

**Deliverables:**

1. **Stakeholder Feedback Log:** Documented suggestions, questions, and observations
2. **Updated Product Backlog:** New stories or reprioritized items based on feedback
3. **Release Decision:** Go/No-Go determination for production deployment
4. **Sprint Metrics Summary:** Velocity, completion rate, quality metrics shared

---

## 5. Sprint Retrospective

### Sprint Retrospective Overview

**Primary Objective:** Reflect on team processes, collaboration dynamics, and working agreements to identify concrete improvements that will enhance productivity, quality, and team satisfaction in subsequent sprints.

**Participants:**

- **Development Team (Required):** All team members contribute experiences and insights
- **Scrum Master (Required):** Facilitates discussion and ensures psychological safety
- **Product Owner (Optional):** May attend if team agrees; focuses on team-PO collaboration

**Timebox:** 45-90 minutes (longer for monthly retrospectives)

**Cadence:** End of each sprint (after Sprint Review, before next planning)

**Environment:** Safe, judgment-free space encouraging candid discussion

---

### Sprint Retrospective Agenda Structure

#### Phase 1: Set the Stage (5-10 minutes)

**Activities:**

1. **Create Psychological Safety:** Establish confidentiality and blameless culture norms
2. **Prime the Mind:** Use icebreaker or check-in question to shift mindset
3. **Review Previous Actions:** Briefly check progress on previous retrospective commitments
4. **Frame the Focus:** State the retrospective goal and timebox

**Icebreaker Examples:**

- "Share one word describing how you felt about this sprint"
- "What was your high point and low point this sprint?"
- "If this sprint were a movie, what genre would it be and why?"

**Opening Script:**

```text
Scrum Master: "Welcome to our Sprint <<SPRINT_NUMBER>> retrospective. This is our safe space to speak
              openly about what's working and what we can improve. Everything shared here stays in this
              room, and we focus on systems and processes, not blaming individuals. Before we dive in,
              let's do a quick check-in: On a scale of 1-5, how energized do you feel about this sprint?

              [Team shares energy levels]

              Last sprint we committed to three improvements: (1) Smaller PRs for faster review,
              (2) Daily Slack updates for async coordination, (3) Dedicated time for tech debt.
              How did we do on these?"

Team: [Brief progress discussion]
```

---

#### Phase 2: Gather Data (10-15 minutes)

**Activities:**

Use structured format to collect team observations and experiences:

#### Format Option A: Start / Stop / Continue

| Start Doing                         | Stop Doing                                  | Continue Doing                               |
| ----------------------------------- | ------------------------------------------- | -------------------------------------------- |
| What new practices should we adopt? | What current practices should we eliminate? | What's working well that we should maintain? |

#### Format Option B: Liked / Learned / Lacked / Longed For (4Ls)

| Liked           | Learned            | Lacked            | Longed For              |
| --------------- | ------------------ | ----------------- | ----------------------- |
| What went well? | What did we learn? | What was missing? | What do we wish we had? |

#### Format Option C: Mad / Sad / Glad

| Mad (Frustrating)    | Sad (Disappointing)     | Glad (Celebrating)        |
| -------------------- | ----------------------- | ------------------------- |
| What frustrated you? | What was disappointing? | What should we celebrate? |

**Data Collection Methods:**

- **Silent Writing:** 5 minutes for individual reflection and sticky note creation
- **Round Robin:** Each person shares one item per category in rotation
- **Digital Tools:** Use Miro, Mural, or Retrium for remote retrospectives

**Example Gathered Data (Start/Stop/Continue):**

**Start:**

- Pair programming on complex stories to share knowledge
- Documenting API integration patterns in team wiki
- Running Lighthouse performance audits before PR approval
- Mid-sprint check-ins with Product Owner on high-uncertainty stories

**Stop:**

- Merging PRs late Friday afternoon (causes weekend anxiety)
- Adding scope mid-sprint without removing equivalent work
- Deferring test writing until end of story implementation

**Continue:**

- Daily async standups in Slack
- Sprint planning poker for estimation alignment
- Celebrating PR approvals with emoji reactions
- Thursday "tech debt hour" for small refactorings

---

#### Phase 3: Generate Insights (15-20 minutes)

**Activities:**

1. **Dot Voting:** Team members vote on items most important to discuss (3-5 votes each)
2. **Theme Identification:** Group related items into themes or patterns
3. **Deep Dive Discussion:** Explore top-voted items to understand root causes
4. **5 Whys Technique:** Ask "why" repeatedly to uncover underlying issues

**Sample Deep Dive Discussion:**

```text
Scrum Master: "The item with most votes is 'Stop merging PRs late Friday afternoon causing weekend
              anxiety.' Let's unpack this. Why is this happening?"

Developer A: "Sometimes I finish work late Friday and want to ship it before the weekend."

Scrum Master: "Why do we feel pressure to ship late Friday?"

Developer B: "I guess we worry that holding code over the weekend will cause merge conflicts when others
             work Monday."

Scrum Master: "Why might that cause merge conflicts?"

Developer C: "Probably because our PRs tend to be large and touch many files."

Scrum Master: "So it sounds like the root issue might be PR size rather than timing. If we had smaller,
             more focused PRs, would the Friday merge pressure go away?"

Team: "That makes sense. Smaller PRs would merge faster and reduce Friday anxiety."

Scrum Master: "Great insight. Let's capture this as our improvement action."
```

---

#### Phase 4: Decide What to Do (15-20 minutes)

**Activities:**

1. **Brainstorm Solutions:** Generate multiple improvement ideas for top themes
2. **Evaluate Feasibility:** Assess effort and impact of each potential improvement
3. **Select 1-3 Actions:** Choose small number of high-impact, achievable improvements
4. **Define Ownership:** Assign owner and target date for each action
5. **Make it Specific:** Ensure actions have clear success criteria and definition of done

**Improvement Action Characteristics (SMART):**

- **Specific:** Clear what will be done
- **Measurable:** Can determine if action was completed
- **Achievable:** Within team's control and capacity
- **Relevant:** Addresses identified pain point
- **Time-Bound:** Target completion date set

**Improvement Action Template:**

```markdown
## Retrospective Improvement Actions - Sprint <<SPRINT_NUMBER>>

### Action 1: Reduce PR Size for Faster Review

**Problem:** Large PRs causing review delays and Friday merge anxiety
**Action:** Limit PRs to max 300 lines of code; break larger features into incremental PRs
**Owner:** Entire team
**Success Criteria:** Average PR size <250 lines; no PRs >500 lines
**Target:** Implement immediately (Sprint <<N+1>>)
**How We'll Measure:** Track PR size metric in GitHub; review in next retro

### Action 2: Establish PR Review SLA

**Problem:** PRs sometimes sitting unreviewed for 2-3 days
**Action:** Commit to reviewing assigned PRs within 24 business hours
**Owner:** Entire team
**Success Criteria:** 90% of PRs reviewed within 24 hours
**Target:** Implement immediately (Sprint <<N+1>>)
**How We'll Measure:** Track review time in Sprint Tracking metrics

### Action 3: Weekly Tech Debt Investment

**Problem:** Tech debt accumulating; quality degrading
**Action:** Reserve 20% of sprint capacity (8 points) for tech debt and refactoring
**Owner:** Scrum Master to enforce in sprint planning
**Success Criteria:** Minimum 6 points of tech debt work completed each sprint
**Target:** Start next sprint
**How We'll Measure:** Track tech debt story points in sprint reports
```

---

#### Phase 5: Close the Retrospective (5 minutes)

**Activities:**

1. **Summarize Commitments:** Review agreed-upon improvement actions
2. **Appreciation Round:** Share gratitude for specific teammate contributions
3. **Retrospective Feedback:** Brief reflection on retrospective effectiveness itself
4. **Document and Publish:** Scrum Master documents actions in `IMPROVEMENT_SUMMARY.md`

**Closing Script:**

```text
Scrum Master: "Excellent discussion team. We've committed to three actionable improvements: smaller PRs,
              24-hour review SLA, and dedicated tech debt time. I'll document these in our Improvement
              Summary and we'll review progress in our next retrospective.

              Before we close, let's do a quick appreciation round. I'll start: [Developer A], I really
              appreciated your willingness to pair program with [Developer B] this sprint to share your
              API integration knowledge. That's exactly the kind of collaboration that makes us stronger."

[Each team member shares appreciation]

Scrum Master: "One last question: How was this retrospective? Thumbs up if valuable, thumbs sideways if
              okay, thumbs down if we should change format."

[Team provides feedback]

Scrum Master: "Great. See you all at Sprint Planning tomorrow morning. Thanks for your honest engagement!"
```

---

### Retrospective Format Variations

To maintain freshness and engagement, rotate retrospective formats:

| Format                                    | Best For                                      | Duration |
| ----------------------------------------- | --------------------------------------------- | -------- |
| **Start/Stop/Continue**                   | General process improvement                   | 45 min   |
| **4Ls (Liked/Learned/Lacked/Longed For)** | Learning-focused retrospectives               | 60 min   |
| **Sailboat**                              | Identifying anchors (drag) and wind (boost)   | 60 min   |
| **Timeline**                              | Reviewing specific events chronologically     | 75 min   |
| **Mad/Sad/Glad**                          | Emotional processing after difficult sprints  | 45 min   |
| **5 Whys**                                | Deep-diving specific recurring problems       | 60 min   |
| **Lean Coffee**                           | Democratic agenda-setting; discuss top topics | 60 min   |

---

## Ceremony Effectiveness Metrics

Track ceremony health to ensure continuous value delivery:

| Ceremony               | Health Indicator                                 | Warning Sign                               |
| ---------------------- | ------------------------------------------------ | ------------------------------------------ |
| **Sprint Planning**    | 90%+ stories meet DoR; <10% carryover            | Stories added mid-sprint; >20% carryover   |
| **Daily Standup**      | Lasts 10-15 min; surfaces blockers               | Exceeds 20 min; no blockers ever mentioned |
| **Backlog Refinement** | 2-3 sprints worth of ready stories               | Planning delayed by unrefined stories      |
| **Sprint Review**      | Stakeholder attendance >75%; actionable feedback | Low attendance; no backlog changes         |
| **Retrospective**      | 2-3 actions per sprint; 80%+ completion          | No actions or zero follow-through          |

---

## Related Documentation References

### Cross-Functional Documentation Ecosystem

- **`AGILE_SCRUM_PLAN.md`** - Overall sprint structure and team roles context
- **`SPRINT_TRACKING.md`** - Metrics and monitoring approaches discussed in ceremonies
- **`DEFINITION_OF_DONE.md`** - Quality criteria validated during Sprint Review
- **`IMPROVEMENT_SUMMARY.md`** - Repository of retrospective action items and outcomes
- **`DEVELOPMENT_CHECKLIST.md`** - Daily workflow procedures supporting standup discussions

---

## Document Metadata

**Document Version:** 2.0  
**Last Comprehensive Review:** 2025-11-12  
**Next Scheduled Review:** 2025-12-12  
**Review Frequency:** Monthly or when team processes change  
**Document Owner:** Scrum Master / Agile Coach  
**Approval Authority:** Development Team Consensus

**Revision History:**

| Version | Date       | Author           | Summary of Changes                                                                       |
| ------- | ---------- | ---------------- | ---------------------------------------------------------------------------------------- |
| 2.0     | 2025-11-12 | Development Team | Comprehensive expansion with detailed scripts, best practices, and facilitation guidance |
| 1.0     | 2025-11-10 | Development Team | Initial ceremony agenda and basic structure                                              |
