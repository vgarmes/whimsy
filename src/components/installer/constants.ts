export const RAW_COLORS = {
  hotPink: {
    '500': '#F50057',
    '700': '#C51162',
  },
  pink: {
    '100': '#FF80AB',
    '300': '#ff416c',
    '500': '#f40041',
    '700': '#cc004a',
  },
  red: {
    '500': '#ff4b2b',
    '700': '#c41d00',
    '900': '#5b0400',
  },
  orange: {
    '500': '#FF9100',
    '700': '#FF6D00',
  },
  yellow: {
    '500': '#FFC400',
    '700': '#FFAB00',
  },
  lime: {
    '500': '#C6FF00',
    '700': '#AEEA00',
  },
  lightGreen: {
    '400': '#a0fc20',
    '500': '#69db0d',
    '700': '#64DD17',
  },
  green: {
    '500': '#00E676',
    '700': '#00C853',
    '900': '#007540',
  },
  teal: {
    '500': '#1ce9d1',
    '700': '#00bfb5',
  },
  blue: {
    '500': '#3f6cff',
    '700': '#304FFE',
    '800': '#143a80',
    '900': '#151942',
  },
  violet: {
    '500': '#D500F9',
    '700': '#AA00FF',
  },
  purple: {
    '500': '#651fff',
    '700': '#4919b7',
  },
  gray: {
    '50': '#f8f8f8',
    '100': '#f2f2f2',
    '200': '#eaeaea',
    '300': '#cccccc',
    '400': '#aaaaaa',
    '500': '#888888',
    '600': '#666666',
    '700': '#444444',
    '800': '#2A2A2A',
    '900': '#111111',
  },
  transparentWhite: {
    '50': 'rgba(255, 255, 255, 0.97)',
    '100': 'rgba(255, 255, 255, 0.95)',
    '200': 'rgba(255, 255, 255, 0.92)',
    '300': 'rgba(255, 255, 255, 0.8)',
    '400': 'rgba(255, 255, 255, 0.66)',
    '500': 'rgba(255, 255, 255, 0.53)',
    '600': 'rgba(255, 255, 255, 0.4)',
    '700': 'rgba(255, 255, 255, 0.27)',
    '800': 'rgba(255, 255, 255, 0.17)',
    '900': 'rgba(255, 255, 255, 0.07)',
  },
  transparentBlack: {
    '50': 'rgba(0, 0, 0, 0.97)',
    '100': 'rgba(0, 0, 0, 0.95)',
    '200': 'rgba(0, 0, 0, 0.92)',
    '300': 'rgba(0, 0, 0, 0.8)',
    '400': 'rgba(0, 0, 0, 0.66)',
    '500': 'rgba(0, 0, 0, 0.53)',
    '600': 'rgba(0, 0, 0, 0.4)',
    '700': 'rgba(0, 0, 0, 0.27)',
    '800': 'rgba(0, 0, 0, 0.17)',
    '900': 'rgba(0, 0, 0, 0.07)',
  },
  transparentBlue: {
    '50': 'rgba(0, 0, 255, 0.97)',
    '100': 'rgba(0, 0, 255, 0.95)',
    '200': 'rgba(0, 0, 255, 0.92)',
    '300': 'rgba(0, 0, 255, 0.8)',
    '400': 'rgba(0, 0, 255, 0.66)',
    '500': 'rgba(0, 0, 255, 0.53)',
    '600': 'rgba(0, 0, 255, 0.4)',
    '700': 'rgba(0, 0, 255, 0.27)',
    '800': 'rgba(0, 0, 255, 0.17)',
    '900': 'rgba(0, 0, 255, 0.07)',
  },
  white: '#FFF',
  black: '#000',
};

export const COLORS = {
  background: RAW_COLORS.gray[50],
  lightBackground: RAW_COLORS.white,

  text: RAW_COLORS.gray[900],
  textOnBackground: RAW_COLORS.white,
  lightText: RAW_COLORS.gray[600],

  link: RAW_COLORS.blue[700],
  lightLink: RAW_COLORS.blue[500],

  success: RAW_COLORS.green[700],
  lightSuccess: RAW_COLORS.green[500],

  error: RAW_COLORS.pink[700],
  lightError: RAW_COLORS.pink[500],

  warning: RAW_COLORS.orange[700],
  lightWarning: RAW_COLORS.orange[500],
};
