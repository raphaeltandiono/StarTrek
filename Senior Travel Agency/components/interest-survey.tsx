"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@/lib/supabase"
import { MapPin, DollarSign } from "lucide-react"

export function InterestSurvey() {
  const [formData, setFormData] = useState({
    email: "",
    destinations: [] as string[],
    budget_range: "",
    travel_style: [] as string[],
    accessibility_needs: [] as string[],
    additional_comments: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()

  const destinationOptions = [
    "Mediterranean Cruise",
    "European River Cruise",
    "English Countryside",
    "Canadian Rockies",
    "New Zealand",
    "Japan Cultural Tour",
    "Alaska Scenic Route",
    "Australian Outback",
  ]

  const budgetOptions = [
    "Under $2,000 per person",
    "$2,000 - $3,500 per person",
    "$3,500 - $5,000 per person",
    "Over $5,000 per person",
  ]

  const travelStyleOptions = [
    "Luxury accommodations",
    "Cultural immersion",
    "Nature & scenery",
    "Historical sites",
    "Culinary experiences",
    "Photography focused",
    "Relaxed pace",
    "Educational tours",
  ]

  const accessibilityOptions = [
    "Wheelchair accessibility",
    "Limited walking distances",
    "Hearing assistance",
    "Visual assistance",
    "Dietary restrictions",
    "Medical support needed",
    "None needed",
  ]

  const handleCheckboxChange = (category: string, value: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [category]: checked
        ? [...(prev[category as keyof typeof prev] as string[]), value]
        : (prev[category as keyof typeof prev] as string[]).filter((item) => item !== value),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const supabase = createClient()
      const { error } = await supabase.from("interest_survey").insert([
        {
          ...formData,
          destinations: formData.destinations.join(", "),
          travel_style: formData.travel_style.join(", "),
          accessibility_needs: formData.accessibility_needs.join(", "),
        },
      ])

      if (error) {
        if (error.message.includes("not configured")) {
          toast({
            title: "Thank You!",
            description: "Your interest has been recorded. Your 10% off code will be sent to your email! (Demo mode)",
          })
          setIsSubmitted(true) // Still show success state in demo
          return
        }
        throw error
      }

      toast({
        title: "Thank You!",
        description: "Your interest has been recorded. Your 10% off code will be sent to your email!",
      })
      setIsSubmitted(true)
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <Card className="bg-white shadow-xl text-center py-12 px-6">
        <CardTitle className="text-3xl font-bold text-[#5c5f7c] mb-4">Survey Submitted!</CardTitle>
        <CardDescription className="text-lg text-gray-700 mb-6">
          Thank you for helping us shape StarTrek!
        </CardDescription>
        <p className="text-xl font-semibold text-gray-900 mb-4">
          Your 10% off discount code will be sent to your email shortly.
        </p>
        <p className="text-gray-600">Keep an eye on your inbox for exclusive updates and your special offer!</p>
        <Button
          onClick={() => {
            setIsSubmitted(false)
            setFormData({
              email: "",
              destinations: [],
              budget_range: "",
              travel_style: [],
              accessibility_needs: [],
              additional_comments: "",
            })
          }}
          className="mt-8 bg-[#5c5f7c] hover:bg-[#4044725]"
        >
          Submit Another Response
        </Button>
      </Card>
    )
  }

  return (
    <Card className="bg-white shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center">
          <MapPin className="h-6 w-6 mr-2 text-[#5c5f7c]" />
          Interest Survey
        </CardTitle>
        <CardDescription>This takes 2 minutes and helps us create trips you'll actually want to take.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Email */}
          <div>
            <Label htmlFor="email" className="text-base font-medium">
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              required
              className="mt-1 text-base py-3"
              placeholder="your@email.com"
            />
          </div>

          {/* Destinations */}
          <div>
            <Label className="text-base font-medium mb-3 block">
              Which destinations interest you most? (Select all that apply)
            </Label>
            <div className="grid md:grid-cols-2 gap-3">
              {destinationOptions.map((destination) => (
                <div key={destination} className="flex items-center space-x-2">
                  <Checkbox
                    id={destination}
                    checked={formData.destinations.includes(destination)}
                    onCheckedChange={(checked) => handleCheckboxChange("destinations", destination, checked as boolean)}
                  />
                  <Label htmlFor={destination} className="text-sm">
                    {destination}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Budget */}
          <div>
            <Label className="text-base font-medium mb-3 block flex items-center">
              <DollarSign className="h-4 w-4 mr-1" />
              What's your preferred budget range for a 7-8 day trip?
            </Label>
            <div className="space-y-2">
              {budgetOptions.map((budget) => (
                <div key={budget} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id={budget}
                    name="budget_range"
                    value={budget}
                    checked={formData.budget_range === budget}
                    onChange={(e) => setFormData((prev) => ({ ...prev, budget_range: e.target.value }))}
                    className="text-[#5c5f7c]"
                  />
                  <Label htmlFor={budget} className="text-sm">
                    {budget}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Travel Style */}
          <div>
            <Label className="text-base font-medium mb-3 block">
              What type of travel experiences appeal to you? (Select all that apply)
            </Label>
            <div className="grid md:grid-cols-2 gap-3">
              {travelStyleOptions.map((style) => (
                <div key={style} className="flex items-center space-x-2">
                  <Checkbox
                    id={style}
                    checked={formData.travel_style.includes(style)}
                    onCheckedChange={(checked) => handleCheckboxChange("travel_style", style, checked as boolean)}
                  />
                  <Label htmlFor={style} className="text-sm">
                    {style}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Accessibility */}
          <div>
            <Label className="text-base font-medium mb-3 block">
              Do you have any accessibility needs we should consider?
            </Label>
            <div className="grid md:grid-cols-2 gap-3">
              {accessibilityOptions.map((need) => (
                <div key={need} className="flex items-center space-x-2">
                  <Checkbox
                    id={need}
                    checked={formData.accessibility_needs.includes(need)}
                    onCheckedChange={(checked) => handleCheckboxChange("accessibility_needs", need, checked as boolean)}
                  />
                  <Label htmlFor={need} className="text-sm">
                    {need}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Comments */}
          <div>
            <Label htmlFor="comments" className="text-base font-medium">
              Anything else you'd like us to know?
            </Label>
            <Textarea
              id="comments"
              value={formData.additional_comments}
              onChange={(e) => setFormData((prev) => ({ ...prev, additional_comments: e.target.value }))}
              rows={4}
              className="mt-1 text-base"
              placeholder="Dream destinations, concerns, special requests, or just say hello..."
            />
          </div>

          <Button type="submit" disabled={isLoading} className="w-full text-lg py-4 bg-[#5c5f7c] hover:bg-[#4044725]">
            {isLoading ? "Submitting..." : "Share My Interest & Get 10% Off"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
