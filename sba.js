// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript",
};
// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50,
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150,
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500,
    },
  ],
};
// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47,
    },
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150,
    },
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400,
    },
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39,
    },
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140,
    },
  },
];

function getLearnerData(course, ag, submissions) {
  // here, we would process this data to achieve the desired result.

  try {
    if (ag.course_id !== course.id) {
      throw new Error("Assignment group is not related to the course");
    }

    const result = learnerGrades();

    return result;

    //

    // const result = [
    //   {
    //     id: 125,
    //     avg: 0.985, // (47 + 150) / (50 + 150)
    //     1: 0.94, // 47 / 50
    //     2: 1.0, // 150 / 150
    //   },
    //   {
    //     id: 132,
    //     avg: 0.82, // (39 + 125) / (50 + 150)
    //     1: 0.78, // 39 / 50
    //     2: 0.833, // late: (140 - 15) / 150
    //   },
    // ];
  } catch (error) {
    console.error("Error catched: ", error.message);
    return [];
  }
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
console.log(result);

function getUniqueLerners() {
  let arrOfAllSubmissions = [];
  // Grab all submissions and extract all learner_id
  for (let i = 0; i < LearnerSubmissions.length; i++) {
    arrOfAllSubmissions.push(LearnerSubmissions[i].learner_id);
  }
  // Filter arr of learner_id to delete duplicates
  let uniqueLerners = arrOfAllSubmissions.filter((value, index, self) => {
    return self.indexOf(value) === index;
  });
  return uniqueLerners;
}

function getActualAssignments() {
  let actualAssignments = [];
  // Extract all Assignments that have to be counted
  for (let i = 0; i < AssignmentGroup.assignments.length; i++) {
    if (new Date(AssignmentGroup.assignments[i].due_at) < new Date()) {
      actualAssignments.push({
        id: AssignmentGroup.assignments[i].id,
        due_at: AssignmentGroup.assignments[i].due_at,
        points_possible: AssignmentGroup.assignments[i].points_possible,
      });
      continue;
    }
  }
  return actualAssignments;
}

function getLearnersScore() {
  // Get arr of id from objects extracted from Actual assignments
  let assignments = getActualAssignments().map((a) => a.id);
  let learners = getUniqueLerners();
  let allLearnersScore = [];

  // Get learners scores from submissions
  for (let i = 0; i < learners.length; i++) {
    // Checking every unique learner with a loop
    let learnerId = learners[i];
    let learnerScore = {};

    // Checking every submission for matching learner_id and assigment_id with submissionData
    for (let j = 0; j < LearnerSubmissions.length; j++) {
      let submission = LearnerSubmissions[j];
      // Compare learner_ids and assignment_ids
      if (
        submission.learner_id === learnerId &&
        assignments.includes(submission.assignment_id)
      ) {
        // Every matching adding to submissions array of objects
        learnerScore[submission.assignment_id] = {
          score: submission.submission.score,
          submitted_at: submission.submission.submitted_at,
        };
      }
    }
    // Add every learner Data to array
    allLearnersScore.push({
      learner_id: learnerId,
      scores: learnerScore,
    });
  }
  return allLearnersScore;
}

function learnerGrades() {
  // Get the information included all required data
  let submissionData = getLearnersScore();
  let assignmentData = getActualAssignments();

  // Following of required output as an array of objects
  let finalResults = [];

  // Loop for every learner data
  for (let i = 0; i < submissionData.length; i++) {
    // Declare storage variable for learner results
    let learnerResult = {
      id: submissionData[i].learner_id,
      avg: 0,
    };

    // Declare storage variables for scores
    let totalScore = 0;
    let totalPossible = 0;

    // Loop for every actual assignment
    for (let j = 0; j < assignmentData.length; j++) {
      // Declare actual assignment variable for looping
      let assignmentScore = assignmentData[j].points_possible;
      let assignmentID = assignmentData[j].id;

      // Check every submission with assignment
      if (submissionData[i].scores[assignmentID]) {
        // Get data to use it with dates comparing
        studentData = submissionData[i].scores[assignmentID];

        // Every actual assignment have positive possible points
        if (assignmentScore > 0) {
          // Using lateSubmission function to check submittion overdue
          let finalScore = lateSubmission(studentData, assignmentData[j]);

          // Calculation of the grade
          let grade = finalScore / assignmentScore;

          // Round grade to max 3 digits after . if it so
          let fixedGrade = parseFloat(grade.toFixed(3));

          // Add value of grade to learner result
          learnerResult[assignmentID] = fixedGrade;

          // Add scores to the storage
          totalScore += finalScore;
          totalPossible += assignmentScore;
        } else {
          break;
        }
      }
    }

    // Calculating average grade and store it
    if (totalPossible > 0) {
      learnerResult.avg = parseFloat((totalScore / totalPossible).toFixed(3));
    }

    // Add all gained results to an array
    finalResults.push(learnerResult);
  }
  return finalResults;
}

function lateSubmission(submissionData, assignmentData) {
  // Convert date strings to a real date type
  let submitted = new Date(submissionData.submitted_at);
  let due = new Date(assignmentData.due_at);

  // Extract score
  let finalScore = submissionData.score;

  // Main dates comparing part
  if (submitted > due) {
    // Declare special variable to store penalty value
    let penalty = assignmentData.points_possible * 0.1;

    // Calculate final score including penalty
    finalScore = Math.max(0, submissionData.score - penalty);
  }
  return finalScore;
}

// Requirement Weight

// Declare variables properly using let and const where appropriate.                                5%

// Use operators to perform calculations on variables and literals.                                 5%

// Use strings, numbers, and Boolean values cached within variables.                                5%

// Use at least two if/else statements to control program flow.
// Optionally, use at least one switch statement.                                                   10%

// Use try/catch statements to manage potential errors in the code,
// such as incorrectly formatted or typed data being fed into your program.                         5%

// Utilize at least two different types of loops.                                                   5%

// Utilize at least one loop control keyword such as break or continue.                             3%

// Create and/or manipulate arrays and objects.                                                     10%

// Demonstrate the retrieval, manipulation,
// and removal of items in an array or properties in an object.                                     5%

// Use functions to handle repeated tasks.                                                          10%

// Program outputs processed data as described above.
// Partial credit will be earned depending on the level of adherence to the described behavior.     20%

// Ensure that the program runs without errors (comment out things that do not work,
// and explain your blockers - you can still receive partial credit).                               10%

// Commit frequently to the git repository.                                                         5%

// Include a README file that contains a description of your application.                           2%
