CREATE VIEW project_tag_collaborate_image
AS
    (
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

CREATE VIEW collaborate_researcher_institute
AS
    (
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
        institution.address,
        collaborate.created_at,
        collaborate.updated_at,
        collaborate.deleted_at

    FROM collaborate
        LEFT JOIN researcher ON collaborate.researcher_id=researcher.id
        LEFT JOIN institution ON researcher.institution=institution.id
);


CREATE VIEW tag_project_tag
AS
    (
    SELECT
        tag.id AS tag_id,
        tag_project.project_id,
        tag.title
    FROM tag_project LEFT JOIN tag ON tag_project.tag_id=tag.id  
);

CREATE VIEW project_comment_reply
AS
    (
    SELECT
        project_comment.project_id,
        project_comment.id as comment_id,
        comment_reply.id as message_id,
        comment_reply.author_id,
        comment_reply.message,
        comment_reply.no_of_likes,
        comment_reply.initial_comment,
        researcher.first_name,
        researcher.last_name,
        institution.name AS institution,
        researcher.profile_picture,
        comment_reply.created_at,
        comment_reply.updated_at,
        comment_reply.deleted_at
    FROM project_comment
        LEFT JOIN comment_reply ON project_comment.id=comment_reply.comment_id
        LEFT JOIN researcher ON comment_reply.author_id=researcher.id
        LEFT JOIN institution ON researcher.institution=institution.id
    ORDER BY comment_reply.created_at DESC
);

CREATE VIEW researcher_institute
AS
    (
    SELECT
        researcher.id as researcher_id,
        researcher.email as researcher_email,
        researcher.first_name,
        researcher.last_name,
        researcher.profile_picture,
        researcher.institution,
        institution.name AS institution_name,
        institution.address,
        researcher.deleted_at,
        researcher.created_at,
        researcher.updated_at

    FROM researcher
        LEFT JOIN institution ON researcher.institution=institution.id
);