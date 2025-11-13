"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@/lib/supabase"
import { Upload, ImageIcon } from "lucide-react"
import Image from "next/image"

interface Trip {
  id: string
  title: string
  image_url: string | null
}

export default function AdminPage() {
  const [trips, setTrips] = useState<Trip[]>([])
  const [selectedTripId, setSelectedTripId] = useState<string>("")
  const [uploading, setUploading] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>("")
  const { toast } = useToast()

  useEffect(() => {
    fetchTrips()
  }, [])

  const fetchTrips = async () => {
    const supabase = createClient()
    const { data: trips, error } = await supabase
      .from("trips")
      .select("id, title, image_url")
      .order("created_at", { ascending: true })

    if (error) {
      console.error("Error fetching trips:", error)
      return
    }

    setTrips(trips || [])
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      const url = URL.createObjectURL(selectedFile)
      setPreviewUrl(url)
    }
  }

  const handleUpload = async () => {
    if (!file || !selectedTripId) {
      toast({
        title: "Error",
        description: "Please select a trip and choose a file to upload.",
        variant: "destructive",
      })
      return
    }

    setUploading(true)

    try {
      const supabase = createClient()

      // Generate unique filename
      const fileExt = file.name.split(".").pop()
      const fileName = `${selectedTripId}-${Date.now()}.${fileExt}`
      const filePath = fileName

      // Upload file to Supabase Storage
      const { error: uploadError } = await supabase.storage.from("trip-images").upload(filePath, file)

      if (uploadError) throw uploadError

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("trip-images").getPublicUrl(filePath)

      // Update trip with image URL
      const { error: updateError } = await supabase
        .from("trips")
        .update({ image_url: publicUrl })
        .eq("id", selectedTripId)

      if (updateError) throw updateError

      toast({
        title: "Success!",
        description: "Image uploaded and trip updated successfully.",
      })

      // Reset form
      setFile(null)
      setPreviewUrl("")
      setSelectedTripId("")

      // Refresh trips
      fetchTrips()
    } catch (error) {
      console.error("Upload error:", error)
      toast({
        title: "Error",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#5c5f7c] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-gray-200 mt-2">Upload and manage trip images</p>
        </div>

        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Upload className="h-6 w-6 mr-2" />
              Upload Trip Image
            </CardTitle>
            <CardDescription>
              Select a trip and upload a new image. Images will be stored in Supabase Storage.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="trip-select">Select Trip</Label>
              <Select value={selectedTripId} onValueChange={setSelectedTripId}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Choose a trip to update" />
                </SelectTrigger>
                <SelectContent>
                  {trips.map((trip) => (
                    <SelectItem key={trip.id} value={trip.id}>
                      {trip.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="file-upload">Choose Image File</Label>
              <Input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} className="mt-1" />
            </div>

            {previewUrl && (
              <div>
                <Label>Preview</Label>
                <div className="mt-2 relative w-full h-64 border rounded-lg overflow-hidden">
                  <Image src={previewUrl || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
                </div>
              </div>
            )}

            <Button
              onClick={handleUpload}
              disabled={uploading || !file || !selectedTripId}
              className="w-full bg-[#5c5f7c] text-white hover:bg-[#4044725]"
            >
              {uploading ? "Uploading..." : "Upload Image"}
            </Button>
          </CardContent>
        </Card>

        {/* Current Trip Images */}
        <Card className="mt-8 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center">
              <ImageIcon className="h-6 w-6 mr-2" />
              Current Trip Images
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {trips.map((trip) => (
                <div key={trip.id} className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2 text-[#5c5f7c]">{trip.title}</h3>
                  {trip.image_url ? (
                    <div className="relative w-full h-48 rounded-lg overflow-hidden">
                      <Image
                        src={trip.image_url || "/placeholder.svg"}
                        alt={trip.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-500">No image uploaded</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
