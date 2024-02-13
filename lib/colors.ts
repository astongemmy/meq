type Colors = {
  theme: {
    [key: string]: string
  };
  dark: {
    [key: string]: string
  };
};

const colors: Colors = {
  dark: {
    septenary: 'rgb(203 213 225)',
    octonary: 'rgb(226 232 240)',
    quaternary: 'rgb(71 85 105)',
    quinary: 'rgb(100 116 139)',
    senary: 'rgb(148 163 184)',
    secondary: 'rgb(30 41 59)',
    tertiary: 'rgb(51 65 85)',
    primary: 'rgb(15 23 42)',
  },
  theme: {
    quaternary: '#00c47e',
    secondary: '#f9822c',
    tertiary: '#fb1073',
    primary: '#2f42fa',
  },
};

export default colors;
