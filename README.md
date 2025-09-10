# Grade Calculator Application

### Repo link
https://github.com/Lukatami/SBA-JS-Fundamentals.git

### README Disclaimer
*README.md is partially generated and formatted using AI*

## Description

This program calculates student grades based on their assignment submissions. It processes course data, assignment groups, and learner submissions to compute final grades with penalties for late submissions.

## Features

- **Data Validation**: Verifies assignment group belongs to the course
- **Assignment Filtering**: Only considers assignments with past due dates
- **Grade Calculation**: Computes percentage score for each assignment
- **Late Penalties**: Applies 10% penalty for overdue submissions
- **Result Aggregation**: Calculates average score for each learner

## Data Structure

### Input Data:
- `CourseInfo`: Course information (ID, name)
- `AssignmentGroup`: Assignment group with array of assignments
- `LearnerSubmissions`: Array of student submissions

### Output Data:
Array of objects with results for each learner:

```
{
  id: 125,
  avg: 0.985, // average score
  1: 0.94,    // assignment 1 score
  2: 1.0      // assignment 2 score
}
```
## Implementation Details
- `Error Handling:` Uses try-catch for course validation errors

- `Date Validation:` Ignores assignments with future due dates

- `Number Formatting:` Rounds to 3 decimal places

- `Optimization:` Filters unique learners and relevant assignments

## Usage
```
{
const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
console.log(result);
}
```
## Error Handling
### The program handles:

- Course ID mismatch between course and assignment group

- Late submissions (10% penalty)

- Assignments with zero possible points

## Requirements
- Modern JavaScript runtime (Node.js 14+ or browser with ES6+ support)

- Properly formatted input data (JSON-like objects)

## Functions Overview
`getLearnerData(course, ag, submissions)`
Main function that validates input and returns processed results.

`getUniqueLearners()`
Extracts and returns unique learner IDs from submissions.

`getActualAssignments()`
Filters and returns assignments with past due dates.

`getLearnersScore()`
Compiles scores for each learner and assignment.

`learnerGrades()`
Calculates final grades and averages for all learners.

`lateSubmission(submissionData, assignmentData)`
Applies penalties for late submissions.

Example Output
```
[
  {
    id: 125,
    avg: 0.985,
    1: 0.94,
    2: 1.0
  },
  {
    id: 132,
    avg: 0.82,
    1: 0.78,
    2: 0.833
  }
]
```
### Notes
- The program uses current date for due date comparisons

- Empty arrays are returned on validation errors

- All scores are normalized between 0 and 1