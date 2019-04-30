var Chance = require('chance');
var chance = new Chance();

// let to_insert = []
// for (i = 0; i < 10; i++) {
//   let name = chance.name();
//   let firstName = name.split(" ")[0];
//   let lastName = name.split(" ")[1];
//   let email = chance.email();
//   let password = "abc123";
//   let createdAt = updatedAt = new Date();
//   let obj = { firstName, lastName, email, password, createdAt, updatedAt };
//   to_insert.push(obj);
// }

// console.log(to_insert);
function insert(user_id, question_id, answer) {
  return { user_id, question_id, answer }
}

let personalities = ["ISTJ", "ISFJ", "INFJ", "INTJ", "ISTP", "ISFP", "INFP", "INTP", 
                    "ESTP", "ESFP", "ENFP", "ENTP", "ESTJ", "ESFJ", "ENFJ", "ENTJ"];
let yes_or_no = ["y", "n"];
let hot_or_cold = ["h", "c"];
let to_insert = [];

// 10 random seed users
for (i = 0; i < 4; i++) {
  let user_id = i + 1;
  // 10 questions per user to generate random answers for
  for (j = 1; j <= 10; j++) {
    let question_id = j;
    if (question_id === 1) {
      let personality = personalities[Math.floor(Math.random() * 16)];
      to_insert.push(insert(user_id, question_id, personality));
    } else if (question_id >= 2 && question_id <= 5) {
      let yn = yes_or_no[Math.floor(Math.random() * 2)];
      to_insert.push(insert(user_id, question_id, yn));
    } else if (question_id === 6) {
      let hc = hot_or_cold[Math.floor(Math.random() * 2)];
      to_insert.push(insert(user_id, question_id, hc));
    } else if (question_id >= 7 && question_id <= 10) {
      let rating = Math.floor(Math.random() * 10) + 1;
      to_insert.push(insert(user_id, question_id, rating));
    }
  }
}

console.log(to_insert);