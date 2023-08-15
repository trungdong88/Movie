import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import {
  View, 
  TouchableOpacity, 
  Image, 
  SafeAreaView, 
  StyleSheet, 
  ScrollView, 
  ActivityIndicator, 
  ImageBackground, 
  Dimensions,
  WebView,
  Button
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { Text } from '@rneui/themed';
import FunctionButton from 'main/Components/functionButton';
import useSWR from 'swr'
import { mvdbkey } from 'main/Config/env';
import CastCom from 'main/Components/CastCom/CastCom';
import InformationCom from 'main/Components/InformationCom/InformationCom';
import MediaCom from 'main/Components/MediaCom';
import RecommendationCom from 'main/Components/RecommendationCom';
import { axiosInstance } from 'main/Api/axiosInstance'; 
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView
} from '@gorhom/bottom-sheet';
import CustomBackground from '../DetailSpace/ModalBackGround';
import Space from 'main/Model/Realm/Space';
import LineItem from 'main/Model/Realm/LineItem';
import { SyncedRealmContext } from 'main/Model/Realm/RealmConfig';
import { findIconById } from 'main/Utils/SpaceUtil';
import AddSpace from '../AddSpace';
import AddTag from '../AddTag';
import TagLine from 'main/Components/TagLine';
import Genres from 'main/Model/Realm/Genres';
import CalendarComp from 'main/Components/Calendar';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';
import Video from 'react-native-video';
import YouTube from 'react-native-youtube';
import YoutubePlayer from "react-native-youtube-iframe";

