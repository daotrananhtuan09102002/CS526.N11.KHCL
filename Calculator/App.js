import { StyleSheet, Text, View, Pressable, Dimensions, ScrollView } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import React, { useState, useEffect } from 'react';
import CalHistory from './CalHistory'
export default function App() {

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;



    // Initilize useState and Button
    const [calHistory, setCalHistory] = useState([])
    const [inputText, setInputText] = useState('')
    const [outputText, setOutputText] = useState('')
    const [showBasicBtn, setShowBasicBtn] = useState(true)
    const [textToShow, setTextToShow] = useState('')
    const [isContinuous, setIsContinuous] = useState(true)
    const [isFirst, setIsFirst] = useState(true)
    const [showBlinker, setShowBlinker] = useState(true)
    const [showHistory, setShowHistory] = useState(true)

    // Initialize button 
    const basicButtons = ['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '+', '%']
    const additionButtons = ['sin', 'cos', 'tan', 'log', 'ln', /*pi*/ decodeURI('%CF%80'), '^', /*square root*/decodeURI('%E2%88%9A'), '(', ')']

    // Blinking
    useEffect(() => {
        const interval = setInterval(() => {
            setShowBlinker((showBlinker) => !showBlinker);
        }, 500);
        return () => clearInterval(interval);
    }, []);

    // Handle button function
    const handleInputText = (button) => {
        if (button === '=') {
            let result
            if (isContinuous) {
                try {
                    result = eval(inputText)
                    result = (Math.round(result * 100) / 100).toString()
                }
                catch (e) { }
                finally {
                    if (result === undefined) {
                        setOutputText('Error')
                        result = 'Error'
                    }
                    else
                        setOutputText(result)
                    setIsContinuous(false)
                }
            }
            else {
                try {
                    result = eval(inputText)
                    result = (Math.round(result * 100) / 100).toString()
                }
                catch (e) { }
                finally {
                    if (result === undefined) {
                        setOutputText('Error')
                        result = 'Error'
                    }
                    else
                        setOutputText(result)
                    setIsFirst(true)
                }
            }
            setCalHistory([
                {
                    in: textToShow,
                    out: result,
                    inFound: 0,
                    outFound: 0
                }, ...calHistory])

        }

        else if (button === 'sin' | button === 'cos' | button === 'tan' | button === 'log' | button === 'ln') {
            // First equation (before the '=' button is pressed first time)
            if (isContinuous) {
                setTextToShow(textToShow + `${button}(`)
                setInputText(inputText + `Math.${button}(`)
            }
            else {
                // Check if the pressed button is the first button after the '=' button is pressed
                if (isFirst) {
                    setTextToShow(outputText + `${button}(`)
                    setInputText(outputText + `Math.${button}(`)
                    setIsFirst(false)
                }
                else {
                    setTextToShow(textToShow + `${button}(`)
                    setInputText(inputText + `Math.${button}(`)
                }
            }
        }
        /*pi*/
        else if (button === decodeURI('%CF%80')) {
            setTextToShow(textToShow + decodeURI('%CF%80'))
            setInputText(inputText + '3.141592654')
        }
        else if (button === '^') {
            setTextToShow(textToShow + '^(')
            setInputText(inputText + `**(`)
        }
        // square root
        else if (button === decodeURI('%E2%88%9A')) {
            setTextToShow(textToShow + `${decodeURI('%E2%88%9A')}(`)
            setInputText(inputText + `Math.sqrt(`)
        }
        else if (button === '%') {
            setTextToShow(textToShow + '%')
            setInputText(inputText + '/100')
        }
        else
            if (inputText[inputText.length - 1] === '+' || inputText[inputText.length - 1] === '-' || inputText[inputText.length - 1] === '*' || inputText[inputText.length - 1] === '/') {
                // Prevent operator is next to each other, if true then dont add more character
                if (button === '+' || button === '-' || button === '*' || button === '/') {
                    setInputText(inputText)
                    setTextToShow(textToShow)
                }
                else {
                    // First equation (before the '=' button is pressed first time)

                    if (isContinuous) {
                        setInputText(inputText + button)
                        setTextToShow(textToShow + button)
                    }
                    else {
                        // Check if the pressed button is the first button after the '=' button is pressed

                        if (isFirst) {
                            setInputText(outputText + button)
                            setTextToShow(outputText + button)
                            setOutputText('')
                            setIsFirst(false)
                        }
                        else {
                            setInputText(inputText + button)
                            setTextToShow(textToShow + button)
                        }
                    }
                }
            }
            else {
                // First equation (before the '=' button is pressed first time)

                if (isContinuous) {
                    setInputText(inputText + button)
                    setTextToShow(textToShow + button)
                }
                else {
                    // Check if the pressed button is the first button after the '=' button is pressed
                    if (isFirst) {
                        setInputText(outputText + button)
                        setTextToShow(outputText + button)
                        setOutputText('')
                        setIsFirst(false)
                    }
                    else {
                        setInputText(inputText + button)
                        setTextToShow(textToShow + button)
                    }
                }
            }
    }


    let viewHistory = null
    let viewCalculator = null
    if (windowWidth > windowHeight) {
        viewHistory = (
            <View style={styles.history}>
                <CalHistory
                    myShowIcon={false}
                    myCalHistory={calHistory}
                    myDisplayHistory={false}
                    mySetDisplayHistory={setShowHistory}>
                </CalHistory>
            </View>
        )
        viewCalculator = (
            <View style={[styles.calculator]}>
                <View style={[styles.headerContainerLandscape]}>
                    {/* Input text */}
                    <View style={[{ width: '100%' }]}>
                        <ScrollView
                            horizontal={true}>
                            <Text style={styles.text}>{textToShow}
                                <Text style={[styles.text, { color: showBlinker ? 'rgb(217,129,47)' : 'rgb(1,1,1)' }]}>
                                    |
                                </Text>
                            </Text>
                        </ScrollView>
                    </View>
                    {/* Output text */}
                    <View style={[{ width: '100%' }]}>
                        <ScrollView
                            horizontal={true}>
                            <Text style={styles.outText}>
                                {outputText + ' '}
                            </Text>
                        </ScrollView>
                    </View>

                </View>



                <View style={[styles.bodyContainer]}>

                    {/* Basic Button */}
                    <View
                        style={[styles.Btncontainer,
                        { display: showBasicBtn ? 'flex' : 'none' }]}>
                        {basicButtons.map((button) =>
                            <Pressable style={styles.btnLandscape}
                                onPress={() => handleInputText(button)}>
                                <Text style={styles.textBtn}>{button}</Text>
                            </Pressable>
                        )}
                    </View>

                    {/* Additional Button */}
                    <View
                        style={[styles.Btncontainer,
                        { display: !showBasicBtn ? 'flex' : 'none' }]}>
                        {additionButtons.map((button) =>
                            <Pressable style={styles.btnLandscape}
                                onPress={() => handleInputText(button)}>
                                <Text style={styles.textBtn}>{button}</Text>
                            </Pressable>
                        )}
                    </View>


                    {/* Special button */}
                    <View
                        style={styles.Btncontainer}>
                        {/* Delete character button */}
                        <Pressable
                            style={[styles.btnLandscape]}
                            onPress={() => {
                                setInputText(inputText.slice(0, -1))
                                setTextToShow(textToShow.slice(0, -1))
                            }}
                        >
                            <Text style={styles.textBtnSpec}>DEL</Text>
                        </Pressable>

                        {/* AC Button */}
                        <Pressable
                            style={styles.btnLandscape}
                            onPress={() => {
                                setInputText('')
                                setOutputText('')
                                setTextToShow('')
                                setIsContinuous(true)
                                setIsFirst(true)
                            }}>
                            <Text style={styles.textBtnSpec}>AC</Text>
                        </Pressable>

                        {/* Go to other math button */}
                        <Pressable
                            style={styles.btnLandscape}
                            onPress={() => setShowBasicBtn(!showBasicBtn)}>
                            <Text style={styles.textBtnSpec}>Math</Text>
                        </Pressable>

                        {/* Equal button */}
                        <Pressable
                            style={styles.btnLandscape}
                            onPress={() => handleInputText('=')}>
                            <Text style={styles.textBtnSpec}>=</Text>
                        </Pressable>

                    </View >
                </View>
            </View>
        )

    }
    else {
        viewHistory = (
            <View style={[styles.history, { display: showHistory ? 'none' : 'flex' }]}>
                <CalHistory
                    myShowIcon={true}
                    myCalHistory={calHistory}
                    myDisplayHistory={showHistory}
                    mySetDisplayHistory={setShowHistory}>
                </CalHistory>
            </View>
        )
        viewCalculator = (
            <View style={[styles.calculator, { display: !showHistory ? 'none' : 'flex' }]}>
                <View style={[styles.headerContainer]}>
                    {/* Input text */}
                    <View style={[{ width: '100%' }]}>
                        <ScrollView
                            horizontal={true}>
                            <Text style={styles.text}>{textToShow}
                                <Text style={[styles.text, { color: showBlinker ? 'rgb(217,129,47)' : 'rgb(1,1,1)' }]}>
                                    |
                                </Text>
                            </Text>
                        </ScrollView>
                    </View>
                    {/* Output text */}
                    <View style={[{ width: '100%' }]}>
                        <ScrollView
                            horizontal={true}>
                            <Text style={styles.outText}>
                                {outputText + ' '}
                            </Text>
                        </ScrollView>
                    </View>

                    {/* History icon */}
                    <Pressable
                        onPress={() => { setShowHistory(!showHistory) }}
                        style={styles.icon}>
                        {({ pressed }) => (
                            <Icon
                                name="history"
                                size={20}
                                color={pressed ? 'black' : 'rgb(218,139,48)'}
                            />
                        )}
                    </Pressable>
                </View>



                <View style={[styles.bodyContainer]}>

                    {/* Basic Button */}
                    <View
                        style={[styles.Btncontainer,
                        { display: showBasicBtn ? 'flex' : 'none' }]}>
                        {basicButtons.map((button, index) =>
                            <Pressable style={styles.btn}
                                onPress={() => handleInputText(button)}>
                                <Text style={styles.textBtn}>{button}</Text>
                            </Pressable>
                        )}
                    </View>

                    {/* Additional Button */}
                    <View
                        style={[styles.Btncontainer,
                        { display: !showBasicBtn ? 'flex' : 'none' }]}>
                        {additionButtons.map((button, index) =>
                            <Pressable style={styles.btn}
                                onPress={() => handleInputText(button)}>
                                <Text style={styles.textBtn}>{button}</Text>
                            </Pressable>
                        )}
                    </View>


                    {/* Special button */}
                    <View
                        style={styles.Btncontainer}>
                        {/* Delete character button */}
                        <Pressable
                            style={[styles.btn]}
                            onPress={() => {
                                setInputText(inputText.slice(0, -1))
                                setTextToShow(textToShow.slice(0, -1))
                            }}
                        >
                            <Text style={styles.textBtnSpec}>DEL</Text>
                        </Pressable>

                        {/* AC Button */}
                        <Pressable
                            style={styles.btn}
                            onPress={() => {
                                setInputText('')
                                setOutputText('')
                                setTextToShow('')
                                setIsContinuous(true)
                                setIsFirst(true)
                            }}>
                            <Text style={styles.textBtnSpec}>AC</Text>
                        </Pressable>

                        {/* Go to other math button */}
                        <Pressable
                            style={styles.btn}
                            onPress={() => setShowBasicBtn(!showBasicBtn)}>
                            <Text style={styles.textBtnSpec}>Math</Text>
                        </Pressable>

                        {/* Equal button */}
                        <Pressable
                            style={styles.btn}
                            onPress={() => handleInputText('=')}>
                            <Text style={styles.textBtnSpec}>=</Text>
                        </Pressable>

                    </View >
                </View>
            </View>
        )
    }
    return (
        <View style={[styles.container, { flexDirection: Dimensions.get('window').width > 500 ? 'row' : 'column' }]}>



            {viewCalculator}
            {viewHistory}


        </View >
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgb(1,1,1)',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    history: {
        flex: 1,
        backgroundColor: 'blue',
        height: '100%',
        width: '100%'
    },
    calculator: {
        flex: 1,
        backgroundColor: 'rgb(1,1,1)',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
    },
    headerContainer: {
        margin: 8,
        paddingHorizontal: 16,
        borderColor: 'white',
        borderRadius: 15,
        width: '95%',
        height: '45%',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'flex-end',
        position: 'relative',
    },

    headerContainerLandscape: {
        margin: 8,
        paddingHorizontal: 16,
        borderColor: 'white',
        borderRadius: 15,
        width: '95%',
        height: '25%',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'flex-end',
        position: 'relative',
    },
    bodyContainer: {
        backgroundColor: 'rgb(1,1,1)',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        width: '100%'
    },
    Btncontainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        flexDirection: 'row',
        width: '100%'
    },
    btn: {
        margin: 8,
        backgroundColor: 'rgb(26,26,26)',
        width: '20%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    btnLandscape: {
        margin: 8,
        backgroundColor: 'rgb(26,26,26)',
        width: '20%',
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    textBtn: {
        color: 'white',
        fontSize: 25,
    },
    textBtnSpec: {
        color: 'rgb(218,139,48)',
        fontSize: 25,
    },
    text: {
        color: 'white',
        fontSize: 35,
    },
    outText: {
        color: 'white',
        fontSize: 25,
    },
    icon: {
        color: 'rgb(218,139,48)',
        position: 'absolute',
        bottom: 10,
        left: 10,
    }
});
