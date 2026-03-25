import { useMemo, useState } from "react"
import { type EventPreview } from "../components/EventCard"
import { EventGrid } from "../components/sections/EventGrid"
import { FilterPanel } from "../components/sections/FilterPanel"
import { OrganizerShowcase } from "../components/sections/OrganizerShowcase"

const categories = [
  // тута верхнеуровневые треки, бэкенд потом подставит реальные
  "Conferences",
  "Lectures",
  "Workshops",
  "Fests",
  "Retreats",
  "Community Labs",
]

const highlights = [
  { label: "Active organizers", value: "140+" },
  { label: "Cities covered", value: "38" },
  { label: "Avg. response time", value: "<4h" },
]

const formatFilters = ["All", "Conference", "Lecture", "Workshop", "Fest"]
const themeFilters = ["All", "Business", "Politics", "Psychology", "Tech"]
const sortOptions = [
  { label: "Soonest", value: "soonest" },
  { label: "By popularity", value: "popular" },
  { label: "By price", value: "price" },
]

const demoScenarios = [
  "Filter by format and theme",
  "Subscribe to an event and organizer",
  "Mock Stripe flow + reminder emails",
  "Company setup and event creation screen",
]

// моковые карточки чисто для витрины, бэкенд потом подставит своё
const upcomingEvents: EventPreview[] = [
  {
    id: "ev-north",
    title: "YabiYada Fintech Catchup",
    format: "Conference",
    theme: "Business",
    summary:
      "Quick lightning talks about “fintech-y stuff” so we have somewhere to plug Stripe later.",
    location: "Mock Hall, Oslo",
    datetime: "2025-02-12T18:00:00.000Z",
    price: 95,
    currency: "EUR",
    organizer: {
      name: "Placeholder Ventures",
      handle: "@mockventures",
      avatar: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=200&q=60",
    },
    poster:
      "https://images.unsplash.com/photo-1475724017904-b712052c192a?auto=format&fit=crop&w=700&q=60",
    attendees: [
      { name: "Alina Kozak", showName: true },
      { name: "Jon A.", showName: false },
      { name: "Mateo Garcia", showName: true },
      { name: "Iris Y.", showName: false },
    ],
    commentCount: 18,
    subscriberCount: 214,
    similar: ["Fintech 101", "Payments Sandbox"],
    mapHint: "Random downtown venue",
    visibility: "everyone",
    promoCodes: 1,
    isHighlighted: true,
  },
  {
    id: "ev-softskills",
    title: "Soft Skills Sandbox",
    format: "Workshop",
    theme: "Psychology",
    summary:
      "Role-play sessions, breathing tricks, a bit of la-la chitchat—perfect mock content for UX demos.",
    location: "Studio 12, Vienna",
    datetime: "2025-01-22T15:30:00.000Z",
    price: 45,
    currency: "EUR",
    organizer: {
      name: "Talking Heads Club",
      handle: "@talkingheads",
      avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=60",
    },
    poster:
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=700&q=60",
    attendees: [
      { name: "Marta S.", showName: true },
      { name: "Daniel Rivera", showName: true },
      { name: "Hidden", showName: false },
      { name: "Petra", showName: true },
    ],
    commentCount: 46,
    subscriberCount: 356,
    similar: ["Calm crew check-in", "Micro leadership circle"],
    mapHint: "Coworking floor B",
    visibility: "attendees",
    promoCodes: 3,
  },
  {
    id: "ev-riverfest",
    title: "LaLaLa Music + Civic Fest",
    format: "Fest",
    theme: "Politics",
    summary:
      "Food trucks, open mics, some “talk-about-the-city” panels—exactly what we need for map/demo screens.",
    location: "Warehouse Pier, Gdansk",
    datetime: "2025-03-04T11:00:00.000Z",
    price: 0,
    currency: "EUR",
    isFree: true,
    organizer: {
      name: "City Mock Lab",
      handle: "@citymock",
      avatar: "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=200&q=60",
    },
    poster:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=700&q=60",
    attendees: [
      { name: "Kateryna", showName: true },
      { name: "Artem", showName: true },
      { name: "Helena", showName: false },
      { name: "Liam", showName: true },
    ],
    commentCount: 73,
    subscriberCount: 640,
    similar: ["City Beats warmup", "Urban mock parade"],
    mapHint: "Pier C stage",
    visibility: "everyone",
    promoCodes: 0,
  },
]

// спотлайты для кнопок навигации, дальше прикрутим реальные ссылки
const organizerSpotlights = [
  {
    name: "FjordVentures",
    mission: "Host intimate international meetups across Nordic countries.",
    metrics: ["12 live events", "SaaS, Impact, Media"],
    entrypoint: "Submit company",
    path: "/companies/new",
  },
  {
    name: "Nervous System Collective",
    mission: "Focus on communication psychology for team leads.",
    metrics: ["4 cities", "70+ group sessions"],
    entrypoint: "Open dashboard",
    path: "/admin",
  },
  {
    name: "Baltic Civic Lab",
    mission: "Run civic festivals for activists and local officials.",
    metrics: ["3 fests per year", "Student promo bundles"],
    entrypoint: "Create event",
    path: "/events/new",
  },
]

export function HomePage() {
  // выбранный фильтр для текста, фактическая выдача прилетит с апи позже
  const [category, setCategory] = useState(categories[0])
  const [formatFilter, setFormatFilter] = useState(formatFilters[0])
  const [themeFilter, setThemeFilter] = useState(themeFilters[0])
  const [sortBy, setSortBy] = useState(sortOptions[0].value)

  const filteredEvents = useMemo(() => {
    const base = upcomingEvents.filter((event) => {
      const formatMatch = formatFilter === "All" || event.format === formatFilter
      const themeMatch = themeFilter === "All" || event.theme === themeFilter
      return formatMatch && themeMatch
    })

    return [...base].sort((a, b) => {
      if (sortBy === "price") {
        return (a.price || 0) - (b.price || 0)
      }
      if (sortBy === "popular") {
        return b.subscriberCount - a.subscriberCount
      }

      return new Date(a.datetime).getTime() - new Date(b.datetime).getTime()
    })
  }, [formatFilter, themeFilter, sortBy])

  return (
    <main className="landing">
      {/* <HeroSection category={category} highlights={highlights} scenarios={demoScenarios} /> */}

      <FilterPanel
        formatFilters={formatFilters}
        themeFilters={themeFilters}
        sortOptions={sortOptions}
        formatFilter={formatFilter}
        themeFilter={themeFilter}
        sortBy={sortBy}
        onFormatChange={setFormatFilter}
        onThemeChange={setThemeFilter}
        onSortChange={setSortBy}
        categoryLabel={category}
      />

      <EventGrid events={filteredEvents} />

      <OrganizerShowcase spotlights={organizerSpotlights} />
    </main>
  )
}
