// import { useUser } from "../../../context/AuthContext";
import { Box, Tooltip, IconButton, Grid2, useTheme } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";



export default function BubbleMenu() {
    // const {user } = useUser();
    const navigate = useNavigate();
    const theme = useTheme();
    
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

    return(
      <Box >
      <Grid2 container spacing={2} justifyContent="center" alignItems="center">
          {actions.map((item, index) => (
              <Grid2
                  item
                  key={index}
                  size={{ xs: 6, sm: 4, md: 3, lg: 2 }}
                  sx={{ display: 'flex', justifyContent: 'center' }}
              >
                  <Tooltip title={item.label} arrow>
                      <IconButton
                          onMouseEnter={() => setHovered(index)}
                          onMouseLeave={() => setHovered(null)}
                          onClick={() => navigate(item.path)}
                          sx={{
                            width: '100px',
                            height: '100px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            transition: 'transform 0.3s ease',
                            transform: hovered === index ? 'scale(1.2)' : 'scale(1)',
                            boxShadow: hovered === index ? `0 4px 20px ${theme.palette.background.default}` : 'none',
                            backgroundColor: 'transparent',

                            borderRadius: '50px',
                            padding: 2,
                          }}
                      >
                          <Box
                              component="img"
                              src={item.svg}
                              alt={item.label}
                              sx={{ width: '100%'
                               }}
                          />
                          <Box
                              component="span"
                              sx={{
                                  fontSize: '12px',
                                  fontWeight: 'bold',
                                  color: theme.palette.text.secondary,
                                  textTransform: 'uppercase',
                                  textAlign: 'center',
                              }}
                          >
                              {item.label}
                          </Box>
                      </IconButton>
                  </Tooltip>
              </Grid2>
          ))}
      </Grid2>
  </Box>
    )

}