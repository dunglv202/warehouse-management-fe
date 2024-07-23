import { ThemeConfig } from 'antd'

const lightTheme: ThemeConfig = {
  token: {
    colorPrimary: '#1640d6',
    borderRadius: 6,
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', 'Noto Sans', sans-serif",
    'blue-5': '#e6efff',
  },
  components: {
    Input: {
      paddingBlock: 7,
    },
    Button: {
      paddingBlock: 18,
    },
    Layout: {
      headerBg: 'transparent',
      siderBg: 'transparent',
    },
    Menu: {
      itemMarginBlock: 15,
    },
  },
}

export default lightTheme
