import React, {
    ForwardRefRenderFunction,
    PropsWithChildren,
    forwardRef,
    useMemo,
} from 'react';
import {
    ActivityIndicator,
    Text as RNText,
    StyleSheet,
    TextProps,
    TextStyle,
} from 'react-native';
import Box from './Box';
import {sizeScale} from "@/helpers/scale";

type Props = {
    fontSize?: number;
    lineHeight?: number;
    fontWeight?: TextStyle['fontWeight'];
    color?: TextStyle['color'];
    fontFamily?: TextStyle['fontFamily'];
    style?: TextStyle;
    textAlign?: TextStyle['textAlign'];
    numberOfLines?: number;
    textTransform?: TextStyle['textTransform'];
    opacity?: TextStyle['opacity'];
} & TextProps &
    (
        | {
        isLoading: boolean;
        placeholderWidth: number;
    }
        | {}
        );

/**
 * Text component already scaled, don't need to scale again
 */

const Text: ForwardRefRenderFunction<RNText, PropsWithChildren<Props>> = (
    {
        fontSize = 14,
        lineHeight,
        fontWeight,
        children,
        color,
        fontFamily,
        opacity,
        textAlign,
        style: overrideStyle,
        textTransform,
        ...textProps
    },
    ref,
) => {
    const style = useMemo<TextStyle>(() => {
        return StyleSheet.flatten([
            fontSize && {fontSize: sizeScale(fontSize)},
            lineHeight && {lineHeight: sizeScale(lineHeight)},
            fontWeight && {fontWeight},
            color && {color},
            {opacity},
            {fontFamily: fontFamily || 'Inter'},
            textAlign && {textAlign},
            overrideStyle,
            textTransform && {textTransform},
        ]) as TextStyle;
    }, [
        color,
        fontFamily,
        fontSize,
        fontWeight,
        lineHeight,
        opacity,
        overrideStyle,
        textAlign,
        textTransform,
    ]);

    if ('isLoading' in textProps && textProps.isLoading) {
        return (
            <AnimatedTextPlaceholder
                height={sizeScale(lineHeight || fontSize)}
                color={color}
                width={sizeScale(textProps.placeholderWidth)}
            />
        );
    }

    return (
        <RNText ref={ref} style={style} {...textProps}>
            {children}
        </RNText>
    );
};

type AnimatedWithOpacityProps = {
    height: number;
    width: number;
    color?: TextStyle['color'];
};
const AnimatedTextPlaceholder: React.FC<AnimatedWithOpacityProps> = (
    {
        height,
        width,
    }) => {
    return (
        <Box
            height={height}
            width={width}
            overflow="hidden"
            justifyContent="center">
            <ActivityIndicator size="small" color="white" animating/>
        </Box>
    );
};

export default forwardRef<RNText, PropsWithChildren<Props>>(Text);
