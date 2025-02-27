import React, { useEffect } from 'react';
import Animated, {
    cancelAnimation,
    useAnimatedProps,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import Svg, { Rect, Defs, LinearGradient, Stop } from 'react-native-svg';

const AnimatedRect = Animated.createAnimatedComponent(Rect);

type Props = {
    progress: number;
    opacity?: number;
};

const ProgressBar: React.FC<Props> = ({ progress, opacity = 1 }) => {
    const sharedValue = useSharedValue(0);

    useEffect(() => {
        const roundedProgress = Math.round(progress);
        if (roundedProgress === 0) {
            sharedValue.value = 0;
        } else {
            sharedValue.value = withTiming(roundedProgress, {
                duration: 1000,
            });
            return () => {
                sharedValue.value = roundedProgress;
                cancelAnimation(sharedValue);
            };
        }
    }, [progress, sharedValue]);

    const animatedProps = useAnimatedProps(() => {
        return {
            width: `${sharedValue.value}%`,
        };
    }, []);

    return (
        <Svg width={254} height={4} viewBox="0 0 254 4" fill="none">
            <Rect
                width={254}
                height={4}
                rx={2}
                fill="#777E91"
                fillOpacity={opacity * 0.18}
            />
            <AnimatedRect
                height={4}
                rx={2}
                fill="url(#paint0_linear_13_509)"
                fillOpacity={opacity}
                animatedProps={animatedProps}
            />
            <Defs>
                <LinearGradient
                    id="paint0_linear_13_509"
                    x1={176}
                    y1={1.99994}
                    x2={8.63141e-7}
                    y2={2.00002}
                    gradientUnits="userSpaceOnUse">
                    <Stop stopColor="#6BFF7E" />
                    <Stop offset={1} stopColor="#EDFB8A" />
                </LinearGradient>
            </Defs>
        </Svg>
    );
};

export default ProgressBar;
