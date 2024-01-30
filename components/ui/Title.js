import { Text, StyleSheet, useWindowDimensions, Platform } from "react-native";
import Colors from "../../constants/colors";

function Title({children}) {
    const {width, height} = useWindowDimensions();

    let content = <Text style={styles.title}>{children}</Text>
    console.log('width in title:', width, height)
    if(width > height) {   
        <Text style={[styles.title, { fontSize: width > 400 ? 20 : 24 }]}>{children}</Text>
    }

    return(
        <>
          {content}
        </>
    )
}

export default Title;

const styles= StyleSheet.create({
    screen: {
        flex: 1,
        // padding: deviceWidth > 400 ? 20 : 40,
    },
    title:{
        // fontSize: 24,
        fontFamily: 'open-sans',
        // fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        // borderWidth: Platform.OS === 'ios' ? 2 : 0,
        borderWidth: Platform.select({
            ios: 0,
            android: 2,
        }),
        borderColor: 'white',
        padding: 12,
        maxWidth: '80%',
        // minWidth: ''
    }
})