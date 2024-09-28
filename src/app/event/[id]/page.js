import "/src/app/globals.css";
import {CalendarLink} from "./CalendarLink"
import { getAllEvents, getEvent } from "/src/app/actions"
import Image from 'next/image'
import Link from 'next/link';
import { TopBar } from '../../components';

const formatDateTime = (dt) => {
  const pad = (num) => num.toString().padStart(2, '0');
  return `${dt.getDate()}.${dt.getMonth()+1}.${dt.getFullYear()}, ${pad(dt.getUTCHours())}:${pad(dt.getUTCMinutes())}`;
}

export async function generateStaticParams() {
  const events = await getAllEvents()
  return events.map((event) => ({
    id: event.id.toString(),
  }))
}

function Imprint(props) {
  return (
    <div className="w-full" {...props}>
      <div className="text-center font-bold text-xl">Impressum</div>
      <div className="flex flex-wrap justify-center gap-x-6 text-sm">
        <div>Verantwortlich: mynds e.V.</div>
        <div>H3,20,68159 Mannheim</div>
        <a href="mailto:info@mynds-campus.de" className="underline">info@mynds-campus.de</a>
        <div>Vertretungsberechtigt: Lea Marie Kühn, Tim Neubauer & Annalena Straub als Vorstand von mynds e.V.</div>
        <Link href="/privacy" className="underline">Datenschutzerklärung</Link>
      </div>
      <div className="flex flex-wrap justify-center text-sm gap-x-1 mt-5">
        <div>Website erstellt von </div>
        <a href="http://hirsch.holten.com" className='underline'>Hirsch & Holten GbR</a>
      </div>
    </div>
  )
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
    <div className='flex flex-col items-center'>
    <TopBar />
    <div className='flex flex-col min-h-screen'>
      
      <main className='flex flex-col flex-grow items-center px-10 py-4 mt-16'>
        <div className='max-w-screen-sm w-full'>
          <h1 className="font-bold text-center text-xl">{event.name}</h1>
          <p className="italic text-center text-lg">@{event.location}</p>
          <p className="italic text-center text-lg">{formatDateTime(event.startdatetime)}</p>
          
          {eventInPast ? (
            <p>{event.description_past}</p>
          ) : (
            <>
              <p>{event.description}</p>
              <p>Melde dich <a href={event.registration_url} className="underline">hier</a> für das Event an</p>
              <CalendarLink eventData={{
                title: event.name,
                description: event.description,
                startTime: event.startdatetime,
                endTime: event.enddatetime,
                location: event.location,
                id: event.id,
              }} />
            </>
          )}

          <div className="gap-6 mt-6">
            {images.map(img => (
              <div key={img} className="max-w-screen-sm px-2">
                <Image src={img} alt={`Bild von ${event.name}`} width="400" height="400" className="object-contain rounded-lg m-4" />
              </div>
            ))}
          </div>
        </div>
      </main>
      <footer className="w-full mt-auto">
        <Imprint className="stripe-down text-white py-5" />
      </footer>
    </div>
    </div>
  );
}