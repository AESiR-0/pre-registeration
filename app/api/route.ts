import { NextResponse, NextRequest } from "next/server";
import { db } from "@/backend/database";
import { preRegister } from "@/backend/drizzle/models/pre-register";

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const { firstName, lastName, email, country, daftar } = data;
        await db.insert(preRegister).values({ firstName, lastName, email, country, daftar }).returning()
        return NextResponse.json({ message: 'Added to the pre-registration' }, { status: 200 })
    }
    catch (error: any) {
        console.error("Database error:", error)
        if (error.code === "23505") {
            return NextResponse.json({ error: "Email already exists" }, { status: 400 })
        }

        return NextResponse.json({ error: "Failed to insert data" }, { status: 500 })
    }
}