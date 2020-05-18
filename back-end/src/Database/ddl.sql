CREATE TABLE institution
(
    id int(10)
    AUTO_INCREMENT,
    name varchar
    (100) NOT NULL,
    description text NOT NULL,
    location text DEFAULT NULL,
    address varchar
    (255) DEFAULT NULL,
    official_web_site text DEFAULT NULL,
    email varchar
    (50) NOT NULL,
    display_image varchar(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL DEFAULT NULL,

    PRIMARY KEY
    (id)
)AUTO_INCREMENT=10001;

    CREATE TABLE researcher
    (
        id int(10)
        AUTO_INCREMENT,
    email varchar
        (50) UNIQUE NOT NULL,
    password varchar
        (255) NOT NULL,
    contact_no varchar
        (20) NOT NULL,
    first_name varchar
        (20) NOT NULL,
    last_name varchar
        (20) NOT NULL,
    profile_picture text DEFAULT NULL,
    institution int
        (10) DEFAULT NULL,
    bio text DEFAULT NULL,

    last_login TIMESTAMP NULL DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL DEFAULT NULL,

    token varchar
        (255) DEFAULT NULL,

    PRIMARY KEY
        (id),
    FOREIGN KEY
        (institution) REFERENCES institution
        (id)

    -- FOREIGN KEY(institution) REFERENCES institution(id)

)AUTO_INCREMENT=10001;

CREATE TABLE project(
    id int(10) AUTO_INCREMENT,
    title varchar(255) NOT NULL,
    description text NOT NULL,  
    poster_image text DEFAULT "default.jpg",  
    creator int(10),
    visibility_public boolean DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL DEFAULT NULL,
    published_at TIMESTAMP NULL DEFAULT NULL

    PRIMARY KEY(id),
    FOREIGN KEY(creator) REFERENCES researcher(id)

)AUTO_INCREMENT=10001;

            CREATE TABLE project_comment
            (
                id int(10)
                AUTO_INCREMENT,
    comment text NOT NULL,
    commentor_id int
                (10),
    project_id int
                (10),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL DEFAULT NULL,

    PRIMARY KEY
                (id,project_id),
    FOREIGN KEY
                (commentor_id) REFERENCES researcher
                (id),
    FOREIGN KEY
                (project_id) REFERENCES project
                (id)

)AUTO_INCREMENT=10001;

                CREATE TABLE task
                (
                    id int(10)
                    AUTO_INCREMENT,
    title varchar
                    (255) NOT NULL,
    description text NOT NULL,
    start_date TIMESTAMP NULL,   
    end_date TIMESTAMP NULL,
    progress VARCHAR
                    (200),
    creator_id int
                    (10),
    project_id int
                    (10),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL DEFAULT NULL,


    PRIMARY KEY
                    (id,project_id),
    FOREIGN KEY
                    (creator_id) REFERENCES researcher
                    (id),
    FOREIGN KEY
                    (project_id) REFERENCES project
                    (id)
)AUTO_INCREMENT=10001;

                    CREATE TABLE note
                    (
                        id int(10)
                        AUTO_INCREMENT,
    description text NOT NULL,
    task_id int
                        (10),
    project_id int
                        (10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL DEFAULT NULL,


    PRIMARY KEY
                        (id,task_id,project_id),
    FOREIGN KEY
                        (task_id) REFERENCES task
                        (id),
    FOREIGN KEY
                        (project_id) REFERENCES project
                        (id)

)AUTO_INCREMENT=10001;


                        CREATE TABLE task_comment
                        (
                            id int(10)
                            AUTO_INCREMENT,
    task_id int
                            (10),
    project_id int
                            (10),

    comment text NOT NULL,
    commentor_id int
                            (10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL DEFAULT NULL,


    PRIMARY KEY
                            (id,task_id,project_id),
    FOREIGN KEY
                            (task_id) REFERENCES task
                            (id),
    FOREIGN KEY
                            (project_id) REFERENCES project
                            (id),
    FOREIGN KEY
                            (commentor_id) REFERENCES researcher
                            (id)
)AUTO_INCREMENT=10001;


                            CREATE TABLE notification_type
                            (
                                id int(2)
                                AUTO_INCREMENT PRIMARY KEY,   
    title varchar
                                (20),
    description text NOT NULL,
    image text NOT NULL,
    icon varchar
                                (20) NOT NULL,
                                link text NOT NULL,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL DEFAULT NULL)
    AUTO_INCREMENT=10001;

                                CREATE TABLE notification
                                (
                                    id int(10)
                                    AUTO_INCREMENT,
    not_type int
                                    (2),
    _read boolean DEFAULT FALSE,
    researcher_id int
                                    (10),
    direct_to int
                                    (10),  

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL DEFAULT NULL,


    PRIMARY KEY
                                    (id),
    FOREIGN KEY
                                    (researcher_id) REFERENCES researcher
                                    (id),
    FOREIGN KEY
                                    (not_type) REFERENCES notification_type
                                    (id)
)AUTO_INCREMENT=10001;





                                    CREATE TABLE follow_researcher
                                    (
                                        follower_id int(10) NOT NULL,
                                        followee_id int(10) NOT NULL,

                                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                        deleted_at TIMESTAMP NULL DEFAULT NULL,


                                        PRIMARY KEY(follower_id,followee_id),
                                        FOREIGN KEY(follower_id) REFERENCES researcher(id),
                                        FOREIGN KEY(followee_id) REFERENCES researcher(id)
                                    );

                                    CREATE TABLE follow_institution
                                    (
                                        follower_id int(10) NOT NULL,
                                        institution_id int(10) NOT NULL,

                                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                        deleted_at TIMESTAMP NULL DEFAULT NULL,

                                        PRIMARY KEY(follower_id,institution_id),
                                        FOREIGN KEY(follower_id) REFERENCES researcher(id),
                                        FOREIGN KEY(institution_id) REFERENCES institution(id)
                                    );

                                    CREATE TABLE follow_project
                                    (
                                        follower_id int(10) NOT NULL,
                                        project_id int(10) NOT NULL,

                                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                        deleted_at TIMESTAMP NULL DEFAULT NULL,

                                        PRIMARY KEY(follower_id,project_id),
                                        FOREIGN KEY(follower_id) REFERENCES researcher(id),
                                        FOREIGN KEY(project_id) REFERENCES project(id)
                                    );

CREATE TABLE collaborate(
    researcher_id int(10) NOT NULL,
    project_id int(10) NOT NULL,
    isAdmin Boolean DEFAULT 0,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL DEFAULT NULL,

    PRIMARY KEY(researcher_id,project_id),
    FOREIGN KEY(researcher_id) REFERENCES researcher(id),
    FOREIGN KEY(project_id) REFERENCES project(id)
);

CREATE TABLE task_responsibility
(
	researcher_id int(10) NOT NULL,
        project_id int(10) NOT NULL,
        task_id int(10) NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP NULL DEFAULT NULL,

        PRIMARY KEY(researcher_id,project_id,task_id),
        FOREIGN KEY(researcher_id) REFERENCES researcher(id),
        FOREIGN KEY(project_id) REFERENCES project(id),
        FOREIGN KEY(task_id) REFERENCES task(id)
);


CREATE TABLE tag
(
    id int(10) AUTO_INCREMENT,
    title varchar(255) NOT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL DEFAULT NULL,
    PRIMARY KEY(id)
)AUTO_INCREMENT=10001;

CREATE TABLE tag_project
(
    tag_id int(10) NOT NULL,
    project_id int(10) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL DEFAULT NULL,
    PRIMARY KEY (tag_id,project_id),
    FOREIGN KEY(tag_id) REFERENCES tag(id),
    FOREIGN KEY(project_id) REFERENCES project(id)
);

CREATE TABLE image(
	id int(10) PRIMARY KEY,
	project_id int(10) REFERENCES project(id),
	url varchar(255)	
);

ALTER TABLE `image` ADD `caption` VARCHAR(255) NOT NULL DEFAULT '' AFTER `url`, ADD `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP AFTER `caption`, ADD `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP AFTER `created_at`, ADD `deleted_at` TIMESTAMP NULL DEFAULT NULL AFTER `updated_at`;

