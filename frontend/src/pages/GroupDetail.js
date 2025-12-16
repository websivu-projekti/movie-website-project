import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Header from '../components/header.jsx'
import { useAuth } from "../context/AuthContext.js"
import "../index.css"
import "./GroupDetail.css" 
import closeMenu from "../assets/closemenu.svg"
import { Rating, Star } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

function GroupDetail() {
  const { groupId } = useParams()
  const { user } = useAuth()
  const nav = useNavigate()
  const [ movies, setMovies] = useState([])
  const [ groupInfo, setGroupInfo ] = useState([])
  const [ groupMembers, setGroupMembers ] = useState([])
  const [ error, setError ] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isMember, setIsMember] = useState(false)
  const [isOwner, setIsOwner] = useState(false)
  const [requestSent, setRequestSent] = useState(false)
  const [ showUserManagement, setShowUserManagement ] = useState(false)

  const [status, setStatus] = useState({
  isMember: false,
  isOwner: false,
  requestSent: false
  });
  
  const [joinRequests, setJoinRequests] = useState([]);

  const customRating = {
        itemShapes: Star,
        activeFillColor: '#90e339',
        inactiveFillColor: '#cdf0a8'
      }

  useEffect(() => {
    async function fetchGroupInfo(){
      try{
        const res = await fetch(`${process.env.REACT_APP_API_URL}/groups/group/${groupId}`)
        if(!res.ok){
          if(res.status === 404){
            setError("Group not found")
          }else{
            const text = await res.text()
            setError(`Error fetching movie: ${res.status} ${text}`)
          }
          return
      }
      
      const data = await res.json()
      setGroupInfo(data.group)
      setGroupMembers(data.groupMembers)
    }catch(err){
      console.error(err)
    } finally{
      setLoading(false)
    }
    }
    fetchGroupInfo()
  }, [groupId])

  useEffect(() =>{
    if(user && user.token){
      fetchGroupContent()
    }
  }, [user])

  async function fetchGroupContent(){
      try{
        const res = await fetch(`${process.env.REACT_APP_API_URL}/groups/groupcontent/${groupId}`, {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        })
        if(!res.ok){
          if(res.status === 404){
            setError("Group content not found")
          }else{
            const text = await res.text()
            setError(`Error fetching group content: ${res.status} ${text}`)
          }
          return
      }
      
      const data = await res.json()
      setMovies(data.content)
      }catch(err){
        console.error(err)
      }finally{
        setLoading(false)
      }
    }

    useEffect(() => {
    async function fetchGroupStatus() {
      if(!user || !user.token) return

      const res = await fetch(`${process.env.REACT_APP_API_URL}/groups/${groupId}/status`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      if (res.ok) {
        const data = await res.json()
        setIsMember(data.isMember)
        setIsOwner(data.isOwner)
        setRequestSent(data.requestSent)
        setStatus(data)
      }
    }
    fetchGroupStatus()
  }, [groupId, user])

  useEffect(() => {
    async function fetchJoinRequests() {
      if(!user || !user.token || !status.isOwner) return

      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/groups/${groupId}/requests`, {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        })
        if (res.ok) {
          const data = await res.json()
          setJoinRequests(data.requests || [])
        }
      } catch (err) {
        console.error("Failed to fetch join requests:", err)
      }
    }
    fetchJoinRequests()
  }, [groupId, user, status.isOwner])

  const handleJoinRequest = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/groups/join-request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify({group_id: groupId})
      })

      const data = await res.json()

      if(!res.ok) throw new Error(data.error || "Join request failed") 
      
      alert("Join request sent!")
      setStatus(prev => ({ ...prev, requestSent: true }));
    } catch (err) {
      console.error(err)
      alert("Error sending join request")
    }
  }

  const handleApproveRequest = async (requestId) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/groups/requests/${requestId}/approve`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })

      if (!res.ok) throw new Error("Failed to approve request")
      
      alert("Request approved!")
      setJoinRequests(prev => prev.filter(req => req.request_id !== requestId))
      //päivittää näkymän/statuksen omistajalle
      const statusRes = await fetch(`${process.env.REACT_APP_API_URL}/groups/${groupId}/status`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      if (statusRes.ok) {
        const data = await statusRes.json()
        setStatus(data)
      }
    } catch (err) {
      console.error(err)
      alert("Error approving request")
    }
  }

  const handleRejectRequest = async (requestId) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/groups/requests/${requestId}/reject`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })

      if (!res.ok) throw new Error("Failed to reject request")
      
      alert("Request rejected")
      setJoinRequests(prev => prev.filter(req => req.request_id !== requestId))
      // Päivittää näkymän kaikille
      const statusRes = await fetch(`${process.env.REACT_APP_API_URL}/groups/${groupId}/status`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      if (statusRes.ok) {
        const data = await statusRes.json()
        setStatus(data)
      }
    } catch (err) {
      console.error(err)
      alert("Error rejecting request")
    }
  }
    
  const handleRemoveFromGroup = async (contentId) => {
      try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/groups/remove`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({ 
              groupId: groupId,
              contentId: contentId
            })
          })
          if (response.ok) {
            setMovies(movies.filter(mov => mov.content_id !== contentId))
          } else {
            const data = await response.json()
            alert(`Error: ${data.error}`)
          }
        } catch (err) {
          alert(`Error: ${err.message}`)
        }
    }

    const handleDeleteGroup = async (groupId)=>{
      try{
        const response = await fetch(`${process.env.REACT_APP_API_URL}/groups/deletegroup`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          },
          body: JSON.stringify({
            groupId: groupId
          })
        })
        if(response.ok){
          alert("Group deleted!")
          nav("/groupslist")
        }
      }catch(error){
        alert(`Error: ${error.message}`)
      }
    }

  const handleLeaveGroup = async (groupId)=>{
    try{
      const response = await fetch(`${process.env.REACT_APP_API_URL}/groups/leavegroup`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          },
          body: JSON.stringify({
            groupId: groupId
          })
      })
      if(response.ok){
        alert("Successfully left from group!")
        nav("/groupslist")
      }
    }catch(error){
      alert(`Error: ${error.message}`)
    }
  }

  const openUserManagement = () => {
    setShowUserManagement(!showUserManagement)
  }

  const closeUserManagement = () => {
    setShowUserManagement(!showUserManagement)
  }

  if(loading){
    return(
      <div className ="container">
          <p>Loading group...</p>
        </div>
    )
  }

  return (
    <div className="container">
      <Header/>

      <div className="group-container">
        {showUserManagement && (
            <div className="group-menu-container">
              <div className="group-manage-users">
                <div className="manage-members-list">
                  <div className="manage-members-header">
                    <h2 className="manage-members-title">Manage Users: </h2>
                    <button onClick={closeUserManagement} className="close-group-management">
                      <img src={closeMenu}/>
                    </button>
                    {!status.isOwner && status.isMember && (
                      <div className="group-manage-users">You must be a group's owner to manage members</div>
                    )}
                  </div>
                  {groupMembers.map((member, index) => (
                    <div key={index} className="manage-member">
                      <img className="memberPfp" src={member.img || ""} />
                      <span>{member.username} {groupMembers[index].is_owner ? "(Owner)" : "(Member)"}</span>
                      {!groupMembers[index].is_owner && status.isOwner && (
                        <button className="group-button">Remove from group</button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
        )}
        
        <div className="group-header">
          <h1 className="group-title">
             {`${groupInfo.group_name}` || "Group List Name"}
          </h1>
          {!status.isOwner && !status.isMember && !status.requestSent &&(
              <div className="group-buttons-row group-join-request">
                <div className="join-request">You must be a member of the group to see it's content</div>
                <button className="group-button" onClick={handleJoinRequest}>Request to Join Group</button>
                </div>
              )}

              {status.requestSent && !status.isMember &&(
                <p>Your join request is waiting for approval</p>
              )}

              {status.isOwner && (
                <div>
                  <p>You are the owner of this group</p>
                  {joinRequests.length > 0 && (
                    <div>
                      <h3>Join Requests:</h3>
                      {joinRequests.map(req => (
                        <div className="group-join-request" key={req.request_id}>
                          <span className="join-request">{req.username} wants to join</span>
                          <button className="group-button" onClick={() => handleApproveRequest(req.request_id)}>Approve</button>
                          <button className="group-button" onClick={() => handleRejectRequest(req.request_id)}>Reject</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              
              {status.isMember && !status.isOwner && (
                <p>You are a member of this group</p>
              )}
         
          <div className="group-info-row">
            {status.isMember && (
              <>
            <span className="group-info-text"></span>
            <div className="group-buttons-row">
              <button onClick={openUserManagement} className="group-button">Manage users</button>
              <button onClick={() => handleLeaveGroup(groupId)} className="group-button">Leave group</button>
              {status.isOwner &&(<button onClick={() => handleDeleteGroup(groupId)} className="group-delete-button">Delete group</button>)}

              

            </div>
            <div className="group-info-share-row">
              <div className="share-list">
                <span className="group-info-text">Share list</span>
                <input
                  className="share-input"
                  value={`https://url.com/list_${groupInfo.group_id || "name"}`} 
                  readOnly
                />
              </div>
              <button className="group-button">Copy link</button>
            </div>
            </>
            )}
          </div>
         
        </div>
         {status.isMember && (
          <React.Fragment>
        <div className="group-members">
          Members ({groupMembers.length}):
        </div>
        <div className="members-list">
          {groupMembers.slice(0, 4).map((member, index) => (
            <div key={index} className="member">
              <img src={member.img || ""} />
              <span><a href={`/profile/${member.user_id}`}>{member.username}</a></span>
            </div>
          ))}
          <span onClick={openUserManagement} className="see-all">, See all...</span>
        </div>

        <div className="group-content">
          {movies.map((movie) => (
            <div key={movie.content_id} className="group-movie-card-wrapper">
              <div className="group-movie-card">
                <div className="group-movie-image">
                  {movie.poster_url ? <img className="group-movie-image"src={movie.poster_url} alt={movie.title} /> : "Image"}
                </div>
                <div className="group-movie-title"><a className="group-movie-title" href={`/movieinfo/${movie.tmdb_id}`}>{movie.title}</a></div>
                <div className="group-movie-details"> {movie.release_year} | {movie.director}</div>

                <div className="group-movie-extra">
                  <div className="group-movie-details">{movie.genre?.replace(/[^a-zA-Z ]/g, " ")}</div>
                </div>
                <button className="group-delete-button" onClick={() => handleRemoveFromGroup(movie.content_id)}>Delete from Group</button>
              </div>
            </div>
          ))}
        </div>
        </React.Fragment>
        )}
      </div>
    </div>
  )
}

export default GroupDetail
