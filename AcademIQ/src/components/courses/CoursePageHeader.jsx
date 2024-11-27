import { Box, Typography, TextField, Button } from '@mui/material';

export default function CoursePageHeader() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 3,
      }}
    >
      <Typography variant="h4" fontWeight="bold">
        My Courses
      </Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          variant="outlined"
          placeholder="Search courses"
          size="small"
        />
        <Button variant="contained" size="small" color="primary">
          Add Filters
        </Button>
      </Box>
    </Box>
  );
}
