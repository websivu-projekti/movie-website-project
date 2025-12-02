import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from '../components/header.jsx'
import "./MyGroups.css"

function MyGroups() {
  const navigate = useNavigate();
  const [ searchQuery, setSearchQuery ] = useState('')

  const groups = [
    { id: 1, name: "Group 1", creator: "User 1" },
    { id: 2, name: "Group 2", creator: "User 2" },
    { id: 3, name: "Group 3", creator: "User 3" }
  ];

  const handleGroupClick = (groupId) => {
    navigate(`/groups/${groupId}`)
  }

  return (
    <div className="container">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>

      <div className="my-groups-container">
        <h1 className="groups-title">My Groups</h1>
        <div className="groups-box">
          {/* ryhmien cardit tänne */}
        </div>
      </div>

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
                <div className="groupMeta">List by: {group.creator}</div>
              </div>

              {index < groups.length - 1 && <div className="divider" />}
            </React.Fragment>
          ))}
        </div>
      </main>
    </div>
  );
}

export default MyGroups
