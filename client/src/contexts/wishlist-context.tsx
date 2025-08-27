import { createContext, useContext, useReducer, ReactNode, useEffect } from "react";
import { Product } from "@shared/schema";

interface WishlistState {
  items: Product[];
}

type WishlistAction = 
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'CLEAR_WISHLIST' }
  | { type: 'LOAD_WISHLIST'; payload: Product[] };

const WishlistContext = createContext<{
  state: WishlistState;
  dispatch: React.Dispatch<WishlistAction>;
  isInWishlist: (productId: string) => boolean;
  clearWishlistOnLogout: () => void;
  loadUserWishlist: (userId: number) => void;
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
    
    case 'LOAD_WISHLIST':
      return { items: action.payload };
    
    default:
      return state;
  }
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(wishlistReducer, { items: [] });

  // Save wishlist to localStorage whenever it changes (user-specific)
  useEffect(() => {
    const currentUserId = getCurrentUserId();
    if (currentUserId) {
      const userWishlistKey = `wishlist_user_${currentUserId}`;
      localStorage.setItem(userWishlistKey, JSON.stringify(state.items));
    }
  }, [state.items]);

  // Listen for auth events
  useEffect(() => {
    const handleUserLogin = (event: any) => {
      const { userId } = event.detail;
      loadUserWishlist(userId);
    };

    const handleUserLogout = () => {
      clearWishlistOnLogout();
    };

    window.addEventListener('userLogin', handleUserLogin);
    window.addEventListener('userLogout', handleUserLogout);

    return () => {
      window.removeEventListener('userLogin', handleUserLogin);
      window.removeEventListener('userLogout', handleUserLogout);
    };
  }, []);

  const getCurrentUserId = () => {
    const token = localStorage.getItem('auth_token');
    if (!token) return null;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.userId;
    } catch {
      return null;
    }
  };

  const loadUserWishlist = (userId: number) => {
    const userWishlistKey = `wishlist_user_${userId}`;
    const savedWishlist = localStorage.getItem(userWishlistKey);
    if (savedWishlist) {
      try {
        const parsedWishlist = JSON.parse(savedWishlist);
        dispatch({ type: 'LOAD_WISHLIST', payload: parsedWishlist });
      } catch (error) {
        console.error('Error loading wishlist:', error);
        dispatch({ type: 'CLEAR_WISHLIST' });
      }
    } else {
      dispatch({ type: 'CLEAR_WISHLIST' });
    }
  };

  const clearWishlistOnLogout = () => {
    dispatch({ type: 'CLEAR_WISHLIST' });
  };

  const isInWishlist = (productId: string) => {
    return state.items.some(item => item.id === productId);
  };

  return (
    <WishlistContext.Provider value={{ 
      state, 
      dispatch, 
      isInWishlist, 
      clearWishlistOnLogout,
      loadUserWishlist 
    }}>
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