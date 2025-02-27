import Text from '@/components/ui/Text';
import React, {useEffect} from 'react';
import Animated, {
    Easing,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import {DefaultStyle} from "react-native-reanimated/lib/typescript/hook/commonTypes";

type Props = {
    isExpanded?: boolean;
    content?: string;
    customContent?: any;
    customContentStyle?: DefaultStyle;
};

const DropDownContent: React.FC<Props> = (
    {
        isExpanded,
        content,
        customContent,
        customContentStyle,
    }) => {
    const animatedValue = useSharedValue(0);
    useEffect(() => {
        animatedValue.value = withTiming(isExpanded ? 1 : 0, {
            duration: 600,
            easing: Easing.inOut(Easing.ease),
        });
    }, [animatedValue, isExpanded]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            maxHeight: interpolate(animatedValue.value, [0, 1], [0, 600]),
            opacity: interpolate(animatedValue.value, [0, 0.75, 1], [0, 1, 1]),
            overflow: 'hidden',
            width: '100%',
            zIndex: 999,
        };
    }, []);
    if (!isExpanded) {
        return;
    }
    return (
        <Animated.View style={[animatedStyle, customContentStyle]}>
            {content && (
                <Text fontSize={14} fontWeight="400">
                    {content}
                </Text>
            )}
            {customContent && customContent()}
        </Animated.View>
    );
};

export default DropDownContent;
