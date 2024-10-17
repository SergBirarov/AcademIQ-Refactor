import { Typography } from '@mui/material'

export const SectionTitle = ({ title }) => {
    return (
        <Typography variant="h2" component="h2" sx={{ mb: 3 }} align="start" >{title}</Typography>
    )
}