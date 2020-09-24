import React, { useEffect, useState } from 'react';

import './App.css';
import Post from './Post.js';
import {db,auth} from "./firebase.js";
import { Button, Input, makeStyles, Modal } from '@material-ui/core';
import ImageUpload from './ImageUpload';
import InstagramEmbed from 'react-instagram-embed';


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


function App() {
   const classes = useStyles();
   const[modalStyle]=useState(getModalStyle);
   const [posts,setPosts]=useState([]);
   const [open,setOpen]=useState(false);
   const [username,setUsername]=useState("");
   const [email,setEmail]=useState("");
   const [password,setPassword]=useState("");
   const [user,setUser]=useState(null);
   const [openSignIn,setOpenSignIn]=useState(false);

   useEffect(() => {
    const unsubscribe=auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        console.log(authUser)
         setUser(authUser);

        if(authUser.displayName){

        }else{
          return authUser.updateProfile({
            displayName:username,
          });
        }
      }
      else{
        setUser(null)
      }
    })
    return ()=>{
      unsubscribe();
    }
   }, [user,username])
    
  useEffect(() => {
    db.collection("posts").orderBy("timestamp","desc").onSnapshot(snapshot=>{
      setPosts(snapshot.docs.map(doc=>({id:doc.id,post:doc.data()})));
    })
  }, [])

  const signUp=(event)=>{
    event.preventDefault();
    auth.createUserWithEmailAndPassword(email,password)
    .then((authUser)=>{
      authUser.user.updateProfile({
        displayName:username
      })
    })
    .catch((error)=>alert(error.message))

  }
  const signIn=(event)=>{
    event.preventDefault()

    auth.signInWithEmailAndPassword(email,password)
    .catch((error)=>alert(error.message))

    setOpenSignIn(false);
  }

  return (
    <div className="App">
      <Modal
        open={open}
        onClose={()=>setOpen(false)}
      >
         <div style={modalStyle} className={classes.paper}>
           <form className="app__signup">
             <center>
               <img
                  className="app__image"
                  src="https://assets.website-files.com/5c75b94c8dd1ae50d3b9294b/5d48831280adb734a5db5620_hukglfkfklk%3B.png"
                  alt=""
                /> 
              </center>
               <Input
                 placeholder="Username"
                 type="text"
                 value={username}
                 onChange={(e)=>setUsername(e.target.value)}
               />     
               <Input
                 placeholder="Email"
                 type="text"
                 value={email}
                 onChange={(e)=>setEmail(e.target.value)}
               />
               <Input
                 placeholder="Password"
                 type="password"
                 value={password}
                 onChange={(e)=>setPassword(e.target.value)}
               />
               <Button type="submit" onClick={signUp}>Sign Up</Button>
              
           </form>
                     
           
         </div>
      </Modal>
      <Modal
        open={openSignIn}
        onClose={()=>setOpenSignIn(false)}
      >
         <div style={modalStyle} className={classes.paper}>
           <form className="app__signup">
             <center>
               <img
                  className="app__image"
                  src="https://assets.website-files.com/5c75b94c8dd1ae50d3b9294b/5d48831280adb734a5db5620_hukglfkfklk%3B.png"
                  alt=""
                /> 
              </center>     
               <Input
                 placeholder="Email"
                 type="text"
                 value={email}
                 onChange={(e)=>setEmail(e.target.value)}
               />
               <Input
                 placeholder="Password"
                 type="password"
                 value={password}
                 onChange={(e)=>setPassword(e.target.value)}
               />
               <Button type="submit" onClick={signIn}>Sign In</Button>
              
           </form>
                     
           
         </div>
      </Modal>
      
      <div className="app__header">
        <img className="app__image" src="https://agsd.org.uk/wp-content/uploads/2019/02/instagram-logo.png" alt=""/>
        
        {user?(
        <Button onClick={()=>auth.signOut()}>LogOut</Button>
      ):(
        <div className="app__logincontainer">
          <Button onClick={()=>setOpenSignIn(true)}>Sign In</Button>
          <Button onClick={()=>setOpen(true)}>Sign Up</Button>
        </div>
        
      )}
      
      </div>
      
      <div className="app__posts">
        <div className="app__postleft">
          {
            posts.map(({id,post})=>(
           <Post key={id}  user={user} postId={id}username={post.username}caption={post.caption}imageUrl={post.imageUrl}/>
           )
           )
          }
        </div>
        <div className="app__postright">
          <InstagramEmbed
          url='https://www.instagram.com/p/CFX25pvgBNl/?utm_source=ig_web_copy_link'
          maxWidth={320}
          hideCaption={false}
          containerTagName='div'
          protocol=''
          injectScript
          onLoading={() => {}}
          onSuccess={() => {}}
          onAfterRender={() => {}}
          onFailure={() => {}}
          />
        </div>
      
      </div>
      
      
      {user?.displayName?(
        <ImageUpload username={user.displayName}/>
      ):(
        <h3>Sorry you need to Login!</h3>
      )}  
    </div>
  );
}

export default App;
