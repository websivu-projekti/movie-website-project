import React from "react"
import { useNavigate } from "react-router-dom"
import "./MyGroups.css"


function MyGroups() {
return (
<div className="container">
<header>
<h1 className="title">Clipper</h1>


<div className="searchBox">
<input type="text" className="searchInput" placeholder="Search" />
</div>
</header>


<div className="buttonBox">
<button>Films</button>
<button>Now in Cinema</button>
<button>MyGroups</button>
<button>Profile</button>
</div>

<div className="my-groups-container">
  <h1 className="groups-title">My Groups</h1>
  <div className="groups-box">
    {/* ryhmien cardit tänne */}
  </div>
</div>


<main className="groupsWrapper">
<div className="groupsBox">


<div className="groupItem">
<div className="groupLeft">
<div className="groupIcon" />
<span className="groupName">Group 1</span>
</div>
<div className="groupMeta">List by: User 1</div>
</div>


<div className="divider" />


<div className="groupItem">
<div className="groupLeft">
<div className="groupIcon" />
<span className="groupName">Group 2</span>
</div>
<div className="groupMeta">List by: User 2</div>
</div>


<div className="divider" />


<div className="groupItem">
<div className="groupLeft">
<div className="groupIcon" />
<span className="groupName">Group 3</span>
</div>
<div className="groupMeta">List by: User 3</div>
</div>


</div>
</main>
</div>
)
}


export default MyGroups