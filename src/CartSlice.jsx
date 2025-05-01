import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0,
        totalAmount: 0,
    },
    reducers: {
        addItem: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.name === newItem.name);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({
                    ...newItem,
                    quantity: 1
                });
            }
            
            state.totalQuantity += 1;
            state.totalAmount += parseFloat(newItem.cost.substring(1));
        },
        removeItem: (state, action) => {
            const name = action.payload;
            const existingItem = state.items.find(item => item.name === name);
            
            if (existingItem) {
                state.totalQuantity -= existingItem.quantity;
                state.totalAmount -= parseFloat(existingItem.cost.substring(1)) * existingItem.quantity;
                state.items = state.items.filter(item => item.name !== name);
            }
        },
        updateQuantity: (state, action) => {
            const { name, amount } = action.payload;
            const existingItem = state.items.find(item => item.name === name);
            
            if (existingItem) {
                const quantityDifference = amount - existingItem.quantity;
                existingItem.quantity = amount;
                state.totalQuantity += quantityDifference;
                state.totalAmount += parseFloat(existingItem.cost.substring(1)) * quantityDifference;
            }
        }
    }
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
