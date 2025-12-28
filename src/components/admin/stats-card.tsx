import type { LucideIcon } from "lucide-react"
import { Card } from "@/components/ui/card"

interface StatsCardProps {
  title: string
  value: string | number
  change: string
  icon: LucideIcon
  positive?: boolean
}

export function StatsCard({ title, value, change, icon: Icon, positive = true }: StatsCardProps) {
  return (
    <Card className="glass-effect p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <h2 className="text-2xl font-bold mt-2">{value}</h2>
          <p className={`text-xs mt-2 font-medium ${positive ? "text-accent" : "text-destructive"}`}>{change}</p>
        </div>
        <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      </div>
    </Card>
  )
}
