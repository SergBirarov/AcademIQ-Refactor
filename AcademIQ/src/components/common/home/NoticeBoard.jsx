import { Box, Grid2, Typography, Card, CardContent, Button, Stack } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { GetVw, GetVh } from "../../../utils/GeneralHelpers";
import styled from '@emotion/styled';
import { SubSectionTitle, SectionTitle } from "../SectionTitle";
import { NoticeBoardCard } from "../NoticeBoardCard";

const ScrollableBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(4),
  overflowX: 'hidden',
  overflowY: 'hidden', // Prevent vertical overflow
  scrollSnapType: 'x mandatory',
  scrollBehavior: 'smooth',
  maxWidth: '50%', 
  height: 'auto',
  '& > *': {
    scrollSnapAlign: 'revert',
    flexShrink: 0,
    width: '240px', // Set card width
  },
}));


//TODO: להוסיף את הקוד האחורי להוציא את המודעות מהדאטה בייס 
// להוסיף בעמוד של אדמין הוספה של ידיעה חדשה בעמוד NoticesManagement


const newsItems = [
    {
      title: "School Closes",
      date: "Today",
      preview: "The school will close on Friday, 15th of June.",
    },
    {
      title: "School Closes",
      date: "Today",
      preview: "The school will close on Friday, 15th of June.",
    },
    {
      title: "School Closes",
      date: "Today",
      preview: "The school will close on Friday, 15th of June.",
    },{
      title: "School Closes",
      date: "Today",
      preview: "The school will close on Friday, 15th of June.",
    },
    {
      title: "School Closes",
      date: "Today",
      preview: "The school will close on Friday, 15th of June.",
    },{
      title: "School Closes",
      date: "Today",
      preview: "The school will close on Friday, 15th of June.",
    },
    {
      title: "School Closes",
      date: "Today",
      preview: "The school will close on Friday, 15th of June.",
    },
]
export default function NoticeBoard() {

  const [notices, setNotices] = useState([]);
  const scrollRef = useRef(null);


  useEffect(() => {
    const fetchNotices = async () =>{
      try{
      const response = await fetch('http://misha-rn-test.somee.com/api/Notice');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      setNotices(data);
    } catch(error){
      console.error(error);
    }
  }

    fetchNotices();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const newScrollPosition = scrollLeft + clientWidth;
        
        if (newScrollPosition < scrollWidth) {
          scrollRef.current.scrollTo({
            left: newScrollPosition,
            behavior: 'smooth',
          });
        } else {
          scrollRef.current.scrollTo({
            left: 0, // Go back to the first card
            behavior: 'smooth',
          });
        }
      }
    }, 10000); // 30 seconds

    return () => clearInterval(interval);
  }, []);


  return (
    <Stack>
      <Box component={'header'}>
      <SectionTitle title="Your School's Latest News" />
      <SubSectionTitle title="Stay updated with the latest happenings at your school." />
      </Box>
      <Box component={'section'} sx={{ display: 'flex', maxWidth: '100%', overflowX: 'hidden', position: 'relative', justifyContent: 'center' }}>
      <ScrollableBox ref={scrollRef}>
        {notices.map((item, index) => (
          <NoticeBoardCard key={index} title={item.title} date={item.date} preview={item.preview} />
        ))}
      </ScrollableBox>

      </Box>
    </Stack>
  )
}
