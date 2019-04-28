let personalities = ["ISTJ", "ISFJ", "INFJ", "INTJ", "ISTP", "ISFP", "INFP", "INTP", 
                     "ESTP", "ESFP", "ENFP", "ENTP", "ESTJ", "ESFJ", "ENFJ", "ENTJ"];
let yes_or_no = ["y", "n"];
let hot_or_cold = ["h", "c"];

let yn = yes_or_no[Math.floor(Math.random() * 2)];
let hc = hot_or_cold[Math.floor(Math.random() * 2)];
let personality = personalities[Math.floor(Math.random() * 16)];
let rating = Math.floor(Math.random() * 10) + 1;


