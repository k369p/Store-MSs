import { createContext, useContext, useReducer, ReactNode } from 'react';
import { ItemsState, Item } from '../types';
import { mockItems } from '../data/mockItems';

// Initial state
const initialState: ItemsState = {
  items: [],
  filteredItems: [],
  currentItem: null,
  isLoading: false,
  error: null,
  totalPages: 0,
  currentPage: 1,
  searchQuery: '',
};

// Action types
type ItemsAction = 
  | { type: 'GET_ITEMS_SUCCESS'; payload: Item[] }
  | { type: 'GET_ITEMS_FAIL'; payload: string }
  | { type: 'SET_CURRENT_ITEM'; payload: Item }
  | { type: 'CLEAR_CURRENT_ITEM' }
  | { type: 'SET_LOADING' }
  | { type: 'SEARCH_ITEMS'; payload: string }
  | { type: 'SET_PAGE'; payload: number };

// Reducer
const itemsReducer = (state: ItemsState, action: ItemsAction): ItemsState => {
  switch (action.type) {
    case 'GET_ITEMS_SUCCESS':
      return {
        ...state,
        items: action.payload,
        filteredItems: action.payload,
        isLoading: false,
        totalPages: Math.ceil(action.payload.length / 12), // 12 items per page
      };
    case 'GET_ITEMS_FAIL':
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case 'SET_CURRENT_ITEM':
      return {
        ...state,
        currentItem: action.payload,
      };
    case 'CLEAR_CURRENT_ITEM':
      return {
        ...state,
        currentItem: null,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: true,
      };
    case 'SEARCH_ITEMS':
      const query = action.payload.toLowerCase();
      const filtered = state.items.filter(
        item => 
          item.name.toLowerCase().includes(query) || 
          item.description.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query)
      );
      return {
        ...state,
        filteredItems: filtered,
        searchQuery: action.payload,
        totalPages: Math.ceil(filtered.length / 12),
        currentPage: 1,
      };
    case 'SET_PAGE':
      return {
        ...state,
        currentPage: action.payload,
      };
    default:
      return state;
  }
};

// Create context
interface ItemsContextProps {
  state: ItemsState;
  getItems: () => Promise<void>;
  searchItems: (query: string) => void;
  setCurrentItem: (item: Item) => void;
  clearCurrentItem: () => void;
  setPage: (page: number) => void;
}

const ItemsContext = createContext<ItemsContextProps | undefined>(undefined);

// Provider component
export const ItemsProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(itemsReducer, initialState);

  // Get all items
  const getItems = async () => {
    try {
      dispatch({ type: 'SET_LOADING' });
      
      // In a real app, fetch from API
      await new Promise(resolve => setTimeout(resolve, 500));
      dispatch({ 
        type: 'GET_ITEMS_SUCCESS', 
        payload: mockItems 
      });
    } catch (err) {
      dispatch({ 
        type: 'GET_ITEMS_FAIL', 
        payload: 'Failed to fetch items' 
      });
    }
  };

  // Search items
  const searchItems = (query: string) => {
    dispatch({ type: 'SEARCH_ITEMS', payload: query });
  };

  // Set current item
  const setCurrentItem = (item: Item) => {
    dispatch({ type: 'SET_CURRENT_ITEM', payload: item });
  };

  // Clear current item
  const clearCurrentItem = () => {
    dispatch({ type: 'CLEAR_CURRENT_ITEM' });
  };

  // Set page
  const setPage = (page: number) => {
    dispatch({ type: 'SET_PAGE', payload: page });
  };

  return (
    <ItemsContext.Provider value={{ 
      state, 
      getItems, 
      searchItems, 
      setCurrentItem, 
      clearCurrentItem,
      setPage
    }}>
      {children}
    </ItemsContext.Provider>
  );
};

// Custom hook
export const useItems = () => {
  const context = useContext(ItemsContext);
  if (context === undefined) {
    throw new Error('useItems must be used within an ItemsProvider');
  }
  return context;
};