'use client'

import { ShoppingCart } from "lucide-react"
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { Separator } from "./ui/separator";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import Image from "next/image";

export default function Cart() {

  const itemCount = 0; // TESTING 
  const fee = 1.12; // TESTING

  return (
    <Sheet>
      <SheetTrigger className="group -m-2 flex items-center px-2 rounded-lg hover:bg-slate-100 transition-all">
        <ShoppingCart className="p-2  h-10 w-10 flex-shrink-0 text-gray-400 group-hover:text-gray-600"
          aria-hidden="true" />
        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
          0
        </span>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle>
            Cart (0)
          </SheetTitle>
        </SheetHeader>

        {itemCount > 0 ? (
          <>
            <div className="flex w-full flex-col pr-6">
              cart items
            </div>
            <div className="space-y-4 pr-6">
              <Separator />
              <div className="space-y-1.5 text-sm">

                <div className="flex">
                  <span className="flex-1">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex">
                  <span className="flex-1">Transaction Fee</span>
                  <span>{formatPrice(fee)}</span>
                </div>
                <div className="flex">
                  <span className="flex-1">Total</span>
                  <span>{formatPrice(fee)}</span>
                </div>

                <SheetFooter>
                  <SheetTrigger asChild>
                    <Link href='/cart'
                      className={buttonVariants({ className: "w-full" })}>
                      Continue to Checkout
                    </Link>
                  </SheetTrigger>
                </SheetFooter>
              </div>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1">
            <div aria-hidden="true"
              className="relative mb-4 h-60 w-60 text-muted-foreground"
            >
              <Image
                src="/hippo-empty-cart.png"
                fill
                alt='empty shopping cart hippo' />

            </div>
            <p className=" text-xl font-semibold">Your cart is empty</p>
            <SheetTrigger asChild>
              <Link
                href='/products'
                className={buttonVariants({
                  variant: 'link',
                  size: 'sm',
                  className: 'text-sm text-muted-foreground'
                })}>c:\Users\mikat\Downloads\hippo-empty-cart.png
                Add items to your cart to checkout
              </Link>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}