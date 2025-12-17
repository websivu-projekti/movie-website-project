import React from "react"

function SharedFavouritesLink({ userId }) {
  const shareUrl = `${window.location.origin}/shared-favourites/${userId}`

  const copyToClipboard = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(shareUrl)
        .then(() => alert("Link copied!"))
        .catch(() => {
          fallbackCopy()
        })
    } else {
      fallbackCopy()
    }
  }

  const fallbackCopy = () => {
    const textArea = document.createElement("textarea")
    textArea.value = shareUrl
    textArea.style.position = "fixed"
    textArea.style.left = "-999999px"
    document.body.appendChild(textArea)
    textArea.select()
    try {
      document.execCommand('copy')
      alert("Link copied!")
    } catch (err) {
      alert("Could not copy link")
    }
    document.body.removeChild(textArea)
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