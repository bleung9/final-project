// 1 What is your MBTI personality? 
// 2 Do you smoke (Y/N)
// 3 Do you mind pets? (Y/N)
// 4 Are you a night owl? (Y/N)
// 5 Do you mind living with someone of the opposite gender? (Y/N)
// 6 Do you prefer to have the house at a hot or cold temperature? (H/C)
// 7 On a scale of 1-10, how important is it that your space is always kept clean?
// 8 On a scale of 1-10, how much do you mind that your roommate frequently has frds/SO?
// 9 On a scale of 1-10, how much do you like Pikachu?
// 10 On a scale of 1-10, how much did you like Avengers: Endgame?

function distance(question_id, answer) {
  return Number(answers[question_id - 1]) - Number(answer);
}

function binaryOption(question_id, answer) {
  return answer !== answers[question_id - 1] ? 5 : 0;
}

let compatibility_list = { "ESFP": ["ESFJ", "ESTP", "ISFP"], 
                      "ESTP": ["ESTJ", "ESFP", "INFJ"], 
                      "ESTJ": ["ESTP", "ESFJ", "ISTJ"], 
                      "ESFJ": ["ISTP", "ESTJ", "ESTP"], 
                      "ISTJ": ["INFJ", "ISTP", "ISFJ"], 
                      "ISTP": ["ISFP", "INFP", "ESFP"], 
                      "ISFJ": ["ESFJ", "ISFP", "ISTJ"], 
                      "ISFP": ["ESFP", "ISFJ", "ESFJ"], 
                      "ENTJ": ["INTJ", "ENTP", "ENFJ"], 
                      "ENTP": ["ENTJ", "ENFP", "ENFJ"], 
                      "ENFJ": ["ENFJ", "INFJ", "ENFP"], 
                      "ENFP": ["ENTJ", "INTJ", "INTP"], 
                      "INTJ": ["INTP", "INFJ", "INFP"], 
                      "INTP": ["ENTP", "INFP", "ENFP"], 
                      "INFJ": ["ISTJ", "INFP", "INTJ"], 
                      "INFP": ["INFJ", "ISFJ", "ENFJ"], 
}

let answers = ["INTJ", "y", "y", "y", "y", "h", 10, 10, 10, 10]
let personality = answers[0]
let existing = [ {user_id: 1, question_id: 1, answer: "INTP"}, 
                 {user_id: 1, question_id: 2, answer: "y"}, 
                 {user_id: 1, question_id: 3, answer: "y"},
                 {user_id: 1, question_id: 4, answer: "n"}, 
                 {user_id: 1, question_id: 5, answer: "y"}, 
                 {user_id: 1, question_id: 6, answer: "c"}, 
                 {user_id: 1, question_id: 7, answer: 5}, 
                 {user_id: 1, question_id: 8, answer: 8}, 
                 {user_id: 1, question_id: 9, answer: 10}, 
                 {user_id: 1, question_id: 10, answer: 7}, 
                 {user_id: 2, question_id: 1, answer: "ENTJ"},
                 {user_id: 2, question_id: 2, answer: "y"}, 
                 {user_id: 2, question_id: 3, answer: "n"},
                 {user_id: 2, question_id: 4, answer: "y"}, 
                 {user_id: 2, question_id: 5, answer: "n"}, 
                 {user_id: 2, question_id: 6, answer: "h"}, 
                 {user_id: 2, question_id: 7, answer: 1}, 
                 {user_id: 2, question_id: 8, answer: 7}, 
                 {user_id: 2, question_id: 9, answer: 10}, 
                 {user_id: 2, question_id: 10, answer: 5}, 
                 {user_id: 3, question_id: 1, answer: "EFTP"}, 
                 {user_id: 3, question_id: 2, answer: "y"}, 
                 {user_id: 3, question_id: 3, answer: "y"},
                 {user_id: 3, question_id: 4, answer: "y"}, 
                 {user_id: 2, question_id: 5, answer: "n"}, 
                 {user_id: 3, question_id: 6, answer: "h"}, 
                 {user_id: 3, question_id: 7, answer: 5}, 
                 {user_id: 3, question_id: 8, answer: 9}, 
                 {user_id: 3, question_id: 9, answer: 10}, 
                 {user_id: 3, question_id: 10, answer: 1}, 
                 {user_id: 4, question_id: 1, answer: "ESFP"},
                 {user_id: 4, question_id: 2, answer: "n"}, 
                 {user_id: 4, question_id: 3, answer: "n"},
                 {user_id: 4, question_id: 4, answer: "y"}, 
                 {user_id: 4, question_id: 5, answer: "n"}, 
                 {user_id: 4, question_id: 6, answer: "h"}, 
                 {user_id: 4, question_id: 7, answer: 10}, 
                 {user_id: 4, question_id: 8, answer: 10}, 
                 {user_id: 4, question_id: 9, answer: 10}, 
                 {user_id: 4, question_id: 10, answer: 8} ];

let rank = {};

for (i = 1; i < existing.length; i++) {
  let user_id = existing[i].user_id;
  let question_id = existing[i].question_id;
  let answer = existing[i].answer;
  let rank_change = 0;
  question_id >= 2 && question_id <= 5 ? rank_change += binaryOption(question_id, answer) : rank_change += distance(question_id, answer);
  if (!rank[user_id]) {
    rank[user_id] = 0;
    rank[user_id] += rank_change
  } else {
    rank[user_id] += rank_change
  }
}

console.log(rank);