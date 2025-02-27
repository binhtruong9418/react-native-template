import {sizeScale} from '@/helpers/scale';
import React, {useMemo} from 'react';
import {
    TextInput as RNTextInput,
    StyleSheet,
    TextInputProps,
    TextStyle,
} from 'react-native';

type Props = {
    backgroundColor?: TextStyle['backgroundColor'];
    color?: string;
    fontSize?: TextStyle['fontSize'];
    fontWeight?: TextStyle['fontWeight'];
    borderColor?: TextStyle['borderColor'];
} & TextInputProps;

const TextInput: React.FC<Props> = (
    {
        backgroundColor,
        color,
        fontSize,
        fontWeight,
        borderColor,
        style: overrideStyle,
        ...props
    }) => {
    const style = useMemo<TextStyle>(() => {
        return StyleSheet.flatten([
            fontSize && {
                fontSize: typeof fontSize === 'number' ? sizeScale(fontSize) : fontSize,
            },
            fontWeight && {fontWeight},
            backgroundColor && {backgroundColor},
            color && {color},
            borderColor && {borderColor},
            overrideStyle,
        ]) as TextStyle;
    }, [
        backgroundColor,
        color,
        fontSize,
        fontWeight,
        overrideStyle,
        borderColor,
    ]);

    return <RNTextInput style={style} {...props} />;
};

export default TextInput;
