import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState:{
    cart: []
  },
  reducers: {
  
    addToCart: (state, action) => {
      const itemIndex = state.cart.findIndex((item)=>item.p_id === action.payload.p_id)
      
      if (itemIndex >=0) {
        state.cart[itemIndex].quantity += 1;
      } else {
        const tempProduct = { ...action.payload, quantity: 1 };
        state.cart.push(tempProduct)
      }
    },
    decreaseCart: (state, action) =>{
      const itemIndex = state.cart.findIndex((item)=>item.p_id === action.payload.p_id)
      // let cartQuantity = state.cart[itemIndex].quantity;
      if (state.cart[itemIndex].quantity>1) {
        state.cart[itemIndex].quantity -= 1;
      } 
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.p_id !== action.payload);
     
    }
  },
})

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart, decreaseCart} = cartSlice.actions

export default cartSlice.reducer