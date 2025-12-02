import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./GroupsList.css" // ADDED: uusi CSS tiedosto, voit kopioida MyGroups.css tyylit tähän
import Header from '../components/header.jsx' // ADDED: Header komponentti

function GroupsList() {
  const navigate = useNavigate();
  const [ searchQuery, setSearchQuery ] = useState('')

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

  return (
    <div className="container">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>

      <div className="my-groups-container">
        <h1 className="groups-title">All Groups</h1> {/* ADDED: otsikko yleiselle listalle */}
        <div className="groups-box">
          {/* ryhmien cardit voidaan lisätä tähän */}
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
