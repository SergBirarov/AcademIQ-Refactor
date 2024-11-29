import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../../Redux/store/store';
import { getCoursesAsync, updateCourseAsync } from '../../../Redux/slices/courseSlice';
import {
  Container, Grid, Card, CardContent, Typography, CardActions, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions,
  MenuItem
} from '@mui/material';
import { CourseType } from '../../types/MyTypes.type';

const ManageCourses: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { courses, status } = useSelector((state: RootState) => state.courses);
  const { assignments } = useSelector((state: RootState) => state.assignments);
  const { user } = useSelector((state: RootState) => state.auth);
  const [active, setActive] = useState<boolean>();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Partial<CourseType>>({});
  const [updatedFields, setUpdatedFields] = useState<Partial<CourseType>>({});


  useEffect(() => {
      dispatch(getCoursesAsync({ userId: user?.Id, userType: 'Instructor' }));
    
  }, [ dispatch]);

  const handleEditCourse = (course: CourseType ) => {
    setSelectedCourse(course);
    setUpdatedFields({
      CourseName: course.CourseName,
      ClassTimes: course.ClassTimes || '',
      IsActive: course.IsActive 
    });
    setOpenDialog(true);
  };

  const handleFieldChange = (field: string, value: any) => {
    setUpdatedFields(prevFields => ({
      ...prevFields,
      [field]: value,
    }));
  };

  const handleSaveCourse = async () => {
    if (selectedCourse) {
        console.log(selectedCourse);
        console.log(updatedFields);
      await dispatch(updateCourseAsync({
        CourseId: selectedCourse.CourseId as number,
  CourseName: updatedFields.CourseName as string,
  ClassRoomName: selectedCourse.ClassRoomName as string,
  IsActive: updatedFields.IsActive as boolean,
  ClassTimes: updatedFields.ClassTimes as string,
  UserId: user?.Id as number
      })).then(() => {
        dispatch(getCoursesAsync({ userId: user?.Id, userType: 'Instructor' }));
      });
      setOpenDialog(false);
    }
  };


  const formatClassTimes = (classTimes: string) => {
    if (!classTimes) return '';
  
    const timesArray = classTimes.split(',');
  
    return timesArray.map((time, index) => {
      const dayEndIndex = time.indexOf(':');
      const day = time.substring(0, dayEndIndex);
      const hours = time.substring(dayEndIndex + 1);
  
      return (
        <div key={index}>
          <strong>{day}</strong>: {hours}
        </div>
      );
    });
  };
  

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Manage Courses</Typography>
      <Grid container spacing={3}>
        {courses.map(course => (
          <Grid item xs={12} md={6} lg={4} key={course.CourseId}>
            <Card>
              <CardContent>
                <Typography variant="h5">{course.CourseName}</Typography>
                <Typography variant="body2">Class Times:</Typography>
                <div>{formatClassTimes(course.ClassTimes || '')}</div>
                <Typography variant="body2">Status: {!course.IsActive  ? <span style={{ color: 'green' }}>Active</span>:<span style={{ color: 'red' }}>InActive</span>}</Typography>
              </CardContent>
              <CardActions>
                <Button variant="outlined" onClick={() => handleEditCourse(course)}>Edit Course</Button>
                <Button variant="contained" color="primary" onClick={() => {/* Navigate to manage assignments */}}>Manage Assignments</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialog to update course information */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Edit Course Details</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Course Name"
            type="text"
            fullWidth
            value={updatedFields.CourseName}
            onChange={(e) => handleFieldChange('CourseName', e.target.value)}
          />
          <TextField
            margin="dense"
            label="Class Times"
            type="text"
            fullWidth
            value={updatedFields.ClassTimes}
            onChange={(e) => handleFieldChange('ClassTimes', e.target.value)}
          />
<TextField
  margin="dense"
  label="Status"
  select
  fullWidth
  value={!updatedFields.IsActive ? 'Active' : 'Inactive'}
  onChange={(e) => handleFieldChange('IsActive', e.target.value === 'Active')}
>
  <MenuItem value="Active">Active</MenuItem>
  <MenuItem value="Inactive">Inactive</MenuItem>
</TextField>

        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveCourse} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default ManageCourses;
