import React from 'react';
import Image from './Image';
import Box from './Box';
import Text from './Text';
import {sizeScale} from '@/helpers/scale';
import {useTheme} from '@react-navigation/native';

type Props = {
    name: string;
    uri: string | null;
    size: number;
};

const Avatar: React.FC<Props> = ({uri, size, name}) => {
    const {colors} = useTheme();
    if (!uri) {
        const imageSize = sizeScale(size);
        return (
            <Box
                justifyContent="center"
                alignItems="center"
                height={imageSize}
                borderRadius={imageSize / 2}
                backgroundColor={colors.placeholder}
                width={imageSize}>
                <Text
                    fontWeight="600"
                    color={colors.primary}
                    fontSize={imageSize < 20 ? imageSize * 0.8 : imageSize / 2}>
                    {name[0].toUpperCase()}
                </Text>
            </Box>
        );
    }
    return <Image borderRadius={size / 2} uri={uri} height={size} width={size}/>;
};

export default Avatar;
