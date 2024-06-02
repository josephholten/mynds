import Link from 'next/link';
import Image from 'next/image'

import headerImage from './images/header.png'
import whatsappLogo from './images/whatsapp.svg'
import mailLogo from './images/mail.svg'
import instagramLogo from './images/instagram.svg'
import linkedinLogo from './images/linkedin.svg'
import quoteOpenImage from './images/quote-open.svg'
import quoteClosedImage from './images/quote-closed.svg'

import { TopBar, Headline } from './components';
import { getAllEvents, getAllTeam, getActiveMembers } from './actions'

function AboutUs(props) {
  return (<div className='flex justify-center py-5' {...props}>
    <div className="w-20 flex flex-col justify-end">
      <Image src={quoteOpenImage} alt="" />
    </div>
    <div className='italic font-bold text-xl text-center max-w-prose'>
      <div>
        Our mission is to empower female students in
        business and economics, removing obstacles and
        fostering a gender-inclusive environment through
        mentorship, education, and community support.
      </div>
      <div>
        We are dedicated to a future where business and
        economics leaders mirror our diverse society, with
        female students fully supported to thrive in an equal
        professional world
      </div>
    </div>
    <div className='w-20'>
      <Image src={quoteClosedImage} alt="" />
    </div>
  </div>)
}

async function Team(props) {
  //description: 1) delete 2) ein/ausklappen 3) link to site with description 4) keep like this
  const team = await getAllTeam()
  const active_members = await getActiveMembers()

  return (
    <div className='flex flex-col items-center w-full py-5' {...props}>
      <Headline>Meet our team!</Headline>
      <div className="grid grid-cols-3 gap-14">
        {team.map(member => (
          <div className="flex flex-col items-center" key={member.name} >
            <div className="font-bold text-center text-xl">{member.name}</div>
            <div className="italic text-center text-lg">{member.role}</div>
            <Image src={member.image} alt="member" className="object-cover rounded-full mt-5 mb-3" width={300} height={300} />
          </div>
        ))}
      </div>
      <div className='font-bold text-4xl mt-16'>{active_members.members}</div>
      <div className='font-bold text-5xl mt-2'>Active Members</div>
      <div>
        Want to become part of our Team? Join our <a 
          className="underline" target="_blank" 
          href="https://chat.whatsapp.com/EoLzYlBaK9R7rubktNGzZF?fbclid=PAZXh0bgNhZW0CMTEAAaa_CMHfjyKyl5kVcuvDE2ZHRfl0tn5VF58nmmWHJb-WXixKJGgt6rnpSKo_aem_AQay7JaE6GqvemGT52JGMXV_sZMHJjFaB3lN7cIK6NMdKrkneWc4ikvWGfb6SB5C7iSKN4Fttaq43U8g449sgidA"
        >
          WhatsApp Community
        </a>!
      </div>
    </div>
  )
}

async function Events(props) {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const events = await getAllEvents()

  const eventsDataPast = events.filter(event => event.startdatetime < currentDate)
  const eventsDataFuture = events.filter(event => event.startdatetime >= currentDate)

  const formatDateTime = (dt) => (`${dt.getDay()}.${dt.getMonth()}.${dt.getYear()}, ${dt.getHours()}:${dt.getMinutes()}`)

  const formatEvent = (event, description) => (
    <div className="flex flex-col items-center" key={event.id}>
      <Link href={`/event/${event.id}`}>
        <div className="h-16 flex flex-col justify-center">
          <div className="font-bold text-center text-xl">{event.name}</div>
          <div className="italic text-center text-lg">{formatDateTime(event.startdatetime)}</div>
        </div>
        <Image src={event.images.split(" ")[0]} alt="event" className="object-contain rounded-lg mt-5 mb-3" width={1000} height={1000} />
        <div>{description}</div>
      </Link>
    </div>
  )
  
  const eventsPast = eventsDataPast.map(event => formatEvent(event, event.description_past))
  const eventsFuture = eventsDataFuture.map(event => formatEvent(event, event.description))

  return (
    <div className='flex flex-col gap-10' {...props}>
      {eventsFuture.length !== 0 && (
        <div>
          <Headline>Upcoming Events</Headline>
          <div className="grid grid-cols-2 justify-center gap-6 ">
            {eventsFuture}
          </div>
        </div>)}
        {eventsFuture.length == 0 && (
        <div>
          <Headline>New Events</Headline>
          <div className='flex justify-center'>
            <div className='w-[50%] text-center aspect-square flex items-center align-center justify-center border-2 border-background rounded-md'>
              <div className='font-headline text-2xl'>
                Coming Soon!
              </div>
            </div>
          </div>
        </div>)}
      <div className='flex flex-col items-center mt-16'>
        <Headline>What we do</Headline>
        <div className='max-w-prose mb-6'>
          Hier ein kurzer Text über die vergangenen Events! Wir hatten alle ganz viel Spaß.
          Wenn ihr bei einem der tollen Events mitmachen wollt, registriert euch bitte davor,
          indem ihr auf das Event klickt und dann dem Link folgt.
        </div>
        <div className="grid grid-cols-2 justify-center gap-6">
          {eventsPast}
        </div>
      </div>
    </div>
  )
}

function Imprint(props) {
  return (<div {...props}>
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
  </div>)
}

function JoinUs(props) {
  return (<div className='flex items-center gap-3' {...props}>
    <div className='text-lg'>Want to join our community? Reach out under</div>
    <a target="_blank" href="https://chat.whatsapp.com/EoLzYlBaK9R7rubktNGzZF?fbclid=PAZXh0bgNhZW0CMTEAAaa_CMHfjyKyl5kVcuvDE2ZHRfl0tn5VF58nmmWHJb-WXixKJGgt6rnpSKo_aem_AQay7JaE6GqvemGT52JGMXV_sZMHJjFaB3lN7cIK6NMdKrkneWc4ikvWGfb6SB5C7iSKN4Fttaq43U8g449sgidA">
      <Image src={whatsappLogo} alt="WhatsApp Logo" className='w-10' />
    </a>
    <a target="_blank" href="https://www.instagram.com/mynds_mannheim?igsh=MTI0ZTYzanNoa2ZiYQ%3D%3D&utm_source=qr">
      <Image src={instagramLogo} alt="WhatsApp Logo" className='w-10' />
    </a>
    <a target="_blank" href="mailto:info@mynds-campus.de">
      <Image src={mailLogo} alt="WhatsApp Logo" className='w-10' />
    </a>
    <a target="_blank" href="https://www.linkedin.com/company/mynds-campus/">
      <Image src={linkedinLogo} alt="WhatsApp Logo" className='w-10' />
    </a>
  </div>)
}


export default function Home() {
  return (<div className='flex flex-col items-center'>
    <TopBar />
    <div className='flex flex-col gap-10 items-center mx-10 mt-16 max-w-screen-lg'>
      <div className='flex justify-center'>
        <Image
          src={headerImage}
          alt="Logo Image"
          priority={true}
        />
      </div>
      <JoinUs />
      <AboutUs id="about" />
      <Events className="stripe text-white py-12" id="events" />
      <Team id="team" />
      <Imprint className="stripe-down text-white py-5" />
    </div>
  </div>);
}
