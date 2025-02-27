import { DefaultTheme } from '@react-navigation/native';

const lightTheme = {
    ...DefaultTheme,
    dark: false,
    colors: {
        ...DefaultTheme.colors,
        background: '#FFFFFF',
        surface: '#F2F2F3',
        card: '#FFFFFF',
        primary: '#A6AE48',
        primary_light: '#E5EB92',
        text: 'black',
        placeholder: '#797F8B',

        // figma design colors
        neutral_01: '#000000',
        neutral_03: '#E8EAED',
        neutral_04: '#C6CAD2',
        neutral_05: '#9CA1AB',
        neutral_06: '#7B818E',
        neutral_09: '#383D4D',

        //onboarding
        onboarding_text: '#A6AE48',
        onboarding_button: '#F3F4F6',

        //alpha
        alpha_1: 'rgba(0, 0, 0, 0.04)',

        gray_01: '#292B32',
        gray_03: '#F2F2F3',
        gray_07: '#292B32',
        gray_08: '#F2F2F3',
        gray_09: '#797F8B',

        //dash
        dash: '#646773',

        blue_07: '#0777ED',

        error: '#F04438',
        success: '#17B26A',
    },
} as const;

export default lightTheme;