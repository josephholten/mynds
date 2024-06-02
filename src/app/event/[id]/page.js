import "/src/app/globals.css";
import {CalendarLink} from "./CalendarLink"
import { getAllEvents, getEvent } from "/src/app/actions"
import Image from 'next/image'

function DateReformater(date) {
  console.log(date)
  const parts = date.split(".");
  return `${parts[2]}-${parts[1]}-${parts[0]}`;
}

/*
export async function getStaticPaths() {
  const paths = events.map(event => ({
      params: { event: event.name.replace(/\s+/g, '-').toLowerCase() },
  }));

  return { paths, fallback: false };
}
*/

/*j
export async function getStaticProps({ params }) {
  const event = events.find(e => e.name.replace(/\s+/g, '-').toLowerCase() === params.event);
  return { props: { event } };
}
*/

export async function generateStaticParams() {
  const events = await getAllEvents()
  return events.map((event) => ({
    id: event.id.toString(),
  }))
}

export default async function EventPage({ params }){
  const { id } = params
  console.log(id)
  const event = await getEvent(id)
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  const eventInPast = event.startdatetime < currentDate
  const images = event.images.split(" ")
  
  return (
    <div className='flex flex-col gap-2 px-10 py-4 items-center'>
      <div className="font-bold text-center text-xl">{event.name}</div>
      <div className="italic text-center text-lg">{event.date}</div>
      {eventInPast ? (
          <div>{event.description_past}</div>
        ) : (
          <>
            <div>{event.description}</div>
            <div>Melde dich <a href={event.registration_url} className="underline">hier</a> für das Event an</div>
            <CalendarLink eventData={{
              title: event.name,
              description: event.description,
              startTime: event.startdatetime,
              endTime: event.enddatetime,
              location: event.location
            }} />
          </>
        )}
        <div className="gap-6 max-w-screen-sm">
            {images.map(img => (
              <div key={img} className="max-w-screen-sm px-2">
                <Image src={img} alt={`Bild von ${event.name}`} width="400" height="400" className="object-contain rounded-lg m-4" />
              </div>
            ))}
        </div>
    </div>
  )
}
