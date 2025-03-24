// theme/themeConfig.ts
import { Button, ThemeConfig } from 'antd';

const theme = {

  token: {
    screenXS: 480,
    screenXSMax: 540,
    screenXSMin: 480,

    colorError: "#de3040",
    colorSuccess: "#3074de",

  },

 
  components: {
    
    Grid: {
      algorithm: true
    },
    Collapse: {
      "motionDurationMid": "0.3s",
      "motionDurationSlow": "0.4s"
    },
    Upload: {


      "fontSizeLG": 19,
      "controlHeightLG": 49,
      "fontHeight": 25,


    },
    
    Button: {
      colorPrimary: '#2d3542',
      colorPrimaryHover: '#414b5a',
      colorPrimaryActive: '#20262f',
      primaryShadow: "",


      defaultBg: '#ffffff',

      defaultHoverBg: '#eeeeee',

      defaultHoverBorder: '#fff',
      colorBorderHover: "#fff",
      colorBorder: "#d1cece",
      defaultActiveBorderColor: "#f5f5f5f",
      defaultActiveColor: "#f5f5f5f",
      paddingInlineLG: 16

    },
    Typography: {
      fontSizeHeading2: 23,
      fontSizeHeading3: 18,
      fontSizeHeading4: 16,
      fontSize:14,
  colorLink: "rgb(52,121,217)"

    },
    Spin: {
      "colorPrimary": "rgb(37,37,37)",
      "dotSize": 16
    },

    Skeleton: {
      controlHeightSM: 16
    }
  }
}


export default theme;