const WidthScreen = Dimensions.get("screen").width
const DetailLineItem = (props) => {
  const [isModalAddSpace, setIsModalAddSpace] = useState(false)
  const [isModalAddTag, setIsModalAddTag] = useState(false)
  const [selectedDay, setSelectedDay] = useState('')
  const { movieID, media_type } = props.route.params;
  const API_URL = "https://api.themoviedb.org/3/" + media_type + "/"
  const Trailer_URL = "https://api.themoviedb.org/3/movie/" + movieID + "/videos"
  const credits = "/credits"
  const image = "/images"
  const recommendation = "/recommendations"
  const fetchMovieDetail = async () => {
    const { data } = await axiosInstance.get(API_URL + movieID, {
      params: {
        api_key: mvdbkey,
      }
    })
    return data
  }
  const { data: movieListdata, isLoading: movieListLoading, error: movieListError } = useSWR(API_URL + movieID, fetchMovieDetail)
  const fetchTrailer = async () => {
    const { data } = await axiosInstance.get(Trailer_URL, {
      params: {
        api_key: mvdbkey,
      }
    })
    return data
  }
  const { data: trailerUrl, isLoading: trailerLoading, error: trailerError } = useSWR(Trailer_URL + movieID , fetchTrailer)
  const fetchCastDetailByID = async () => {

    const { data: { cast } } = await axiosInstance.get(API_URL + movieID + credits, {
      params: {
        api_key: mvdbkey,
      }
    })
    return cast
  }
  const { data: castMoviedata, isLoading: castMovieLoading, error: castMovieError } = useSWR(API_URL + movieID + credits, fetchCastDetailByID)
  const fetchBackDropslByID = async () => {
    const { data: { backdrops } } = await axiosInstance.get(API_URL + movieID + image, {
      params: {
        api_key: mvdbkey,
      }
    })
    return backdrops
  }
  const { data: backdropsMoviedata, isLoading: backdropsMovieLoading, error: backdropsMovieError } = useSWR(API_URL + movieID + image, fetchBackDropslByID)
  const fetchRecommendByID = async () => {
    const { data: { results } } = await axiosInstance.get(API_URL + movieID + recommendation, {
      params: {
        api_key: mvdbkey,
      }
    })
    return results
  }
  const { data: RecommendMoviedata, isLoading: RecommendMovieLoading, error: RecommendMovieError } = useSWR(API_URL + movieID + recommendation, fetchRecommendByID)
  let genres = ""

  //BottomSheetModalSave
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => [280], []);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
  }, []);
  const renderBackdrop = useCallback(
    backdropProps => (
      <BottomSheetBackdrop
        {...backdropProps}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    [],
  );
  //BottomSheetModalTag
  const bottomSheetModalTagRef = useRef(null);
  const handlePresentModalTagPress = useCallback(() => {
    bottomSheetModalTagRef.current?.present();
  }, []);
  //BottomSheetModalcalendar
  const bottomSheetModalCalendarRef = useRef(null);
  const handlePresentModalCalendarPress = useCallback(() => {
    bottomSheetModalCalendarRef.current?.present();
  }, []);
  const snapPointsCalendar = useMemo(() => [494], []);
  const { useRealm, useQuery, useObject } = SyncedRealmContext;
  const realm = useRealm()
  const lineItem = useObject('LineItem', movieID.toString());
  const spaceItemRef = useQuery('Space')
  const SpaceItems = useMemo(() => Array.from(spaceItemRef), [spaceItemRef]);
  const tagItemRef = useQuery('Tag')
  const TagItems = useMemo(() => Array.from(tagItemRef), [tagItemRef]);
  const existInSpace = lineItem?.linkingObjects('Space', 'lineItems');
  const [playing, setPlaying] = useState(false);
  let ListGenres = []
  function loadGenres() {
    movieListdata.genres.map((item) => {
      realm.write(() => {
        const genresMovie = Genres.make(
          realm,
          item.id,
          item.name
        )
        ListGenres.push(genresMovie)
      })
    })
  }
  function Save() {
    handlePresentModalPress()
  }
  function Watched() {
    handlePresentModalCalendarPress()
  }
  function Tag() {
    handlePresentModalTagPress()
  }
  async function ShareLineItem(imagesPath) {

    RNFS.downloadFile({
      fromUrl: "https://image.tmdb.org/t/p/w500" + imagesPath,
      toFile: `${RNFS.DocumentDirectoryPath}/film.png`
    }).promise.then(async (res) => {
      RNFS.readFile(`${RNFS.DocumentDirectoryPath}/film.png`,
        "base64").then(base64String => {
          var imageUrl = 'data:image/png;base64,' + base64String;
          let shareImage = {
            message:
              "check out amazing film",
            url: imageUrl,
          };
          Share.open(shareImage)
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              err && console.log(err);
            });
        })
    })


  }
  if (movieListError || castMovieError || backdropsMovieError || RecommendMovieError||trailerError) {
    return (
      <SafeAreaView style={{
        flex: 1,
        backgroundColor: "#090B14"
      }}>
        <View style={stylesHeader.top}>
          <TouchableOpacity
            style={stylesHeader.revert}
            onPress={() => {
              props.navigation.goBack();
            }}
          >
            <Image source={require('../../Assets/Revert.png')} />
          </TouchableOpacity>
        </View>
        <View style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}>
          <Text style={{
            color: "#FFFFFF",
            fontSize: 20
          }}>
            Error
          </Text>
        </View>
      </SafeAreaView >
    )
  }
  if (movieListLoading || castMovieLoading || backdropsMovieLoading || RecommendMovieLoading||trailerLoading) 
  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: "#090B14"
    }}>
      <View style={stylesHeader.top}>
        <TouchableOpacity
          style={stylesHeader.revert}
          onPress={() => {
            props.navigation.goBack();
          }}
        >
          <Image source={require('../../Assets/Revert.png')} />
        </TouchableOpacity>
      </View>
      <View style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}>
        <View style={[stylesLoading.container, stylesLoading.horizontal]}>
          <ActivityIndicator size="large" color="#F7BE13" />
        </View>
      </View>
    </SafeAreaView >)
    //console.log(trailerUrl.results[0].key)
  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: "#090B14"
    }}>
      <BottomSheetModalProvider>
        <ScrollView >
          <View style={stylesHeader.top}>
            <TouchableOpacity
              style={stylesHeader.revert}
              onPress={() => {
                props.navigation.goBack();
              }}
            >
              <Image source={require('../../Assets/Revert.png')} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
            }}
          >
            <View
              style={{
                alignItems: "center",
                width: "100%",
                height: 354
              }}
            >
              <ImageBackground
                style={{
                  width: 280,
                  height: 354,
                  borderRadius: 20,
                  position: "absolute",
                  top: -20,
                  alignItems: "center",
                  opacity: 0.85,
                }}
                imageStyle={{ borderRadius: 20 }}
                source={{
                  uri: "https://image.tmdb.org/t/p/w500" + movieListdata.poster_path
                }} >
                  {/* Play video */}
                   <TouchableOpacity
                    style={{
                      alignItems: "center",
                      position: "absolute",
                      top: 129,
                    }}
                    onPress={() => setPlaying(true)}
                  >
                    <Image source={require('../../Assets/Play.png')} />
                  </TouchableOpacity> 
                <Text
                  style={{
                    fontFamily: "Open Sans",
                    fontSize: 45,
                    color: "#FFF",
                    fontWeight: 700,
                    position: "absolute",
                    top: -30,
                    right: -30
                  }}
                >
                  {/*Persent vote_average integer */}
                  {parseInt(movieListdata.vote_average * 10)}%
                </Text>
                <LinearGradient
                  colors={['transparent', '#090B14']}
                  locations={[0.001, 1]}
                  style={{
                    height: 160,
                    width: WidthScreen,
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: "absolute",
                    top: 195
                  }}
                >
                </LinearGradient>
                <View style={stylesInfo.container}>
                  <Text
                    style={stylesInfo.title}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >
                    {movieListdata.title}
                  </Text>
                  {
                    movieListdata.genres.map((item, index) => {

                      if (index === movieListdata.genres.length - 1) {
                        genres = genres + item.name;
                      } else {
                        genres = genres + item.name + ", ";
                      }
                    })
                  }

                  <Text style={stylesInfo.genres}>{genres}</Text>
                  <View style={stylesInfo.tagContainer}>
                    {
                      lineItem &&
                      lineItem.tags.map((item) => {
                        return (
                          <TouchableOpacity key={item._id}>
                            <Text style={[stylesInfo.tag, {
                              color: item.color
                            }]}>#{item.name}</Text>
                          </TouchableOpacity>
                        )
                      })}
                  </View>
                </View>
              </ImageBackground>
            </View>
            <View style={stylesListBtn.container}>
              <FunctionButton
                url={require("../../Assets/LineItem/save.png")}
                name={(!existInSpace || !existInSpace.length) ? "Add" : "Move"}
                action={Save}
              />
              <FunctionButton
                url={require("../../Assets/LineItem/Watched.png")}
                name={"Watched"}
                action={Watched}
              />
              {/*Add tag */}
              <FunctionButton
                url={require("../../Assets/LineItem/AddTag.png")}
                name={"Add tag"}
                action={Tag}
              />
              <FunctionButton
                url={require("../../Assets/LineItem/Share.png")}
                name={"Share"}
                action={() => {
                  ShareLineItem(movieListdata.poster_path)
                }}
              />
            </View>
          </View>
          
          <InformationCom overview={movieListdata.overview}></InformationCom>
          <YoutubePlayer
            height={250}
            play={playing}
            videoId={trailerUrl.results[0].key}
          /> 
          <CastCom castMovie={castMoviedata}></CastCom>
          <MediaCom backdrops={backdropsMoviedata} ></MediaCom>
          <RecommendationCom
            RecommendMovie={RecommendMoviedata}
            mediaType={media_type}
          ></RecommendationCom>
        </ScrollView>
        <BottomSheetModal
          backgroundComponent={CustomBackground}
          ref={bottomSheetModalRef}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          backdropComponent={renderBackdrop}>
          <View style={stylesTop.containerModal}>
            <View>
              <Text style={[stylesTop.title, { marginBottom: 15 }]}>
                {(!existInSpace || !existInSpace.length) ? "Add Space" : "Move Space"}
              </Text>
            </View>
          </View>
          <BottomSheetScrollView>
            <View style={stylesTop.containerModal}>
              <View style={{
                flex: 1
              }}>
                {
                  SpaceItems.map((item) => {
                    return (
                      <TouchableOpacity
                        key={item.id}
                        style={{
                          width: 353,
                          height: 52,
                          borderRadius: 10,
                          backgroundColor: item.color,
                          flexDirection: "row",
                          marginTop: 10,
                          alignItems: "center",
                        }}
                        onPress={() => {
                          try {
                            loadGenres()
                            realm.write(() => {
                              if (
                                existInSpace == undefined
                              ) {
                                const lineItem = LineItem.make(
                                  realm,
                                  movieListdata.id.toString(),
                                  media_type,
                                  movieListdata.title,
                                  movieListdata.poster_path,
                                  movieListdata.backdrop_path,
                                  movieListdata.release_date,
                                );
                                lineItem.genres = ListGenres
                                item.lineItems.push(lineItem);
                              } else if (existInSpace.filtered("$0 == _id", item._id.toString()).length != 1) {
                                const lineItem = LineItem.make(
                                  realm,
                                  movieListdata.id.toString(),
                                  media_type,
                                  movieListdata.title,
                                  movieListdata.poster_path,
                                  movieListdata.backdrop_path,
                                  movieListdata.release_date,
                                );
                                lineItem.genres = ListGenres
                                item.lineItems.push(lineItem);
                              }
                            })
                          } catch (error) {
                            console.log(error);
                          }
                        }}
                      >

                        <Image style={{
                          marginLeft: 11,
                          width: 33.96,
                          height: 33
                        }} source={findIconById(item.icon)} />
                        {item.isSecret && (
                          <Image
                            source={require('../../Assets/SpaceItem/key.png')}
                            style={{
                              marginLeft: 16.04,
                              width: 13.34,
                              height: 18,

                            }}
                          />
                        )}
                        <Text style={{
                          fontSize: 15,
                          fontWeight: 700,
                          fontFamily: "Open Sans",
                          color: "#FFF",
                          marginLeft: 16.04
                        }}>{item.name}</Text>

                      </TouchableOpacity>
                    )
                  })
                }
              </View>
            </View>
          </BottomSheetScrollView>
          <View style={stylesTop.containerModal}>
            <TouchableOpacity
              style={{
                width: 353,
                height: 52,
                borderRadius: 10,
                flexDirection: "row",
                marginTop: 10,
                alignItems: "center",
              }}
              onPress={() => {
                setIsModalAddSpace(true)
              }}
            >
              <View style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: "#F7BE13",
                justifyContent: "center",
                alignItems: "center"
              }}>
                <Image source={require('../../Assets/Navigator/CombinedShape.png')}></Image>
              </View>
              <Text style={{
                color: "#FFF",
                fontSize: 15,
                fontWeight: 700,
                marginLeft: 20
              }}> Create new space</Text>
            </TouchableOpacity>
          </View>
        </BottomSheetModal>
        <BottomSheetModal
          backgroundComponent={CustomBackground}
          ref={bottomSheetModalTagRef}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          backdropComponent={renderBackdrop}>
          <View style={stylesTop.containerModal}>
            <View>
              <Text style={[stylesTop.title, { marginBottom: 15 }]}>
                Add Tag
              </Text>
            </View>
          </View>
          <BottomSheetScrollView>
            <View style={stylesTop.containerModal}>
              <View style={{
                flex: 1
              }}>
                {
                  TagItems.map((item) => {
                    return (
                      <TagLine
                        key={item._id}
                        TagLine={item}
                        handlePress={() => {
                          try {
                            loadGenres();
                            realm.write(() => {
                              if (
                                tagItemRef.filtered("$0 == _id", item._id)[0]?.linkingObjects("LineItem", "tags").filtered("$0 == id", movieID.toString()).isEmpty()
                              ) {
                                const lineItem = LineItem.make(
                                  realm,
                                  movieListdata.id.toString(),
                                  media_type,
                                  movieListdata.title,
                                  movieListdata.poster_path,
                                  movieListdata.backdrop_path,
                                  movieListdata.release_date,
                                );
                                lineItem.genres = ListGenres;
                                lineItem.tags.push(item);
                              }})
                            } catch (error) {
                            console.log(error);
                          }}}
                      />
                    )})}
              </View>
            </View>
          </BottomSheetScrollView>
          <View style={stylesTop.containerModal}>
            <TouchableOpacity
              style={{
                width: 353,
                height: 52,
                borderRadius: 10,
                flexDirection: "row",
                marginTop: 10,
                alignItems: "center",
              }}
              onPress={() => {
                setIsModalAddTag(true)
              }}
            >
              <View style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: "#F7BE13",
                justifyContent: "center",
                alignItems: "center"
              }}>
                <Image source={require('../../Assets/Navigator/CombinedShape.png')}></Image>
              </View>
              <Text style={{
                color: "#FFF",
                fontSize: 15,
                fontWeight: 700,
                marginLeft: 20
              }}> Create new tag</Text>
            </TouchableOpacity>
          </View>
        </BottomSheetModal>
        <BottomSheetModal
          backgroundComponent={CustomBackground}
          ref={bottomSheetModalCalendarRef}
          snapPoints={snapPointsCalendar}
          onChange={handleSheetChanges}
          backdropComponent={renderBackdrop}>
          <View style={stylesTop.containerModal}>
            <View>
              <Text style={[stylesTop.title, { marginBottom: 15 }]}>
                Mark as watched
              </Text>
            </View>
          </View>
          <CalendarComp selected={selectedDay} setSelected={setSelectedDay}></CalendarComp>
          <View style={{
            width: "100%",
            alignItems: "center",
            marginTop: 20
          }}>
            <TouchableOpacity style={styleCalendar.btnDone} onPress={() => {
              try {
                loadGenres()
                realm.write(() => {
                  const lineItem = LineItem.make(
                    realm,
                    movieListdata.id.toString(),
                    media_type,
                    movieListdata.title,
                    movieListdata.poster_path,
                    movieListdata.backdrop_path,
                    movieListdata.release_date,
                  );
                  console.log(selectedDay);
                  lineItem.watchedAt = selectedDay
                })

              } catch (error) {
                console.log(error);
              }
            }}>
              <Text style={{
                color: "#FFFFFF",
                fontWeight: 700,
                fontSize: 16
              }}>DONE</Text>
            </TouchableOpacity>
          </View>
        </BottomSheetModal>
      </BottomSheetModalProvider>
      <AddSpace isVisibleAddSpace={isModalAddSpace} setVisibleAddSpace={setIsModalAddSpace}></AddSpace>
      <AddTag
        isVisibleAddTag={isModalAddTag}
        setVisibleAddTag={setIsModalAddTag}
      ></AddTag>
    </SafeAreaView >
  )
}


