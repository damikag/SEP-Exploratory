ALTER TABLE project ADD FULLTEXT INDEX inx_project(title,description);

ALTER TABLE researcher ADD FULLTEXT INDEX inx_researcher(first_name,last_name);

ALTER TABLE institution ADD FULLTEXT INDEX inx_institution(name);

ALTER TABLE question_category ADD FULLTEXT(category_name);

ALTER TABLE forum_question ADD FULLTEXT(title,description);
