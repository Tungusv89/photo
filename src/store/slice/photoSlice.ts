import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"
import {IPhoto} from "../../Models/IPhoto"

interface PhotoState {
    list: IPhoto[],
    status: any,
    error: any,
    statusFilter: string
}

const initialState: PhotoState = {
    list: [],
    status: null,
    error: null,
    statusFilter: "all"
}

export const fetchPhotos = createAsyncThunk('photo/fetchPhotos', async (_, {rejectWithValue}) => {
    try {
        const response = await fetch('https://pixabay.com/api/?key=38441142-d72bad79752b244e813740d67&q=mountains&image_type=photo');

        if (!response.ok) {
            throw new Error('Response Error')
        }

        let result = await response.json();
        result = result.hits.map((obj: IPhoto) => ({
            ...obj,
            isLikes: false
        }));

        return result;
    } catch (error) {
        return rejectWithValue(error)
    }
});

export const photoSlice = createSlice({
    name: 'photos',
    initialState,
    reducers: {
        changeLike: (state, action: PayloadAction<IPhoto>) => {
            const likedPhoto: IPhoto | any = state.list.find(photo => photo.id === action.payload.id);
            likedPhoto.isLikes = !likedPhoto.isLikes
        },
        deletePhoto: (state, action) => {
            state.list = state.list.filter((item) => item.id !== action.payload.id)
        },
        likePhotos: (state) => {
            if (state.statusFilter !== 'likes') {
                state.statusFilter = 'likes'
            } else {
                state.statusFilter = 'all'
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPhotos.pending, (state) => {
            state.status = 'loading'
            state.error = null
        })
            .addCase(fetchPhotos.fulfilled, (state, action) => {
                state.status = 'resolved'
                state.list.push(...action.payload)
            }).addCase(fetchPhotos.rejected, (state, action) => {
            state.status = 'rejected'
            state.error = action.error.message
        })
    },
})

export const {deletePhoto, changeLike, likePhotos} = photoSlice.actions
export default photoSlice.reducer