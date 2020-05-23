
ALTER TABLE researcher ADD FULLTEXT INDEX inx_researcher2(first_name,last_name,email);