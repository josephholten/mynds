import "../../src/app/globals.css";
import events from '../../src/app/events.json';


function DateReformater(date) {
  console.log(date)
  const parts = date.split(".");
  return `${parts[2]}-${parts[1]}-${parts[0]}`;
}

function CalendarLink({ event }) {
  const { title, description, startTime, endTime, location } = event;

  const formatTime = (time) => time.replace(/-|:|\.\d\d\d/g, '');

  console.log(startTime)
  console.log(endTime)
  console.log(formatTime(startTime))
  console.log(formatTime(endTime))

  const googleUrl = `https://calendar.google.com/calendar/r/eventedit?text=${encodeURIComponent(title)}&dates=${formatTime(startTime)}/${formatTime(endTime)}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}`;

  const microsoftUrl = `https://outlook.live.com/owa/?path=/calendar/action/compose&rru=addevent&startdt=${formatTime(startTime)}&enddt=${formatTime(endTime)}&subject=${encodeURIComponent(title)}&body=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}`;

  // Note: Implement .ics file creation for Apple iCal integration in a real app scenario

  return (
    <div className="p-4 bg-blue-500 text-white rounded-lg cursor-pointer">
      <div onClick={() => window.open(googleUrl, '_blank')} className="mb-2">
        Add to Google Calendar
      </div>
      <div onClick={() => window.open(microsoftUrl, '_blank')} className="mb-2">
        Add to Microsoft Calendar
      </div>
      {/* Apple Calendar link would go here */}
    </div>
  );
};


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

  const calendarHTML = CalendarLink({
    event: {
      title: event.name, 
      description: event.description, 
      startTime: DateReformater(event.date)+"T"+event.startTime+":00+02:00",
      endTime: DateReformater(event.date)+"T"+event.endTime+":00+02:00",
      location: event.location 
    }
  });

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
              <div>Melde dich <a href={event.registration_url} className="underline">hier</a> für das Event an</div>
              {calendarHTML}
            </>
          )}
      </div>
    </>
)}