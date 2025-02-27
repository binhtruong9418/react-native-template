import React, {PropsWithChildren, useEffect, useRef} from 'react';
import {Animated} from 'react-native';

type RotaterProps = {
    isRotating: boolean;
};
const Rotater: React.FC<PropsWithChildren<RotaterProps>> = (
    {
        isRotating,
        children,
    }) => {
    const sharedValue = useRef(new Animated.Value(0)).current;

    const componentUnmounted = useRef(false);
    const isRotatingRef = useRef(isRotating);
    const toValueRef = useRef(0);
    const rotateFn = useRef(() => {
        Animated.timing(sharedValue, {
            duration: 1000,
            toValue: toValueRef.current,
            useNativeDriver: true,
        }).start(() => {
            if (componentUnmounted.current) {
                return;
            }
            if (isRotatingRef.current) {
                toValueRef.current += 1;
                if (toValueRef.current > 60) {
                    toValueRef.current = 0;
                }
                rotateFn.current();
            }
        });
    });

    useEffect(() => {
        isRotatingRef.current = isRotating;
    }, [isRotating]);

    useEffect(() => {
        return () => {
            componentUnmounted.current = true;
        };
    }, []);

    useEffect(() => {
        if (isRotating) {
            toValueRef.current = 1;
            sharedValue.setValue(0);
            rotateFn.current();
        }
    }, [isRotating, rotateFn, sharedValue]);

    const animatedStyle = {
        transform: [
            {
                rotate: sharedValue.interpolate({
                    inputRange: [0, 60],
                    outputRange: ['0deg', '21600deg'],
                }),
            },
        ],
    };
    return <Animated.View style={animatedStyle}>{children}</Animated.View>;
};

export default Rotater;
