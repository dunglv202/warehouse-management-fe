import { ThemeConfig } from 'antd'

const lightTheme: ThemeConfig = {
  token: {
    colorPrimary: '#4e74ff',
    borderRadius: 6,
    fontFamily:
      "Nunito, sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans'",
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
      itemMarginBlock: 10,
    },
    Typography: {
      colorLink: '#4e74ff',
      colorPrimary: 'rgba(0, 0, 0, 0.8)',
    },
  },
}

export default lightTheme
