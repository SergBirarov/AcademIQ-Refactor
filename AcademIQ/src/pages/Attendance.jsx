import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';

import { MDBCheckbox, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import LandingButton from '../components/common/buttons/LandingButton';
import { Box, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import propTypes from 'prop-types';

export default function Attendance({ lessonId }) {

    const [students, setStudents] = useState();
    const { user } = useUser();
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const API_URL = `http://www.Misha-RN-Test.somee.com/api`;


    useEffect(() => {
        // Fetch data from API or local storage
        // fetch('API_URL')
        //.then(response => response.json())
        //.then(data => setStudents(data))
        //.catch(error => console.error('Error:', error));

        // Mock data
        const studentsData = [
            { id: "123456", name: 'John Doe', img: 'https://mdbootstrap.com/img/new/avatars/8.jpg' },
            { id: "684265", name: 'Michael Doe', img: 'https://mdbootstrap.com/img/new/avatars/7.jpg' },
            { id: "9876551", name: 'mdbootstrap Doe', img: 'https://mdbootstrap.com/img/new/avatars/6.jpg' },
            { id: "9876552", name: 'mdbootstrap Doe', img: 'https://mdbootstrap.com/img/new/avatars/6.jpg' },
            { id: "9876553", name: 'mdbootstrap Doe', img: 'https://mdbootstrap.com/img/new/avatars/6.jpg' },
            { id: "9876554", name: 'mdbootstrap Doe', img: 'https://mdbootstrap.com/img/new/avatars/6.jpg' },
            { id: "9876555", name: 'mdbootstrap Doe', img: 'https://mdbootstrap.com/img/new/avatars/6.jpg' },
            { id: "9876556", name: 'mdbootstrap Doe', img: 'https://mdbootstrap.com/img/new/avatars/6.jpg' },
            { id: "9876557", name: 'mdbootstrap Doe', img: 'https://mdbootstrap.com/img/new/avatars/6.jpg' },
            { id: "9876558", name: 'mdbootstrap Doe', img: 'https://mdbootstrap.com/img/new/avatars/6.jpg' },
            //... more students
        ];
        setStudents(studentsData);

    }, []);

    const handleCheckboxChange = async (studentId, isChecked) => {
        try {
            if (isChecked) {

                // Send data to server
                const response = await fetch(`${API_URL}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({
                        StudentId: studentId,
                        LessonDate: selectedDate.format('DD/MM/YYYY'),
                        LessonId: lessonId
                    })
                });
                const data = await response.json();
                // Handle response
                console.log(data); // For example
            }
            else {
                // Send data to server
                const response = await fetch(`${API_URL}?studentId=${studentId}&lessonId=${lessonId}&lessonDate=${selectedDate.format('YYYY-MM-DD')}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    },
                });
                const data = await response.json();
                // Handle response
                console.log(data); // For example
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };



    const MDBTRow = (stu) => <tr key={stu.id}>
        <td>
            <div className='d-flex align-items-center'>
                <img
                    src={stu.img}
                    alt=''
                    style={{ width: '45px', height: '45px' }}
                    className='rounded-circle'
                />
                <div className='ms-3'>
                    <p className='fw-bold mb-1'>{stu.name}</p>
                </div>
            </div>
        </td>
        <th scope='col'>
            <MDBCheckbox onChange={(e) => handleCheckboxChange(stu.id, e.target.checked)}></MDBCheckbox>        </th>
    </tr>

    return (
        <Box
            style={{
                overflowY: "auto",
                maxHeight: "calc(85vh)",
                display: "flex",
                flexGrow: 1,
                flexDirection: "column"
            }}
        >
            <Typography variant="h2" >Attendance</Typography>
            <Typography variant="h4" >{user?.name}</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                    value={selectedDate}
                    onChange={(newValue) => setSelectedDate(newValue)}
                    format='DD/MM/YYYY'
                />
            </LocalizationProvider>
            <hr />

            <MDBTable align='middle'>
                <MDBTableHead>
                    <tr>
                        <th scope='col'>Name</th>
                        <th scope='col'>
                            <MDBCheckbox></MDBCheckbox>
                        </th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {students && students.map(stu => MDBTRow(stu))}
                </MDBTableBody>
            </MDBTable>
        </Box>
    );
}


Attendance.propTypes = {
    lessonId: propTypes.int,
}