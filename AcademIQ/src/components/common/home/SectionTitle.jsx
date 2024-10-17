import { Typography } from '@mui/material'

export const SectionTitle = ({ title }) => {
    return (
        <Typography variant="h1" component="h1" sx={{ mb: 3 }} align="start" >{title}</Typography>
    )
}