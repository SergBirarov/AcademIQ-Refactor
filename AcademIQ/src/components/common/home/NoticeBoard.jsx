import { Box, Grid2, Typography, Card, CardContent, Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { GetVw, GetVh } from "../../../utils/GeneralHelpers";
import styled from '@emotion/styled';
import { SubSectionTitle, SectionTitle } from "../SectionTitle";
import { NoticeBoardCard } from "../NoticeBoardCard";

const ScrollableBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  overflowX: 'auto',
  overflowY: 'hidden', // Prevent vertical overflow
  scrollSnapType: 'x mandatory',
  scrollBehavior: 'smooth',
  maxWidth: '100%', 
  height: 'auto',
  '& > *': {
    scrollSnapAlign: 'start',
    flexShrink: 0,
    width: '300px', // Set card width
  },
}));


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
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, []);


  return (
    <Box sx={{ padding: 4, width: '100%', display:'block' }}>
      <SectionTitle title="Your School's Latest News" />
      <SubSectionTitle title="Stay updated with the latest happenings at your school." />
      
      <ScrollableBox ref={scrollRef}>
        {notices.map((item, index) => (
          <NoticeBoardCard key={index} title={item.Title} date={item.PublishDate} preview={item.Preview} />
        ))}
      </ScrollableBox>
      {/* <Grid2 container spacing={4}>
        <NoticeBoardCard title="School Closes" date="Today" preview="The school will close on Friday, 15th of June." />
        {newsItems.map((item, index) => (
          <Grid2 item xs={12} sm={6} md={2} key={index}>
            <NoticeBoardCard title={item.title} date={item.date} preview={item.preview} />
          </Grid2>
        ))}
      </Grid2> */}
    </Box>
  );
}
