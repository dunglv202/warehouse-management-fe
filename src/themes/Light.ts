import { ThemeConfig } from 'antd'

const lightTheme: ThemeConfig = {
  token: {
    colorPrimary: '#4e74ff',
    borderRadius: 6,
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', 'Noto Sans', sans-serif",
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
    Typography: {
      colorLink: '#4e74ff',
    },
  },
}

export default lightTheme
