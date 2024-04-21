import membersData from './members.json';

function TopBar() {
  <div>todo</div>
}

function AboutUs() {
  <div>todo</div>
}

function Members() {
  const members = membersData.map(member => (
    <div className="flex flex-col items-center space-y-2">
    <div className="font-bold text-center text-lg">{member.name}</div>
    <div className="italic text-base text-center">{member.role}</div>
    <img src={member.img_src} alt="member" className="h-24 w-24 object-cover rounded-full"></img>
    <div>{member.description}</div>
  </div>
  ))

  return (
    <div className="flex flex-wrap justify-center gap-4">
    {members}
  </div>
  )
}

function Events() {
  <div>todo</div>
}

function Impressum() {
  <div>todo</div>
}


export default function Home() {
  return (
    <>
    <TopBar />
    <AboutUs />
    <Members />
    <Events />
    <Impressum />
    </>
  ); 
}
