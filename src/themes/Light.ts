import { ThemeConfig } from 'antd'

const lightTheme: ThemeConfig = {
  cssVar: true,
  token: {
    colorPrimary: '#4e74ff',
    colorLink: '#4e74ff',
    borderRadius: 6,
    fontFamily:
      "Nunito, sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans'",
    colorBorder: '#dce2ec',
    colorBorderSecondary: '#e9eff7',
    boxShadowTertiary: '2px 2px 12px -2px #e9eff730',
    colorText: '#4f5d75',
  },
  components: {
    Layout: {
      headerBg: 'transparent',
      siderBg: 'transparent',
    },
    Menu: {
      itemMarginBlock: 10,
    },
    Typography: {
      colorLink: '#4e74ff',
    },
  },
}

export default lightTheme
