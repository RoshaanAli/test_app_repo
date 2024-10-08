import React, { useEffect, useState } from 'react'
import { FlatList, Image, ScrollView, StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { responsiveHeight } from 'react-native-responsive-dimensions'
import { connect } from 'react-redux'
import AppText from '../../components/AppText'
import AppHeading from '../../components/AppHeading'
import SubTitleCard from '../../components/SubTitleCard'
import VideoPreviewItem from '../../components/VideoPreviewItem'
import Btn from '../../components/Btn'
import Loader from '../../components/Loader'
import colors from '../../assets/colors/colors'
import * as videosAct from '../../store/actions/videosAct'

const Home = ({ getVideos, videosRed }) => {
    const [loader, setLoader] = useState(true)
    const navigation = useNavigation()

    useEffect(() => {
        getVideos().then(() => setLoader(false))
    }, [])

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
            <AppHeading text={"Hello, John"} style={{ textAlign: "center", marginVertical: responsiveHeight(1) }} />
            <AppText text={"Please tap below"} style={{ marginVertical: responsiveHeight(1.5) }} />
            <SubTitleCard />
            <View style={styles.mediaContainer}>
                <View style={styles.mediaHeader}>
                    <Image resizeMode='contain' style={styles.playBtnImg} source={require('../../assets/playImg.png')} />
                    <AppHeading text={'Media'} style={{ fontSize: 20 }} />
                </View>
            </View>
            <View style={styles.videosContainer}>
                {loader ? <Loader /> :
                    <FlatList
                        keyExtractor={(item, i) => i.toString()}
                        horizontal={true}
                        data={videosRed}
                        renderItem={(it) => {
                            return <VideoPreviewItem data={it} onPress={() => {
                                navigation.jumpTo('Media'
                                    , {
                                        data: it,
                                        setCurrent: { ...it, index: it.index },
                                    }
                                );
                            }} />
                        }}
                        showsHorizontalScrollIndicator={false}
                    />}
            </View>
            <Btn text="Upload"
                containerStyle={{marginBottom:responsiveHeight(2)}}
                onPress={() => {
                    console.log("upload")
                }} />
        </ScrollView>
    )
}

function mapStateToProps({ videosRed }) {
    return { videosRed }
}

export default connect(mapStateToProps, videosAct)(Home)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        paddingHorizontal: '2%'
    },
    playBtnImg: {
        height: responsiveHeight(3),
        width: responsiveHeight(2),
        marginRight: responsiveHeight(1)
    },
    mediaContainer: {
        marginVertical: responsiveHeight(2),
    },
    mediaHeader: {
        flexDirection: "row"
    },
    videosContainer: {
        height: responsiveHeight(43),
    }
})
