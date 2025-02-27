// import icon_chevron_down from '@/assets/images/icons/chevron_down.png';
import Box from '@/components/ui/Box';
import Image from '@/components/ui/Image';
import Pressable from '@/components/ui/Pressable';
import Text from '@/components/ui/Text';
import {sizeScale} from '@/helpers/scale';
import {useTheme} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import DropDownContent from './DropDownContent';
import {ImageBackground} from 'react-native';
// import dropdown from '@/assets/images/buttons/dropdown.png';
import {DefaultStyle} from "react-native-reanimated/lib/typescript/hook/commonTypes";
import {Asset} from "expo-asset";

type Props = {
    title: string;
    content?: string;
    flex?: number;
    customContent?: any;
    customContentStyle?: DefaultStyle;
    selectedValue?: any;
    textInLine?: boolean;
};
const DropDown: React.FC<Props> = (
    {
        title,
        content,
        flex,
        customContent,
        selectedValue,
        customContentStyle,
        textInLine,
    }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const {colors} = useTheme();
    const animatedValue = useSharedValue(0);

    useEffect(() => {
        animatedValue.value = withTiming(isExpanded ? 1 : 0);
    }, [animatedValue, isExpanded]);
    useEffect(() => {
        setIsExpanded(false);
    }, [selectedValue]);
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    rotate: `${animatedValue.value * 180}deg`,
                },
            ],
        };
    });
    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <Box gap={8} zIndex={9999} flex={flex}>
            <ImageBackground source={require('@/assets/images/dropdown.png')} resizeMode={'stretch'}>
                <Pressable onPress={toggleExpanded}>
                    <Box
                        flexDirection="row"
                        justifyContent="space-between"
                        alignItems="center"
                        // backgroundColor={colors.surface}
                        paddingHorizontal={sizeScale(16)}
                        paddingVertical={sizeScale(12)}>
                        <Text
                            numberOfLines={textInLine ? 1 : undefined}
                            color={colors.gray_03}
                            fontSize={14}
                            fontWeight="600"
                            style={{maxWidth: sizeScale(250)}}>
                            {title}
                        </Text>

                        <Animated.View style={animatedStyle}>
                            <Image source={require('@/assets/images/icons/chevron_down.png')} height={20} width={20}/>
                        </Animated.View>
                    </Box>
                </Pressable>
            </ImageBackground>

            {content ||
                (customContent && (
                    <DropDownContent
                        content={content}
                        isExpanded={isExpanded}
                        customContent={customContent}
                        customContentStyle={customContentStyle}
                    />
                ))}
        </Box>
    );
};

export default DropDown;
