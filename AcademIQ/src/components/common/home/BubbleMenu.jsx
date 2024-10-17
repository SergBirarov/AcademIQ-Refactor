import { useUser } from "../../../context/UserContext";
import { Box, Tooltip, IconButton } from "@mui/material";
import { useState } from "react";
import { GetVw, GetVh } from "../../../utils/GeneralHelpers";


const svg = ['https://academiq-assets.s3.eu-north-1.amazonaws.com/a+plus.svg',
    'https://academiq-assets.s3.eu-north-1.amazonaws.com/bell.svg',
    'https://academiq-assets.s3.eu-north-1.amazonaws.com/book+with+pencil.svg',
    'https://academiq-assets.s3.eu-north-1.amazonaws.com/calendar+2.svg',
    'https://academiq-assets.s3.eu-north-1.amazonaws.com/gradeenvelope.svg',
    'https://academiq-assets.s3.eu-north-1.amazonaws.com/home.svg',
    'https://academiq-assets.s3.eu-north-1.amazonaws.com/student.svg',];


const actions = [
  { label: 'Grades', frequency: 5, svg: svg[0] },
  { label: 'Schedule', frequency: 8, svg: svg[1] },
  { label: 'Assignments', frequency: 3, svg: svg[3] },
  { label: 'Calendar', frequency: 5, svg: svg[4] },
  { label: 'Performane', frequency: 8, svg: svg[5] },
  { label: 'My Profile', frequency: 3, svg: svg[6] },
];

export default function BubbleMenu() {
    const {user } = useUser();
    
    const [hovered, setHovered] = useState(null);

    const getSize = (frequency) => {
        const baseSize = 40;
        return baseSize + frequency * 5;
    }

    return(
        <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        width: `${GetVw(800)}`,
        height: `${GetVh(300)}`,
        gap: '20px',
        padding: '20px',
        border: '2px solid #ccc',
        borderRadius: '16px',
        backgroundColor: '#f9f9f9',
      }}
    >
      {actions.map((item, index) => (
        <Tooltip title={item.label} key={index}>
          <IconButton
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            sx={{
              width: `${getSize(item.frequency)}px`,
              height: `${getSize(item.frequency)}px`,
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
        </Tooltip>
      ))}
    </Box>
    )

}