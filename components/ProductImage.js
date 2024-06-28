import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native"
import { postQuery1C } from "../tools/workWith1C";
import { EMPTY_LINK_ID, WHITE_COLOR } from "../tools/consts";

const ProductImage = ({connectParams,  imageID }) => {

    const [imageData, setImageData] = useState(EMPTY_LINK_ID)
    const url = `http://${connectParams.login}:${connectParams.password}@venacentr.1c.local.net:8080/VenaCentr/hs/WebSite/GetPictureByID/c4277f30-620e-11e1-99ee-001e58483cf4/`;
    console.log(url);

    useEffect(() => {
        async function getImage() {
            result = await postQuery1C.getImageByID(connectParams, imageID);
            console.log(imageID)
            setImageData(result.data);
        }
        if (imageID !== EMPTY_LINK_ID) {
            getImage()
        }
    }, [imageID])

    return (
        <View style={styles.container}>
            {imageID === EMPTY_LINK_ID ?
                (<Image
                    source={{ uri: `https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/No_photo_%282067963%29_-_The_Noun_Project.svg/1024px-No_photo_%282067963%29_-_The_Noun_Project.svg.png` }}
                    style={styles.productImage}
                />)
                :
                (<Image
//                    source={{ uri: `https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/No_photo_%282067963%29_-_The_Noun_Project.svg/1024px-No_photo_%282067963%29_-_The_Noun_Project.svg.png` }}
//                    source={{ uri: url }}
                    source={{ uri: `data:image/jpeg;base64,${imageData}` }}
                    style={styles.productImage}
                />)
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WHITE_COLOR,
        alignItems: 'center', 
        justifyContent: 'center',
        marginHorizontal: 30,
        marginBottom: 15,
        marginTop: 10,
        borderRadius: 30,
    },
    productImage: {
        resizeMode: 'contain',
        width: '100%',
        height: '100%',
    },
});

export default ProductImage