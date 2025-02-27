import {sizeScale} from '@/helpers/scale';
import React, {PropsWithChildren} from 'react';
import Box from '../Box';
import Rotater from '@/components/Rotater';
import Text from '../Text';
import Image from '../Image';

type Props = {
    paddingBottom?: number;
    error: Error | null;
    isLoading: boolean;
    hasNextPage: boolean;
    isEmpty?: boolean;
};

const ListFooterComponent: React.FC<PropsWithChildren<Props>> = (
    {
        paddingBottom = sizeScale(200),
        error,
        isLoading,
        hasNextPage,
        isEmpty,
    }) => {
    if (error) {
        return <Wrapper paddingBottom={paddingBottom}/>;
    }

    if (isLoading || hasNextPage) {
        return (
            <Wrapper paddingBottom={paddingBottom}>
                <Box height={sizeScale(20)} width={sizeScale(20)}>
                    <Rotater isRotating={true}>
                        <Image source={require('../../../assets/images/icons/sync.png')} height={20} width={20}/>
                    </Rotater>
                </Box>
                <Text color={'#fff'} fontSize={sizeScale(12)}>
                    {isLoading
                        ? 'Loading...'
                        : 'Loading more data...'}
                </Text>
            </Wrapper>
        );
    }

    if (!hasNextPage && !isEmpty) {
        return (
            <Wrapper paddingBottom={paddingBottom}>
                <Text color={'#fff'} fontSize={sizeScale(12)}>
                    No more data
                </Text>
            </Wrapper>
        );
    }

    return <Wrapper paddingBottom={paddingBottom}/>;
};

const Wrapper: React.FC<PropsWithChildren<Pick<Props, 'paddingBottom'>>> = (
    {
        children,
        paddingBottom,
    }) => {
    return (
        <Box
            paddingBottom={paddingBottom}
            paddingTop={sizeScale(20)}
            alignItems="center"
            gap={sizeScale(10)}>
            {children}
        </Box>
    );
};

export default ListFooterComponent;
