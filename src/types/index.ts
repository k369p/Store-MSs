export interface User {
  id: string;
  username: string;
  role: 'admin' | 'employee' | 'customer';
}

export interface Item {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface ItemsState {
  items: Item[];
  filteredItems: Item[];
  currentItem: Item | null;
  isLoading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
  searchQuery: string;
}