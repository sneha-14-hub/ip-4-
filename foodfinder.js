"use client"

import { useState } from "react"
import { Filter, Search, ShoppingCart, X } from "lucide-react"

import { foodData, categories, cuisines, dietaryOptions } from "@/lib/food-data"
import { FoodCard } from "@/components/food-card"
import { FoodDetail } from "@/components/food-detail"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CartSummary } from "@/components/cart-summary"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

export function FoodFinder() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFood, setSelectedFood] = useState(null)
  const [activeCategory, setActiveCategory] = useState("All")
  const [activeCuisine, setActiveCuisine] = useState("All")
  const [selectedDietary, setSelectedDietary] = useState([]);

  const [cart, setCart] = useState([])
  const [likes, setLikes] = useState({})
  const [showCart, setShowCart] = useState(false)

  // Filter foods based on search query, category, cuisine, and dietary preferences
  const filteredFoods = foodData.filter((food) => {
    const matchesSearch = food.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === "All" || food.category === activeCategory
    const matchesCuisine = activeCuisine === "All" || food.cuisine === activeCuisine

    // Check if food matches all selected dietary preferences
    const matchesDietary =
      selectedDietary.length === 0 || selectedDietary.every((pref) => food.dietaryInfo?.includes(pref))

    return matchesSearch && matchesCategory && matchesCuisine && matchesDietary
  })

  // Add item to cart
  const addToCart = (food, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.food.id === food.id)
      if (existingItem) {
        return prevCart.map((item) =>
          item.food.id === food.id ? { ...item, quantity: item.quantity + quantity } : item,
        )
      } else {
        return [...prevCart, { food, quantity }]
      }
    })
  }

  // Remove item from cart
  const removeFromCart = (foodId) => {
    setCart((prevCart) => prevCart.filter((item) => item.food.id !== foodId))
  }

  // Update item quantity in cart
  const updateCartItemQuantity = (foodId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(foodId)
      return
    }
    setCart((prevCart) => prevCart.map((item) => (item.food.id === foodId ? { ...item, quantity } : item)))
  }

  // Toggle like status for a food
  const toggleLike = (foodId) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [foodId]: !prevLikes[foodId],
    }))
  }

  // Toggle dietary preference
  const toggleDietaryPreference = (preference) => {
    setSelectedDietary((prev) =>
      prev.includes(preference) ? prev.filter((p) => p !== preference) : [...prev, preference],
    );
  }
  
  // Calculate total items in cart
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0)

  // Calculate total price of items in cart
  const cartTotal = cart.reduce((total, item) => total + item.food.price * item.quantity, 0)

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_300px]">
      <div>
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search for food..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" onClick={() => setSearchQuery("")}>
            Clear
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter Options</SheetTitle>
                <SheetDescription>Refine your food search with these filters</SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="mb-3 text-sm font-medium">Cuisine</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {cuisines.map((cuisine) => (
                      <Button
                        key={cuisine}
                        variant={activeCuisine === cuisine ? "default" : "outline"}
                        size="sm"
                        className="justify-start"
                        onClick={() => setActiveCuisine(cuisine)}
                      >
                        {cuisine}
                      </Button>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="mb-3 text-sm font-medium">Category</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant={activeCategory === category ? "default" : "outline"}
                        size="sm"
                        className="justify-start"
                        onClick={() => setActiveCategory(category)}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="mb-3 text-sm font-medium">Dietary Preferences</h3>
                  <div className="space-y-2">
                    {dietaryOptions.map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <Checkbox
                          id={option}
                          checked={selectedDietary.includes(option)}
                          onCheckedChange={() => toggleDietaryPreference(option)}
                        />
                        <Label htmlFor={option}>{option}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setActiveCategory("All")
                      setActiveCuisine("All")
                      setSelectedDietary([])
                    }}
                  >
                    Reset All
                  </Button>
                  <Button>Apply Filters</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <Button variant="outline" className="relative" onClick={() => setShowCart(!showCart)}>
            <ShoppingCart className="h-4 w-4" />
            {cartItemsCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                {cartItemsCount}
              </span>
            )}
          </Button>
        </div>

        <div className="mb-6 overflow-x-auto">
          <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
            <TabsList className="mb-4 flex h-auto w-max flex-nowrap p-1">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} className="capitalize">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div className="mb-6 overflow-x-auto">
          <Tabs value={activeCuisine} onValueChange={setActiveCuisine} className="w-full">
            <TabsList className="mb-4 flex h-auto w-max flex-nowrap p-1">
              {cuisines.map((cuisine) => (
                <TabsTrigger key={cuisine} value={cuisine} className="capitalize">
                  {cuisine}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {selectedDietary.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {selectedDietary.map((pref) => (
              <Badge key={pref} variant="secondary" className="flex items-center gap-1">
                {pref}
                <button className="ml-1 rounded-full hover:bg-muted" onClick={() => toggleDietaryPreference(pref)}>
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove {pref} filter</span>
                </button>
              </Badge>
            ))}
            <Button variant="ghost" size="sm" className="h-6 text-xs" onClick={() => setSelectedDietary([])}>
              Clear All
            </Button>
          </div>
        )}

        {filteredFoods.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredFoods.map((food) => (
              <FoodCard
                key={food.id}
                food={food}
                onClick={() => setSelectedFood(food)}
                onAddToCart={() => addToCart(food)}
                isLiked={!!likes[food.id]}
                onToggleLike={() => toggleLike(food.id)}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed p-8 text-center">
            <h3 className="mb-2 text-xl font-medium">No foods found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      <div className="sticky top-4 h-fit rounded-lg border p-4">
        {showCart ? (
          <CartSummary
            cart={cart}
            onClose={() => setShowCart(false)}
            onUpdateQuantity={updateCartItemQuantity}
            onRemove={removeFromCart}
            total={cartTotal}
          />
        ) : selectedFood ? (
          <FoodDetail
            food={selectedFood}
            onClose={() => setSelectedFood(null)}
            onAddToCart={() => addToCart(selectedFood)}
            isLiked={!!likes[selectedFood.id]}
            onToggleLike={() => toggleLike(selectedFood.id)}
          />
        ) : (
          <div className="text-center">
            <h3 className="mb-2 text-lg font-medium">Food Details</h3>
            <p className="text-sm text-muted-foreground">Select a food item to view details</p>
          </div>
        )}
      </div>
    </div>
  )
}
