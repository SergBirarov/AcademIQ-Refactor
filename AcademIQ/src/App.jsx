import { ThemeProviderWrapper } from './context/ThemeContext.jsx'
import theme from './theme.js'
import { CssBaseline } from '@mui/material'
import AppRouter from './AppRouter.jsx'

function App() {

  return (
    <ThemeProviderWrapper theme = {theme}>
      <CssBaseline />
      <AppRouter />
    </ThemeProviderWrapper>
  )
}

export default App
