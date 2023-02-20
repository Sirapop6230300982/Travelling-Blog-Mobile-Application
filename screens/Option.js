import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
// import regStyles from "../styles/authStyle";
// import AuthInput from "../auth/AuthInput";
import { useSelector, useDispatch } from "react-redux";
import * as AuthModels from "../firebase/authModel";
import * as UserModels from "../firebase/userModel";
import * as PostModel from "../firebase/postModel";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { addProfile, Clear } from "../redux/authSlice";

export const Option = (props) => {
  const navigation = props.nav;
  const route = props.route;

  const [password, SetPassword] = useState("");
  const [conpassword, Setconpassword] = useState("");
  const [oldpassword, Setoldpassword] = useState("");
  const data = useSelector((state) => state.auths);
  const myid = data.profile.id;
  const [firstname, Setfirstname] = useState("");
  const [lastname, Setlastname] = useState("");
  const [profile, setProfile] = useState({
    firstname: data.profile.firstname,
    lastname: data.profile.lastname,
    studentID: data.profile.studentID,
    username: data.profile.username,
  });
  const dispatch = useDispatch();

  const [images, setImages] = useState(null);

  const allClear = () => {
    Alert.alert("อัพเดทรูปโปรไฟล์เรียบร้อยแล้ว");
    signoutSuccess()
  };

  const successAddtoImgUpload = (url, docid) => {
    UserModels.updateImgToProfile(docid, url, allClear, unsuccess);
  };
  const allSuccess = () => {
    AuthModels.upload(images, successAddtoImgUpload, unsuccess, myid);
  };

  const signoutSuccess = () => {
    navigation.navigate("SplashFast");
  };

  const UpdateFnameAndLname_success = () => {
    Alert.alert("เปลี่ยนชื่อและนามสกุลของท่านเรียบร้อย");
  };
  const updateLastanem = () => {
    UserModels.UpdateLname(
      myid,
      lastname,
      UpdateFnameAndLname_success,
      unsuccess
    );
  };
  const updateProfile = () => {
    UserModels.UpdateFname(myid, firstname, updateLastanem, unsuccess);
  };
  const unsuccess = (msg) => {
    console.log(msg);
    Alert.alert(msg);
  };

  const goToSplash = () => {
    navigation.navigate("Splash");
  };

   


  const onSignoutPress = () => {
    console.log("Logout now");
    AuthModels.signOutModel(signoutSuccess, unsuccess);
    signoutSuccess()
  };
  const success = (msg) => {
    alert(msg);
  };
  const onchangepassword = () => {
    if (password == "" || conpassword == "") {
      alert("password cannot be null or you didn't fill it out ");
      return;
    } else if (password == conpassword) {
      AuthModels.changePassword(
        profile.username,
        oldpassword,
        password,
        success,
        unsuccess
      );
      return;
    } else {
      alert("password and password confirm don't match");
      return;
    }
  };

  const PickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      // allowsMultipleSelection: true,
      // selectionLimit: 10,
      aspect: [4, 3],
      quality: 1,
    });
    // console.log(result);
    if (!result.cancelled) {
      setImages(result.uri);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ backgroundColor: "white" }}
        scrollIndicatorInsets={{ right: 1 }}
      >
        <View style={styles.viewPictureBorder}>
          <Text style={styles.borderHeader}>Change Profile Picture</Text>
          <View style={{ height: 50 }} />
          {images == null ? (
            <TouchableOpacity
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                width: 150,
                height: 150,
                borderWidth: 5,
                borderColor: "#00b524",
                borderRadius: 100,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={PickImages}
            >
              <Text style={{ fontSize: 20 }}>
                <MaterialIcons
                  name="add-photo-alternate"
                  size={50}
                  color="#00b524"
                />
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                width: 150,
                height: 150,
                borderWidth: 1,
                borderRadius: 100,
              }}
              onPress={PickImages}
            >
              {images && (
                <Image
                  source={{ uri: images }}
                  style={{ width: "100%", height: "100%", borderRadius: 100 }}
                ></Image>
              )}
            </TouchableOpacity>
          )}
          <View style={styles.eachInputBorder}>
            <TouchableOpacity onPress={allSuccess} style={styles.saveButton}>
              <Text style={styles.saveText}>Save Picture</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ height: 50 }}></View>
        <View style={styles.viewProfileBorder}>
          <Text style={styles.borderHeader}>Change Profile</Text>
          <View style={styles.eachInputBorder}>
            <Text style={styles.headerInputBorder}>Firstname</Text>
            <TextInput
              value={firstname}
              onChangeText={(e) => Setfirstname(e)}
              style={styles.inputBorder}
              placeholder="Input First name"
              secureTextEntry={false}
            ></TextInput>
          </View>
          <View style={styles.eachInputBorder}>
            <Text style={styles.headerInputBorder}>Lastname</Text>
            <TextInput
              value={lastname}
              onChangeText={(e) => Setlastname(e)}
              style={styles.inputBorder}
              placeholder="Input Last name"
              secureTextEntry={false}
            ></TextInput>
          </View>
          <View style={styles.eachInputBorder}>
            <TouchableOpacity onPress={updateProfile} style={styles.saveButton}>
              <Text style={styles.saveText}>Save Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ height: 50 }}></View>
        <View style={styles.viewChangePasswordBorder}>
          <Text style={styles.borderHeader}>Change Password</Text>
          <View style={styles.eachInputBorder}>
            <Text style={styles.headerInputBorder}>Old Password</Text>
            <TextInput
              value={oldpassword}
              onChangeText={(e) => {
                Setoldpassword(e);
              }}
              style={styles.inputBorder}
              placeholder="Input Old password"
              secureTextEntry={true}
            ></TextInput>
          </View>
          <View style={styles.eachInputBorder}>
            <Text style={styles.headerInputBorder}>New Password</Text>
            <TextInput
              value={password}
              style={styles.inputBorder}
              placeholder="Input New password"
              secureTextEntry={true}
              onChangeText={(e) => SetPassword(e)}
            ></TextInput>
          </View>
          <View style={styles.eachInputBorder}>
            <Text style={styles.headerInputBorder}>Confirm New Password</Text>
            <TextInput
              value={conpassword}
              style={styles.inputBorder}
              placeholder="Confirm New password"
              secureTextEntry={true}
              onChangeText={(e) => Setconpassword(e)}
            ></TextInput>
          </View>
          <View style={styles.eachInputBorder}>
            <TouchableOpacity
              onPress={onchangepassword}
              style={styles.saveButton}
            >
              <Text style={styles.saveText}>Change Password</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ height: 50 }}></View>
        <View style={styles.viewLogoutBorder}>
          <Text style={styles.borderHeader}>Log Out</Text>

          <View style={styles.eachInputBorder}>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={onSignoutPress}
            >
              <Text style={styles.logoutText}>Log out</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ height: 100 }}></View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  borderHeader: {
    bottom: 10,
    width: "70%",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    borderRadius: 50,
    backgroundColor: "white",
  },
  viewPictureBorder: {
    marginLeft: "auto",
    marginRight: "auto",
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    top: 30,
    width: "90%",
    height: 430,
    backgroundColor: "#EDEDED",
  },
  viewProfileBorder: {
    marginLeft: "auto",
    marginRight: "auto",
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    top: 30,
    width: "90%",
    height: 425,
    backgroundColor: "#EDEDED",
  },
  eachInputBorder: { paddingTop: 50 },

  headerInputBorder: {
    fontWeight: "bold",
    marginLeft: "auto",
    marginRight: "auto",
    fontSize: 15,
    bottom: 10,
  },
  inputBorder: {
    marginLeft: "auto",
    marginRight: "auto",
    borderBottomWidth: 3,
    paddingLeft: 10,
    top: 5,
    fontSize: 25,
    width: "95%",
    backgroundColor: "#F0F0F0",
  },
  saveButton: {
    marginLeft: "auto",
    marginRight: "auto",
    top: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ABABAB",
    width: "90%",
    backgroundColor: "white",
  },
  saveText: { marginLeft: "auto", marginRight: "auto", fontSize: 30 },
  viewChangePasswordBorder: {
    marginLeft: "auto",
    marginRight: "auto",
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    top: 30,
    width: "90%",
    height: 550,
    backgroundColor: "#EDEDED",
  },
  viewLogoutBorder: {
    marginLeft: "auto",
    marginRight: "auto",
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    top: 30,
    width: "90%",
    height: 200,
    backgroundColor: "#EDEDED",
  },
  logoutButton: {
    marginLeft: "auto",
    marginRight: "auto",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ABABAB",
    width: "90%",
    backgroundColor: "white",
  },
  logoutText: { marginLeft: "auto", marginRight: "auto", fontSize: 30 },
});
