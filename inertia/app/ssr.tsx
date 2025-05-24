import ReactDOMServer from 'react-dom/server'
import { createInertiaApp } from '@inertiajs/react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import theme from './theme'

export default function render(page: any) {
  return createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    resolve: (name) => {
      const pages = import.meta.glob('../pages/**/*.tsx', { eager: true })
      return pages[`../pages/${name}.tsx`]
    },
    setup: ({ App, props }) => <ThemeProvider theme={theme}><CssBaseline /><App {...props} /></ThemeProvider>,
  })
}