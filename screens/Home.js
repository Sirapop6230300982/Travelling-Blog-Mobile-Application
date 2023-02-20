import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  StyleSheet,
  StatusBar,
  Image,
  RefreshControl,
  CheckBox,
  ScrollView,
  Platform
} from "react-native";
import { Card, Avatar, Title, Paragraph } from "react-native-paper";
import {
  AntDesign,
  EvilIcons,
  MaterialCommunityIcons,
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import uuid from "react-native-uuid";
import * as PostModel from "../firebase/postModel";
import * as AuthModel from "../firebase/authModel";
import * as UserModel from "../firebase/userModel";
import { useNavigation } from "@react-navigation/native";
import Slideshow from "react-native-image-slider-show";
import axios from "axios";

const nlpwithyou = async (props) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": "th",
      Authorization:
        "Bearer GVZk5LXZtHyzuTGUqCpsD2LZWTnOJlVbdS(VtMMvhXEQ1gtKNB7MQ17HH0SmLp84J3FTuupF(r)DWpLm5GTQq2W=====2",
    },
  };

  fetch(
    "https://tatapi.tourismthailand.org/tatapi/v5/places/search?provinceName=สระบุรี",
    options
  )
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
};

const ToplikeLocaltion = (props) => {
  const navigation = useNavigation();
  const [dataPostsort, setDataPostSort] = useState(null);

  useEffect(() => {
    dataPresort = [...props.data];
    dataPresort.sort(function (a, b) {
      if (a.star.length === b.star.length) {
        return b.star.length - a.star.length;
      }
      return a.star.length > b.star.length ? -1 : 1;
    });
    setDataPostSort(dataPresort);
  }, []);

  if (dataPostsort == null) {
    <Text>Loading</Text>;
  } else {
    return (
      <View style={{ marginTop: 50, height: 200 }} key={uuid.v4()}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {dataPostsort.slice(0, 10).map((item) => {
            return (
              <TouchableOpacity
                style={styles.topBox}
                key={uuid.v4()}
                onPress={() => {
                  navigation.navigate("Inpost", {
                    data: { data: item },
                  });
                }}
              >
                <Image
                  style={styles.getFullPic}
                  source={{
                    uri: item.img_name[0],
                  }}
                />
                <View style={styles.boxName} key={uuid.v4()}>
                  {item.title.length > 14 ? (
                    <Text
                      style={{ color: "white", padding: 5, paddingLeft: 10 }}
                    >
                      {item.title.substring(0, item.title.length - 1)}...
                    </Text>
                  ) : (
                    <Text
                      style={{ color: "white", padding: 5, paddingLeft: 10 }}
                    >
                      {item.title}
                    </Text>
                  )}
                </View>
                <View style={styles.boxStar} key={uuid.v4()}>
                  <AntDesign
                    style={{ padding: 5 }}
                    name="star"
                    size={20}
                    color="#F9C609"
                  />

                  {item.star.length < 1000 ? (
                    <Text style={{ padding: 5, color: "white" }}>
                      {item.star.length}
                    </Text>
                  ) : (
                    <Text style={{ padding: 5, color: "white" }}>999+</Text>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  }
};

const TopViewLocaltion = (props) => {
  const [dataPostsort, setDataPostSort] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    dataPresort = [...props.data];
    dataPresort.sort(function (a, b) {
      if (a.views === b.views) {
        // Price is only important when cities are the same
        return b.views - a.views;
      }
      return a.views > b.views ? -1 : 1;
    });
    setDataPostSort(dataPresort);
  }, []);

  if (dataPostsort == null) {
    <Text>Loading</Text>;
  } else {
    return (
      <View style={{ marginTop: 50, height: 200 }} key={uuid.v4()}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          key={uuid.v4()}
        >
          {dataPostsort.slice(0, 10).map((item) => {
            return (
              <TouchableOpacity
                style={styles.topBox}
                key={uuid.v4()}
                onPress={() => {
                  navigation.navigate("Inpost", {
                    data: { data: item },
                  });
                }}
              >
                <Image
                  style={styles.getFullPic}
                  source={{
                    uri: item.img_name[0],
                  }}
                />
                <View style={styles.boxName} key={uuid.v4()}>
                  {item.title.length > 14 ? (
                    <Text
                      style={{ color: "white", padding: 5, paddingLeft: 10 }}
                    >
                      {item.title.substring(0, item.title.length - 1)}...
                    </Text>
                  ) : (
                    <Text
                      style={{ color: "white", padding: 5, paddingLeft: 10 }}
                    >
                      {item.title}
                    </Text>
                  )}
                </View>
                <View style={styles.boxStar} key={uuid.v4()}>
                  <AntDesign
                    style={{ transform: [{ rotateY: "180deg" }], padding: 5 }}
                    name="enter"
                    size={20}
                    color="red"
                  />

                  {item.views < 1000 ? (
                    <Text style={{ padding: 5, color: "white" }}>
                      {item.views}
                    </Text>
                  ) : (
                    <Text style={{ padding: 5, color: "white" }}>999+</Text>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  }
};

const FourImageSummer = (props) => {
  const [dataPostsort, setDataPostSort] = useState(null);
  const navigation = useNavigation();
  useEffect(() => {
    dataPresort = [...props.data];
    dataPresort = dataPresort.filter((e) => e.is_hot === true);
    dataPresort.sort(function (a, b) {
      if (a.is_rain && b.is_rain) {
        if (a.star.length === b.star.length) {
          // Price is only important when cities are the same
          return b.star.length - a.star.length;
        }
        return a.star.length > b.star.length ? -1 : 1;
      }
    });
    setDataPostSort(dataPresort);
  }, []);

  if (dataPostsort == null) {
    <Text>Loading</Text>;
  } else {
    return (
      <View style={{ height: 275, width: "100%" }}>
        <View style={{ width: "100%", flexDirection: "row" }}>
          <TouchableOpacity
            style={styles.mediumBox}
            onPress={() => {
              navigation.navigate("Inpost", {
                data: { data: dataPostsort[0] },
              });
            }}
          >
            <Image
              style={styles.getFullPic}
              source={{
                uri: dataPostsort[0].img_name[0],
              }}
            />
            <View style={styles.boxNameMedium}>
              <Text style={{ color: "white", padding: 5, paddingLeft: 10 }}>
                {dataPostsort[0].title}
              </Text>
            </View>
            <View style={styles.boxStarMedium}>
              <AntDesign
                style={{ padding: 5 }}
                name="star"
                size={20}
                color="#F9C609"
              />

              <Text style={{ padding: 5, color: "white" }}>
                {dataPostsort[0].star.length}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.mediumBox}
            onPress={() => {
              navigation.navigate("Inpost", {
                data: { data: dataPostsort[1] },
              });
            }}
          >
            <Image
              style={styles.getFullPic}
              source={{
                uri: dataPostsort[1].img_name[0],
              }}
            />
            <View style={styles.boxNameMedium}>
              <Text style={{ color: "white", padding: 5, paddingLeft: 10 }}>
                {dataPostsort[1].title}
              </Text>
            </View>
            <View style={styles.boxStarMedium}>
              <AntDesign
                style={{ padding: 5 }}
                name="star"
                size={20}
                color="#F9C609"
              />

              <Text style={{ padding: 5, color: "white" }}>
                {dataPostsort[1].star.length}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ height: 25 }} />

        <View style={{ width: "100%", flexDirection: "row" }}>
          <TouchableOpacity
            style={styles.mediumBox}
            onPress={() => {
              navigation.navigate("Inpost", {
                data: { data: dataPostsort[2] },
              });
            }}
          >
            <Image
              style={styles.getFullPic}
              source={{
                uri: dataPostsort[2].img_name[0],
              }}
            />
            <View style={styles.boxNameMedium}>
              <Text style={{ color: "white", padding: 5, paddingLeft: 10 }}>
                {dataPostsort[2].title}
              </Text>
            </View>
            <View style={styles.boxStarMedium}>
              <AntDesign
                style={{ padding: 5 }}
                name="star"
                size={20}
                color="#F9C609"
              />

              <Text style={{ padding: 5, color: "white" }}>
                {dataPostsort[2].star.length}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.mediumBox}
            onPress={() => {
              navigation.navigate("Inpost", {
                data: { data: dataPostsort[3] },
              });
            }}
          >
            <Image
              style={styles.getFullPic}
              source={{
                uri: dataPostsort[3].img_name[0],
              }}
            />
            <View style={styles.boxNameMedium}>
              <Text style={{ color: "white", padding: 5, paddingLeft: 10 }}>
                {dataPostsort[3].title}
              </Text>
            </View>
            <View style={styles.boxStarMedium}>
              <AntDesign
                style={{ padding: 5 }}
                name="star"
                size={20}
                color="#F9C609"
              />
              <Text style={{ padding: 5, color: "white" }}>
                {dataPostsort[3].star.length}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

const FourImageRain = (props) => {
  const [dataPostsort, setDataPostSort] = useState(null);
  const navigation = useNavigation();
  useEffect(() => {
    dataPresort = [...props.data];
    dataPresort = dataPresort.filter((e) => e.is_rain === true);
    dataPresort.sort(function (a, b) {
      if (a.is_rain && b.is_rain) {
        if (a.star.length === b.star.length) {
          // Price is only important when cities are the same
          return b.star.length - a.star.length;
        }
        return a.star.length > b.star.length ? -1 : 1;
      }
    });
    setDataPostSort(dataPresort);
  }, []);

  if (dataPostsort == null) {
    <Text>Loading</Text>;
  } else {
    return (
      <View style={{ height: 275, width: "100%" }}>
        <View style={{ width: "100%", flexDirection: "row" }}>
          <TouchableOpacity
            style={styles.mediumBox}
            onPress={() => {
              navigation.navigate("Inpost", {
                data: { data: dataPostsort[0] },
              });
            }}
          >
            <Image
              style={styles.getFullPic}
              source={{
                uri: dataPostsort[0].img_name[0],
              }}
            />
            <View style={styles.boxNameMedium}>
              <Text style={{ color: "white", padding: 5, paddingLeft: 10 }}>
                {dataPostsort[0].title}
              </Text>
            </View>
            <View style={styles.boxStarMedium}>
              <AntDesign
                style={{ padding: 5 }}
                name="star"
                size={20}
                color="#F9C609"
              />

              <Text style={{ padding: 5, color: "white" }}>
                {dataPostsort[0].star.length}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.mediumBox}
            onPress={() => {
              navigation.navigate("Inpost", {
                data: { data: dataPostsort[1] },
              });
            }}
          >
            <Image
              style={styles.getFullPic}
              source={{
                uri: dataPostsort[1].img_name[0],
              }}
            />
            <View style={styles.boxNameMedium}>
              <Text style={{ color: "white", padding: 5, paddingLeft: 10 }}>
                {dataPostsort[1].title}
              </Text>
            </View>
            <View style={styles.boxStarMedium}>
              <AntDesign
                style={{ padding: 5 }}
                name="star"
                size={20}
                color="#F9C609"
              />

              <Text style={{ padding: 5, color: "white" }}>
                {dataPostsort[1].star.length}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ height: 25 }} />

        <View style={{ width: "100%", flexDirection: "row" }}>
          <TouchableOpacity
            style={styles.mediumBox}
            onPress={() => {
              navigation.navigate("Inpost", {
                data: { data: dataPostsort[2] },
              });
            }}
          >
            <Image
              style={styles.getFullPic}
              source={{
                uri: dataPostsort[2].img_name[0],
              }}
            />
            <View style={styles.boxNameMedium}>
              <Text style={{ color: "white", padding: 5, paddingLeft: 10 }}>
                {dataPostsort[2].title}
              </Text>
            </View>
            <View style={styles.boxStarMedium}>
              <AntDesign
                style={{ padding: 5 }}
                name="star"
                size={20}
                color="#F9C609"
              />

              <Text style={{ padding: 5, color: "white" }}>
                {dataPostsort[2].star.length}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.mediumBox}
            onPress={() => {
              navigation.navigate("Inpost", {
                data: { data: dataPostsort[3] },
              });
            }}
          >
            <Image
              style={styles.getFullPic}
              source={{
                uri: dataPostsort[3].img_name[0],
              }}
            />
            <View style={styles.boxNameMedium}>
              <Text style={{ color: "white", padding: 5, paddingLeft: 10 }}>
                {dataPostsort[3].title}
              </Text>
            </View>
            <View style={styles.boxStarMedium}>
              <AntDesign
                style={{ padding: 5 }}
                name="star"
                size={20}
                color="#F9C609"
              />

              <Text style={{ padding: 5, color: "white" }}>
                {dataPostsort[3].star.length}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

const FourImageWinter = (props) => {
  const [dataPostsort, setDataPostSort] = useState(null);
  const navigation = useNavigation();
  useEffect(() => {
    dataPresort = [...props.data];
    dataPresort = dataPresort.filter((e) => e.is_cool === true);
    dataPresort.sort(function (a, b) {
      if (a.is_rain && b.is_rain) {
        if (a.star.length === b.star.length) {
          // Price is only important when cities are the same
          return b.star.length - a.star.length;
        }
        return a.star.length > b.star.length ? -1 : 1;
      }
    });
    setDataPostSort(dataPresort);
  }, []);

  if (dataPostsort == null) {
    <Text>Loading</Text>;
  } else {
    return (
      <View style={{ height: 275, width: "100%" }}>
        <View style={{ width: "100%", flexDirection: "row" }}>
          <TouchableOpacity
            style={styles.mediumBox}
            onPress={() => {
              navigation.navigate("Inpost", {
                data: { data: dataPostsort[0] },
              });
            }}
          >
            <Image
              style={styles.getFullPic}
              source={{
                uri: dataPostsort[0].img_name[0],
              }}
            />
            <View style={styles.boxNameMedium}>
              <Text style={{ color: "white", padding: 5, paddingLeft: 10 }}>
                {dataPostsort[0].title}
              </Text>
            </View>
            <View style={styles.boxStarMedium}>
              <AntDesign
                style={{ padding: 5 }}
                name="star"
                size={20}
                color="#F9C609"
              />

              <Text style={{ padding: 5, color: "white" }}>
                {dataPostsort[0].star.length}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.mediumBox}
            onPress={() => {
              navigation.navigate("Inpost", {
                data: { data: dataPostsort[1] },
              });
            }}
          >
            <Image
              style={styles.getFullPic}
              source={{
                uri: dataPostsort[1].img_name[0],
              }}
            />
            <View style={styles.boxNameMedium}>
              <Text style={{ color: "white", padding: 5, paddingLeft: 10 }}>
                {dataPostsort[1].title}
              </Text>
            </View>
            <View style={styles.boxStarMedium}>
              <AntDesign
                style={{ padding: 5 }}
                name="star"
                size={20}
                color="#F9C609"
              />

              <Text style={{ padding: 5, color: "white" }}>
                {dataPostsort[1].star.length}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ height: 25 }} />

        <View style={{ width: "100%", flexDirection: "row" }}>
          <TouchableOpacity
            style={styles.mediumBox}
            onPress={() => {
              navigation.navigate("Inpost", {
                data: { data: dataPostsort[2] },
              });
            }}
          >
            <Image
              style={styles.getFullPic}
              source={{
                uri: dataPostsort[2].img_name[0],
              }}
            />
            <View style={styles.boxNameMedium}>
              <Text style={{ color: "white", padding: 5, paddingLeft: 10 }}>
                {dataPostsort[2].title}
              </Text>
            </View>
            <View style={styles.boxStarMedium}>
              <AntDesign
                style={{ padding: 5 }}
                name="star"
                size={20}
                color="#F9C609"
              />

              <Text style={{ padding: 5, color: "white" }}>
                {dataPostsort[2].star.length}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.mediumBox}
            onPress={() => {
              navigation.navigate("Inpost", {
                data: { data: dataPostsort[3] },
              });
            }}
          >
            <Image
              style={styles.getFullPic}
              source={{
                uri: dataPostsort[3].img_name[0],
              }}
            />
            <View style={styles.boxNameMedium}>
              <Text style={{ color: "white", padding: 5, paddingLeft: 10 }}>
                {dataPostsort[3].title}
              </Text>
            </View>
            <View style={styles.boxStarMedium}>
              <AntDesign
                style={{ padding: 5 }}
                name="star"
                size={20}
                color="#F9C609"
              />

              <Text style={{ padding: 5, color: "white" }}>
                {dataPostsort[3].star.length}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};
export const Home = (props) => {
  const navigation = useNavigation();
  const route = props.route;
  const dispatch = useDispatch();

  const data = useSelector((state) => state.auths);

  return (
    <View style={styles.container}>
      <ScrollView scrollIndicatorInsets={{ right: 1 }}>
        <View style={{ width: "100%", height: 250, borderWidth: 1 }}>
          <Slideshow
            dataSource={[
              {
                url: "https://www.planetware.com/wpimages/2020/03/world-most-beautiful-waterfalls-yosemite-falls.jpg",
              },
              {
                url: "https://storage.googleapis.com/fvallimages/uploads/blog/11-things-you-have-to-do-in-phuket-3622.jpg",
              },
              {
                url: "https://media.istockphoto.com/photos/aerial-view-of-bangkok-modern-office-buildings-condominium-picture-id588618834?k=20&m=588618834&s=612x612&w=0&h=uLVBNzkoZ7JluNJQODJzlUXUe9gBfoniYmsPzioNDBY=",
              },
              {
                url: "https://a.cdn-hotels.com/gdcs/production9/d679/184d7edf-5c3a-470c-8529-b0085d6d5b0e.jpg?impolicy=fcrop&w=800&h=533&q=medium",
              },
            ]}
            height={250}
          />
        </View>
        <View
          style={{
            marginTop: 50,
            marginLeft: "auto",
            marginRight: "auto",
            height: 200,
            width: "100%",
          }}
        >
          <Image
            style={{ width: "100%", height: "100%" }}
            source={{
              uri: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/best-places-to-see-fall-foliage-1624464955.jpg",
            }}
          />
        </View>
        <View style={{ height: 50 }} />
        <View style={styles.headerBorder}>
          <Text style={styles.headerText}>ไลค์เยอะสุด</Text>
        </View>
        <ToplikeLocaltion data={data.post} key={uuid.v4()} />
        <View style={styles.headerBorder}>
          <Text style={styles.headerText}>ดูเยอะสุด</Text>
        </View>
        <TopViewLocaltion data={data.post} key={uuid.v4()} />

        <View style={{ height: 75 }} />
        <View style={styles.headerBorder}>
          <Text style={styles.headerText}>หน้าร้อนที่ดีที่สุด</Text>
        </View>
        <View style={{ height: 50 }} />
        <FourImageSummer data={data.post} key={uuid.v4()} />
        <View style={{ height: 75 }} />
        <View style={styles.headerBorder}>
          <Text style={styles.headerText}>หน้าฝนที่ดีที่สุด</Text>
        </View>
        <View style={{ height: 50 }} />
        <FourImageRain data={data.post} key={uuid.v4()} />
        <View style={{ height: 75 }} />
        <View style={styles.headerBorder}>
          <Text style={styles.headerText}>หน้าหนาวที่ดีที่สุด</Text>
        </View>
        <View style={{ height: 50 }} />

        <FourImageWinter data={data.post} key={uuid.v4()} />
        <TouchableOpacity
          onPress={() => {
            nlpwithyou();
          }}
        ></TouchableOpacity>
        <View style={{ height: 100 }} />

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
  },
  topBox: {
    width: 160,
    height: "80%",
    borderRadius: 20,
    backgroundColor: "red",
    marginLeft: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    flexDirection: "row",
  },
  boxName: {
    width: "auto",
    marginTop: 128,
    marginLeft: 0,
    borderBottomLeftRadius: 25,
    position: "absolute",
    backgroundColor: "rgba(52, 52, 52, 0.8)",
  },
  boxStar: {
    width: 85,
    backgroundColor: "rgba(52, 52, 52, 0.8)",
    marginTop: 0,
    marginLeft: 75,
    paddingRight: 10,
    borderTopRightRadius: 25,
    position: "absolute",
    flexDirection: "row",
  },
  mediumBox: {
    height: 125,
    width: "45%",
    marginTop: "auto",
    marginBottom: "auto",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 20,
    backgroundColor: "blue",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
    flexDirection: "row",
  },
  boxNameMedium: {
    width: "auto",
    marginTop: 93,
    marginLeft: 0,
    borderBottomLeftRadius: 25,
    position: "absolute",
    backgroundColor: "rgba(52, 52, 52, 0.8)",
  },
  boxStarMedium: {
    width: Platform.OS === "ios" ? 85 : 62.5,
    backgroundColor: "rgba(52, 52, 52, 0.8)",
    marginTop: 0,
    marginLeft: 100,
    paddingRight: 10,
    borderTopRightRadius: 25,
    position: "absolute",
    flexDirection: "row",
  },

  hugeBox: {
    height: 250,
    width: "45%",
    marginTop: "auto",
    marginBottom: "auto",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 20,
    backgroundColor: "yellow",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
    flexDirection: "row",
  },
  boxNameHuge: {
    width: "auto",
    marginTop: 218,
    marginLeft: 0,
    borderBottomLeftRadius: 25,
    position: "absolute",
    backgroundColor: "rgba(52, 52, 52, 0.8)",
  },
  boxStarHuge: {
    width: Platform.OS === "ios" ? 85 : 62.5,
    backgroundColor: "rgba(52, 52, 52, 0.8)",
    marginTop: 0,
    marginLeft: 101,

    borderTopRightRadius: 25,
    position: "absolute",
    flexDirection: "row",
  },
  getFullPic: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  headerBorder: {
    width: "100%",
    height: 40,
    justifyContent: "center",
    backgroundColor: "#1F69FF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    paddingLeft: 15,
    color: "white",
  },
});
