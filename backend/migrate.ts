import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db } from "./database"; // Ensure correct path

async function main() {
  try {
    await migrate(db, { migrationsFolder: "./backend/drizzle/migrations" });
    console.log("✅ Migration completed successfully!");
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  }
}

main();
