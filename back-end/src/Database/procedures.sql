------------------------procedures-------------------------


-- Procedure to get ids of new projects

DELIMITER //

CREATE PROCEDURE get_new_projects (_limit int)
	BEGIN
    	(SELECT project.id FROM project WHERE deleted_at IS NULL AND visibility_public=TRUE ORDER BY created_at DESC LIMIT _limit);
    END
//

DELIMITER ;

-- Procedure to get ids of newly updated projects

DELIMITER //

CREATE PROCEDURE get_newlyupdated_projects (_limit int)
	BEGIN
    	(SELECT project.id FROM project WHERE deleted_at IS NULL AND visibility_public=TRUE ORDER BY published_at DESC LIMIT _limit);
    END
//

DELIMITER ;

-- Procedure to get ids of new publishes of projects that follow

DELIMITER //

CREATE PROCEDURE get_followed_projects (_researcher_id int, _limit int)
	BEGIN
    	(SELECT project.id FROM project,follow_project WHERE project.id= follow_project.project_id AND follow_project.follower_id=_researcher_id AND project.deleted_at IS NULL AND visibility_public=TRUE ORDER BY project.published_at DESC LIMIT _limit);
    END
//

DELIMITER ;

-- Procedure to get ids of new publishes of projects from the institutions that follow.

DELIMITER //

CREATE PROCEDURE get_projects_from_followed_institutions (_researcher_id int, _limit int)
	BEGIN
    	(SELECT project.id FROM project,follow_institution WHERE project.institution_id= follow_institution.institution_id AND follow_institution.follower_id=_researcher_id AND project.deleted_at IS NULL AND visibility_public=TRUE ORDER BY project.published_at DESC LIMIT _limit);
    END
//

DELIMITER ;


-- Procedure to get ids of new publishes of projects which followed researchers are working as collaborators

DELIMITER //

CREATE PROCEDURE get_projects_from_followers (_researcher_id int, _limit int)
	BEGIN
    	(SELECT project.id FROM project,follow_researcher,collaborate WHERE project.id=collaborate.project_id AND collaborate.researcher_id = follow_researcher.followee_id AND follow_researcher.follower_id=_researcher_id AND project.deleted_at IS NULL AND visibility_public=TRUE ORDER BY project.published_at DESC LIMIT _limit);
    END
//

DELIMITER ;