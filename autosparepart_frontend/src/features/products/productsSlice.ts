import AxiosService from "@/services/AxiosService";
import { API_ADMIN_BASE_URL, API_BASE_URL, Product } from "@/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface ProductsState {
  items: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  uploadStatus: "idle" | "loading" | "succeeded" | "failed";
  uploadError: string | null;
}

const initialState: ProductsState = {
  items: [],
  status: "idle",
  error: null,
  uploadStatus: "idle",
  uploadError: null,
};

const axiosService = new AxiosService();

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { getState }) => {
    // const state: any = getState();
    // const token = state.auth.token;
    // console.log("TOKEN: ", token);
    // const response = await axios.get<Product[]>(API_BASE_URL, {
    //   // headers: {
    //   //   Authorization: `Bearer ${token}`
    //   // }
    // });
    const response = await axiosService.get<Product[]>("/products");
    return JSON.parse(response.data.toString());
    // console.log("DDDDD: ", response.data);
    // return response.data;
  }
);

export const getProductCategoryCount = createAsyncThunk(
  "categories/getProducts",
  async ({ categoryId }: { categoryId: number }) => {
    const response = await axios.get<number>(
      `${API_BASE_URL}/products/${categoryId}/count`
    );
    return response.data;
  }
);

export const getProductsByCategory = createAsyncThunk(
  "categories/getProductsByCategory",
  async ({ categoryId }: { categoryId: number }) => {
    // const response = await axios.get<Product[]>(
    //   `${API_BASE_URL}/category/${categoryId}`
    // );
    // return response.data;
    const response = await axiosService.get<Product[]>(
      "/category/${categoryId}"
    );
    return response.data;
    return JSON.parse(response.data.toString());
  }
);

export const fetchProductsByCategoryIds = createAsyncThunk(
  "categories/getProductsByCategoryIds",
  async ({ categoryIds }: { categoryIds: string[] }) => {
    // const response = await axios.get<Product[]>(`${API_BASE_URL}/categories`, {
    //   params: {
    //     categoryIds: categoryIds.join(","),
    //   },
    // });
    // return response.data;

    const response = await axiosService.get<Product[]>("/products/categories", {
      paramsName: "categoryIds",
      paramsType: categoryIds.join(","),
    });
    console.log("DDDDD:", response.data.toString());

    return JSON.parse(response.data.toString());
  }
);

export const uploadProductImages = createAsyncThunk(
  "products/uploadImages",
  async (
    { productId, images }: { productId: string; images: FormData },
    { rejectWithValue, getState }
  ) => {
    try {
      const state: any = getState();
      const token = state.auth.token;
      const formData = new FormData();
      images.forEach((image) => formData.append("files", image));
      const response = await axios.post(
        `${API_ADMIN_BASE_URL}/products/${productId}/upload-images`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state: any = getState();
      const token = state.auth.token;

      const response = await axios.post<Product>(
        `${API_ADMIN_BASE_URL}/products`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.status = "succeeded";
          state.items = action.payload;
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Error fetching products";
      })
      .addCase(getProductsByCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getProductsByCategory.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.status = "succeeded";
          state.items = action.payload;
        }
      )
      .addCase(getProductsByCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Error fetching products";
      })
      .addCase(fetchProductsByCategoryIds.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchProductsByCategoryIds.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.status = "succeeded";
          state.items = action.payload;
        }
      )
      .addCase(fetchProductsByCategoryIds.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Error fetching products";
      })
      .addCase(createProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        createProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.items.push(action.payload);
          state.status = "succeeded";
        }
      )
      .addCase(createProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Error to add product";
      })
      .addCase(uploadProductImages.pending, (state) => {
        state.uploadStatus = "loading";
        state.uploadError = null;
      })
      .addCase(uploadProductImages.fulfilled, (state) => {
        state.uploadStatus = "succeeded";
      })
      .addCase(uploadProductImages.rejected, (state, action) => {
        state.uploadStatus = "failed";
        state.uploadError = action.error.message || "Error uploading products";
      });
  },
});

export default productSlice.reducer;
