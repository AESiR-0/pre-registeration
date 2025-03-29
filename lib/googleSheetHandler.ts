import { google } from "googleapis";

type data = {
    firstName: string;
    lastName: string;
    email: string;
    country: string;
    daftar: string;
    stage: string;
    idealStartup: string;
}

const formatDate = () => {
    const date = new Date();
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const dd = String(date.getDate()).padStart(2, '0');
    const yy = String(date.getFullYear()).slice(-2);

    return `${mm}-${dd}-${yy}`;
};



export async function googleSheet(formData: data) {
    const { firstName, lastName, email, country, daftar, idealStartup, stage } = formData;
    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: process.env.CLIENT_EMAIL,
            private_key: process.env.PRIVATE_KEY?.replace(/\\n/g, "\n"),
        },
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    }
    )
    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = "1oQGJ5K7KdnXYi7UlIizzEEU9_62lG3VBvucMiQBA6HU";
    // Determine which sheet to use based on the URL
    const dateOfSubmission = formatDate()

    try {
        const response = await sheets.spreadsheets.values.append({
            range: "registrations",
            spreadsheetId,
            valueInputOption: "RAW",
            requestBody: {
                values: [
                    [
                        firstName,
                        lastName,
                        email,
                        country,
                        daftar,
                        stage,
                        idealStartup,
                        dateOfSubmission
                    ],
                ],
            },
        });

        console.log("Data successfully appended:", response.data);
        return "Data successfully added to Google Sheet";
    } catch (error: any) {
        console.error("Error appending data to Google Sheets:", error);
        throw new Error(
            error.response?.data?.error?.message ||
            "Failed to add data to Google Sheet"
        );
    }
}

