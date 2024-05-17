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
  img_id: number
}

const TeamData = z.object({
  name: z.string(),
  role: z.string(),
  img_id: z.number(),
})

interface ImagesTable {
  id: Generated<number>
  url: string
  event_id: number | null
}

const ImgData = z.object({
  url: z.string(),
  event_id: z.number().nullable(),
})

type TableKey = "team" | "images" | "events"
interface Database {
  team: TeamTable
  images: ImagesTable
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

async function insertImage({url, event_id}: {url: string, event_id: number | null}) {
  try {
    const ids = await db
    .insertInto("images")
    .values({url, event_id})
    .returning('id')
    .execute()
    console.log(`inserted images with ids ${ids[0].id}`)
  } catch (error) {
    console.log(error)
    return {message: `API Error: couldn't insert image. Error was: ${error}`}
  }
}

export async function newEvent(prevState: FormState, formData: FormData) {
  try {
    const data = EventData.parse(toObj(formData))
    const {images, id, ...without_images} = data

    if (id != null && id != "") {
      const result = await db
      .updateTable("events")
      .set({...without_images})
      .where('id', "=", Number(id))
      .execute()
      if (result.length !== 1) {
        return {message: `updated multiple events -> non unique primary key?`}
      } else {
        return {message: `Updated ${result[0].numUpdatedRows} rows`}
      }
    } else {
      const ids: {id: number}[] = await db
      .insertInto("events")
      .values(without_images)
      .returning("id")
      .execute()

      if (ids.length != 1) {
        return { message: `API ERROR: inserted not precisely one events??` }
      } else {
        const id = ids[0].id
        data.images
          .split(",")
          .map(url => url.trim())
          .filter(url => url !== "")
          .forEach(url => insertImage({ url, event_id: id }))

        return { message: `Inserted event with id ${id}` }
      }
    }
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
  const resp = await db
    .deleteFrom(table)
    .where(`${table}.id`, "=", id)
    .executeTakeFirst()
  console.log(resp)
  return
}

export async function getImageSourcesForEvent(id: number) {
  const images = await db
    .selectFrom("images")
    .selectAll()
    .where("images.event_id", "=", id)
    .execute()
  return images.map(image => image.url)
}

export async function newMember(formData: FormData) {
  // TODO
}