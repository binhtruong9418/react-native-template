import {StyleSheet, Platform} from 'react-native';
import Image from '@/components/ui/Image';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import Button from "@/components/ui/Button";
import Text from "@/components/ui/Text";
import Avatar from "@/components/ui/Avatar";
import WithLoading from "@/components/ui/WithLoading";
import DropDown from "@/components/ui/DropDown/DropDown";

export default function HomeScreen() {
    return (
        <ParallaxScrollView
            headerBackgroundColor={{light: '#A1CEDC', dark: '#1D3D47'}}
            headerImage={
                <Image
                    source={require('@/assets/images/partial-react-logo.png')}
                    style={styles.reactLogo}
                />
            }>
            <Button>
                <Text>Click me</Text>
            </Button>
            <Text color={'white'}>Home Screen</Text>
            <Image
                source={require('@/assets/images/icons/sync.png')}
            />
            <Avatar name={"Avatar"} size={24} uri={null}/>
            <WithLoading isLoading={true}/>
            <Text color={'white'}>Home Screen</Text>
            {/*<DropDown*/}
            {/*    title={'DropDown'}*/}
            {/*/>*/}
            <Image
                width={100}
                height={100}
            />
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
});
