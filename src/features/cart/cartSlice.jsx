import { createSlice } from "@reduxjs/toolkit";

const loadCartFromLocalStorage = () => {
  try {
    const serializedCart = localStorage.getItem("cartItems"); // Retrieve from localStorage
    if (serializedCart === null) {
      return []; // Return an empty array if no data is found
    }
    return JSON.parse(serializedCart); // Parse the JSON string back to an object
  } catch (e) {
    console.error("Could not load cart data from localStorage:", e); // Handle errors
    return []; // Return an empty array on error
  }
};

const saveCartToLocalStorage = (cartItems) => {
  try {
    const serializedCart = JSON.stringify(cartItems);
    localStorage.setItem("cartItems", serializedCart);
    console.log("Saved cart to localStorage:", serializedCart); // Debugging line
  } catch (e) {
    console.error("Could not save cart data to localStorage:", e);
  }
};

const initialState = {
  items: loadCartFromLocalStorage(),
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);
      console.log("Adding item to cart:", item);
      if (existingItem) {
        console.log("Item already in cart. Increasing quantity.");
        existingItem.quantity += 1;
      } else {
        console.log("Item not in cart. Adding new item.");
        state.items.push({ ...item, quantity: 1 });
      }

      console.log(state.items);
      saveCartToLocalStorage(state.items);
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.id !== itemId);
      saveCartToLocalStorage(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cartItems");
    },
  },
});

export const cartItemsByRestaurant = (state, restaurantId) => {
  return state.cart.items.filter((item) => item.restaurantId === restaurantId);
};

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
