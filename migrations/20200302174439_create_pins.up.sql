CREATE TABLE pins (
    "id" SERIAL NOT NULL,
	"name" VARCHAR (255) NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
    "pin_number" integer,
    "device_id" integer
)