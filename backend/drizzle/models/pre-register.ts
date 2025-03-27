import {
    pgTable, text, serial,
} from "drizzle-orm/pg-core";

export const preRegister = pgTable("pre-registered-users", {
    id: serial("id").primaryKey(), // ID with role-based prefix
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    email: text("email").unique().notNull(),
    country: text("country").notNull(),
    daftar: text("daftar").notNull()
}
)