CREATE VIEW project_tag_collaborate_image AS (
    SELECT 
    	project.id AS project_id,
    	project.title AS project_title,
        project.description,
        project.visibility_public,
        project.published_at,
	project.poster_image,
	project.final_paper,
        tag_project.tag_id,
    	tag.title AS tag_title,
    	collaborate.researcher_id,
	collaborate.isAdmin,
    	researcher.email as researcher_email,
    	researcher.first_name,
    	researcher.last_name,
    	researcher.profile_picture,
    	researcher.institution,
    	institution.name AS institution_name,    	
    	image.id AS image_id,
    	image.url AS image_url,    
        project.created_at AS project_created_at,
        project.updated_at AS project_updated_at,
        project.deleted_at AS project_deleted_at        
    FROM project 
    LEFT JOIN collaborate ON project.id=collaborate.project_id
    LEFT JOIN researcher ON collaborate.researcher_id=researcher.id
    LEFT JOIN institution ON researcher.institution=institution.id
    LEFT JOIN tag_project ON project.id=tag_project.project_id
    LEFT JOIN tag ON tag_project.tag_id=tag.id
    LEFT JOIN image ON image.project_id=project.id    
);

CREATE VIEW collaborate_research_institute AS (
    SELECT     	
    	collaborate.project_id,
	collaborate.researcher_id,
	collaborate.isAdmin,
    	researcher.email as researcher_email,
    	researcher.first_name,
    	researcher.last_name,
    	researcher.profile_picture,
    	researcher.institution,
    	institution.name AS institution_name,
		institution.address
    FROM collaborate
    LEFT JOIN researcher ON collaborate.researcher_id=researcher.id
    LEFT JOIN institution ON researcher.institution=institution.id
);

CREATE VIEW tag_project_tag AS (
    SELECT     	
        tag.id AS tag_id,
	tag_project.project_id,
    	tag.title 
    FROM tag_project LEFT JOIN tag ON tag_project.tag_id=tag.id  
);