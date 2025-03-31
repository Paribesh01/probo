import { Users } from "lucide-react";

import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";

interface GameCardProps {
  title: string;
  image: string;
  players: string;
  prize: string;
}

export default function GameCard({
  title,
  image,
  players,
  prize,
}: GameCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative h-48 w-full">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="object-cover"
        />
      </div>
      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-bold text-xl">{title}</h3>
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="mr-1 h-4 w-4" />
            <span>{players} players</span>
          </div>
          <p className="text-sm font-medium text-primary">{prize}</p>
          <Button className="w-full">Play Now</Button>
        </div>
      </CardContent>
    </Card>
  );
}
