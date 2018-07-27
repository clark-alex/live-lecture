select * from lecture
inner join questions on questions.lecture_id = lecture.lecture_id
where lecture.instuctor_id = $1