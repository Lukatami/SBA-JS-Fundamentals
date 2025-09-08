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
  
  if (ag.course_id !== course.id) {
    throw new Error("Assignment group is not related to the course");
  }

  const result = learnerGrades();

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

  return result;
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
console.log(result);

function getUniqueLerners() {
  let arrOfAllSubmissions = [];
  for (let i = 0; i < LearnerSubmissions.length; i++) {
    arrOfAllSubmissions.push(LearnerSubmissions[i].learner_id);
  }
  const uniqueLerners = arrOfAllSubmissions.filter((value, index, self) => {
    return self.indexOf(value) === index;
  });
  return uniqueLerners;
}

function getActualAssignments() {
  let actualAssignments = [];
  for (let i = 0; i < AssignmentGroup.assignments.length; i++) {
    if (new Date(AssignmentGroup.assignments[i].due_at) < new Date()) {
      actualAssignments.push({
        id: AssignmentGroup.assignments[i].id,
        due_at: AssignmentGroup.assignments[i].due_at,
        points_possible: AssignmentGroup.assignments[i].points_possible,
      });
    }
  }
  return actualAssignments;
}

function getLearnersScore() {
  let assignments = getActualAssignments().map((a) => a.id);
  let learners = getUniqueLerners();
  let allLearnersScore = [];

  for (let i = 0; i < learners.length; i++) {
    let learnerId = learners[i];
    let learnerScore = {};

    for (let j = 0; j < LearnerSubmissions.length; j++) {
      let submission = LearnerSubmissions[j];

      if (
        submission.learner_id === learnerId &&
        assignments.includes(submission.assignment_id)
      ) {
        learnerScore[submission.assignment_id] = {
          score: submission.submission.score,
          submitted_at: submission.submission.submitted_at,
        };
      }
    }
    allLearnersScore.push({
      learner_id: learnerId,
      scores: learnerScore,
    });
  }
  return allLearnersScore;
}

function learnerGrades() {
  let submissionData = getLearnersScore();
  let assignmentData = getActualAssignments();
  let finalResults = [];

  for (let i = 0; i < submissionData.length; i++) {
    let learnerResult = {
      id: submissionData[i].learner_id,
      avg: 0,
    };

    let totalScore = 0;
    let totalPossible = 0;

    for (let j = 0; j < assignmentData.length; j++) {
      let assignmentScore = assignmentData[j].points_possible;
      let assignmentID = assignmentData[j].id;

      if (submissionData[i].scores[assignmentID]) {
        studentData = submissionData[i].scores[assignmentID];

        if (assignmentScore > 0) {
          let finalScore = lateSubmission(studentData, assignmentData[j]);
          let grade = finalScore / assignmentScore;
          let fixedGrade = parseFloat(grade.toFixed(3));

          learnerResult[assignmentID] = fixedGrade;

          totalScore += finalScore;
          totalPossible += assignmentScore;
        }
      }
    }

    if (totalPossible > 0) {
      learnerResult.avg = parseFloat((totalScore / totalPossible).toFixed(3));
    }
    finalResults.push(learnerResult);
  }
  return finalResults;
}

function lateSubmission(submissionData, assignmentData) {
  let submitted = new Date(submissionData.submitted_at);
  let due = new Date(assignmentData.due_at);
  let finalScore = submissionData.score;

  if (submitted > due) {
    let penalty = assignmentData.points_possible * 0.1;
    finalScore = Math.max(0, submissionData.score - penalty);
  }
  return finalScore;
}
