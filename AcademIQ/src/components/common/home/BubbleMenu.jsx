import { useUser } from "../../../context/UserContext";
import { Box, Tooltip, IconButton, Grid2 } from "@mui/material";
import  theme  from "../../../theme";
import { useState } from "react";
import { useNavigate } from "react-router-dom";



export default function BubbleMenu() {
    const {user } = useUser();
    const navigate = useNavigate();
    
    const [hovered, setHovered] = useState(null);

    const actions = [
      { label: 'Grades', frequency: 5, svg: 'https://academiq-assets.s3.eu-north-1.amazonaws.com/a+plus.svg', path: '/grades' },
      { label: 'Schedule', frequency: 8, svg:  'https://academiq-assets.s3.eu-north-1.amazonaws.com/bell.svg', path: '/schedule' },
      { label: 'Assignments', frequency: 3, svg: 'https://academiq-assets.s3.eu-north-1.amazonaws.com/book+with+pencil.svg', path: '/assignments' },
      { label: 'Calendar', frequency: 12, svg: 'https://academiq-assets.s3.eu-north-1.amazonaws.com/calendar+2.svg', path: '/calendar' },
      { label: 'Performane', frequency: 8, svg: 'https://academiq-assets.s3.eu-north-1.amazonaws.com/gradeenvelope.svg', path: '/performance' },
      { label: 'My Profile', frequency: 3, svg: 'https://academiq-assets.s3.eu-north-1.amazonaws.com/student.svg', path: '/profile' },
      { label: 'Courses', frequency: 3, svg: 'https://academiq-assets.s3.eu-north-1.amazonaws.com/student.svg', path: '/profile' },
    ];

    // //for different screen sizes 
    // const getSize = (frequency) => {
    //   return {
    //     xs: `${40 + frequency * 3}px`, 
    //     sm: `${50 + frequency * 4}px`, 
    //     md: `${60 + frequency * 5}px`, 
    //     lg: `${70 + frequency * 6}px`,
    //     xl: `${80 + frequency * 7}px`, 
    //   };
    // };
    return(
      <>

<Box sx={{ width: '100%', height: '200vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: theme.spacing(3) }}>
      <Grid2 container spacing={2}  sx={{display: 'flex', columnGap: 6, justifyContent: 'space-evenly', alignItems: 'space-evenly'}} >
        {actions.map((item, index) => (
          <Grid2 item xs={6} sm={4} md={3} key={index} >
            <Tooltip title={item.label}>
              <IconButton
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => navigate(item.path)}
                sx={{
                  width: hovered === index ? '90px' : '70px',
                  height: hovered === index ? '90px' : '70px',
                  display: 'flex',
                  flexDirection: 'column',
                  // justifyContent: 'space-evenly',
                  // alignItems: 'space-evenly',
                  transition: 'transform 0.3s ease', // Smooth transform on hover
                  transform: hovered === index ? 'scale(1.2)' : 'scale(1)',
                  backgroundColor: hovered === index ? theme.palette.secondary.light : 'transparent',
                  '&:hover': {
                    backgroundColor: theme.palette.secondary.light,
                  }
                }}
              >
                <Box
                  component="img"
                  src={item.svg}
                  alt={item.label}
                  sx={{ width: '100%', height: 'auto', mb: 1 }}
                />
                <Box component="span" sx={{ fontSize: 12, color: theme.palette.primary.text, fontWeight: 'bold', textTransform: 'uppercase', textAlign: 'center' }}>
                  {item.label}
                </Box>
              </IconButton>
            </Tooltip>
          </Grid2>
        ))}
      </Grid2>
    </Box>
      
      {/* {actions.map((item, index) => (
        <Tooltip title={item.label} key={index} >
          <IconButton
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => navigate(item.path)}
            sx={{
              width: '40%',
              height: '40%',
              display: 'flex',
              // justifyContent: 'center',
              flexDirection: 'column',
              // alignItems: 'center',
              transition: 'width 0.3s, height 0.3s',
              '&: hover':{
                width: '50%',
                height: '50%',

              }
            }}
          >
            <Box
              component="img"
              src={item.svg}
              alt={item.label}
              sx={{
                maxWidth: '100%',
                minWidth: '100%',
                height: '100%',
                maxHeight: '100%',
                transition: 'width 0.3s, height 0.3s',


              }}
            >
              </Box>
          {item.label}
          </IconButton>
        </Tooltip>
      ))} */}
      </>
    )

}