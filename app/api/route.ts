import { NextResponse, NextRequest } from "next/server";
import { db } from "@/backend/database";
import { preRegister } from "@/backend/drizzle/models/pre-register";
import { googleSheet } from "@/lib/googleSheetHandler";

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const { firstName, lastName, email, country, daftar, idealStartup, stage } = data;

        // Insert into the database first
        await db.insert(preRegister).values({ firstName, lastName, email, country, daftar, stage, idealStartup }).returning();

        // If the database insertion is successful, then send data to Google Sheets
        try {
            await googleSheet({ firstName, lastName, email, country, daftar, idealStartup, stage });
        } catch (error: any) {
            console.log("Error sending data to Google Sheets:", error);
            // Optionally, you can handle the error here, e.g., log it or notify the user
        }

        return NextResponse.json({ message: 'Added to the pre-registration' }, { status: 200 });
    } catch (error: any) {
        console.error("Database error:", error);
        if (error.code === "23505") {
            return NextResponse.json({ error: "Email already exists" }, { status: 400 });
        }
        console.log(error);
        return NextResponse.json({ error: "Failed to insert data" }, { status: 500 });
    }
}