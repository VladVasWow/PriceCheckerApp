import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import AdvertisementCarouselItem from './AdvertisementCarouselItem';
import { MAIN_COLOR } from '../tools/consts';
import { postQuery1C } from '../tools/workWith1C';
import { shuffleArray } from '../tools/format';

const { width: screenWidth } = Dimensions.get('window');

const AdvertisementCarousel = ({ connectParams, setError }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    async function getProducts() {
        setLoading(true);
        result = await postQuery1C.getAdvertisements(connectParams);
        if (result.success) {
            console.log("Advertisements =", result.product.length)
            setProducts(shuffleArray(result.product));
        } else {
            setError(result.error);
        }
        setLoading(false);
    }

    useEffect(() => {
        getProducts();
    }, []);

    const handleSnapToItem = (index) => {
        if (index === 0) {
            getProducts();
        }
    };

    if (loading) {
        return <ActivityIndicator style={styles.carouselContainer} size="large" color={MAIN_COLOR} />;
    }

    const renderItem = ({ item }) => (
        <AdvertisementCarouselItem item={item} connectParams={connectParams} />
    );

    return (
        <View style={styles.carouselContainer}>
            <Carousel
                connectParams={connectParams}
                data={products}
                renderItem={renderItem}
                sliderWidth={screenWidth}
                itemWidth={screenWidth * 0.65}
                layout="default"
                loop={false}
                autoplay={true}
                autoplayInterval={4000}
                onSnapToItem={handleSnapToItem}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    carouselContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },


});

export default AdvertisementCarousel;
