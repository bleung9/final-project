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

'use strict';

var Chance = require('chance');
var chance = new Chance();

let neighborhoods = ['Waterfront Communities-The Island',
  'Bay Street Corridor',
  'Church-Yonge Corridor',
  'Moss Park',
  'North St.James Town',
  'Cabbagetown-South St.James Town',
  'Regent Park',
  'South Riverdale',
  'North Riverdale',
  'Playter Estates-Danforth',
  'Blake-Jones',
  'Greenwood-Coxwell',
  'Woodbine Corridor',
  'The Beaches',
  'East End-Danforth',
  'Danforth',
  'Danforth East York',
  'Woodbine-Lumsden',
  'Taylor-Massey',
  'O \'Connor-Parkview',
  'Old East York',
  'Thorncliffe Park',
  'Broadview North',
  'Birchcliffe-Cliffside',
  'Oakridge',
  'Clairlea-Birchmount',
  'Kennedy Park',
  'Cliffcrest',
  'Niagara',
  'Roncesvalles',
  'High Park-Swansea',
  'South Parkdale',
  'Mimicoludes Humber Bay Shores',
  'Stonegate-Queensway',
  'Trinity-Bellwoods',
  'Little Portugal',
  'Dufferin Grove',
  'Palmerston-Little Italy',
  'University',
  'Kensington-Chinatown',
  'Alderwood',
  'Long Branch',
  'New Toronto',
  'Islington-City Centre West',
  'Markland Wood',
  'Etobicoke West Mall',
  'Eringate-Centennial-West Deane',
  'Princess-Rosethorn',
  'Edenbridge-Humber Valley',
  'Kingsway South',
  'Lambton Baby Point',
  'Runnymede-Bloor West Village',
  'High Park North',
  'Junction Area',
  'Weston-Pellam Park',
  'Dovercourt-Wallace Emerson-Junction',
  'Corso Italia-Davenport',
  'Wychwood',
  'Casa Loma',
  'Yonge-St.Clair',
  'Annex',
  'Rosedale-Moore Park',
  'Leaside-Bennington',
  'Mount Pleasant East',
  'Mount Pleasant West',
  'Yonge-Eglinton',
  'Forest Hill South',
  'Humewood-Cedarvale',
  'Oakwood Village',
  'Caledonia-Fairbank',
  'Keelesdale-Eglinton West',
  'Rockcliffe-Smythe',
  'Brookhaven-Amesbury',
  'Mount Dennis',
  'Beechborough-Greenbrook',
  'Briar Hill-Belgravia',
  'Forest Hill North',
  'Lawrence Park South',
  'Lawrence Park North',
  'Bedford Park-Nortown',
  'Englemount-Lawrence',
  'Yorkdale-Glen Park',
  'Maple Leaf',
  'Rustic',
  'Pelmo Park-Humberlea',
  'Weston',
  'Humber Heights-Westmount',
  'Kingsview Village-The Westway',
  'Willowridge-Martingrove-Richview',
  'West Humber-Clairville',
  'Rexdale-Kipling',
  'Elms-Old Rexdale',
  'Thistletown-Beaumond Heights',
  'Mount Olive-Silverstone-Jamestown',
  'Humber Summit',
  'Humbermede',
  'Black Creek',
  'Glenfield-Jane Heights',
  'Downsview-Roding-CFB',
  'York University Heights',
  'Bathurst Manor',
  'Westminster-Branson',
  'Clanton Park',
  'Lansing-Westgate',
  'Willowdale West',
  'Newtonbrook West',
  'Newtonbrook East',
  'Willowdale East',
  'St.Andrew-Windfields',
  'Bridle Path-Sunnybrook-York Mills',
  'Banbury-Don Mills',
  'Flemingdon Park',
  'Victoria Village',
  'Parkwoods-Donalda',
  'Don Valley Village',
  'Bayview Village',
  'Bayview Woods-Steeles',
  'Hillcrest Village',
  'Pleasant View',
  'Henry Farm',
  'Wexford/Maryvale',
  'Dorset Park',
  'Ionview',
  'Bendale',
  'Eglinton East',
  'Scarborough Village',
  'Guildwood',
  'Morningside',
  'Woburn',
  'Centennial Scarborough',
  'West Hill',
  'Highland Creek',
  'Rouge',
  'L\'Amoreaux',
  'Steeles',
  'Milliken',
  'Agincourt North',
  'Tam O\'Shanter-Sullivan',
  'Agincourt South-Malvern West',
  'Malvern'];

function insert(user_id, question_id, answer) {
  return { user_id, question_id, answer, createdAt: new Date(), updatedAt: new Date() }
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    // let answers = ["INTJ", "y", "y", "y", "y", "h", 10, 10, 10, 10]
    let personalities = ["ISTJ", "ISFJ", "INFJ", "INTJ", "ISTP", "ISFP", "INFP", "INTP",
      "ESTP", "ESFP", "ENFP", "ENTP", "ESTJ", "ESFJ", "ENFJ", "ENTJ"];
    let yes_or_no = ["y", "n"];
    let hot_or_cold = ["h", "c"];
    let to_insert = [];

    // 10 random seed users
    for (let i = 0; i < 10; i++) {
      let user_id = i + 1;
      // 10 questions per user to generate random answers for
      for (let j = 1; j <= 10; j++) {
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
        } else if (question_id === 11) {
          let neigh = neighborhoods[Math.floor(Math.random() * 140];
          to_insert.push(insert(user_id, question_id, neigh));
        }
      }
      return queryInterface.bulkInsert('Responses', to_insert, {});
    },

    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Responses', null, {});
    }
  };
