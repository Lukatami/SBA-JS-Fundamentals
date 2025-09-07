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

  //

  const result = [
    {
      id: 125,
      avg: 0.985, // (47 + 150) / (50 + 150)
      1: 0.94, // 47 / 50
      2: 1.0, // 150 / 150
    },
    {
      id: 132,
      avg: 0.82, // (39 + 125) / (50 + 150)
      1: 0.78, // 39 / 50
      2: 0.833, // late: (140 - 15) / 150
    },
  ];

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
  let arr = [];
  for (let i = 0; i < AssignmentGroup.assignments.length; i++) {
    if (new Date(AssignmentGroup.assignments[i].due_at) < new Date()) {
      arr.push({
        id: AssignmentGroup.assignments[i].id,
        due_at: AssignmentGroup.assignments[i].due_at,
        points_possible: AssignmentGroup.assignments[i].points_possible,
      });
    }
  }
  return arr;
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

// console.log(getLearnersScore());
// console.log(getActualAssignments());


// console.log(AssignmentGroup.assignments[0].points_possible);
// console.log(AssignmentGroup.assignments[0].due_at);

// console.log(LearnerSubmissions[0].submission.score);
// console.log(LearnerSubmissions[0].submission.submitted_at);

// console.log(LearnerSubmissions[1].learner_id);
// console.log(LearnerSubmissions[2].learner_id);
// console.log(LearnerSubmissions[3].learner_id);
// console.log(LearnerSubmissions[4].learner_id);


// Перебираем массив объектов LearnerSubmissions
// Выбираем learner_id
// По learner_id проходим по массиву LearnerSubmissions
// Если lerner_id == learner_id записываем assignment_id и score
// Если new Date (submitted_at) больше new Date (assigments.due_at) меняем score 



//  if (
//     new Date(LearnerSubmissions[4].submission.submitted_at) <=
//     new Date(AssignmentGroup.assignments[1].due_at)
//   ) {
//     pastDue = false;
//     score =
//       LearnerSubmissions[4].submission.score /
//       AssignmentGroup.assignments[1].points_possible;
//     console.log(score);
//   } else {
//     score =
//       (LearnerSubmissions[4].submission.score -
//         AssignmentGroup.assignments[1].points_possible * 0.1) /
//       AssignmentGroup.assignments[1].points_possible;
//     score = +score.toFixed(3);
//     console.log(score);
//   }
