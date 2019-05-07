var neigh_border_data = require('./neighbourhoods_share_border_data');

module.exports = {

  url_gen: function() {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz012345678901234567890123456789";
    let url = "";
    for (let i = 0; i < 12; i++) {
      url += chars[Math.floor(Math.random() * chars.length)];
    }
    return url;
  },

  distance: function(user, db) {
    return Math.abs(Number(user) - Number(db));
  },

  binaryOption: function(user, db) {
    return user !== db ? 5 : 0;
  },

  sorting: function(a, b) {
    if (a.rank < b.rank) {
      return -1;
    } else if (a.rank > b.rank) {
      return 1;
    } else {
      return 0;
    }
  }, 

  personality_check: function(user, db) {
    let compatibility_list = { "ESFP": ["ISFJ", "ISTJ"], 
                              "ESTP": ["ISFJ", "ISTJ"], 
                              "ESTJ": ["ISFP", "ISTP", "ISFJ", "ESFJ", "ISTJ", "ESTJ"], 
                              "ESFJ": ["ISFP", "ISTP", "ISFJ", "ESFJ", "ISTJ", "ESTJ"], 
                              "ISTJ": ["ESFP", "ESTP", "ISFJ", "ESFJ", "ISTJ", "ESTJ"], 
                              "ISTP": ["ESFJ", "ESTJ"], 
                              "ISFJ": ["ESFP", "ESTP", "ISFJ", "ESFJ", "ISTJ", "ESTJ"], 
                              "ISFP": ["ESFJ", "ESTJ"], 
                              "ENTJ": ["INFP", "ENFP", "INFJ", "ENFJ", "INTJ", "ENTJ", "INTP", "ENTP"], 
                              "ENTP": ["INFP", "ENFP", "INFJ", "ENFJ", "INTJ", "ENTJ", "INTP", "ENTP"], 
                              "ENFJ": ["INFP", "ENFP", "INFJ", "ENFJ", "INTJ", "ENTJ", "INTP", "ENTP"], 
                              "ENFP": ["INFP", "ENFP", "INFJ", "ENFJ", "INTJ", "ENTJ", "INTP", "ENTP"], 
                              "INTJ": ["INFP", "ENFP", "INFJ", "ENFJ", "INTJ", "ENTJ", "INTP", "ENTP"], 
                              "INTP": ["INFP", "ENFP", "INFJ", "ENFJ", "INTJ", "ENTJ", "INTP", "ENTP"], 
                              "INFJ": ["INFP", "ENFP", "INFJ", "ENFJ", "INTJ", "ENTJ", "INTP", "ENTP"], 
                              "INFP": ["INFP", "ENFP", "INFJ", "ENFJ", "INTJ", "ENTJ", "INTP", "ENTP"],
                            }
    return compatibility_list[user].includes(db) ? 0 : 1000;
  }, 

  bordering_area: function() { 

  }
}