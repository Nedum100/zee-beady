"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ShoppingCart, Copy } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ACCOUNT_NUMBER = "0096521912";

export default function CheckoutButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const copyAccountNumber = async () => {
    try {
      await navigator.clipboard.writeText(ACCOUNT_NUMBER);
      toast({
        title: "Copied!",
        description: "Account number copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy account number",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h3 className="text-lg font-semibold mb-4">Payment Information</h3>
      
      <div className="space-y-4">
        <div className="border-b pb-4">
          <p className="text-gray-600 mb-2">Please transfer the total amount to:</p>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">Bank Name:</span>
              <span>Sterling Bank</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Account Name:</span>
              <span>Zigwai Bernice Dogo</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Account Number:</span>
              <div className="flex items-center gap-2">
                <span className="font-mono">{ACCOUNT_NUMBER}</span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={copyAccountNumber}
                  className="flex items-center gap-1"
                >
                  <Copy className="h-4 w-4" />
                  Copy
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="text-sm text-gray-500">
          <p>After making the payment, your order will be processed.</p>
          <p className="mt-2">For any issues, please contact our support.</p>
        </div>
      </div>
    </div>
  );
}