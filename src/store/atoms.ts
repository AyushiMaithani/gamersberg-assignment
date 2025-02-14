import { atom } from 'jotai';

interface Item {
  name: string;
  value: number;
  price: number;
  image: string;
}

export const offerItemsAtom = atom<Item[]>([]);
export const requestItemsAtom = atom<Item[]>([]);
export const isDialogOpenAtom = atom(false);
export const searchQueryAtom = atom("");
export const activeSectionAtom = atom<"offer" | "request">("offer");

// Derived atoms for calculations
export const offerTotalPriceAtom = atom((get) => {
  const items = get(offerItemsAtom);
  return items.reduce((sum, item) => sum + item.price, 0);
});

export const requestTotalPriceAtom = atom((get) => {
  const items = get(requestItemsAtom);
  return items.reduce((sum, item) => sum + item.price, 0);
});

export const valueDifferenceAtom = atom((get) => {
  const offerItems = get(offerItemsAtom);
  const requestItems = get(requestItemsAtom);
  
  const offerValue = offerItems.reduce((sum, item) => sum + item.value, 0);
  const requestValue = requestItems.reduce((sum, item) => sum + item.value, 0);
  
  if (offerValue === 0) return "0";
  const difference = ((requestValue - offerValue) / offerValue) * 100;
  return difference.toFixed(0);
}); 