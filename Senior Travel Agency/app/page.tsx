import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Shield, Users, Clock, ShipWheelIcon as Wheelchair, Phone, Mail, Rocket, Globe } from "lucide-react"
import Image from "next/image"
import { EmailSignupForm } from "@/components/email-signup-form"
import { ContactForm } from "@/components/contact-form"
import { TripsSection } from "@/components/trips-section"
import { InterestSurvey } from "@/components/interest-survey"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Rocket className="h-8 w-8 text-[#5c5f7c]" />
              <span className="ml-2 text-xl font-bold text-gray-900">StarTrek</span>
              <span className="ml-2 text-sm bg-[#b29758] text-white px-2 py-1 rounded-full">Coming Soon</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#about" className="text-gray-700 hover:text-[#4044725] font-medium">
                Our Vision
              </a>
              <a href="#trips" className="text-gray-700 hover:text-[#4044725] font-medium">
                Planned Trips
              </a>
              <a href="#interest" className="text-gray-700 hover:text-[#4044725] font-medium">
                Show Interest
              </a>
              <a href="#contact" className="text-gray-700 hover:text-[#4044725] font-medium">
                Contact
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#4044725] to-[#191c40] text-white py-24">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6">
            <span className="inline-block bg-[#b29758] text-white px-4 py-2 rounded-full text-lg font-semibold mb-4">
              🚀 Launching Soon
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">The Future of Senior Travel is Here</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            We're creating something special - luxury travel experiences designed exclusively for the silver generation.
            Be among the first to explore the world with StarTrek.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-white text-[#5c5f7c] hover:bg-gray-100 text-lg px-8 py-4">
              <a href="#signup">Join Our Launch List</a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-[#5c5f7c] text-lg px-8 py-4 bg-transparent"
            >
              <a href="#interest">Tell Us What You Want</a>
            </Button>
          </div>
          <p className="text-sm mt-4 opacity-80">Early subscribers get exclusive access to our inaugural trips</p>
        </div>
      </section>

      {/* About/Vision Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-4">
                <Globe className="h-8 w-8 text-[#5c5f7c] mr-3" />
                <h2 className="text-4xl font-bold text-gray-900">Our Vision</h2>
              </div>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                StarTrek is being born from a simple belief: that the most enriching travel experiences should be
                designed specifically for those who have earned the wisdom and freedom to truly appreciate them.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                We're not just another travel company. We're building something revolutionary - a travel experience that
                puts comfort, accessibility, and meaningful connections at the heart of every journey.
              </p>

              <div className="bg-[#c3c0c0] p-6 rounded-lg mb-6">
                <h3 className="font-bold text-lg mb-3 text-[#191c40]">Why We're Different:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Built from the ground up for senior travelers</li>
                  <li>• Small groups (max 12 people) for intimate experiences</li>
                  <li>• Accessibility and comfort as standard, not extras</li>
                  <li>• Flexible itineraries that adapt to your pace</li>
                </ul>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#5c5f7c]">500+</div>
                  <div className="text-sm text-gray-600">People interested</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#5c5f7c]">4</div>
                  <div className="text-sm text-gray-600">Destinations planned</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#5c5f7c]">2024</div>
                  <div className="text-sm text-gray-600">Launch year</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=400&width=600&text=Senior+travelers+exploring"
                alt="Vision of senior travelers exploring together"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-4 -right-4 bg-[#b29758] text-white p-4 rounded-lg">
                <p className="font-semibold">Coming 2024</p>
                <p className="text-sm">Be the first to know!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Planned Trips Section */}
      <TripsSection />

      {/* Interest Survey Section */}
      <section id="interest" className="py-20 bg-[#c3c0c0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block bg-[#b29758] text-white px-4 py-2 rounded-full text-lg font-semibold mb-4">
              🎉 Get 10% Off Your First Trip!
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Help Us Build Your Perfect Trip</h2>
            <p className="text-xl text-gray-700">
              Your input directly shapes what StarTrek becomes. Tell us what matters most to you and receive a special
              discount.
            </p>
          </div>
          <InterestSurvey />
        </div>
      </section>

      {/* Senior-Friendly Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What We're Building For You</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every detail is being carefully planned with your comfort, safety, and enjoyment in mind.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Clock className="h-12 w-12 text-[#5c5f7c] mx-auto mb-4" />
                <CardTitle className="text-xl">Your Perfect Pace</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  No rushing, no stress. Every itinerary will be designed with comfortable walking distances and plenty
                  of rest time.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Wheelchair className="h-12 w-12 text-[#5c5f7c] mx-auto mb-4" />
                <CardTitle className="text-xl">Accessibility First</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  All accommodations and transportation will be fully accessible, with mobility aids available when
                  needed.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-[#5c5f7c] mx-auto mb-4" />
                <CardTitle className="text-xl">Expert Companions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Experienced guides who specialize in senior travel, plus on-call support for any needs that arise.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-[#5c5f7c] mx-auto mb-4" />
                <CardTitle className="text-xl">Health & Safety</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  24/7 medical support partnerships and comprehensive travel insurance included in every trip.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Heart className="h-12 w-12 text-[#5c5f7c] mx-auto mb-4" />
                <CardTitle className="text-xl">Intimate Groups</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Maximum 12 travelers per group to ensure personal attention and meaningful connections.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Phone className="h-12 w-12 text-[#5c5f7c] mx-auto mb-4" />
                <CardTitle className="text-xl">Always Connected</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Dedicated support line for families back home and 24/7 assistance during your journey.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Email Signup Section */}
      <section id="signup" className="py-12 bg-[#4044725] text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Be First to Explore</h2>
          <p className="text-base mb-6 opacity-90">
            Join our launch list for exclusive early access and special pricing.
          </p>
          <EmailSignupForm />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Let's Start a Conversation</h2>
              <p className="text-lg text-gray-700 mb-8">
                We're building StarTrek based on what senior travelers actually want. Share your thoughts, questions, or
                dream destinations with us.
              </p>

              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="h-6 w-6 text-[#5c5f7c] mr-3" />
                  <span className="text-lg">hello@startrek-travel.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-6 w-6 text-[#5c5f7c] mr-3" />
                  <span className="text-lg">Coming soon - Direct line to our founders</span>
                </div>
              </div>

              <div className="mt-8 p-4 bg-[#c3c0c0] rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Founders' Note:</strong> We read every message personally. Your input is shaping the future of
                  StarTrek!
                </p>
              </div>
            </div>

            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Rocket className="h-8 w-8 text-[#b29758]" />
                <span className="ml-2 text-xl font-bold">StarTrek</span>
                <span className="ml-2 text-xs bg-[#b29758] px-2 py-1 rounded">Beta</span>
              </div>
              <p className="text-gray-400">Pioneering the future of senior travel. Launching 2024.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Get Involved</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#signup" className="text-gray-400 hover:text-white">
                    Join Launch List
                  </a>
                </li>
                <li>
                  <a href="#interest" className="text-gray-400 hover:text-white">
                    Share Your Interest
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-gray-400 hover:text-white">
                    Contact Founders
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
              <p className="text-gray-400 mb-2">Follow our journey</p>
              <p className="text-gray-400 mb-2">hello@startrek-travel.com</p>
              <p className="text-400">Building something amazing...</p>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 StarTrek Travel (In Development). All rights reserved. |
              <a href="#" className="hover:text-white ml-1">
                Privacy Policy
              </a>{" "}
              |
              <a href="#" className="hover:text-white ml-1">
                Terms of Service
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
