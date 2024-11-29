import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../Redux/store/store";
import { Event } from "../../types/MyTypes.type";
import { Box, ButtonGroup, Button, Modal, TextField, Typography, Select, MenuItem, FormControl, InputLabel, Stack } from "@mui/material";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from 'dayjs';
import 'dayjs/locale/he';
import "react-big-calendar/lib/css/react-big-calendar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { number } from "yup";
import { getEventsAsync } from "../../../Redux/slices/calendarSlice";
import { AppDispatch } from "../../../Redux/store/store";
import { Badge } from "react-bootstrap";


dayjs.locale('he');
const localizer = dayjsLocalizer(dayjs);


const EventCalendar: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { user} = useSelector((state: RootState) => state.auth);
    const { courses } = useSelector((state: RootState) => state.courses);
    const {events} = useSelector((state: RootState) => state.calendar);
    const [eventType, setEventType] = useState<string>('all');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [newEvent, setNewEvent] = useState<Partial<Event>>({
        title: '',
        type: 'other',
        eventStartDate:new Date(),
        eventEndDate: new Date(),
        relatedId: number.toString(),
        location: '',
        description: '',
        addedBy: number.toString(),
    });

    if(!user) return <div>Loading...</div>;

    const courseIds = courses.map((course) => course.CourseId);


    useEffect(() => {
        console.log('Fetching events...', user.Id, courseIds);
        dispatch(getEventsAsync({userId: user.Id, courseIds: courseIds} ));
    }, [dispatch]);

    const filteredEvents = eventType === 'all'
        ? events
        : events.filter((event: Event) => event.type === eventType);

    // Handle Event Property Colors
    const eventPropGetter = (event: Event) => {
        let backgroundColor = '';
        switch (event.type) {
            case 'exam':
                backgroundColor = '#ff6f61';
                break;
            case 'holiday':
                backgroundColor = '#4caf50';
                break;
            case 'class':
                backgroundColor = '#2196f3';
                break;
            default:
                backgroundColor = '#9e9e9e';
        }

        return {
            style: {
                backgroundColor,
                color: 'white',
                borderRadius: '4px',
                
                padding: '4px',
                border: '2px solid #ffffff',
                display: 'inline-block',
                width: '100%',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                height: 'auto',
               

            },
        };
    };

    // Handle Adding a New Event
    const handleAddEvent = () => {

    };
    
    const truncateText = (text: string, maxLength: number) => {
        if (text.length > maxLength) {
            return `${text.substring(0, maxLength)}...`;
        }
        return text;
    };
    return (
        <Box style={{ padding: '30px', borderRadius: '16px', boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.1)', backgroundColor: '#ffffff' }}>
            <Stack direction="row" spacing={2} style={{ marginBottom: '20px' }} justifyContent="center">
            <Button onClick={() => setEventType('all')}>All Events</Button>
                <Button onClick={() => setEventType('exam')}>Exams</Button>
                <Button onClick={() => setEventType('holiday')}>Holidays</Button>
                <Button onClick={() => setEventType('class')}>Classes</Button>
                <Button onClick={() => setEventType('assignment')}>Assignments</Button>
                </Stack>
                <Box display="flex" alignItems="center" justifyContent={'center'}>
                <Button variant="outlined" color="info"
                onClick={() => setIsModalOpen(true)}
                sx={{
                    mb: 2,
                    '@media (max-width: 600px)': {
                        fontSize: '0.8rem',
                        padding: '8px',
                    },
                }}
            >Add Event</Button>
                </Box>
            <Calendar
                localizer={localizer}
                events={filteredEvents}
                defaultView="day"
                getNow={() => new Date()}
                startAccessor={(event: Event) => new Date(event.eventStartDate)}
                endAccessor={(event: Event) => new Date(event.eventEndDate)}
                views={['day', 'week','month' ]}
                style={{
                    height: '70vh',
                    
                    padding: '20px',
                    borderRadius: '16px',
                    boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.1)',
                    scrollbarWidth: 'none',
                    '@media (max-width: 600px)': {
                        height: '50vh',
                    },
                }}
                eventPropGetter={eventPropGetter}
                components={{
                    event: ({ event }) => (
                        <Box
                         display="flex"
                          alignItems="center"
                           justifyContent={'center'}
                            sx={{

                            }}
                            >
                                <Badge bg={event.type === 'exam' ? 'danger' : 'info'} >
                                    <small>
                                    
                                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)} 
                                    </small>
                                </Badge>
                            <Typography variant="body2" ml={2} style={{ fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
                            {truncateText(event.title, 15)}
                                </Typography>
                        </Box>
                    ),
                }}
                min={new Date().setHours(7, 0, 0)}
                max={new Date().setHours(23, 0, 0)}
            />

            {/* Add Event Modal */}
            <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: '16px',

                    }}
                >
                    <Typography variant="h6" component="h2">Add New Event</Typography>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Title"
                        value={newEvent.title}
                        onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Type</InputLabel>
                        <Select
                            value={newEvent.type}
                            onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value as "class" | "holiday" | "exam" | "assignment" | "other" })}
                        >
                            {/* <MenuItem value="exam">Exam</MenuItem>
                            <MenuItem value="holiday">Holiday</MenuItem>
                            <MenuItem value="class">Class</MenuItem> */}
                            <MenuItem value="assignment">Assignment</MenuItem>
                            <MenuItem value="other">Other</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        fullWidth
                        margin="normal"
                        type="datetime-local"
                        label="Start"
                        value={newEvent.eventStartDate ? dayjs(newEvent.eventStartDate).format('YYYY-MM-DDTHH:mm') : ''}
                        onChange={(e) => setNewEvent({ ...newEvent, eventStartDate:new Date(e.target.value) })}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        type="datetime-local"
                        label="End"
                        value={newEvent.eventEndDate ? dayjs(newEvent.eventEndDate).format('YYYY-MM-DDTHH:mm') : ''}
                        onChange={(e) => setNewEvent({ ...newEvent, eventEndDate: new Date(e.target.value) })}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Location"
                        value={newEvent.location}
                        onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddEvent}
                        style={{ marginTop: '20px' }}
                    >
                        Add Event
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
};

export default EventCalendar;
