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
    display_image varchar
    (255),

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
        (20) DEFAULT NULL,
    first_name varchar
        (20) NOT NULL,
    last_name varchar
        (20) NOT NULL,
    profile_picture text DEFAULT NULL,
    institution int
        (10) DEFAULT NULL,
    description text DEFAULT NULL,
    profession text DEFAULT NULL,
    linkedIn varchar
        (255) DEFAULT NULL,
    twitter varchar
        (255) DEFAULT NULL,
    last_login TIMESTAMP NULL DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL DEFAULT NULL,
    _deleted tinyint
        (1) DEFAULT 0,
    token varchar
        (255) DEFAULT NULL,

    PRIMARY KEY
        (id),
    FOREIGN KEY
        (institution) REFERENCES institution
        (id)

    -- FOREIGN KEY(institution) REFERENCES institution(id)

)AUTO_INCREMENT=10001;

        CREATE TABLE project
        (
            id int(10)
            AUTO_INCREMENT,
    title varchar
            (255) NOT NULL,
    description text NULL DEFAULT NULL,  
    abstract text DEFAULT NULL,
    poster_image text DEFAULT "default.jpg",  
    creator int
            (10),
    visibility_public boolean DEFAULT TRUE,
    final_paper text DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL DEFAULT NULL,
    published_at TIMESTAMP NULL DEFAULT NULL,

    PRIMARY KEY
            (id),
    FOREIGN KEY
            (creator) REFERENCES researcher
            (id)

)AUTO_INCREMENT=10001;

            CREATE TABLE project_comment
            (
                id int(10)
                AUTO_INCREMENT,  
    project_id int
                (10),   
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL DEFAULT NULL,

    PRIMARY KEY
                (id,project_id),
    FOREIGN KEY
                (project_id) REFERENCES project
                (id)

)AUTO_INCREMENT=10001;

                CREATE TABLE comment_reply
                (
                    id int(10)
                    AUTO_INCREMENT PRIMARY KEY,
    message text NOT NULL,
    author_id int
                    (10) NOT NULL,
    comment_id int
                    (10) NOT NULL,
    no_of_likes int
                    (10) DEFAULT 0 NOT NULL,
    no_of_dislikes int
                    (10) DEFAULT 0 NOT NULL,
    initial_comment boolean DEFAULT false NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL DEFAULT NULL,

    FOREIGN KEY
                    (comment_id) REFERENCES project_comment
                    (id),
    FOREIGN KEY
                    (author_id) REFERENCES researcher
                    (id)

)AUTO_INCREMENT=10001;



                    CREATE TABLE task
                    (
                        id int(10)
                        AUTO_INCREMENT,
    title varchar
                        (255) NOT NULL,
    description text NOT NULL,
    assigned_to int
                        (10),
    start_date TIMESTAMP NULL,   
    end_date TIMESTAMP NULL,
    progress VARCHAR
                        (100),
    remark text NOT NULL,
    creator_id int
                        (10),
    project_id int
                        (10),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL DEFAULT NULL,
    is_visible tinyint
                        (1) DEFAULT 1,


    PRIMARY KEY
                        (id,project_id),
    FOREIGN KEY
                        (creator_id) REFERENCES researcher
                        (id),
    FOREIGN KEY
                        (project_id) REFERENCES project
                        (id),
    FOREIGN KEY
                        (assigned_to) REFERENCES researcher
                        (id)
)AUTO_INCREMENT=10001;


                        CREATE TABLE task_comment
                        (
                            id int(10)
                            AUTO_INCREMENT,
    project_id int
                            (10),

    comment text NOT NULL,
    commentor_id int
                            (10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL DEFAULT NULL,
    is_visible tinyint
                            (1) DEFAULT 1,

    PRIMARY KEY
                            (id,project_id),
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

                                    CREATE TABLE collaborate
                                    (
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

                                    CREATE TABLE tag
                                    (
                                        id int(10)
                                        AUTO_INCREMENT,
    title varchar
                                        (255) NOT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL DEFAULT NULL,
    PRIMARY KEY
                                        (id)
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

                                        CREATE TABLE image
                                        (
                                            id int(10)
                                            AUTO_INCREMENT PRIMARY KEY,
                                                project_id int
                                            (10) NOT NULL REFERENCES project
                                            (id) ,
                                                url varchar
                                            (255) NOT NULL,
                                                caption varchar
                                            (255) NULL DEFAULT NULL,
                                                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                                updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                                deleted_at TIMESTAMP NULL DEFAULT NULL
                                            )AUTO_INCREMENT=10001;

                                            CREATE TABLE temporary_user
                                            (
                                                id int(10)
                                                AUTO_INCREMENT,
    email varchar
                                                (50) UNIQUE NOT NULL,
    password varchar
                                                (255) NOT NULL,
    first_name varchar
                                                (20) NOT NULL,
    last_name varchar
                                                (20) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    confirmed_at TIMESTAMP NULL DEFAULT NULL,
    PRIMARY KEY
                                                (id)
)AUTO_INCREMENT=10001;


                                                CREATE TABLE user_message
                                                (
                                                    id int(10)
                                                    AUTO_INCREMENT,
    name varchar
                                                    (255),
    email varchar
                                                    (255),
    message text,
    
    PRIMARY KEY
                                                    (id)
)AUTO_INCREMENT=10001;


                                                    CREATE TABLE question_category
                                                    (
                                                        id int(10)
                                                        AUTO_INCREMENT,
    category varchar
                                                        (255),
    
    PRIMARY KEY
                                                        (id)
)AUTO_INCREMENT=10001;


                                                        CREATE TABLE forum_question
                                                        (
                                                            id int(10)
                                                            AUTO_INCREMENT,
    title text NOT NULL,
    description text NULL DEFAULT NULL,  
    category_id int
                                                            (10),
    researcher_id int
                                                            (10),
    Q_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Q_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Q_deleted_at TIMESTAMP NULL DEFAULT NULL,
    is_visible tinyint
                                                            (1) DEFAULT 1,
    
    PRIMARY KEY
                                                            (id),
    FOREIGN KEY
                                                            (category_id) REFERENCES question_category
                                                            (id),
    FOREIGN KEY
                                                            (researcher_id) REFERENCES researcher
                                                            (id)
)AUTO_INCREMENT=10001;

CREATE TABLE forum_answer
(
    id int(10) AUTO_INCREMENT,
    answer text NOT NULL,  
    question_id int
                                                                (10),
    researcher_id int
                                                                (10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL DEFAULT NULL,
    is_visible tinyint
                                                                (1) DEFAULT 1,
    
    PRIMARY KEY
                                                                (id),
    FOREIGN KEY
                                                                (question_id) REFERENCES forum_question
                                                                (id),
    FOREIGN KEY
                                                                (researcher_id) REFERENCES researcher
                                                                (id)
)AUTO_INCREMENT=10001;


ALTER TABLE `forum_question`ADD `like_count` int(10) NOT NULL DEFAULT 0 AFTER `Q_deleted_at`;
ALTER TABLE `forum_answer`ADD `like_count` int(10) NOT NULL DEFAULT 0 AFTER `deleted_at`;
ALTER TABLE `researcher` CHANGE `contact_no` `contact_no` VARCHAR(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL;
