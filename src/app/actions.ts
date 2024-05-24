"use server"

import { createKysely } from '@vercel/postgres-kysely'
import { Generated, ColumnType } from 'kysely'
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
}

const TeamData = z.object({
  name: z.string(),
  role: z.string(),
  image: z.string(),
})

type TableKey = "team" | "events"
interface Database {
  team: TeamTable
  events: EventsTable
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

    return { message: `Inserted/ Updated event with id ${inserted_or_updated_id}` }
  } catch (error) {
    console.log(error)
    return {message: `API Error: couldn't insert eventData. Error was: ${error}`}
  }
}

export async function getAll(table: TableKey) {
  return await db
    .selectFrom(table)
    .selectAll()
    .orderBy("startdatetime desc")
    .execute()
}

export async function deleteItem(table: TableKey, id: number) {
  await db
    .deleteFrom(table)
    .where(`${table}.id`, "=", id)
    .executeTakeFirst()
  return
}

export async function newMember(formData: FormData) {
  // TODO
}