const stylesHeader = StyleSheet.create({
  top: {
    width: "100%",
    height: 55,
  },
  revert: {
    position: "absolute",
    top: 17,
    left: 20
  },

})
const stylesLoading = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
const stylesInfo = StyleSheet.create({
  container: {
    width: WidthScreen,
    position: "absolute",
    top: 250,
    textAlign: "center",
    justifyContent: 'center',
    alignItems: 'center',
    height: 100
  },
  title: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: 700,
    fontFamily: "Open Sans",
    marginBottom: 10,
    textAlign: "center",
    lineHeight: 29.96
  },
  genres: {
    fontSize: 14,
    color: "#9DA0A8",
    fontWeight: 400,
    marginBottom: 10,
    fontFamily: "Open Sans",
  },
  tagContainer: {
    flexDirection: "row",
    width: "100%",
    height: 30,
    justifyContent: "center",
    flexWrap: "wrap",
  },
  tag: {
    fontSize: 14,
    fontWeight: 400,
    color: "#F112A2",
    marginLeft: 12,
    fontFamily: "Open Sans",
  }
})

const stylesListBtn = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
  }
})

const stylesTop = StyleSheet.create({
  containerModal: {
    justifyContent: 'space-evenly',
    marginLeft: 25,
    paddingBottom: 5
  },
  title: {
    color: '#FFFFFF',
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 22,
  },
  btnAction: {
    fontWeight: 700,
    fontSize: 16,
    lineHeight: 22,
    color: '#FFFFFF',
    marginTop: 18,
  },
});
const styleCalendar = StyleSheet.create({
  btnDone: {
    width: 132,
    height: 46,
    borderRadius: 26,
    backgroundColor: "#F7BE13",
    alignItems: "center",
    justifyContent: "center"
  }
})
export default DetailLineItem