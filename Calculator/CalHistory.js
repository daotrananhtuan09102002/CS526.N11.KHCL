import { StyleSheet, Text, View, ScrollView, TextInput, Pressable, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, { useState, useEffect } from 'react';
export default function CalHistory(props) {

    let myFoundHistory = []

    const [searchedHistory, setSearchedHistory] = useState([])
    const [searchText, setSearchText] = useState('')
    const [originalHistory, setOriginalHistory] = useState([])


    useEffect(() => {
        setSearchedHistory([...props.myCalHistory])
        setOriginalHistory([...props.myCalHistory])
    }, [props.myCalHistory])


    // Search history function
    const searchHistory = (searchText, fnHistory) => {

        const lengthText = searchText.length
        for (let i = 0; i < fnHistory.length; i++) {
            if (fnHistory[i].in.includes(searchText))
                if (fnHistory[i].out.includes(searchText))
                    myFoundHistory.push({ in: fnHistory[i].in, out: fnHistory[i].out, inFound: 1, outFound: 1 })
                else
                    myFoundHistory.push({ in: fnHistory[i].in, out: fnHistory[i].out, inFound: 1, outFound: 0 })
            else
                if (fnHistory[i].out.includes(searchText))
                    myFoundHistory.push({ in: fnHistory[i].in, out: fnHistory[i].out, inFound: 0, outFound: 1 })
        }

        setSearchedHistory(myFoundHistory)
    }


    const refreshSearchedHistory = () => {
        setSearchedHistory(originalHistory)
        console.log(originalHistory)
        console.log(searchedHistory)

    }



    return (
        <View style={[styles.container,
        { display: props.myDisplayHistory ? 'none' : 'flex' }]}>
            {/* History icon, click to hide history */}
            <Pressable
                onPress={() => { props.mySetDisplayHistory(!props.myDisplayHistory) }}
                style={[styles.icon, { margin: 8, zIndex: 99 }]}>
                {({ pressed }) => (
                    <Icon
                        name="history"
                        size={20}
                        color={pressed ? 'black' : 'rgb(218,139,48)'}
                    />
                )}
            </Pressable>


            {/* View search icon and search input text */}
            <View style={styles.searchContainer}>
                {/* View refresh icon */}
                <Pressable
                    style={styles.icon}
                    onPress={() => { refreshSearchedHistory() }}>
                    {({ pressed }) => (
                        <Icon name="refresh" size={20} color={pressed ? 'black' : 'white'} />
                    )}
                </Pressable>


                {/* View search icon */}
                <Pressable
                    style={styles.icon}
                    onPress={() => { searchHistory(searchText, originalHistory) }}>
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
                        searchedHistory.map(element =>
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
        height: '100%',
        backgroundColor: 'rgb(1,1,1)',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        position: 'absolute'
    },

    scrollContainer: {
        width: '100%',
        height: '100%',
        flex: 1,
    },
    searchContainer: {
        borderColor: '#fff',
        borderWidth: 1,
        backgroundColor: 'rgb(1,1,1)',
        width: '100%',
        height: 50,
        paddingLeft: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        zIndex: 99,
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
    },
    icon: {
        marginRight: 8
    }
})