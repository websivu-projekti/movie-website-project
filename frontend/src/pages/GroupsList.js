import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
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
  const [ showCreateGroup, setShowCreateGroup ] = useState(false)

  // ADDED: esimerkkiryhmät (kaikki ryhmät)
  const groups = [
    { id: 1, name: "Group 1", creator: "User 1" },
    { id: 2, name: "Group 2", creator: "User 2" },
    { id: 3, name: "Group 3", creator: "User 3" },
    { id: 4, name: "Group 4", creator: "User 4" },
    { id: 5, name: "Group 5", creator: "User 5" }
  ];

  const handleGroupClick = (groupId) => {
    navigate(`/groups/${groupId}`) // vie yksittäisen ryhmän sivulle
  }

  const openCreateGroup = () => {
    setShowCreateGroup(!showCreateGroup)
  }
  const closeCreateGroup = () => {
    setShowCreateGroup(!showCreateGroup)
  }

  return (
    <div className="container">
      <Header/>

      <div className="my-groups-container">
        <div className="topContainer">
          <h1 className="groups-title">All Groups</h1> {/* ADDED: otsikko yleiselle listalle */}
          <button className="createBtn" onClick={openCreateGroup}>Create Group</button>
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
              <form className="createGroupForm">
                <label className="createGroupLabel nameLabel">Group Name: 
                <input className="createGroupInput nameInput" type="text" placeholder="Enter group name..."></input>
                </label>
                <label className="createGroupLabel iconLabel">Choose an icon: </label>
                <div className="groupIconGrid">
                  <img className="createGroupIcon" src={pf1}/>
                  <img className="createGroupIcon" src={pf2}/>
                  <img className="createGroupIcon" src={pf3}/>
                  <img className="createGroupIcon" src={pf4}/>
                  <img className="createGroupIcon" src={pf5}/>
                  <img className="createGroupIcon" src={pf6}/>
                  <img className="createGroupIcon" src={pf7}/>
                  <img className="createGroupIcon" src={pf8}/>
                  <img className="createGroupIcon" src={pf9}/>
                </div>
                <button className="createGroupBtn">Create Group!</button>
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
