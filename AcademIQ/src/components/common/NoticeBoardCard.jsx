import {  Button, Card, CardActionArea, CardContent, CardHeader, Typography } from "@mui/material";
import PropTypes from 'prop-types';
import theme from "../../theme";
import { lighten } from '@mui/material/styles';



export const NoticeBoardCard = ({ title, date, preview }) => {
    return (
        <Card sx={{ minWidth: 200, height: '100%', maxWidth:200, backgroundColor: lighten(theme.palette.secondary.main, 0.6) }}>
            <CardHeader
                title={title}
                subheader={date}
            />
            <CardContent>
                <Typography variant="body2" sx={{ mb: 2 }}>
                    {preview}
                </Typography>
            </CardContent>
            <CardActionArea sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                <Button size="small"
                 sx={{ width: '100%',
                  mb: 0, 
                  borderTopRightRadius: 0, 
                  borderTopLeftRadius: 0, 
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.secondary.contrastText
                   }} >Read More</Button>
            </CardActionArea>
        </Card>
    )
}

NoticeBoardCard.propTypes = {
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
};