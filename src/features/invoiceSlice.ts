import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Update Product interface to include totalPriceWithGST
interface Product {
  name: string;
  quantity: number;
  rate: number;
  total: number; // Total price before GST
  gst: number; // GST amount
  totalPriceWithGST: number; // Total price including GST
}

interface InvoiceState {
  products: Product[];
}

const initialState: InvoiceState = {
  products: [],
};

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<Product>) {
      state.products.push(action.payload);
    },
  },
});

export const { addProduct } = invoiceSlice.actions;
export default invoiceSlice.reducer;
