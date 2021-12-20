import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { WritableDraft } from "immer/dist/internal";
import qs from "qs";

const apiKey = "bff8807f-8f84-4a27-bd61-0821fdb93db6";
const baseUrl = `https://api.thedogapi.com/v1`;

interface Breed {
  name: string;
  image: {
    url: string;
  };
  id: number;
}

interface DogState {
  breeds: Breed[];
  loading: boolean;
  error: string;
  messages: string[];
}

const initialState: DogState = {
  breeds: [],
  loading: false,
  error: null,
  messages: [],
};

export const fetchBreeds = createAsyncThunk(
  "dogs/fetchBreeds",
  async ({ page, limit }: { page?: number; limit?: number }, { signal }) => {
    const url = `${baseUrl}/breeds?${qs.stringify({ page, limit })}`;

    const source = axios.CancelToken.source();
    signal.addEventListener("abort", () => {
      source.cancel();
    });

    const response = await axios.get(url, {
      headers: {
        "x-api-key": apiKey,
      },
    });
    return await response.data;
  }
);

interface ServerResponse {
  messages: string[];
  load: any;
}

let messageId = 0;

function parseServerResponse(
  state: WritableDraft<DogState>,
  { payload }: PayloadAction<ServerResponse>,
  callback: (state: WritableDraft<DogState>, payload: any) => void
) {
  try {
    // If we didn't catch here, the error would become an unhandled error

    console.log("Checking some things in the response");
    state.messages.push(`Message number ${messageId++}`);

    callback(state, payload);
  } catch (e) {
    console.log(e);
  }
}

const dogSlice = createSlice({
  name: "dog",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBreeds.fulfilled, (...args) =>
      parseServerResponse(
        ...args,
        (state: WritableDraft<DogState>, payload: Breed[]) => {
          console.log("Final payload", { payload });
          state.breeds = payload;
          state.loading = false;

          // The state is updated even when this error is thrown
          throw new Error("Asdf");
        }
      )
    );
    builder.addCase(fetchBreeds.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchBreeds.rejected, (state, { error }) => {
      // This could be parseRequestError
      state.error = `${error.name}: ${error.message}`;
      state.loading = false;

      console.log("Error", { state, error });
    });
  },
});

export default dogSlice.reducer;
