CREATE TABLE groups (
    "id" SERIAL PRIMARY KEY NOT NULL,
	"name" VARCHAR (255) NOT NULL,
	"description" VARCHAR (255) NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
)