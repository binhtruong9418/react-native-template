import React, {PropsWithChildren, useMemo} from 'react';
import {StyleSheet, ViewStyle, Pressable as RNPressable} from 'react-native';
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';

type Props = ViewStyle & {
    onPress?: () => void;
    scaleTo?: number;
    overridedStyle?: ViewStyle;
    disabled?: boolean;
};

const AnimatedPressable = Animated.createAnimatedComponent(RNPressable);

const Pressable: React.FC<PropsWithChildren<Props>> = (
    {
        children,
        onPress,
        scaleTo = 1.01,
        overridedStyle,
        disabled = false,
        ...styleProps
    }) => {
    const animatedValue = useSharedValue(0);

    const handlePressIn = () => {
        animatedValue.value = withSpring(1, {
            duration: 200,
        });
    };

    const handlePressOut = () => {
        animatedValue.value = withSpring(0, {
            duration: 200,
        });
    };

    const style = useMemo(() => {
        return StyleSheet.flatten([styleProps, overridedStyle]);
    }, [overridedStyle, styleProps]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {scale: interpolate(animatedValue.value, [0, 1], [1, scaleTo])},
            ],
            opacity: interpolate(animatedValue.value, [0, 1], [1, 0.8]),
        };
    }, []);

    const pressableStyle = useMemo(() => {
        return [style, animatedStyle];
    }, [style, animatedStyle]);

    return (
        <AnimatedPressable
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={onPress}
            disabled={disabled}
            style={pressableStyle}>
            {children}
        </AnimatedPressable>
    );
};

export default Pressable;
