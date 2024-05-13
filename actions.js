'use server'

import { sql } from "@vercel/postgres";

export async function saveEventData(formdata) {
    const data = Object.fromEntries(Array.from(formdata.entries()).filter(([key, value]) => !key.includes("$ACTION_ID")))
    const { resp } = await sql`INSERT INTO Events (Name, Date) VALUES (${data.name}, ${data.date})`
    console.log(resp)
}