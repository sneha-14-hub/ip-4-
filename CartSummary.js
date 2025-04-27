"use client"

import { Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

// Props: { cart: [{ food: any, quantity: number }], onClose: function, onUpdateQuantity: function, onRemove: function, total: number }
function CartSummary({ cart, onClose, onUpdateQuantity, onRemove, total }) {
    // your component logic
  }
  

  export function CartSummary({ cart, onClose, onUpdateQuantity, onRemove, total }) {
    return (
      <div className="relative">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="flex items-center text-xl font-bold">
            <ShoppingCart className="mr-2 h-5 w-5" />
            Your Cart
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
      </div>
    );
  }
  

  import { ShoppingCart, Trash2, Plus, Minus, X } from "lucide-react";
  import { Button } from "@/components/ui/button";
  import { Separator } from "@/components/ui/separator";
  
  export function CartSummary({ cart, onClose, onUpdateQuantity, onRemove, total }) {
    return (
      <div className="relative">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="flex items-center text-xl font-bold">
            <ShoppingCart className="mr-2 h-5 w-5" />
            Your Cart
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
  
        {cart.length === 0 ? (
          <div className="py-8 text-center">
            <p className="mb-2 text-muted-foreground">Your cart is empty</p>
            <Button variant="outline" size="sm" onClick={onClose}>
              Browse Foods
            </Button>
          </div>
        ) : (
          <>
            <div className="max-h-[400px] space-y-4 overflow-auto pr-1">
              {cart.map(({ food, quantity }) => (
                <div key={food.id} className="flex items-start gap-3">
                  <div
                    className="h-16 w-16 flex-shrink-0 rounded-md bg-cover bg-center"
                    style={{ backgroundImage: `url(${food.image})` }}
                  />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{food.name}</h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => onRemove(food.id)}
                      >
                        <Trash2 className="h-4 w-4 text-muted-foreground" />
                        <span className="sr-only">Remove</span>
                      </Button>
                    </div>
                    <div className="mt-1 flex items-center justify-between">
                      <span className="text-sm font-medium">${food.price.toFixed(2)}</span>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => onUpdateQuantity(food.id, quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                          <span className="sr-only">Decrease</span>
                        </Button>
                        <span className="w-6 text-center text-sm">{quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => onUpdateQuantity(food.id, quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                          <span className="sr-only">Increase</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
  
            <Separator className="my-4" />
  
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium">Subtotal</span>
                <span className="font-medium">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Delivery Fee</span>
                <span>$3.99</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Tax</span>
                <span>${(total * 0.08).toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${(total + 3.99 + total * 0.08).toFixed(2)}</span>
              </div>
              <Button className="mt-4 w-full">Checkout</Button>
            </div>
          </>
        )}
      </div>
    );
  }
  