"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Users, DollarSign, Clock } from "lucide-react"
import Image from "next/image"
import { createClient } from "@/lib/supabase"

interface Trip {
  id: string
  title: string
  description: string
  itinerary: string
  price: number
  image_url: string
}

// Fallback trips data - now positioned as "planned" trips
const plannedTrips: Trip[] = [
  {
    id: "1",
    title: "Mediterranean Discovery Cruise",
    description:
      "Our flagship launch experience - explore the stunning coastlines of Italy, France, and Spain aboard a luxury cruise ship with full accessibility features.",
    itinerary: "Day 1-2: Rome, Italy • Day 3-4: French Riviera • Day 5-6: Barcelona, Spain • Day 7: Return to Rome",
    price: 2499,
    image_url: "/placeholder.svg?height=300&width=400&text=Mediterranean+Cruise",
  },
  {
    id: "2",
    title: "English Gardens & Countryside",
    description:
      "A gentle journey through England's most beautiful gardens and historic villages, designed for comfortable exploration at your own pace.",
    itinerary:
      "Day 1-2: London & Kew Gardens • Day 3-4: Cotswolds Villages • Day 5-6: Bath & Stonehenge • Day 7: Windsor Castle",
    price: 1899,
    image_url: "/placeholder.svg?height=300&width=400&text=English+Countryside",
  },
  {
    id: "3",
    title: "Canadian Rockies Rail Journey",
    description:
      "Experience breathtaking mountain scenery from luxury panoramic train cars, with accessible viewing areas and comfortable seating.",
    itinerary:
      "Day 1-2: Vancouver • Day 3-5: Rocky Mountaineer to Banff • Day 6-7: Lake Louise & Jasper • Day 8: Calgary",
    price: 3299,
    image_url: "/placeholder.svg?height=300&width=400&text=Canadian+Rockies",
  },
  {
    id: "4",
    title: "New Zealand South Island Explorer",
    description:
      "Discover stunning landscapes from fjords to mountains, with carefully selected accessible accommodations and transportation.",
    itinerary:
      "Day 1-2: Christchurch • Day 3-4: Queenstown & Milford Sound • Day 5-6: Franz Josef Glacier • Day 7-8: Mount Cook",
    price: 4199,
    image_url: "/placeholder.svg?height=300&width=400&text=New+Zealand",
  },
]

export function TripsSection() {
  const [trips, setTrips] = useState<Trip[]>(plannedTrips)
  const [loading, setLoading] = useState(true)
  const [usingFallback, setUsingFallback] = useState(true)

  useEffect(() => {
    async function loadTrips() {
      try {
        const supabase = createClient()
        const { data, error } = await supabase.from("trips").select("*").order("created_at", { ascending: true })

        if (error) {
          console.log("Database not available, using planned trips:", error.message)
          setUsingFallback(true)
        } else if (data && data.length > 0) {
          setTrips(data)
          setUsingFallback(false)
        } else {
          setUsingFallback(true)
        }
      } catch (error) {
        console.log("Failed to connect to database, using planned trips")
        setUsingFallback(true)
      } finally {
        setLoading(false)
      }
    }

    loadTrips()
  }, [])

  return (
    <section id="trips" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Clock className="h-8 w-8 text-[#5c5f7c] mr-3" />
            <h2 className="text-4xl font-bold text-gray-900">Our Planned Journeys</h2>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
            These are the carefully curated experiences we're developing for our launch. Your feedback helps us perfect
            every detail.
          </p>
          <div className="inline-block bg-[#b29758] text-white px-4 py-2 rounded-full text-sm font-semibold">
            🚀 Available when we launch in 2024
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#5c5f7c]"></div>
            <p className="mt-2 text-gray-600">Loading planned trips...</p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 gap-8">
              {trips.map((trip) => (
                <Card
                  key={trip.id}
                  className="overflow-hidden hover:shadow-xl transition-shadow duration-300 bg-white border-2 border-transparent hover:border-[#b29758]"
                >
                  <div className="relative h-64">
                    <Image src={trip.image_url || "/placeholder.svg"} alt={trip.title} fill className="object-cover" />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-[#5c5f7c] text-white text-lg px-3 py-1">
                        <DollarSign className="h-4 w-4 mr-1" />
                        From ${trip.price.toLocaleString()}
                      </Badge>
                    </div>
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-[#b29758] text-white text-sm px-2 py-1">Planned for 2024</Badge>
                    </div>
                  </div>

                  <CardHeader className="pb-4">
                    <CardTitle className="text-2xl text-gray-900">{trip.title}</CardTitle>
                    <CardDescription className="text-base text-gray-600 leading-relaxed">
                      {trip.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <Calendar className="h-5 w-5 mr-2 text-[#5c5f7c]" />
                        Planned Itinerary
                      </h4>
                      <p className="text-gray-700 leading-relaxed">{trip.itinerary}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          Max 12 guests
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />8 days
                        </div>
                      </div>
                      <Button className="bg-[#5c5f7c] hover:bg-[#4044725]">
                        <a href="#interest">Show Interest</a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Want to influence our destinations?</h3>
                <p className="text-gray-600 mb-4">
                  We're still finalizing our launch lineup. Your input could add new destinations or modify these
                  itineraries.
                </p>
                <Button size="lg" className="bg-[#b29758] hover:bg-[#5c5f7c] text-lg px-8 py-4">
                  <a href="#interest">Tell Us What You Want</a>
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
