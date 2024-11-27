import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridCellParams } from '@mui/x-data-grid';
import { GridValueGetter } from '@mui/x-data-grid';
import { Button, Select, MenuItem, InputLabel, FormControl, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../Redux/store/store';
import { getAssignmentsAsync } from '../../../Redux/slices/assignmentSlice';
import { getSubmissionsAsync } from '../../../Redux/slices/submissionSlice';
import { AppDispatch } from '../../../Redux/store/store';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween'


import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
  } from '@mui/material';
import { ButtonGroup } from 'react-bootstrap';


interface EnrichedSubmission {
    assignmentId: string | number;
    assignmentNumber: number;
    courseName?: string;
    courseInstructor?: string;
    courseId?: number;
    title?: string;
    description?: string;
    dueDate?: Date;
    createdBy?: number;
    grade?: number;
    feedback?: string;
}

const AssignmentsComponent = () => {
    const dispatch = useDispatch<AppDispatch>();
    //redux states
    const { assignments } = useSelector((state: RootState) => state.assignments);
    const { courses } = useSelector((state: RootState) => state.courses);
    const { submissions } = useSelector((state: RootState) => state.submissions);
    const { user } = useSelector((state: RootState) => state.auth);
    //component states
    const [filteredAssignments, setFilteredAssignments] = useState<EnrichedSubmission[]>([]);
    const [courseFilter, setCourseFilter] = useState('');
    const [dateFilter, setDateFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    //null check
    if(!user) return <div>Loading...</div>;
    if(!courses) return <div>Loading...</div>;

    //fetch data on mount
  useEffect(() => {
      dispatch(getAssignmentsAsync({userId: user.Id}));
      dispatch(getSubmissionsAsync({studentId: user.Id}));
  }, [dispatch]);

  //merge data and apply filters
  useEffect(() => {
    console.log("befor enrichedSubmissions: " + submissions, assignments);
    const enrichedSubmissions: EnrichedSubmission[] = submissions.map((submission) => {
      const relatedAssignment = assignments.find(
        (assignment) => assignment.assignmentNumber === submission.assignmentId
      );
      return {
        ...submission,
        ...relatedAssignment, // Merge assignment data into submission
      };
    });
  
    let filtered = [...enrichedSubmissions];
  
    // Filter by course
    if (courseFilter) {
      filtered = filtered.filter((s) => s.courseId === Number(courseFilter));
    }
  
    // Filter by date
    const now = dayjs();
    if (dateFilter === 'today') {
        filtered = filtered.filter((s) => dayjs(s.dueDate).isSame(now, 'day'));
      } else if (dateFilter === 'thisWeek') {
        filtered = filtered.filter((s) =>
          dayjs(s.dueDate).isBetween(now.startOf('week'), now.endOf('week'))
        );
      } else if (dateFilter === 'pastDue') {
        filtered = filtered.filter((s) => dayjs(s.dueDate).isBefore(now));
      }
  
    // Filter by status
    if (statusFilter === 'submitted') {
      filtered = filtered.filter((s) => s.grade !== null && s.grade !== undefined);
    } else if (statusFilter === 'notSubmitted') {
      filtered = filtered.filter((s) => s.grade === null || s.grade === undefined);
    } else if (statusFilter === 'awaitingGrading') {
      filtered = filtered.filter((s) => s.grade === null);
    }
  
    setFilteredAssignments(filtered);
  }, [courseFilter, dateFilter, statusFilter, assignments, submissions]);
  

    const handleSubmit = (assignment: any) => {
    // Handle assignment submission
  };

  const handleDownload = (assignment: any) => {
    // Handle downloading assignment attachments
  };

  const getRowBackgroundColor = (grade?: number): string => {
    if (grade === undefined || grade === null) return 'white';
    if (grade >= 80) return '#d1f7d1'; // Light green
    if (grade >= 55) return '#fff5cc'; // Light yellow
    return '#f8d7da'; // Light red
  };
  return (
    <Box>
      <FormControl variant="outlined" style={{ minWidth: 120, marginRight: 16 }}>
        <InputLabel>Course</InputLabel>
        <Select
          value={courseFilter}
          onChange={(e) => setCourseFilter(e.target.value)}
          label="Course"
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          {courses.map((course) => (
      <MenuItem key={course.CourseId} value={ course.CourseId.toString()}>
        { course.CourseName}
      </MenuItem>
    ))}
        </Select>
      </FormControl>
      <FormControl variant="outlined" style={{ minWidth: 120, marginRight: 16 }}>
        <InputLabel>Status</InputLabel>
        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          label="Status"
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          <MenuItem value="notSubmitted">Not Submitted</MenuItem>
          <MenuItem value="submitted">Submitted</MenuItem>
          <MenuItem value="awaitingGrading">Awaiting Grading</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined" style={{ minWidth: 120, marginRight: 16 }}>
        <InputLabel>Due Date</InputLabel>
        <Select
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          label="Due Date"
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          <MenuItem value="today">Today</MenuItem>
          <MenuItem value="thisWeek">This Week</MenuItem>
          <MenuItem value="pastDue">Past Due</MenuItem>
        </Select>
      </FormControl>
      <Box style={{ height: 600, marginTop: 16 }}>

      <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Assignmnet</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Course</TableCell>
            <TableCell>Due Date</TableCell>
            <TableCell>Grade</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredAssignments.map((row) => (
            <TableRow key={row.assignmentId}
            style={{ backgroundColor: getRowBackgroundColor(row.grade) }}
            >
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>
                {courses.find((course) => course.CourseId === row.courseId)?.CourseName ||
                  'Unknown'}
              </TableCell>
              <TableCell>{dayjs(row.dueDate).format('DD MMM YYYY')}</TableCell>
              <TableCell>
                {row.grade !== undefined
                  ? row.grade
                  : row.grade === null
                  ? 'Awaiting Grading'
                  : 'Not Submitted'}
              </TableCell>
              <TableCell>
                <ButtonGroup style={{
                    boxShadow: 'none'
                }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleSubmit(row)}
                  style={{ marginRight: 8 }}
                >
                  Submit
                </Button>
                <Button variant="contained" color="secondary" onClick={() => handleDownload(row)}>
                  Download
                </Button>
                </ButtonGroup>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </Box>
    </Box>
  );
};

export default AssignmentsComponent;
 
