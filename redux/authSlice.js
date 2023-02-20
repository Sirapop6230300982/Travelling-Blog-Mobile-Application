import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  //profile:[]
  profile: {
    id: "",
    firstname: "",
    lastname: "",
    studentID: "",
    username: "",
  },
  post: [],
};

const authSlice = createSlice({
  name: "auths",
  initialState: initialState,
  reducers: {
    addProfile(state, action) {
      //state.push(action.payload)
      state.profile.id = action.payload.id;
      state.profile.firstname = action.payload.firstname;
      state.profile.lastname = action.payload.lastname;
      state.profile.studentID = action.payload.studentID;
      state.profile.username = action.payload.username;
    },
    addPost(state, action) {
      // let key = action.payload.id
      // let obj = {}
      // obj[key] = action.payload
      // state.post.push(obj)
      state.post.push(action.payload);

    },
    editStar(state, action) {
      const myid = action.payload.myid
      state.post.forEach((e) => {
        if (e.id == action.payload.postid) {
          let arr = []
          if(e.star.includes(action.payload.myid))
          {
            for(const item of e.star)
          {
            if(item != action.payload.myid)
            {
              console.log("ITEMSSOKSJLDKLJDSK",item)
              arr.push(item) // เป็นการลบ
            }
          }

          e.star =arr
          }
          else{
            e.star.push(myid)
          }
          return e.star
          
         
          
          // const newarr = []
          // e=e.star.map((item) => {

          //   if (item != action.payload.myid) {
          //     newarr.push(item)
          //     // e.star = e.star.filter((i) => i !== action.payload.myid);
          //   }else{
          //     console.log("jhajkshdjkhjaskhdkjashdjkashdjk",item)
          //   }
          //   e.star =newarr
          //   console.log(e.star,newarr)
          //   console.log("ฉันเข้า")
          // });

          // e.star.push(action.payload.myid);
          // console.log(e);


        }
      });
      
    },
    Clear(state, action) {

      return {
        ...state,
        post: []
      }
    },
    
    UpdateComment(state,action)
    {

      console.log(state.post.length)
       for (e of state.post){
        if(e.id==action.payload.id)
        { 
          const comment_temp = action.payload.comment
          e.comment = comment_temp
        }

       }
      //  console.log("STATE",state)
    }
    

  },
});

const { actions, reducer } = authSlice;
export const { addProfile, addPost, editStar, Clear,UpdateComment } = actions;
export default reducer;
