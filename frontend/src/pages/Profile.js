import React from "react"
import { useNavigate } from "react-router-dom"
import Header from "../components/header.jsx"
import "./Profile.css"

export default function Profile() {
    const navigate = useNavigate()

    const lists = [
        { id: 1, name: "Placeholder List 1", count: 10 },
        { id: 2, name: "Placeholder List 2", count: 8 },
        { id: 3, name: "Placeholder List 3", count: 12 },
        { id: 4, name: "Placeholder List 4", count: 5 },
    ]

    return (
        <div>
            <Header />

            <div className="profileContainer">
                <div className="profileHeader">
                    <div className="profileInfo">
                        <div className="profilePic">User</div>
                        <span className="username">user123</span>
                    </div>
                    <button className="editProfileBtn" onClick={() => navigate("/editprofile")}>
                        Edit Profile
                    </button>
                </div>

                <div className="profileListsHeader">
                    <span className="sectionTitle">Username's Lists</span>
                    <button className="createListBtn">Create List</button>
                </div>

                <div className="listsGrid">
                    {lists.map(list => (
                        <div key={list.id} className="listCard">
                            <div className="listImages">
                                <div className="listImage placeholder"></div>
                                <div className="listImage placeholder"></div>
                                <div className="listImage placeholder"></div>
                                <div className="listImage placeholder"></div>
                            </div>
                            <div className="listInfo">
                                <span className="listName">{list.name}</span>
                                <span className="listCount">{list.count} films</span>
                            </div>
                        </div>
                    ))}
                </div>

                <button className="myGroupsBtn" onClick={() => navigate("/mygroups")}>
                    My Groups
                </button>
            </div>
        </div>
    )
}
