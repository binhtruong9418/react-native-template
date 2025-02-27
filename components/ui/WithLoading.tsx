import Rotater from '@/components/Rotater';
import React, {PropsWithChildren} from 'react';
import sync_icon from '@/assets/images/icons/sync.png';
import Image from './Image';
import Box from './Box';
import {sizeScale} from '@/helpers/scale';

type Props = {
    isLoading: boolean;
    textSize?: number;
};

const WithLoading: React.FC<PropsWithChildren<Props>> = (
    {
        isLoading,
        children,
        textSize = 20,
    }) => {
    if (isLoading) {
        return (
            <Box height={sizeScale(textSize)} width={sizeScale(textSize)}>
                <Rotater isRotating>
                    <Image source={sync_icon} height={textSize} width={textSize}/>
                </Rotater>
            </Box>
        );
    }
    return <>{children}</>;
};

export default WithLoading;
