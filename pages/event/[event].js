import "/src/app/globals.css";
import events from '/src/app/events.json';
import { useRouter } from 'next/router';


function DateReformater(date) {
  console.log(date)
  const parts = date.split(".");
  return `${parts[2]}-${parts[1]}-${parts[0]}`;
}

function CalendarLink({ eventData }) {
  const router = useRouter();
  const { event } = router.query;

  const { title, description, startTime, endTime, location } = eventData;

  const formatTime = (time) => time.replace(/-|:|\.\d\d\d/g, '');

  const googleUrl = `https://calendar.google.com/calendar/r/eventedit?text=${encodeURIComponent(title)}&dates=${formatTime(startTime)}/${formatTime(endTime)}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}`;
  const microsoftUrl = `https://outlook.live.com/owa/?path=/calendar/action/compose&rru=addevent&startdt=${formatTime(startTime)}&enddt=${formatTime(endTime)}&subject=${encodeURIComponent(title)}&body=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}`;

  // Apple ics file:
  function handleAddEvent() {
    const eventICS = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VTIMEZONE',
      'TZID:Europe/Berlin', //all the following is just time zone stuff
      'BEGIN:STANDARD',
      'DTSTART:19961027T030000',
      'RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU',
      'TZOFFSETFROM:+0200',
      'TZOFFSETTO:+0100',
      'TZNAME:CET',
      'END:STANDARD',
      'BEGIN:DAYLIGHT',
      'DTSTART:19810329T020000',
      'RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU',
      'TZOFFSETFROM:+0100',
      'TZOFFSETTO:+0200',
      'TZNAME:CEST',
      'END:DAYLIGHT',
      'END:VTIMEZONE',
      'BEGIN:VEVENT', //now event stuff
      `URL:localhost:3000/events/${event}`,
      `DTSTART;TZID=Europe/Berlin:${formatTime(startTime).split("+")[0]}`,
      `DTEND;TZID=Europe/Berlin:${formatTime(endTime).split("+")[0]}`,  
      `SUMMARY:${title}`,    // Event title
      `DESCRIPTION:${description}`, 
      `LOCATION:${location}`, 
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([eventICS], { type: 'text/calendar;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'event.ics');  // Set the file name for the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-wrap justify-center gap-x-6 text-sm p-4">
      <div onClick={() => window.open(googleUrl, '_blank')} className="">
        Add to Google Calendar
      </div>
      <div onClick={handleAddEvent}>
        Add to Apple Calendar
      </div>
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
    eventData: {
      title: event.name, 
      description: event.description, 
      startTime: DateReformater(event.date)+"T"+event.startTime+":00+02:00",
      endTime: DateReformater(event.date)+"T"+event.endTime+":00+02:00",
      location: event.location 
    }
  });


return (
    <div className='flex flex-col gap-2 px-10 py-4 items-center'>
      <div className="font-bold text-center text-xl">{event.name}</div>
      <div className="italic text-base text-center text-lg">{event.date}</div>
      {eventInPast ? (
          <div>{event.description_past}</div>
        ) : (
          <>
            <div>{event.description}</div>
            <div>Melde dich <a href={event.registration_url} className="underline">hier</a> für das Event an</div>
            {calendarHTML}
          </>
        )}
        <div className="gap-6 max-w-screen-sm">
            {event.img_src.map(img => (
              <div key={img} className="max-w-screen-sm px-2">
                <img src={"/events/"+img} alt={`Bilder von ${event.name}`} width="100%" className="object-contain rounded-lg "></img>
              </div>
            ))}
        </div>
    </div>
)}
