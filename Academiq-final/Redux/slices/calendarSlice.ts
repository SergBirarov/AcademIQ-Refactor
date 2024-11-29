import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getToken } from '../../src/utils/GeneralHelpers';
import { Event } from '../../src/types/MyTypes.type';

interface CalendarState {
    events: Event[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: CalendarState = {
    events: [],
    status: 'idle',
    error: null,
};

// Add Event
export const addEventAsync = createAsyncThunk<Event, Event, { rejectValue: string }>(
    'calendar/addEvent',
    async (event, { rejectWithValue }) => {
        try {
            const token = getToken();
            const response = await fetch('http://localhost:5000/api/calendar/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(event),
            });

            if (!response.ok) {
                throw new Error('Failed to add event');
            }

            const data: Event = await response.json();
            return data;
        } catch (error: any) {
            console.error('Error adding event:', error);
            return rejectWithValue('Network error while adding event');
        }
    }
);

// Get Events
export const getEventsAsync = createAsyncThunk<Event[], { userId?: number, courseIds?: number[] }, { rejectValue: string }>(
    'calendar/getEvents',
    async (params, { rejectWithValue }) => {
        try {
            const queryParams = new URLSearchParams();
            if (params?.userId) queryParams.append('userId', params.userId.toString());
            if(params?.courseIds) {
                queryParams.append('courseIds', JSON.stringify(params.courseIds));
            }

            const url = `http://localhost:5000/api/events/get-calendar?${queryParams.toString()}`;
            const token = getToken();
            console.log(url);

            const response = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response);
            if (!response.ok) {
                throw new Error('Failed to fetch events');
            }

            const data: Event[] = await response.json();
            return data;
        } catch (error: any) {
            console.error('Error fetching events:', error);
            return rejectWithValue('Network error while fetching events');
        }
    }
);

// Update Event
export const updateEventAsync = createAsyncThunk<Event, Event, { rejectValue: string }>(
    'calendar/updateEvent',
    async (event, { rejectWithValue }) => {
        try {
            const token = getToken();
            const response = await fetch(`http://localhost:5000/api/calendar/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(event),
            });

            if (!response.ok) {
                throw new Error('Failed to update event');
            }

            const data: Event = await response.json();
            return data;
        } catch (error: any) {
            console.error('Error updating event:', error);
            return rejectWithValue('Network error while updating event');
        }
    }
);

// Delete Event
export const deleteEventAsync = createAsyncThunk<string, string, { rejectValue: string }>(
    'calendar/deleteEvent',
    async (eventId, { rejectWithValue }) => {
        try {
            const token = getToken();
            const response = await fetch(`http://localhost:5000/api/calendar/delete?eventId=${eventId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete event');
            }

            return eventId; // Return eventId so we can remove it from the state
        } catch (error: any) {
            console.error('Error deleting event:', error);
            return rejectWithValue('Network error while deleting event');
        }
    }
);

// Calendar Slice
const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        resetEvents: (state) => {
            state.events = [];
            state.status = 'idle';
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Get Events
            .addCase(getEventsAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getEventsAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.events = action.payload;
            })
            .addCase(getEventsAsync.rejected, (state, action) => {
                state.status = 'failed';
                if (action.payload) {
                    state.error = action.payload;
                } else {
                    state.error = action.error.message || 'Unknown error';
                }
            })

            // Add Event
            .addCase(addEventAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addEventAsync.fulfilled, (state) => {
                state.status = 'succeeded';
                // state.events.push(action.payload);
            })
            .addCase(addEventAsync.rejected, (state, action) => {
                state.status = 'failed';
                if (action.payload) {
                    state.error = action.payload;
                } else {
                    state.error = action.error.message || 'Unknown error';
                }
            })

            // Update Event
            .addCase(updateEventAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateEventAsync.fulfilled, (state) => {
                state.status = 'succeeded';
                // const index = state.events.findIndex(
                //     (event) => event._id.toString() === action.payload._id.toString()
                // );
                // if (index !== -1) {
                //     state.events[index] = action.payload;
                // }
            })
            .addCase(updateEventAsync.rejected, (state, action) => {
                state.status = 'failed';
                if (action.payload) {
                    state.error = action.payload;
                } else {
                    state.error = action.error.message || 'Unknown error';
                }
            })

            // Delete Event
            .addCase(deleteEventAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteEventAsync.fulfilled, (state) => {
                state.status = 'succeeded';
              
            })
            .addCase(deleteEventAsync.rejected, (state, action) => {
                state.status = 'failed';
                if (action.payload) {
                    state.error = action.payload;
                } else {
                    state.error = action.error.message || 'Unknown error';
                }
            });
    },
});

export const { resetEvents } = calendarSlice.actions;

export default calendarSlice.reducer;
