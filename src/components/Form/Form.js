import React,{useState} from "react"
import useSytles from "./styles";
import {TextField,Button,Typography,Paper} from "@material-ui/core"
import FileBase from "react-file-base64"
import {useDispatch} from "react-redux"
import { createPost,updatePost} from "../../actions/posts"
import {useSelector} from "react-redux"
import { useEffect } from "react";


const Form = ({currentId,setCurrentId}) => {
    const classes = useSytles();
    const dispatch = useDispatch();
    const post = useSelector((state) => currentId?state.posts.find((p) => p._id === currentId):null);

    useEffect(()=>{
        if(post) setPostData(post);
    },[post])

    const [postData,setPostData] = useState({
        creator:'',
        title:'',
        message:'',
        tags:'',
        selectedFile:''
    })
    const handleSubmit = (e) => {
        e.preventDefault();
        // 更新数据
        if(currentId){
            dispatch(updatePost(currentId,postData));
        }else{
            dispatch(createPost(postData));
        }
        clear();
       
    }
    const clear = () =>{
        setCurrentId(null);
        setPostData({
            creator:'',
            title:'',
            message:'',
            tags:'',
            selectedFile:''
        })

    }
    return (
        <>
        <Paper className={classes.paper}>
            <form noValidate autoComplete="off"  onSubmit={(e)=>handleSubmit(e)} className={`${classes.root} ${classes.form}`}>
                <Typography variant="h6"> {currentId?'Editing':'Creating'} a Memory</Typography>
                <TextField 
                    name="creator" 
                    variant="outlined" 
                    label="Creator" 
                    fullWidth
                    value={postData.creator}
                    onChange={(e) => setPostData({...postData,creator:e.target.value})}
                />
                  <TextField 
                    name="title" 
                    variant="outlined" 
                    label="Title" 
                    fullWidth
                    value={postData.title}
                    onChange={(e) => setPostData({...postData,title:e.target.value})}
                />
                  <TextField 
                    name="message" 
                    variant="outlined" 
                    label="Message" 
                    fullWidth
                    value={postData.message}
                    onChange={(e) => setPostData({...postData,message:e.target.value})}
                />
                 <TextField 
                    name="tags" 
                    variant="outlined" 
                    label="Tags" 
                    fullWidth
                    value={postData.tags}
                    onChange={(e) => setPostData({...postData,tags:e.target.value.split(',')})}
                />
                <div className={classes.fileInput}>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone = {({base64}) => setPostData({...postData,selectedFile:base64})}
                        
                    />
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" type="submit" size="large" fullWidth>Submit</Button>
                <Button variant="text" color="default" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
        </>
    )
}

export default Form;