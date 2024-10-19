import { useUser } from "../../../context/UserContext";
import { Box, Tooltip, IconButton } from "@mui/material";
import { useTheme } from "../../../context/ThemeContext";
import { useState } from "react";
import { GetVw, GetVh } from "../../../utils/GeneralHelpers";

const actions = [
  { label: 'Grades', frequency: 5, svg: 'https://academiq-assets.s3.eu-north-1.amazonaws.com/a+plus.svg' },
  { label: 'Schedule', frequency: 8, svg:  'https://academiq-assets.s3.eu-north-1.amazonaws.com/bell.svg' },
  { label: 'Assignments', frequency: 3, svg: 'https://academiq-assets.s3.eu-north-1.amazonaws.com/book+with+pencil.svg' },
  { label: 'Calendar', frequency: 12, svg: 'https://academiq-assets.s3.eu-north-1.amazonaws.com/calendar+2.svg', },
  { label: 'Performane', frequency: 8, svg: 'https://academiq-assets.s3.eu-north-1.amazonaws.com/gradeenvelope.svg' },
  { label: 'My Profile', frequency: 3, svg: 'https://academiq-assets.s3.eu-north-1.amazonaws.com/student.svg' },
];

export default function BubbleMenu() {
    const {user } = useUser();
    const {theme} = useTheme();
    
    const [hovered, setHovered] = useState(null);

    const getSize = (frequency) => {
      return {
        xs: `${40 + frequency * 3}px`, // for extra small screens
        sm: `${50 + frequency * 4}px`, // for small screens
        md: `${60 + frequency * 5}px`, // for medium screens
        lg: `${70 + frequency * 6}px`, // for large screens
        xl: `${80 + frequency * 7}px`, // for extra large screens
      };
    };
    return(
        <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        padding: '20px',
        justifyContent: 'space-around',
        gap: '20px',
        border: '2px solid #ccc',
        borderRadius: '10px',
        backgroundColor: '#f9f9f9',
      }}
    >
      {actions.map((item, index) => (
        <Tooltip title={item.label} key={index}>
          <IconButton
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            sx={{
              width: getSize(item.frequency),
              height: getSize(item.frequency),
              transition: 'width 0.3s, height 0.3s',
              backgroundColor: hovered === index ? 'primary.main' : 'background.paper',
            }}
          >
            <Box
              component="img"
              src={item.svg}
              alt={item.label}
              sx={{
                width: '100%',
                height: '100%',
              }}
            />
          </IconButton>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              transition: 'opacity 0.3s',
            }}
          >
            {item.label}
          </Box>
        </Tooltip>
      ))}
    </Box>
    )

}