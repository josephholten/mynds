import "/src/app/globals.css";
import {CalendarLink} from "./CalendarLink"

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
  return events.map((event) => ({
    event: event.name.toLowerCase().replace(" ", "-"),
  }))
}

export default function EventPage({ params }){
  const event_path = params.event
  const matched = events.filter(ev => ev.name.toLowerCase() == event_path.replace("-", " "))
  const event = matched[0]

  if (!event) return <p>No Event Found!</p>;

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  const [day, month, year] = event.date.split(".");
  const eventDate = new Date(`${year}-${month}-${day}`);
  var eventInPast = false
  if (eventDate < currentDate){
    eventInPast = true
  }

  
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
              startTime: DateReformater(event.date) + "T" + event.startTime + ":00+02:00",
              endTime: DateReformater(event.date) + "T" + event.endTime + ":00+02:00",
              location: event.location
            }} />
          </>
        )}
        <div className="gap-6 max-w-screen-sm">
            {event.img_src.map(img => (
              <div key={img} className="max-w-screen-sm px-2">
                <img src={"/events/"+img} alt={`Bilder von ${event.name}`} width="100%" className="object-contain rounded-lg m-4"></img>
              </div>
            ))}
        </div>
    </div>
)}
