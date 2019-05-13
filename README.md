# roomR - Lighthouse Labs Final Project

roomR is a web app that is designed to be a comprehensive roommate finding app.  Current alternatives out there just aren't the full package right now, and that's what roomR aspires to be.  Our app asks a bunch of profile questions to better match registrants with other users who are looking for roommates.  Notably, we ask about personality profile to help weed out people who might not be good matches.  You can change your profile and answers to the questions at any time to get new matches.  In addition, we ask about what neighborhood people want to live in (also changeable), and we provide matches in that neighborhood as well as adjacent neighborhoods.

My teammates on this project are Zeyu Liu (<https://github.com/z79liu/>) and Hark Khabra (<https://github.com/harkk/>).  

This project uses port 3000 (<http://localhost:3000/> in your browser.).

## Dependencies

- chance ^1.0.18 or above
- cookie-parser ~1.4.3 or above
- debug ~2.6.9 or above
- ejs ~2.5.7 or above
- express ~4.16.0 or above
- foundation-sites ^6.5.3 or above
- http-errors ~1.6.2 or above
- jquery ^3.4.1 or above
- morgan ~1.9.0 or above
- pg ^7.10.0 or above
- pg-hstore ^2.3.2 or above
- sequelize ^5.7.6 or above
- sequelize-cli ^5.4.0 or above
- what-input ^5.2.1" or above

## Final Product

!["Homepage"](https://i.imgur.com/aJff91S.jpg)
!["Register page"](https://i.imgur.com/hYamwjv.png)
!["Neighborhood selection"](https://i.imgur.com/qJW5Wds.png)
!["Matches page"](https://i.imgur.com/4vweQUe.jpg)
!["Matches personality page"](https://i.imgur.com/gnnTtFR.png)
!["matches profile page"](https://i.imgur.com/Zy76EgR.png)
!["matches profile page - chat"](https://i.imgur.com/oMXXco8.png)
!["edit profile/questionnaire page"](https://i.imgur.com/8BFBTU2.png)

## Getting Started

- Install all dependencies (using the `npm install` command).
- Run the development web server using the `npm run devstart` (or `npm run dev-w` if you use vagrant on Windows) command.
- Run the app at <http://localhost:3000/> in your browser.

## Future Goals
### Short term

- implement more questions for personality matching
- manual "importance" ranking for each question
- delve more deeply into psychology (big 5 perhaps)
- allow selection of multiple neighborhoods
- get more real/realistic estate data (e.g. scrape Kijiji)


### Long term

- solicit feedback from users; use that information to improve matching algorithm, perhaps use ML
- implement filtering options for users on results page (make it more dynamic)

