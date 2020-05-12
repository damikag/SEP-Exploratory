CREATE TABLE chat(
    id int(10) AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    description text,
    logo text,
    creator_id int(10) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL DEFAULT NULL,

    PRIMARY KEY (id)
)AUTO_INCREMENT=10001;

CREATE TABLE participant(
    chat_id int(10),
    user_id int(10),
    isAdmin Boolean DEFAULT FALSE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL DEFAULT NULL,

    PRIMARY KEY (chat_id,user_id),
    FOREIGN KEY(chat_id) REFERENCES chat(id),
    FOREIGN KEY(user_id) REFERENCES researcher(id)
);

CREATE TABLE message(
    id int(10) AUTO_INCREMENT,
    chat_id int(10),
    message text,
    message_time TIMESTAMP,
    sender_id int(10),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL DEFAULT NULL,

    PRIMARY KEY (id,chat_id),
    FOREIGN KEY(chat_id) REFERENCES chat(id),
    FOREIGN KEY(sender_id) REFERENCES researcher(id)
)AUTO_INCREMENT=10001;

