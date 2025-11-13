"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@/lib/supabase"

export function EmailSignupForm() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const supabase = createClient()
      const { error } = await supabase.from("signups").insert([{ email }])

      if (error) {
        if (error.message.includes("not configured")) {
          toast({
            title: "Demo Mode",
            description: "Email signup is in demo mode. Connect to Supabase to enable functionality.",
          })
          setEmail("")
          return
        }
        throw error
      }

      toast({
        title: "Success!",
        description: "Thank you for signing up! We'll keep you updated on new adventures.",
      })
      setEmail("")
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

  return (
    <div className="w-full max-w-sm mx-auto">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 text-sm py-2 px-3 text-gray-900 bg-white border-0"
        />
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-white text-[#5c5f7c] hover:bg-[#c3c0c0] hover:text-[#191c40] text-sm font-medium px-4 py-2 whitespace-nowrap"
        >
          {isLoading ? "..." : "Join List"}
        </Button>
      </form>
    </div>
  )
}
