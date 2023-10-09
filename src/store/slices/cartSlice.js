import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
    // cartTotalAmount: 0,
  },
  reducers: {
    // 自動產生 action type: 'slice.name' + '/' + 'reducers' = 'cart/addToCart'
    addToCart(state, aciton) {
      // 可能會在不同商品頁加入購物車，因此從 localStorage 取得最新狀態
      const cartItems = JSON.parse(localStorage.getItem("cartItems"));
      state.cartItems = cartItems;

      const itemsIndex = state.cartItems.findIndex((item) => item.id === aciton.payload.id);
      if (itemsIndex >= 0) {
        // 若已在購物車，並且庫存大於數量時，數量 +1
        state.cartItems[itemsIndex].stock > state.cartItems[itemsIndex].quantity && state.cartItems[itemsIndex].quantity++;
      } else {
        const addProduct = { ...aciton.payload, quantity: 1 };
        state.cartItems.push(addProduct);
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeItem(state, aciton) {
      const updateProduct = state.cartItems.filter((item) => item.id !== aciton.payload.id);
      state.cartItems = updateProduct;
      localStorage.setItem("cartItems", JSON.stringify(updateProduct));
    },
    updateQuantity(state, aciton) {
      const itemsIndex = state.cartItems.findIndex((item) => item.id === aciton.payload.item.id);
      if (aciton.payload.operation === "decrease") {
        if (state.cartItems[itemsIndex].quantity > 1) {
          state.cartItems[itemsIndex].quantity--;
          localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        } else {
          // 移除前確認?

          // 數量等於 1 & 數量減少時從購物車移除
          const updateProduct = state.cartItems.filter((item) => item.id !== aciton.payload.item.id);
          state.cartItems = updateProduct;
          localStorage.setItem("cartItems", JSON.stringify(updateProduct));
        }
      } else if (aciton.payload.operation === "increase") {
        state.cartItems[itemsIndex].stock > state.cartItems[itemsIndex].quantity && state.cartItems[itemsIndex].quantity++;
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      } else {
        state.cartItems[itemsIndex].quantity = aciton.payload.value;
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },
    clearCart(state) {
      state.cartItems = [];
      localStorage.remove("cartItems");
    },
  },
});

export const { addToCart, updateQuantity, removeItem } = cartSlice.actions;
export const cartReducer = cartSlice.reducer; // 沒有s
