import { DarkTheme } from '@react-navigation/native';

const darkTheme = {
    ...DarkTheme,
    dark: true,
    colors: {
        ...DarkTheme.colors,
        background: '#141416',
        surface: '#1E1F24',
        surface2: '#27282d',
        surface3: '#2b2f33',
        card: '#000017',
        primary: '#6BFF7E',

        primary_light: '#EDFB8A',
        text: 'white',
        white_text: 'white',
        placeholder: '#797F8B',

        // figma design colors
        neutral_01: '#ffffff',
        neutral_02: '#FCFCFD',
        neutral_03: '#272C34',
        neutral_04: '#777E90',
        neutral_05: '#B1B5C3',
        neutral_06: '#7B818E',
        neutral_08: '#141416',
        neutral_09: '#383D4D',
        neutral_10: '#777E90',

        //onboarding
        onboarding_text: '#ffff',
        onboarding_button: '#A6AE48',

        //alpha
        alpha_1: 'rgba(255, 255, 255, 0.1)',

        gray_01: '#DCDDDF',
        gray_02: '#797F8B',
        gray_03: '#DCDDDF',
        gray_07_L: '#A0A4AB',
        gray_07: '#292B32',
        gray_08: '#1E1F24',
        gray_09: '#646773',
        gray_10: '#50535E',
        gray_11: '#292B32',

        //dash
        dash: '#333642',
        common_border: '#333642',

        //blue
        blue_07: '#0777ED',

        //green
        green_06: '#2BA176',
        primary_1: '#A6AE48',
        primary_2: '#959d39',
        primary_3: '#868e2b',
        primary_4: '#798020',
        primary_5: '#6b7318',
        primary_6: '#5b6210',

        error: '#FFBE5C',
        success: '#17B26A',
    },
} as const;

export default darkTheme;
