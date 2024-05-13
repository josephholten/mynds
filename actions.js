'use server'

import { sql } from "@vercel/postgres";

export async function saveEventData(formdata) {
    const data = Object.fromEntries(Array.from(formdata.entries()).filter(([key, value]) => !key.includes("$ACTION_ID")))
    const { resp } = await sql`INSERT INTO Events (Name, Date) VALUES (${data.name}, ${data.date})`
    console.log(resp)
}

export async function saveMemberData(formdata) {
    const data = Object.fromEntries(Array.from(formdata.entries()).filter(([key, value]) => !key.includes("$ACTION_ID")))
    const { resp } = await sql`INSERT INTO Events (Name, Date) VALUES (${data.name}, ${data.date})`
    console.log(resp)
}

export async function deleteMemberData(formdata) { // formdata=ID:id
    const data = Object.fromEntries(Array.from(formdata.entries()).filter(([key, value]) => !key.includes("$ACTION_ID")))
    const { resp } = await sql`INSERT INTO Events (Name, Date) VALUES (${data.name}, ${data.date})`
    console.log(resp)
}

export async function deleteEventData(formdata) {
    const data = Object.fromEntries(Array.from(formdata.entries()).filter(([key, value]) => !key.includes("$ACTION_ID")))
    const { resp } = await sql`INSERT INTO Events (Name, Date) VALUES (${data.name}, ${data.date})`
    console.log(resp)
}

export async function editMemberData(formdata) {//formdata=ID:id, all other data where stuff that should not be changed is blank
    const data = Object.fromEntries(Array.from(formdata.entries()).filter(([key, value]) => !key.includes("$ACTION_ID")))
    const { resp } = await sql`INSERT INTO Events (Name, Date) VALUES (${data.name}, ${data.date})`
    console.log(resp)
}

export async function editEventData(formdata) {
    const data = Object.fromEntries(Array.from(formdata.entries()).filter(([key, value]) => !key.includes("$ACTION_ID")))
    const { resp } = await sql`INSERT INTO Events (Name, Date) VALUES (${data.name}, ${data.date})`
    console.log(resp)
}
