"use server"

import { createKysely } from '@vercel/postgres-kysely'
import { Generated, ColumnType } from 'kysely'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

interface EventsTable {
  id: Generated<number>
  name: string
  startdatetime: ColumnType<Date, Date | string, Date>
  enddatetime: ColumnType<Date, Date | string, Date>
  description: string
  description_past: string
  registration_url: string
  location: string
  images: string
}

interface AdminTable {
  id: Generated<number>
  username: string
  password: string
}

const EventData = z.object({
  id: z.string(),
  name: z.string(),
  images: z.string(),
  startdatetime: z.coerce.date(),
  enddatetime: z.coerce.date(),
  description: z.string(),
  description_past: z.string(),
  registration_url: z.string(),
  location: z.string(),
})

interface TeamTable {
  id: Generated<number>
  name: string
  role: string
  image: string
  position: number
}

const TeamData = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  image: z.string(),
  position: z.coerce.number(),
})

interface MembersTable {
  id: Generated<number>
  members: number
}

const MembersData = z.object({
  members: z.coerce.number(),
})

type TableKey = "team" | "events"
interface Database {
  team: TeamTable
  events: EventsTable
  admin: AdminTable
}

const db = createKysely<Database>()

function toObj(formData: FormData) {
  return Object.fromEntries(
    Array.from(formData.entries())
    .filter(
      ([key, value]) => !key.includes("ACTION")
    )
  )
}

type FormState = {
  message: string
}

export async function editEvent(prevState: FormState, formData: FormData) {
  try {
    const data = EventData.parse(toObj(formData))
    // normalize
    data.images = data.images
      .split(" ")
      .map(image => image.trim())
      .filter(image => image != "")
      .join(" ")
    const {id, ...without_id} = data
    let inserted_or_updated_id: number

    // no id given -> insert
    if (id == null || id == "") {
      inserted_or_updated_id = (await db
        .insertInto("events")
        .values(without_id)
        .returning("id")
        .executeTakeFirstOrThrow()
      ).id
    }

    // if id is given -> update
    else {
      await db
        .updateTable("events")
        .set(without_id)
        .where('id', '=', Number(id))
        .executeTakeFirstOrThrow()

      inserted_or_updated_id = Number(id)
    }

    revalidatePath("/")

    return { message: `Inserted/ Updated event with id ${inserted_or_updated_id}` }
  } catch (error) {
    console.log(error)
    return {message: `API Error: couldn't insert eventData. Error was: ${error}`}
  }
}

export async function editTeam(prevState: FormState, formData: FormData) {
  try {
    const data = TeamData.parse(toObj(formData))
    const {id, ...without_id} = data
    let inserted_or_updated_id: number

    // no id given -> insert
    if (id == null || id == "") {
      inserted_or_updated_id = (await db
        .insertInto("team")
        .values(without_id)
        .returning("id")
        .executeTakeFirstOrThrow()
      ).id
    }

    // if id is given -> update
    else {
      await db
        .updateTable("team")
        .set(without_id)
        .where('id', '=', Number(id))
        .executeTakeFirstOrThrow()

      inserted_or_updated_id = Number(id)
    }

    revalidatePath("/")

    return { message: `Inserted/ Updated team member with id ${inserted_or_updated_id}` }
  } catch (error) {
    console.log(error)
    return {message: `API Error: couldn't insert eventData. Error was: ${error}`}
  }
}

export async function editActiveMembers(formData: FormData) {
  const data = MembersData.parse(toObj(formData))

  await db
    .updateTable("members")
    .where("id", "=", 0)
    .set(data)
    .executeTakeFirst()
}

export async function getActiveMembers() {
  return await db
    .selectFrom("members")
    .selectAll()
    .where("id", "=", 0)
    .executeTakeFirst()
}

export async function getAllTeam() {
  return await db
    .selectFrom("team")
    .selectAll()
    .orderBy("position asc")
    .execute()
}

export async function getAllEvents() {
  return await db
    .selectFrom("events")
    .selectAll()
    .orderBy("startdatetime desc")
    .execute()
}

export async function authenticateUser(username: string, password: string) {
  const response = await db
    .selectFrom("admin")
    .selectAll()
    .where(`admin.username`, "=", username)
    .where(`admin.password`, "=", password)
    .executeTakeFirst()
  if (response === undefined){
    return false
  }
  return true
}

export async function deleteItem(table: TableKey, id: number) {
  await db
    .deleteFrom(table)
    .where(`${table}.id`, "=", id)
    .executeTakeFirst()

  revalidatePath("/")

  return
}
