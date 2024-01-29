import { Text, StyleSheet } from "react-native";
import Colors from "../../constants/colors";

function Title({children}) {
    return(
        <Text style={styles.title}>{children}</Text>
    )
}

export default Title;

const styles= StyleSheet.create({
    screen: {
        flex: 1,
        padding: 40,
    },
    title:{
        fontSize: 24,
        fontFamily: 'open-sans',
        // fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        borderWidth: 2,
        borderColor: 'white',
        padding: 12,
        maxWidth: '80%',
        // minWidth: ''
    }
})