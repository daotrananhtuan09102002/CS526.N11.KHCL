import { StyleSheet, Text, View, ScrollView, TextInput, Pressable, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, { useState, useEffect } from 'react';
export default function CalHistory(props) {

    let myFoundHistory = []

    const [compHistory, setCompHistory] = useState([])
    const [searchText, setSearchText] = useState('')


    useEffect(() => {
        setCompHistory([...props.myCalHistory])
    }, [props.myCalHistory])


    // Search history function
    const searchHistory = (searchText, fnHistory) => {

        const lengthText = searchText.length
        for (let i = 0; i < fnHistory.length; i++) {
            if (fnHistory[i].in.includes(searchText))
                if (fnHistory[i].out.includes(searchText))
                    myFoundHistory.push({ in: fnHistory[i].in, out: fnHistory[i].out, inFound: true, outFound: true })
                else
                    myFoundHistory.push({ in: fnHistory[i].in, out: fnHistory[i].out, inFound: true, outFound: false })
            else
                if (fnHistory[i].out.includes(searchText))
                    myFoundHistory.push({ in: fnHistory[i].in, out: fnHistory[i].out, inFound: false, outFound: true })
                else
                    myFoundHistory.push({ in: fnHistory[i].in, out: fnHistory[i].out, inFound: false, outFound: false })
        }

        setCompHistory(myFoundHistory)
    }




    return (
        <View style={[styles.container,
        { display: props.myDisplayHistory ? 'none' : 'flex' }]}>

            {/* View search icon and search input text */}
            <View style={styles.searchContainer}>
                {/* View search icon */}
                <Pressable
                    onPress={() => { searchHistory(searchText, compHistory) }}>
                    {({ pressed }) => (
                        <Icon name="search" size={20} color={pressed ? 'black' : 'white'} />
                    )}
                </Pressable>

                {/* View input text */}
                <TextInput
                    style={styles.search}
                    placeholder="Please enter text..."
                    onChangeText={inputText => setSearchText(inputText)}>
                </TextInput>


            </View>


            {/* View History */}
            <View style={styles.scrollContainer}>
                <ScrollView>
                    {
                        compHistory.map(element =>
                            <View style={styles.box}>
                                <Text style={[styles.inputText,
                                {
                                    backgroundColor: element.inFound ? 'rgb(217,129,47)' : 'none',
                                    color: element.inFound ? 'black' : 'rgba(128,128,128,0.5)'
                                }]}>
                                    {element.in}</Text>



                                <Text style={[styles.outputText,
                                {
                                    backgroundColor: element.outFound ? 'rgb(217,129,47)' : 'none',
                                    color: element.outFound ? 'black' : 'white'
                                }]}>
                                    {'=' + element.out}</Text>
                            </View>
                        )

                    }
                </ScrollView >
            </View>



        </View >
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '67%',
        backgroundColor: 'rgb(1,1,1)',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        position: 'absolute',
        top: 220
    },

    scrollContainer: {
        marginTop: 50,
        width: '100%',
        height: Dimensions.get('screen').height,
        flex: 1,
    },
    searchContainer: {
        borderColor: '#fff',
        borderWidth: 1,
        backgroundColor: 'rgb(1,1,1)',
        width: '100%', // relate to browser
        height: 50,
        paddingLeft: 32,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        position: 'absolute',
        top: 0,
        zIndex: 10,
    },
    search: {
        marginLeft: 16,
        fontSize: 15,
        opacity: 0.5,
        color: '#fff',
        width: '100%'
    },
    inputText: {
        color: 'rgb(119,119,119)',
        fontSize: 20,
    },
    outputText: {
        color: 'white',
        fontSize: 30,
    },
    box: {
        borderBottomColor: 'rgba(128,128,128,0.5)',
        borderBottomWidth: 2,
        marginRight: 8,
        marginBottom: 8,
        width: '100%',
        height: 80,
    }
})