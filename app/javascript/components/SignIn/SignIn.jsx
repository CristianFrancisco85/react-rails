import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useLoggedUser } from "../../contexts/globalContext"
import { fetchFaceId, fetchSignIn } from "../../services/auth"
import { fetchProfileImage } from "../../services/data"
import { URL_S3 } from "../../services/utils"
import SignInView from "./SignInView"

const SignIn = () => {

    let navigate =  useNavigate()
    const [user,setUser] = useLoggedUser()
    const [takePhotoModal,setTakePhotoModal] = useState(false)
    const [userImage64,setUserImage64]= useState(undefined)

    useEffect(() => {
        window.sessionStorage.removeItem('user')
        setUser(undefined)
    },[])

    const handleLogIn = async (event) => {
        event.preventDefault()
        let formData = new FormData(event.target)
        let userData
        let tempRes
        if(userImage64){
            tempRes = await fetchFaceId(formData.get('username'),userImage64)
            if(tempRes.ERROR){
                alert("Error:"+tempRes.ERROR)
                return
            }
        }
        await fetchSignIn(formData.get('username'),formData.get('password'),tempRes?.OK).then( async (res) =>{
            if(res.OK){
                userData=res.OK
                userData.username=formData.get('username')             
                
                await fetchProfileImage(userData.username).then((url)=>{
                    userData.image=URL_S3+url.OK
                })
                return true   
            }
            else if(res.ERROR){
                alert(`Error : ${res.ERROR}`)
                return false
            }
        }).then((flag)=>{
            if(flag){
                window.sessionStorage.setItem('user',JSON.stringify(userData))
                setUser(userData)
                navigate('/dashboard')
            }
            
        })
    }

    const handleCapture = (dataImage) =>{
        if(dataImage){
            dataImage = dataImage.replace('data:image/png;base64,','')
            dataImage = dataImage.replace('data:image/jpeg;base64,','')
            setUserImage64(dataImage)
        }
    }

    return(
        <SignInView
            handleLogIn={handleLogIn}
            takePhotoModal={takePhotoModal}
            setTakePhotoModal={setTakePhotoModal}
            handleCapture={handleCapture}
            userImage64={userImage64}
        />
    )


}

export default SignIn