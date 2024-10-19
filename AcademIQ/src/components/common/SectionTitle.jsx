import { Typography } from '@mui/material'
import propTypes from 'prop-types';

export const SectionTitle = ({ title }) => {
    return (
        <Typography variant="h2" component="h2" sx={{ mb: 3 }} align="start" >{title}</Typography>
    )
}

export const SubSectionTitle = ({ title }) => {
    return (
        <Typography variant="body1" component="h4" sx={{ mb: 3 }} align="start" >{title}</Typography>
    )
}

SectionTitle.propTypes = {
    title: propTypes.string.isRequired,
}
SubSectionTitle.propTypes = {
    title: propTypes.string.isRequired,
}