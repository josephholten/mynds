import "../globals.css";
import events from '../../src/app/events.json';


//TODO what does this do? 
//TODO: differentiate old and new events
export async function getStaticPaths() {
  const paths = events.map(event => ({
      params: { event: event.name.replace(/\s+/g, '-').toLowerCase() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const event = events.find(e => e.name.replace(/\s+/g, '-').toLowerCase() === params.event);
  return { props: { event } };
}

export default function EventPage({ event }){
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
    <>
      <div className="flex flex-col items-center">
        <div className="font-bold text-center text-xl">{event.name}</div>
        <div className="italic text-base text-center text-lg">{event.date}</div>
        <div className="flex flex-wrap justify-center gap-6">
          {event.img_src.map(img => (
            <img src={"/events/"+img} alt="member" className="h-36 w-36 object-cover rounded-lg mt-5 mb-3"></img>
          ))}
        </div>
        {eventInPast ? (
            <div>{event.description_past}</div>
          ) : (
            <>
              <div>{event.description}</div>
              <div>Melde dich hier für das Event an: {event.registration_url}</div>
            </>
          )}
      </div>
    </>
)}