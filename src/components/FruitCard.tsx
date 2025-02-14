import { Fruit } from "@/types/fruit";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface FruitCardProps {
  fruit: Fruit;
  isSelected: boolean;
  onSelect: (fruit: Fruit) => void;
}

export function FruitCard({ fruit, isSelected, onSelect }: FruitCardProps) {
  return (
    <Card
      onClick={() => onSelect(fruit)}
      className={cn(
        "cursor-pointer transition-all hover:shadow-md",
        isSelected ? "border-primary bg-primary/5" : "border-border"
      )}
    >
      <CardHeader className="pb-2">
        <HoverCard>
          <HoverCardTrigger>
            <h3 className="font-semibold text-lg hover:text-primary">
              {fruit.name}
            </h3>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold">{fruit.name} Details</h4>
              <div className="text-sm text-muted-foreground">
                <p>ID: {fruit.id}</p>
                <p>Value: {fruit.value.toLocaleString()} B$</p>
                <p>Price: {fruit.price.toLocaleString()} B$</p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Value:</span>
            <Badge variant="secondary">{fruit.value.toLocaleString()} B$</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Price:</span>
            <Badge variant="outline">{fruit.price.toLocaleString()} B$</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 