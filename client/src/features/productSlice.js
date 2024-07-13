import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = process.env.BASEURL;
const BASE_URL_PRODUCT = `${process.env.BASEURL}/product`;
const BASE_URL_CATEGORY = `${process.env.BASEURL}/category`;

// creating a category
export const createCategory = createAsyncThunk(
  'category/createCategory',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(BASE_URL_CATEGORY, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

// getting all the category
export const getAllCategory = createAsyncThunk(
  'category/getAllCategory',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(BASE_URL_CATEGORY, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

// getting a single category
export const getOneCategory = createAsyncThunk(
  'category/getOneCategory',
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL_CATEGORY}/${categoryId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

// updating a category
export const updateCategory = createAsyncThunk(
  'category/updateCategory',
  async ({ data, categoryId }, { rejectWithValue }) => {
    try {
      const response = await axios(`${BASE_URL_CATEGORY}/${categoryId}`, data, {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

// deleting a product
export const removeCategory = createAsyncThunk(
  'category/removeCategory',
  async (categoryId, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL_CATEGORY}/${categoryId}`, {
        headers: { 'Content-Type': 'application/json' },
      });
      return id; // Return the id of the deleted product
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

// creating a product
export const addProduct = createAsyncThunk(
  'product/addProduct',
  async ({ productData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/product`, productData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

// getting all products
export const getAllProducts = createAsyncThunk(
  'product/getProducts',
  async ({ page }, { rejectWithValue }) => {
    try {
      const response = await axios.get(BASE_URL_PRODUCT, {
        headers: { 'Content-Type': 'application/json' },
        params: {
          page,
          limit: 12,
        },
      });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

// getting a single product
export const getOneProduct = createAsyncThunk(
  'product/getOneProduct',
  async ({ productId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL_PRODUCT}/${productId}`, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

// add images in a product
export const otherImages = createAsyncThunk(
  'product/otherImages',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL_PRODUCT}/${id}/images`,
        data,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      return { id, otherImages: response.data }; // Return the id and the new images
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

// updating a product
export const updateProduct = createAsyncThunk(
  'product/updateProduct',
  async ({ productData, id }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/product/${id}`,
        productData,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

// deleting a product
export const removeProduct = createAsyncThunk(
  'product/removeProduct',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL}/product/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

export const addOtherImages = createAsyncThunk(
  'dashboard/addOtherImages',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/product/otherImages/${id}`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

export const deleteOtherImages = createAsyncThunk(
  'dashboard/deleteOtherImages',
  async ({ id, imageId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/product/otherImages/${id}/${imageId}`,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

// Initial state for the product slice
const initialState = {
  products: [],
  singleProduct: null,
  loading: false,
  isLoading: false,
  error: null,
  SuccessMsg: null,
};

// Create the product slice
export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteOtherImages.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteOtherImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteOtherImages.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(addOtherImages.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addOtherImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(addOtherImages.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Create product
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get all products
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear previous errors
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.products = action.payload.data.productInfo; // Set the products list
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set the error message
      })
      // Get one product
      .addCase(getOneProduct.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear previous errors
      })
      .addCase(getOneProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.singleProduct = action.payload.data.productInfo; // Set the single product
      })
      .addCase(getOneProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set the error message
      })
      // Add images in a product
      .addCase(otherImages.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear previous errors
      })
      .addCase(otherImages.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.products = state.products.map((product) => {
          if (product.id === action.payload.id) {
            return { ...product, otherImages: action.payload.otherImages };
          }
          return product;
        });
      })
      .addCase(otherImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set the error message
      })
      // Update product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear previous errors
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.SuccessMsg = action.payload.data;
        state.products = state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product
        ); // Update the product in the list
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set the error message
      })
      // Delete product
      .addCase(removeProduct.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear previous errors
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.SuccessMsg = action.payload.data;
        state.products = state.products.filter(
          (product) => product.id !== action.payload
        ); // Remove the product from the list
      })
      .addCase(removeProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set the error message
      });
  },
});

export default productSlice.reducer;
