"use client";

import React from "react";
import { useAtom } from "jotai";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {ArrowUp,ArrowDown} from "lucide-react"
import { ArrowRight,ArrowLeft, Plus, X } from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  offerItemsAtom,
  requestItemsAtom,
  isDialogOpenAtom,
  searchQueryAtom,
  activeSectionAtom,
  offerTotalPriceAtom,
  requestTotalPriceAtom,
  valueDifferenceAtom,
} from "@/store/atoms";
import { Item,SAMPLE_ITEMS } from "@/types/fruit";

const chunkArray = (array: Item[], chunkSize: number) => {
  const result: Item[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
};


export function FruitCalculator() {
  const [offerItems, setOfferItems] = useAtom(offerItemsAtom);
  const [requestItems, setRequestItems] = useAtom(requestItemsAtom);
  const [isDialogOpen, setIsDialogOpen] = useAtom(isDialogOpenAtom);
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);
  const [activeSection, setActiveSection] = useAtom(activeSectionAtom);
  const [offerTotalPrice] = useAtom(offerTotalPriceAtom);
  const [requestTotalPrice] = useAtom(requestTotalPriceAtom);
  const [valueDifference] = useAtom(valueDifferenceAtom);

  const handleAddItem = (item: Item) => {
    if (activeSection === "offer") {
      setOfferItems([...offerItems, item]);
    } else {
      setRequestItems([...requestItems, item]);
    }
    setIsDialogOpen(false);
  };

  const filteredItems = SAMPLE_ITEMS.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const ItemCard = ({ item, onRemove }: { item: Item; onRemove: () => void }) => (
    <Card className="bg-black border-[#2A2A4F] p-4 w-[45%] h-[120px] justify-center flex items-center relative">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-0 right-0 text-white hover:text-[#FF0000] hover:bg-black/50"
        onClick={onRemove}
      >
        <X className="h-4 w-4" />
      </Button>
      <div className="flex justify-between gap-3">
        <div className="relative flex flex-row items-center gap-3">
          <div className="relative w-12 h-14 overflow-hidden rounded-md">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-semibold text-white">{item.name}</p>
            <p className="text-[#00FF00]">${(item.price / 1000).toFixed(1)}k</p>
          </div>
        </div>
      </div>
    </Card>
  );

  const ItemSelectCard = ({ item }: { item: Item }) => (
    <Card
      className="bg-black border-[#2A2A4F] p-4 cursor-pointer hover:border-[#3A3A5F] transition-colors"
      onClick={() => handleAddItem(item)}
    >
      <div className="text-center space-y-3">
        <div className="relative w-16 h-16 mx-auto overflow-hidden rounded-md">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <p className="font-semibold text-white">{item.name}</p>
          <p className="text-[#00FF00]">${(item.price / 1000).toFixed(1)}k</p>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8 text-white">Calculator</h1>
      
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 justify-center">
       {/* Offer Section */}
       <div className="w-full lg:w-[450px]">
          <div className="relative p-[2px] overflow-hidden rounded-3xl">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient"></div>
            <Card className="relative bg-[#0A0A1B] border-[#1E1E3F] text-white rounded-3xl">
              <CardContent className="p-4 sm:p-6">
                <h2 className="text-xl font-semibold mb-4 text-white text-center">Offer ( You )</h2>
                <div className="flex flex-wrap gap-3 p-3 rounded-md">
                  {chunkArray(offerItems, 4).map((chunk, chunkIndex) => (
                    <div
                      key={chunkIndex}
                      className="mt-4 p-4 border w-full border-[#2A2A4F] rounded-md text-white text-center"
                    >
                      <div className="flex flex-wrap gap-3 ">
                        {chunk.map((item, itemIndex) => (
                          <ItemCard
                            key={itemIndex}
                            item={item}
                            onRemove={() =>
                              setOfferItems(
                                offerItems.filter((_, i) => i !== itemIndex)
                              )
                            }
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    className="h-[120px] w-[45%] border-2 border-dashed border-[#2A2A4F] bg-black hover:bg-[#1E1E3F] hover:border-white text-white transition-colors"
                    onClick={() => {
                      setActiveSection("offer");
                      setIsDialogOpen(true);
                    }}
                  >
                    <Plus className="h-6 w-6 hover:scale-110 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="hidden lg:block space-y-2 mt-4 text-center">
            <button className="relative p-[2px] overflow-hidden rounded-lg group">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient"></div>
              <div className="relative px-4 py-2 bg-black rounded-lg">
                <p className="text-lg font-semibold text-white">Price: {offerTotalPrice.toLocaleString()}</p>
              </div>
            </button>
          </div>
        </div>

        <div className="hidden lg:block pt-44">
          <div className="flex flex-col items-center justify-center">
            <ArrowRight className="text-white h-8 w-8" />
            <ArrowLeft className="text-white h-8 w-8" />
          </div>
        </div>
        <div className="block lg:hidden">
          <div className="flex items-center justify-center">
            <ArrowUp className="text-white h-8 w-8" />
            <ArrowDown className="text-white h-8 w-8" />
          </div>
        </div>

        {/* Request Section */}
        <div className="w-full lg:w-[450px]">
          <div className="relative p-[2px] overflow-hidden rounded-3xl">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient"></div>
            <Card className="relative bg-[#0A0A1B] border-[#1E1E3F] text-white rounded-3xl">
              <CardContent className="p-4 sm:p-6">
                <h2 className="text-xl font-semibold mb-4 text-white text-center">Request ( Them )</h2>
                <div className="flex flex-wrap gap-3 p-3 rounded-md">
                  {chunkArray(requestItems, 4).map((chunk, chunkIndex) => (
                    <div
                      key={chunkIndex}
                      className="mt-4 p-4 border w-full border-[#2A2A4F] rounded-md text-white text-center"
                    >
                      <div className="flex flex-wrap gap-3 ">
                        {chunk.map((item, itemIndex) => (
                          <ItemCard
                            key={itemIndex}
                            item={item}
                            onRemove={() =>
                              setRequestItems(
                                requestItems.filter((_, i) => i !== itemIndex)
                              )
                            }
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    className="h-[120px] w-[45%] border-2 border-dashed border-[#2A2A4F] bg-black hover:bg-[#1E1E3F] hover:border-white text-white transition-colors"
                    onClick={() => {
                      setActiveSection("request");
                      setIsDialogOpen(true);
                    }}
                  >
                    <Plus className="h-6 w-6 hover:scale-110 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="hidden lg:block space-y-2 mt-4 text-center">
            <button className="relative p-[2px] overflow-hidden rounded-lg group">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient"></div>
              <div className="relative px-4 py-2 bg-black rounded-lg">
                <p className="text-lg font-semibold text-white">Price: {requestTotalPrice.toLocaleString()}</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Value Difference */}
      <div className="mt-8 text-center space-y-2 w-full max-w-sm mx-auto px-4 sm:px-0">
        <div className="flex items-center justify-center gap-2">
          <div className="text-sm md:text-base text-white">Value Difference:</div>
          <div className="text-sm md:text-base text-[#FF0000]">{valueDifference}%</div>
        </div>
        
        {/* Value Difference Slider */}
        <div className="relative w-full sm:w-64 mx-auto">
          {/* Slider Track */}
          <div className="h-1 bg-[#1E1E3F] rounded-full">
            {/* Colored Progress Bar */}
            <div 
              className={`h-full rounded-full transition-all ${
                Number(valueDifference) > 40
                  ? 'bg-red-500'
                  : Number(valueDifference) < 0
                  ? 'bg-orange-500'
                  : 'bg-green-500'
              }`}
              style={{ width: `${Math.min((Number(valueDifference) / 40) * 100, 100)}%` }}
            />
          </div>
        </div>
        
        <div className="text-sm md:text-base text-white/50">Max: 40%</div>
      </div>

      {/* Trade State Information */}
      {offerItems.length > 0 && requestItems.length > 0 && (
        <div className="mt-4 space-y-2">
          {Number(valueDifference) > 40 && (
            <div className="flex items-center justify-center gap-2">
              <div className="px-3 py-1 rounded-full bg-red-950 text-red-500 text-xs sm:text-sm">
                Overpaid, not tradeable on Blox Fruits
              </div>
            </div>
          )}
          {Number(valueDifference) < 0 && (
            <div className="flex items-center justify-center gap-2">
              <div className="px-3 py-1 rounded-full bg-orange-950 text-orange-500 text-xs sm:text-sm">
                You are losing value in this trade
              </div>
            </div>
          )}
          {Number(valueDifference) <= 40 && Number(valueDifference) >= 0 && (
            <div className="flex items-center justify-center gap-2">
              <div className="px-3 py-1 rounded-full bg-green-950 text-green-500 text-xs sm:text-sm">
                Fair trade
              </div>
            </div>
          )}
        </div>
      )}

    {/* Value Provider */}
    <div className="text-center mt-4">
      <p className="text-sm text-white">Value Provider:</p>
      <select className="mt-2 bg-black text-white border border-[#1E1E3F] rounded-md px-4 py-2">
        <option>Gamersberg</option>
      </select>
    </div>

    {/* Add Item Dialog */}
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="bg-[#1E1E2F] border-[#2A2A4F] text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-center text-xl text-white">
            Add Items to calculate {activeSection} value
          </DialogTitle>
          <div className="text-center space-y-1">
            <p className="text-sm text-white">Value Difference: {valueDifference}%</p>
            <p className="text-sm text-white">Max: 40%</p>
          </div>
        </DialogHeader>
        
        <Input
          type="text"
          placeholder="Search items..."
          className="bg-black border-[#2A2A4F] text-white"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
          {filteredItems.map((item, index) => (
            <ItemSelectCard key={index} item={item} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  </div>
);
} 