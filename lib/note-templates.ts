export interface NoteTemplate {
  id: string
  name: string
  description: string
  icon: string
  category: string
  title: string
  content: string
  tags: string[]
}

export const noteTemplates: NoteTemplate[] = [
  {
    id: "meeting-notes",
    name: "Meeting Notes",
    description: "Structured template for meeting documentation",
    icon: "👥",
    category: "Work",
    title: "Meeting Notes - [Date]",
    content: `<h2>Meeting Details</h2>
<p><strong>Date:</strong> [Date]</p>
<p><strong>Time:</strong> [Time]</p>
<p><strong>Attendees:</strong> [Names]</p>
<p><strong>Location:</strong> [Location/Virtual]</p>

<h2>Agenda</h2>
<ul>
  <li>Topic 1</li>
  <li>Topic 2</li>
  <li>Topic 3</li>
</ul>

<h2>Discussion Points</h2>
<p>Key points discussed during the meeting...</p>

<h2>Action Items</h2>
<ul>
  <li>[ ] Action item 1 - Assigned to: [Name] - Due: [Date]</li>
  <li>[ ] Action item 2 - Assigned to: [Name] - Due: [Date]</li>
</ul>

<h2>Next Steps</h2>
<p>What needs to happen next...</p>

<h2>Notes</h2>
<p>Additional notes and observations...</p>`,
    tags: ["meeting", "work"],
  },
  {
    id: "project-planning",
    name: "Project Planning",
    description: "Plan and organize project details",
    icon: "📋",
    category: "Work",
    title: "Project Plan - [Project Name]",
    content: `<h2>Project Overview</h2>
<p><strong>Project Name:</strong> [Name]</p>
<p><strong>Start Date:</strong> [Date]</p>
<p><strong>End Date:</strong> [Date]</p>
<p><strong>Team Members:</strong> [Names]</p>

<h2>Objectives</h2>
<ul>
  <li>Primary objective 1</li>
  <li>Primary objective 2</li>
  <li>Primary objective 3</li>
</ul>

<h2>Milestones</h2>
<ul>
  <li><strong>Phase 1:</strong> [Description] - Due: [Date]</li>
  <li><strong>Phase 2:</strong> [Description] - Due: [Date]</li>
  <li><strong>Phase 3:</strong> [Description] - Due: [Date]</li>
</ul>

<h2>Resources Needed</h2>
<ul>
  <li>Resource 1</li>
  <li>Resource 2</li>
</ul>

<h2>Risks & Challenges</h2>
<p>Potential risks and mitigation strategies...</p>

<h2>Success Criteria</h2>
<p>How we'll measure success...</p>`,
    tags: ["project", "planning", "work"],
  },
  {
    id: "daily-journal",
    name: "Daily Journal",
    description: "Reflect on your day and track progress",
    icon: "📔",
    category: "Personal",
    title: "Daily Journal - [Date]",
    content: `<h2>Today's Date: [Date]</h2>

<h2>Morning Reflection</h2>
<p><strong>How I'm feeling:</strong> </p>
<p><strong>Today's intentions:</strong> </p>

<h2>Gratitude</h2>
<p>Three things I'm grateful for today:</p>
<ul>
  <li></li>
  <li></li>
  <li></li>
</ul>

<h2>Today's Highlights</h2>
<p>What happened today...</p>

<h2>Challenges</h2>
<p>Difficulties I faced and how I handled them...</p>

<h2>Lessons Learned</h2>
<p>What I learned today...</p>

<h2>Tomorrow's Goals</h2>
<ul>
  <li>Goal 1</li>
  <li>Goal 2</li>
  <li>Goal 3</li>
</ul>

<h2>Evening Reflection</h2>
<p>How was my day overall? What could I improve tomorrow?</p>`,
    tags: ["journal", "personal", "reflection"],
  },
  {
    id: "code-review",
    name: "Code Review",
    description: "Document code review findings and feedback",
    icon: "💻",
    category: "Development",
    title: "Code Review - [PR/Feature Name]",
    content: `<h2>Review Details</h2>
<p><strong>PR/Branch:</strong> [Name]</p>
<p><strong>Author:</strong> [Name]</p>
<p><strong>Reviewer:</strong> [Name]</p>
<p><strong>Date:</strong> [Date]</p>

<h2>Summary</h2>
<p>Brief overview of the changes...</p>

<h2>Positive Aspects</h2>
<ul>
  <li>Well-structured code</li>
  <li>Good test coverage</li>
  <li>Clear documentation</li>
</ul>

<h2>Issues Found</h2>
<h3>Critical</h3>
<ul>
  <li>Issue 1 - Description and location</li>
</ul>

<h3>Minor</h3>
<ul>
  <li>Issue 1 - Description and location</li>
</ul>

<h2>Suggestions</h2>
<ul>
  <li>Suggestion 1</li>
  <li>Suggestion 2</li>
</ul>

<h2>Action Items</h2>
<ul>
  <li>[ ] Fix critical issue 1</li>
  <li>[ ] Address minor issues</li>
  <li>[ ] Update documentation</li>
</ul>

<h2>Approval Status</h2>
<p>✅ Approved / ⏸️ Needs Changes / ❌ Rejected</p>`,
    tags: ["code-review", "development", "work"],
  },
  {
    id: "brainstorming",
    name: "Brainstorming",
    description: "Capture and organize creative ideas",
    icon: "💡",
    category: "Creative",
    title: "Brainstorming - [Topic]",
    content: `<h2>Topic: [Topic Name]</h2>
<p><strong>Date:</strong> [Date]</p>
<p><strong>Participants:</strong> [Names]</p>

<h2>Problem Statement</h2>
<p>What are we trying to solve or create?</p>

<h2>Initial Ideas</h2>
<ul>
  <li><strong>Idea 1:</strong> Description</li>
  <li><strong>Idea 2:</strong> Description</li>
  <li><strong>Idea 3:</strong> Description</li>
</ul>

<h2>Promising Concepts</h2>
<h3>Concept 1</h3>
<p><strong>Description:</strong> </p>
<p><strong>Pros:</strong> </p>
<p><strong>Cons:</strong> </p>

<h3>Concept 2</h3>
<p><strong>Description:</strong> </p>
<p><strong>Pros:</strong> </p>
<p><strong>Cons:</strong> </p>

<h2>Next Steps</h2>
<ul>
  <li>Research idea 1</li>
  <li>Prototype concept 2</li>
  <li>Get feedback from team</li>
</ul>

<h2>Random Thoughts</h2>
<p>Additional ideas and observations...</p>`,
    tags: ["brainstorming", "ideas", "creative"],
  },
  {
    id: "weekly-review",
    name: "Weekly Review",
    description: "Review your week and plan ahead",
    icon: "📅",
    category: "Personal",
    title: "Weekly Review - Week of [Date]",
    content: `<h2>Week of: [Start Date] - [End Date]</h2>

<h2>Accomplishments</h2>
<p>What I achieved this week:</p>
<ul>
  <li>Achievement 1</li>
  <li>Achievement 2</li>
  <li>Achievement 3</li>
</ul>

<h2>Challenges</h2>
<p>Obstacles I faced:</p>
<ul>
  <li>Challenge 1 and how I handled it</li>
  <li>Challenge 2 and lessons learned</li>
</ul>

<h2>Metrics & Progress</h2>
<p><strong>Goals completed:</strong> X/Y</p>
<p><strong>Hours worked:</strong> </p>
<p><strong>Key metrics:</strong> </p>

<h2>Highlights</h2>
<p>Best moments of the week...</p>

<h2>Areas for Improvement</h2>
<ul>
  <li>Area 1</li>
  <li>Area 2</li>
</ul>

<h2>Next Week's Priorities</h2>
<ol>
  <li>Priority 1</li>
  <li>Priority 2</li>
  <li>Priority 3</li>
</ol>

<h2>Notes</h2>
<p>Additional thoughts and observations...</p>`,
    tags: ["review", "planning", "personal"],
  },
  {
    id: "bug-report",
    name: "Bug Report",
    description: "Document bugs and issues systematically",
    icon: "🐛",
    category: "Development",
    title: "Bug Report - [Bug Title]",
    content: `<h2>Bug Information</h2>
<p><strong>Title:</strong> [Short description]</p>
<p><strong>Severity:</strong> Critical / High / Medium / Low</p>
<p><strong>Status:</strong> Open / In Progress / Resolved</p>
<p><strong>Reported By:</strong> [Name]</p>
<p><strong>Date:</strong> [Date]</p>

<h2>Description</h2>
<p>Clear description of the bug...</p>

<h2>Steps to Reproduce</h2>
<ol>
  <li>Step 1</li>
  <li>Step 2</li>
  <li>Step 3</li>
</ol>

<h2>Expected Behavior</h2>
<p>What should happen...</p>

<h2>Actual Behavior</h2>
<p>What actually happens...</p>

<h2>Environment</h2>
<ul>
  <li><strong>Browser/Device:</strong> </li>
  <li><strong>OS:</strong> </li>
  <li><strong>Version:</strong> </li>
</ul>

<h2>Screenshots/Logs</h2>
<p>[Attach screenshots or error logs]</p>

<h2>Possible Solution</h2>
<p>Ideas for fixing the bug...</p>

<h2>Related Issues</h2>
<p>Links to related bugs or tickets...</p>`,
    tags: ["bug", "development", "issue"],
  },
  {
    id: "learning-notes",
    name: "Learning Notes",
    description: "Document what you're learning",
    icon: "📚",
    category: "Education",
    title: "Learning Notes - [Topic]",
    content: `<h2>Topic: [Topic Name]</h2>
<p><strong>Date:</strong> [Date]</p>
<p><strong>Source:</strong> [Book/Course/Article]</p>

<h2>Key Concepts</h2>
<ul>
  <li><strong>Concept 1:</strong> Explanation</li>
  <li><strong>Concept 2:</strong> Explanation</li>
  <li><strong>Concept 3:</strong> Explanation</li>
</ul>

<h2>Important Points</h2>
<blockquote>
  <p>Key quote or insight...</p>
</blockquote>

<h2>Examples</h2>
<p>Practical examples to remember:</p>
<pre><code>// Code example or demonstration
</code></pre>

<h2>Questions</h2>
<ul>
  <li>Question 1 to explore further</li>
  <li>Question 2 to research</li>
</ul>

<h2>Summary</h2>
<p>Main takeaways in my own words...</p>

<h2>Action Items</h2>
<ul>
  <li>[ ] Practice concept 1</li>
  <li>[ ] Build project using concept 2</li>
  <li>[ ] Research question 1</li>
</ul>

<h2>Related Topics</h2>
<p>Topics to explore next...</p>`,
    tags: ["learning", "education", "notes"],
  },
]

export function getTemplateById(id: string): NoteTemplate | undefined {
  return noteTemplates.find((template) => template.id === id)
}

export function getTemplatesByCategory(category: string): NoteTemplate[] {
  return noteTemplates.filter((template) => template.category === category)
}

export const templateCategories = [
  "All",
  "Work",
  "Personal",
  "Development",
  "Creative",
  "Education",
]
