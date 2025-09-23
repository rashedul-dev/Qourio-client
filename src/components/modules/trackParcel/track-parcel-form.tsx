"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"
import { useState } from "react"
import { useSearchParams } from "react-router"
import type { ITrackParcelProps } from "./track-parcel-hero"

function TrackParcelForm({ isLoading }: ITrackParcelProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [trackingId, setTrackingId] = useState(searchParams.get("trackingId") || "")

  const handleTrack = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!trackingId.trim()) return

    const params = new URLSearchParams(searchParams)
    params.set("trackingId", trackingId.trim())
    setSearchParams(params)
  }

  const handleClearTrackingId = () => {
    setTrackingId("")
    const params = new URLSearchParams(searchParams)
    params.delete("trackingId")
    setSearchParams(params)
  }

  return (
    <Card className="max-w-2xl mx-auto p-8 shadow-xl border-0 bg-gradient-to-br from-card to-card/50">
      <CardContent className="space-y-6">
        <form onSubmit={handleTrack} className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Input
                type="text"
                placeholder="Enter tracking number (e.g., TRK-20250801-589709)"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                className="h-12 text-lg pr-10"
                autoFocus
              />
              {trackingId && (
                <button
                  type="button"
                  onClick={handleClearTrackingId}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-full transition-colors"
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              )}
            </div>
            <Button type="submit" disabled={isLoading} className="h-12 px-8">
              {isLoading ? <div className="animate-spin h-5 w-5" /> : <Search className="h-5 w-5" />}
            </Button>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Track your parcel with our advanced tracking system
          </p>
        </form>
      </CardContent>
    </Card>
  )
}

export default TrackParcelForm
