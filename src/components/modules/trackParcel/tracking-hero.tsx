import { Badge } from "@/components/ui/badge"
import TrackParcelForm from "./track-parcel-form"

export interface ITrackParcelProps {
  isLoading: boolean
}

export default function TrackParcelHero({ isLoading }: ITrackParcelProps) {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-background"></div>
      <div className="relative max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-6">
            Track Your Parcel
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tight">
            Track Your
            <span className="block text-primary">Parcel</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Enter your tracking number to get real-time updates on your parcel's journey
          </p>
        </div>
        <TrackParcelForm isLoading={isLoading} />
      </div>
    </section>
  )
}
