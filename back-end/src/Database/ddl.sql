CREATE TABLE researcher(
    id int(10) AUTO_INCREMENT,
    email varchar(50) UNIQUE NOT NULL,
    password varchar(255) NOT NULL,
    contact_no varchar(20) NOT NULL,
    first_name varchar(20) NOT NULL,
    last_name varchar(20) NOT NULL,
    profile_picture text DEFAULT NULL,
    institution int(10) DEFAULT NULL,
    bio text DEFAULT NULL,

    last_login TIMESTAMP NULL DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    _deleted boolean DEFAULT FALSE,
    token varchar(255) DEFAULT NULL,

    PRIMARY KEY(id)

    -- FOREIGN KEY(institution) REFERENCES institution(id)


)AUTO_INCREMENT=10001;
