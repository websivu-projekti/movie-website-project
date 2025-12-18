import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext.js";
import Header from '../components/header.jsx'
import "./MyGroups.css"
import { useEffect } from "react";

function MyGroups() {
  const navigate = useNavigate();
  const { user } = useAuth()
  const [ myGroups, setMyGroups ] = useState([])
  const [ groupOwner, setGroupOwner ] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    if (user){
      fetchOwnedGroups()
    }
  }, [user])

  const fetchOwnedGroups = async () => {
    try{
      const response = await fetch(`${process.env.REACT_APP_API_URL}/groups/usersgroups`, {
        headers: {
          'Content-Type' : 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      })
      const data = await response.json()
      if(response.ok){
        setMyGroups(data.groups)
        setGroupOwner(data.groupowner)
        console.log(myGroups)
      } else {
        setError(data.error || "Failed to fetch user's groups")
      }
    }catch(err){
      setError(err.message)
    }
  }

  const handleGroupClick = (groupId) => {
    navigate(`/groupdetail/${groupId}`)
  }

  return (
    <div className="container">
      <Header/>

      <div className="my-groups-container">
        <h1 className="groups-title">My Groups</h1>
        <div className="groups-box">
          {/* ryhmien cardit tänne */}
        </div>
      </div>

      <main className="groupsWrapper">
        <div className="groupsBox">
          {myGroups.map((group, index) => (
            <React.Fragment key={group.group_id}>
              <div
                className="groupItem"
                onClick={() => handleGroupClick(group.group_id)}
                style={{ cursor: 'pointer' }}
              >
                <div className="groupLeft">
                  <div className="groupIcon" >
                    <img className="groupIcon" src={require(`../assets/icons/${group.groupicon_url}.png`)}/>
                  </div>
                  <span className="groupName">{group.group_name}</span>
                </div>
                <div>List by: {groupOwner[0].username}</div>
              </div>

              {index < myGroups.length - 1 && <div className="divider" />}
            </React.Fragment>
          ))}
        </div>
      </main>
    </div>
  );
}

export default MyGroups
