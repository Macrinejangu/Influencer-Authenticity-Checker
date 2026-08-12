import {useEffect, useState} from "react"
import './Loading.css'

/**
 * LoadingScreen
 * It will display when  the app verifies product/customer authenticity.

 */
function Loading({ progress, message = "Checking authenticity..." }) {
 
  return (
    <div className="loading-screen">
      <div className="loading-screen__content">
        <div className="loading-screen__spinner">
          <div className="loading-screen__ring" />
          <div className="loading-screen__ring loading-screen__ring--accent" />
        </div>

        <p className="loading-screen__message">{message}</p>

        <div className="loading-screen__progress-track">
          <div
            className="loading-screen__progress-fill"
            
          />
        </div>
      </div>
    </div>
  );
}
export default Loading;