import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const fetchData = createAsyncThunk('data/fetchData',
    async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }

    const posts = await response.json();
    return posts.map((post) => ({
        ...post,
        imgSrc: `https://picsum.photos/200?random=${post.id}`,
    }));
});

const Dataslicer = createSlice({
    name: 'data',
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchData.fulfilled, (state, action) => {
            state.data = action.payload;
            state.loading = false;
            state.error = null;
        }).addCase(fetchData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message ?? 'Failed to fetch data';
        }).addCase(fetchData.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
    },
});

export { fetchData };
export default Dataslicer.reducer;