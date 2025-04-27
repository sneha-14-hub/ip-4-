"use client";

import Image from "next/image";
import { Heart, ShoppingCart, Star } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function FoodCard({ food, onClick, onAddToCart, isLiked, onToggleLike, className }) {
  return (
    <Card className={cn("overflow-hidden transition-all hover:shadow-md", className)}>
      <div className="relative h-48 w-full" onClick={onClick}>
        <Image
          src={food.image || "/placeholder.svg"}
          alt={food.name}
          fill
          className="object-cover"
        />
        <button
          className="absolute right-2 top-2 rounded-full bg-white p-1.5 shadow-md transition-colors hover:bg-gray-100"
          onClick={(e) => {
            e.stopPropagation();
            onToggleLike();
          }}
        >
          <Heart className={cn("h-4 w-4", isLiked ? "fill-red-500 text-red-500" : "text-gray-500")} />
        </button>
      </div>
      <CardContent className="p-4" onClick={onClick}>
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-medium">{food.name}</h3>
          <Badge variant="outline" className="capitalize">
            {food.cuisine}
          </Badge>
        </div>
        <div className="mb-2 flex flex-wrap gap-1">
          <Badge variant="secondary" className="text-xs">
            {food.category}
          </Badge>
          {food.dietaryInfo?.map((info) => (
            <Badge key={info} variant="outline" className="text-xs">
              {info}
            </Badge>
          ))}
        </div>
        <p className="line-clamp-2 text-sm text-muted-foreground">{food.description}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t p-4 pt-2">
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">{food.rating}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">${food.price.toFixed(2)}</span>
          <Button
            size="sm"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart();
            }}
          >
            <ShoppingCart className="mr-1 h-3.5 w-3.5" />
            Add
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
