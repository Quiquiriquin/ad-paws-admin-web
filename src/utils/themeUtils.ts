import type { ThemeConfig } from "antd";

export const casaPekGreenTheme: ThemeConfig = {
  token: {
    colorPrimary: "#4B9460",
    colorBgBase: "#FDFBF6",
    colorTextBase: "#3C2E2A",
    colorTextSecondary: "#6B534D",
    colorSuccess: "#5BBE7A",
    colorError: "#D9625F",
    colorWarning: "#F2C94C",
    colorBorder: "#DCD4CD",
    borderRadius: 8,
    fontFamily: "Montserrat, sans-serif",
    fontWeightStrong: 500,
  },
  components: {
    Button: {
      colorPrimary: "#4B9460",
      colorPrimaryHover: "#3E7A50",
      fontWeight: 500,
      borderRadiusLG: 4,
    },
    Input: {
      colorBgContainer: "#FAFAF7",
      colorTextPlaceholder: "#909090",
      paddingBlock: 16,
    },
    Select: {
      colorBgContainer: "#FAFAF7",
      colorTextPlaceholder: "#909090",
      padding: 16,
    },
    Card: {
      colorBgContainer: "#FDFBF6",
    },
    Layout: {
      colorBgHeader: "#4B9460",
      colorBgBody: "#FDFBF6",
    },
    Typography: {
      colorText: "#3C2E2A",
      fontFamily: "Montserrat, sans-serif",
    },
  },
};
