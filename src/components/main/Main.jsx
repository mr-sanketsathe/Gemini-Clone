import PersonIcon from '@mui/icons-material/Person';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import MicNoneOutlinedIcon from '@mui/icons-material/MicNoneOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import './Main.css';
import { useContext, useState } from 'react';
import {Context} from '../../context/Context'
export default function Main() {
  const {onSent,input,setInput,showResult,setshowResult,resultData,currPrompt,loading,setLoading}=useContext(Context);
    const handleOnSent=()=>{
        setshowResult(false);
        onSent();
        setshowResult(true);
    }
    return (
        <div className="main">
            <div className="nav">
                <p className="title">Gemini</p>
                 <img className='user'  src="/user.png" alt="usr" />
            </div>
            <div className="main-container">
                {!showResult?<>
                <div className="greet">
                    <span className='greet-title'>Hello Sanket,</span><br />
                    <p>How i can  help you today ?</p>
                </div>
                <div className="main-infobox">
                    <div className="card">
                        <p className='card-info'>Suggest beautiful places to see on an upcoming road trip</p>
                        <span className='card-icon'><ExploreOutlinedIcon /></span>
                    </div>
                    <div className="card">
                        <p className='card-info'>Briefly sumarize this concpt:urban planing</p>
                        <span className='card-icon'>< LightbulbOutlinedIcon /></span>
                    </div>
                    <div className="card">
                        <p className='card-info'>Branstrom team bounding activities for our work retreat </p>
                        <span className='card-icon'><ChatBubbleOutlineOutlinedIcon /></span></div>
                    <div className="card">
                        <p className='card-info'>Improve the readability of this code</p>
                        <span className='card-icon'>< CodeOutlinedIcon /></span></div>
                </div></>:
                <div className='result'>
                    <div className="result-title">
                         <img className='user'  src="/user.png" alt="usr" />
                        <p className='user-prompt'>{currPrompt}</p>
                    </div>
                     <div className="result-data">
                        <img src="/gemini_icon.png" alt="Gemini Icon" />
                        {loading?(<div className="loader">
                            <hr />
                            <hr />
                            <hr />
                        </div>):<p dangerouslySetInnerHTML={{__html:resultData}}></p>}
                    </div>
                 </div>}
                <div className="searchbox">
                    <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder='Enter your prompt..' />
                    <span><AddPhotoAlternateOutlinedIcon /></span>
                    <span><MicNoneOutlinedIcon /></span>
                    <span onClick={handleOnSent}><SendOutlinedIcon /></span>

                </div>
                <p className="bottom-info">Gemini may display inaccurate information,including people,so double chek its response</p>
            </div>
        </div>
    )
}