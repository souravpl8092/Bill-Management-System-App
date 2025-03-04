import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for adding a new bill (with delay simulation)
export const addBillAsync = createAsyncThunk(
  "bill/addBillAsync",
  async (bill, { rejectWithValue }) => {
    try {
      return new Promise((resolve) => setTimeout(() => resolve(bill), 1000));
    } catch (error) {
      console.error("Error adding bill:", error);
      return rejectWithValue("Failed to add bill.");
    }
  }
);

// Async thunk to get bills (simulating API call)
export const getBills = createAsyncThunk(
  "bill/getBills",
  async (_, { rejectWithValue }) => {
    try {
      const storedBills = JSON.parse(localStorage.getItem("bills")) || [];
      return storedBills;
    } catch (error) {
      console.error("Error fetching bills:", error);
      return rejectWithValue("Failed to fetch bills.");
    }
  }
);

const initialState = {
  bills: [],
  loading: false,
  error: null,
};

const billSlice = createSlice({
  name: "bill",
  initialState,
  reducers: {
    // Add bill synchronously
    addBill: (state, action) => {
      state.bills.push(action.payload);
      localStorage.setItem("bills", JSON.stringify(state.bills));
    },

    // Remove bill by ID
    removeBill: (state, action) => {
      state.bills = state.bills.filter((bill) => bill.id !== action.payload);
      localStorage.setItem("bills", JSON.stringify(state.bills));
    },

    // Update an existing bill
    updateBill: (state, action) => {
      const index = state.bills.findIndex(
        (bill) => bill.id === action.payload.id
      );
      if (index !== -1) {
        state.bills[index] = action.payload;
        localStorage.setItem("bills", JSON.stringify(state.bills));
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addBillAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBillAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.bills.push(action.payload);
        localStorage.setItem("bills", JSON.stringify(state.bills));
      })
      .addCase(addBillAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getBills.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBills.fulfilled, (state, action) => {
        state.loading = false;
        state.bills = action.payload;
      })
      .addCase(getBills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addBill, removeBill, updateBill } = billSlice.actions;
export default billSlice.reducer;
