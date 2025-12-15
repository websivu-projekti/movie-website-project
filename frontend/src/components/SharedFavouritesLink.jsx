import React from "react"

function SharedFavouritesLink({ userId }) {
  const shareUrl = `${window.location.origin}/shared-favourites/${userId}`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl)
    alert("Link copied!")
  }

  return (
    <div className="group-info-share-row" style={{ marginBottom: "20px" }}>
      <span>Share list:</span>
      <div className="share-list">
        <input type="text" readOnly value={shareUrl} className="share-input" />
        <button onClick={copyToClipboard} className="add-button">
          Copy link
        </button>
      </div>
    </div>
  )
}

export default SharedFavouritesLink