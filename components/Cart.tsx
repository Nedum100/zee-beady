"use client";

import { useState, useRef } from 'react';
import { useSession } from 'next-auth/react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { X, Plus, Minus, Trash2, Copy } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function Cart({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (open: boolean) => void }) {
  const cartRef = useRef<HTMLDivElement>(null);
  const { items, updateQuantity, removeItem, clearCart } = useCart();
  const { data: session } = useSession();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false)

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCopyAccountNumber = () => {
    navigator.clipboard.writeText("0096521912");
  };

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items,
          total,
          customerName: session?.user?.name || undefined,
          customerEmail: session?.user?.email || undefined
        }),
      });

      if (response.ok) {
        toast({
          title: 'Order Placed!',
          description: 'You will receive a confirmation email shortly.',
        });
        clearCart();
        setIsOpen(false);
      } else {
        const errorData = await response.json()
        console.error('Failed to send email:', errorData.message);
        toast({
          title: 'Error',
          description: 'Failed to place order. Please try again.',
          className: "bg-destructive text-destructive-foreground"
        });
      }
    }
    catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: 'Error',
        description: 'Failed to place order. Please try again.',
        className: "bg-destructive text-destructive-foreground"
      });
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-lg bg-background dark:bg-gray-900"
      >
        <SheetHeader className="space-y-2 mb-4">
          <SheetTitle className="text-2xl text-foreground dark:text-gray-100">Shopping Cart</SheetTitle>
          <SheetDescription className="dark:text-gray-400">
            Review your items and proceed to payment
          </SheetDescription>
        </SheetHeader>

        <div className="mt-8 space-y-6">
          {items.map((item) => (
            <div key={item._id} className="flex gap-4 border-b dark:border-gray-800 pb-4">
              {/* Item content */}
            </div>
          ))}

          {items.length > 0 && (
            <div className="mt-4">
              <div className="flex justify-between text-lg font-semibold mb-4 text-foreground dark:text-gray-100">
                <span>Total:</span>
                <span>₦{total.toLocaleString()}</span>
              </div>

              <Button
                variant="destructive"
                className="w-full mb-4"
                onClick={clearCart}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Clear Cart
              </Button>

              <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-sm border dark:border-gray-700">
                <h3 className="text-lg font-semibold mb-4 text-foreground dark:text-gray-100">Payment Information</h3>
                <div className="space-y-4">
                  <div className="border-b dark:border-gray-700 pb-4">
                    <p className="text-muted-foreground dark:text-gray-400 mb-2">Please transfer the total amount to:</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-foreground dark:text-gray-300">
                        <span className="font-medium">Bank Name:</span>
                        <span>Sterling Bank</span>
                      </div>
                      <div className="flex justify-between text-foreground dark:text-gray-300">
                        <span className="font-medium">Account Name:</span>
                        <span>Zigwai Bernice Dogo</span>
                      </div>
                      <div className="flex justify-between text-foreground dark:text-gray-300">
                        <span className="font-medium">Account Number:</span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono">0096521912</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleCopyAccountNumber}
                            className="flex items-center gap-1 dark:border-gray-600 dark:hover:bg-gray-700"
                            aria-label="Copy account number"
                          >
                            <Copy className="h-4 w-4" />
                            <span>Copy</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                onClick={handlePayment}
                disabled={isLoading}
                className="mt-4 w-full bg-primary hover:bg-primary/90 dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                {isLoading ? "Placing Order..." : "Complete Order"}
              </Button>
            </div>
          )}

          {items.length === 0 && (
            <div className="text-center py-6">
              <p className="text-muted-foreground dark:text-gray-400">Your cart is empty</p>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}