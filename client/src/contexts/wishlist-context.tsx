import { createContext, useContext, useReducer, ReactNode } from "react";
import { Product } from "@shared/schema";

interface WishlistState {
  items: Product[];
}

type WishlistAction = 
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'CLEAR_WISHLIST' };

const WishlistContext = createContext<{
  state: WishlistState;
  dispatch: React.Dispatch<WishlistAction>;
  isInWishlist: (productId: string) => boolean;
} | undefined>(undefined);

function wishlistReducer(state: WishlistState, action: WishlistAction): WishlistState {
  switch (action.type) {
    case 'ADD_ITEM':
      if (state.items.some(item => item.id === action.payload.id)) {
        return state;
      }
      return { items: [...state.items, action.payload] };
    
    case 'REMOVE_ITEM':
      return { items: state.items.filter(item => item.id !== action.payload) };
    
    case 'CLEAR_WISHLIST':
      return { items: [] };
    
    default:
      return state;
  }
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(wishlistReducer, { items: [] });

  const isInWishlist = (productId: string) => {
    return state.items.some(item => item.id === productId);
  };

  return (
    <WishlistContext.Provider value={{ state, dispatch, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}