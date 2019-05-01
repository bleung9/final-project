module.exports = {
    distance: function(user, db) {
      return Math.abs(Number(user) - Number(db));
    },

    binaryOption: function (user, db) {
      return user !== db ? 5 : 0;
    },

    sorting: function (a, b) {
      if (a.rank < b.rank) {
        return -1;
      } else if (a.rank > b.rank) {
        return 1;
      } else {
        return 0;
      }
    }, 

    personality_check: function (user, db) {
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
                                "INFP": ["INFJ", "ISFJ", "ENFJ"]
                              }
      return compatibility_list[user].includes(db) ? 0 : 1000;
    }
  }