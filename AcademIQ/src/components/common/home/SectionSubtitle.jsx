import { Typography } from '@mui/material'

export const SectionSubtitle = ({ title }) => {
    return (
        <Typography variant="h3" component="h3" sx={{ mb: 3 }} align="start" >{title}</Typography>
    )
}