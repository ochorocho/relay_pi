CREATE TYPE switch_types AS ENUM ('dimmer', 'switch', 'shutter');

CREATE TABLE devices (
    "id" SERIAL NOT NULL,
	"name" VARCHAR (255) NOT NULL,
	"type" switch_types,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
    "room_id" integer,
    CONSTRAINT room_id FOREIGN KEY (room_id) REFERENCES rooms (id)
)