import {sizeScale} from "@/helpers/scale";
import {useTheme} from '@react-navigation/native';
import React, {PropsWithChildren, useCallback, useMemo} from 'react';
import {
    ActivityIndicator,
    Pressable,
    PressableProps,
    StyleSheet,
    ViewStyle,
} from 'react-native';
import Text from './Text';
import Animated, {
    cancelAnimation,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type Props = {
    variant?: 'primary' | 'secondary';
    size?: 'sm' | 'md' | 'lg';
    icon?: React.ReactNode;
    fullWidth?: boolean;
    flex?: number;
    outlined?: boolean;
    rounded?: boolean;
    isLoading?: boolean;
    disabled?: boolean;
} & PressableProps & {};

const Button: React.FC<PropsWithChildren<Props>> = (
    {
        variant = 'primary',
        size = 'md',
        icon,
        children,
        fullWidth,
        flex,
        isLoading,
        disabled,
        style,
        ...props
    }) => {
    const {colors} = useTheme();
    const animated = useSharedValue(0);
    const isRounded = 'rounded' in props && props.rounded;
    const isOutlined = 'outlined' in props && props.outlined;

    const onPressIn = useCallback(() => {
        cancelAnimation(animated);
        animated.value = withTiming(1, {
            duration: 200,
        });
    }, [animated]);

    const onPressOut = useCallback(() => {
        cancelAnimation(animated);
        animated.value = withTiming(0, {
            duration: 200,
        });
    }, [animated]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    scale: interpolate(animated.value, [0, 1], [1, 0.99]),
                },
            ],
            opacity: interpolate(animated.value, [0, 1], [1, 0.9]),
        };
    }, [animated]);

    const buttonStyle = useMemo(() => {
        const _buttonColorsStyles = {
            primary: {
                backgroundColor: isOutlined ? 'transparent' : colors.primary,
            },
            secondary: {
                backgroundColor: colors.surface,
            },
        } as const;
        const _buttonSizeStyles = {
            sm: {
                paddingVertical: sizeScale(8),
                gap: sizeScale(4),
            },
            md: {
                paddingVertical: sizeScale(12),
                gap: sizeScale(6),
            },
            lg: {
                paddingVertical: sizeScale(16),
                gap: sizeScale(8),
            },
        } as const;

        return StyleSheet.flatten([
            baseStyles.btnBase,
            isRounded && baseStyles.btnRounded,
            isOutlined && baseStyles.btnOutlined,
            isOutlined && {
                borderWidth: sizeScale(1.5),
                borderColor: colors.primary,
            },
            _buttonColorsStyles[variant],
            _buttonSizeStyles[size],
            fullWidth && {width: '100%'},
            flex && {flex},
            style,
        ]) as ViewStyle;
    }, [
        colors.primary,
        colors.surface,
        flex,
        fullWidth,
        isOutlined,
        isRounded,
        size,
        style,
        variant,
    ]);

    const textStyle = useMemo(() => {
        const _textColorsStyles = {
            primary: {
                color: isOutlined ? colors.primary : colors.gray_03,
            },
            secondary: {
                color: colors.gray_03,
            },
        } as const;

        const _textSizeStyles = {
            sm: {
                fontSize: 12,
            },
            md: {
                fontSize: 14,
                fontWeight: '600',
            },
            lg: {
                fontSize: 16,
                lineHeight: 24,
                fontWeight: '700',
            },
        } as const;

        return StyleSheet.flatten([
            _textColorsStyles[variant],
            _textSizeStyles[size],
        ]);
    }, [colors.gray_03, colors.primary, isOutlined, size, variant]);

    return (
        <AnimatedPressable
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            disabled={isLoading || disabled}
            {...props}
            style={[buttonStyle, animatedStyle]}>
            {isLoading ? (
                <ActivityIndicator
                    color={'color' in textStyle ? textStyle.color : undefined}
                    size="small"
                />
            ) : (
                icon
            )}
            <Text
                style={textStyle}
                color={colors.neutral_01}
                fontSize={16}
                fontWeight="700">
                {children}
            </Text>
        </AnimatedPressable>
    );
};

const baseStyles = StyleSheet.create({
    btnBase: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: sizeScale(8),
        paddingHorizontal: sizeScale(16),
    },
    btnOutlined: {},
    btnRounded: {
        borderRadius: 999,
    },
    btnSizeSm: {},
    btnSizeMd: {},
    btnSizeLg: {},
});

export default Button;
