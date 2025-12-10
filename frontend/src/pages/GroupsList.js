import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext.js";
import "./GroupsList.css" // ADDED: uusi CSS tiedosto, voit kopioida MyGroups.css tyylit tähän
import Header from '../components/header.jsx' // ADDED: Header komponentti
import pf1 from "../assets/icons/pf1.png"
import pf2 from "../assets/icons/pf2.png"
import pf3 from "../assets/icons/pf3.png"
import pf4 from "../assets/icons/pf4.png"
import pf5 from "../assets/icons/pf5.png"
import pf6 from "../assets/icons/pf6.png"
import pf7 from "../assets/icons/pf7.png"
import pf8 from "../assets/icons/pf8.png"
import pf9 from "../assets/icons/pf9.png"
import closeMenu from "../assets/closemenu.svg"

function GroupsList() {
  const navigate = useNavigate();
  const { user } = useAuth()
  const [ showCreateGroup, setShowCreateGroup ] = useState(false)
  const [ newGroupName, setNewGroupName ] = useState("")
  const [ newGroupIcon, setNewGroupIcon ] = useState("")
  

  // ADDED: esimerkkiryhmät (kaikki ryhmät)
  const groups = [
    { id: 1, name: "Group 1", creator: "User 1" },
    { id: 2, name: "Group 2", creator: "User 2" },
    { id: 3, name: "Group 3", creator: "User 3" },
    { id: 4, name: "Group 4", creator: "User 4" },
    { id: 5, name: "Group 5", creator: "User 5" }
  ];

  const handleGroupClick = (groupId) => {
    navigate(`/groupdetail/${groupId}`) // vie yksittäisen ryhmän sivulle
  }

  const openCreateGroup = () => {
    setShowCreateGroup(!showCreateGroup)
  }
  const closeCreateGroup = () => {
    setShowCreateGroup(!showCreateGroup)
  }

  const handleSubmit = () => {
    console.log(newGroupName)
    console.log(newGroupIcon)
  }

  return (
    <div className="container">
      <Header/>

      <div className="my-groups-container">
        <div className="topContainer">
          <h1 className="groups-title">All Groups</h1> {/* ADDED: otsikko yleiselle listalle */}
          {user && <button className="createBtn" onClick={openCreateGroup}>Create Group</button>}
        </div>
        
        <div className="groups-box">
          {/* ryhmien cardit voidaan lisätä tähän */}
        </div>
      </div>
      {showCreateGroup &&
        <div className="createGroupContainer">
          <div className="createGroup">
            <h2 className="createGroupTitle">Create a new group</h2>
            <button className="closeCreateGroup" onClick={closeCreateGroup}>
                <img src={closeMenu}/>
            </button>
              <form className="createGroupForm" onSubmit={handleSubmit}>
                <label className="createGroupLabel nameLabel">Group Name: 
                  <input 
                  className="createGroupInput nameInput" 
                  type="text" 
                  placeholder="Enter group name..."
                  value={newGroupName}
                  onChange={(e) => {
                    setNewGroupName(e.target.value)
                  }}
                  required
                  />
                </label>
                <label className="createGroupLabel iconLabel">Choose an icon: </label>
                <div className="groupIconGrid">
                  <label className="groupIconLabel">
                    <input type="radio" 
                    className="groupIconRadio" 
                    name="groupIcon"
                    value="pf1"
                    onChange={(e) => {
                      setNewGroupIcon(e.target.value)
                    }}
                    />
                    <img className="createGroupIcon" src={pf1} alt="Icon option 1, dog with green background"/>
                  </label>
                  <label className="groupIconLabel">
                    <input 
                    type="radio" 
                    className="groupIconRadio" 
                    name="groupIcon"
                    value="pf2"
                    onChange={(e) => {
                      setNewGroupIcon(e.target.value)
                    }}
                    />
                    <img className="createGroupIcon" src={pf2} alt="Icon option 2, dog with yellow background"/>
                  </label>
                  <label className="groupIconLabel">
                    <input 
                    type="radio" 
                    className="groupIconRadio" 
                    name="groupIcon"
                    value="pf3"
                    onChange={(e) => {
                      setNewGroupIcon(e.target.value)
                    }}
                    />
                    <img className="createGroupIcon" src={pf3} alt="Icon option 3, bunny with blue background"/>
                  </label>
                  <label className="groupIconLabel">
                    <input 
                    type="radio" 
                    className="groupIconRadio" 
                    name="groupIcon"
                    value="pf4"
                    onChange={(e) => {
                      setNewGroupIcon(e.target.value)
                    }}
                    />
                    <img className="createGroupIcon" src={pf4} alt="Icon option 4, fish with violet background"/>
                  </label>
                  <label className="groupIconLabel">
                    <input 
                    type="radio" 
                    className="groupIconRadio" 
                    name="groupIcon"
                    value="pf5"
                    onChange={(e) => {
                      setNewGroupIcon(e.target.value)
                    }}
                    />
                    <img className="createGroupIcon" src={pf5} alt="Icon option 5, fish with pink background"/>
                  </label>
                  <label className="groupIconLabel">
                    <input 
                    type="radio" 
                    className="groupIconRadio" 
                    name="groupIcon"
                    value="pf6"
                    onChange={(e) => {
                      setNewGroupIcon(e.target.value)
                    }}
                    />
                    <img className="createGroupIcon" src={pf6} alt="Icon option 6, seagull with orange background"/>
                  </label>
                  <label className="groupIconLabel">
                    <input 
                    type="radio" 
                    className="groupIconRadio" 
                    name="groupIcon"
                    value="pf7"
                    onChange={(e) => {
                      setNewGroupIcon(e.target.value)
                    }}
                    />
                    <img className="createGroupIcon" src={pf7} alt="Icon option 7, cat with yellow background"/>
                  </label>
                  <label className="groupIconLabel">
                    <input 
                    type="radio" 
                    className="groupIconRadio" 
                    name="groupIcon"
                    value="pf8"
                    onChange={(e) => {
                      setNewGroupIcon(e.target.value)
                    }}
                    />
                    <img className="createGroupIcon" src={pf8} alt="Icon option 8, catfish with blue background"/>
                  </label>
                  <label className="groupIconLabel">
                    <input 
                    type="radio" 
                    className="groupIconRadio" 
                    name="groupIcon"
                    value="pf9"
                    onChange={(e) => {
                      setNewGroupIcon(e.target.value)
                    }}
                    />
                    <img className="createGroupIcon" src={pf9} alt="Icon option 9, sharkhorse with pink background"/>
                  </label>  
                </div>
                <button type="submit" className="createGroupBtn">Create Group!</button>
              </form>
            </div>
        </div>
        }
      <main className="groupsWrapper">
        <div className="groupsBox">
          {groups.map((group, index) => (
            <React.Fragment key={group.id}>
              <div
                className="groupItem"
                onClick={() => handleGroupClick(group.id)}
                style={{ cursor: 'pointer' }}
              >
                <div className="groupLeft">
                  <div className="groupIcon" />
                  <span className="groupName">{group.name}</span>
                </div>
                <div className="groupMeta">Created by: {group.creator}</div> {/* ADDED: teksti hieman muutettu */}
              </div>

              {index < groups.length - 1 && <div className="divider" />}
            </React.Fragment>
          ))}
        </div>
      </main>
    </div>
  );
}

export default GroupsList
