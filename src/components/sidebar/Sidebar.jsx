import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import HistoryIcon from '@mui/icons-material/History';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import '/src/components/sidebar/Sidebar.css';
import { useContext, useState } from 'react';
import {Context} from  '../../context/Context'
export default function Sidebar() {
    let{recent,onSent,setshowResult,setresultData}=useContext(Context);
    let [isExtend, setisExtend] = useState(false);
    let handleSidebar = () => {
        setisExtend((curr) => { return !curr });
        console.log(isExtend);
    }
    
    let  handleRecent=async(query)=>{
         onSent(query);
    }
    let NewChat=()=>{
        setresultData(''),
        setshowResult(false);
    }

    return (
     <div className={`sidebar ${!isExtend ? "collapsed" : ""}`}>

            <div className="menu">
                 <span onClick={handleSidebar} ><MenuOutlinedIcon sx={{ fontSize: 30}} /></span>
            </div>
            <div onClick={NewChat} className="chats">
                <AddRoundedIcon sx={{ fontSize: 30, opacity: 0.5 }} />
               {isExtend && <p className="chat">New Chat</p>}
            </div>
                <div className="recent">
                {isExtend && <p className="recent-title">Recent</p>}
                  <div className="recent-historylist">
                   {recent.map((query,index)=>{
                        return isExtend?<p onClick={()=>handleRecent(query)}key={index} className='recent-history'>{query.slice(0,18)}....</p>:null
                   })}
                    
                   
                </div>
            </div>
            
                <div className='help control-btn'>
                    <HelpOutlineIcon sx={{ fontSize: 30, opacity: 0.5}}/>
                    { isExtend && <p>Help</p>}
                </div>
                <div className='Activity control-btn'>
                    <HistoryIcon sx={{ fontSize: 30, opacity: 0.5}}/>
                       { isExtend && <p>Activity</p>}
                </div>
                <div className='setting control-btn'>
                    <SettingsOutlinedIcon sx={{ fontSize: 30, opacity: 0.5 }}/>
                   { isExtend && <p>Settings</p>}
                </div>
            


        </div>
    )
}