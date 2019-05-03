SELECT 
  CASE (SELECT answer FROM my_reponses where userid = $1 and question_id = 1) WHEN u.answer THEN 1 ELSE 0 END
  , u.id

FROM responses u
INNER JOIN responses my_responses
ON ...
WHERE u.id <> $1
group by u.id

-- by Andrew <3 LHL mentor :)