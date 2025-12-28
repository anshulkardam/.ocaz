import { RouterOutputs } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge, Building2, Edit, Eye, Film, MapPin, Monitor, Users } from "lucide-react";
import { Button } from "../ui/button";

type Cinema = RouterOutputs["cinemas"]["list"][number];

interface CinemaCardProps {
  cinema: Cinema;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
}

export default function CinemaCard({ cinema, onView, onEdit }: CinemaCardProps) {
  const avgPrice =
    cinema.Screens.length > 0
      ? Math.round(cinema.Screens.reduce((acc, s) => acc + s.price, 0) / cinema.Screens.length)
      : 0;

  const projectionTypes = Array.from(new Set(cinema.Screens.map((s) => s.projectionType)));

  const soundSystemType = Array.from(new Set(cinema.Screens.map((s) => s.soundSystemType)));

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-xl flex items-center gap-2">
              <Building2 className="w-5 h-5 text-emerald-600" />
              {cinema.name}
            </CardTitle>
            <CardDescription className="flex items-center gap-1 text-sm">
              <MapPin className="w-3 h-3" />
              {cinema.Address?.address}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-2 text-center">
            <Monitor className="w-4 h-4 mx-auto mb-1 text-blue-600" />
            <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">
              {cinema.Screens.length}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Screens</p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-2 text-center">
            <Film className="w-4 h-4 mx-auto mb-1 text-green-600" />
            <p className="text-2xl font-bold text-green-700 dark:text-green-400">₹{avgPrice}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Avg Price</p>
          </div>
        </div>

        {/* Screen Types */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Screen Types:</p>
          <div className="flex flex-wrap gap-2">{projectionTypes.map((i) => i)}</div>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Sound System Types:
          </p>
          <div className="flex flex-wrap gap-2">{soundSystemType.map((i) => i)}</div>
        </div>

        {/* Manager */}
        <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400">Manager</p>
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {cinema.Managers.map((u) => u.User.name)}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {" "}
            {cinema.Managers.map((u) => u.User.email)}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 gap-2"
            onClick={() => onView(cinema.id)}
          >
            <Eye className="w-4 h-4" />
            View
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 gap-2"
            onClick={() => onEdit(cinema.id)}
          >
            <Edit className="w-4 h-4" />
            Edit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
