const ProfileHeader = () => {
   return (
      <div className="user-info">
         <div className="container">
            <div className="row">
               <div className="col-xs-12 col-md-10 offset-md-1">
                  <img src="http://i.imgur.com/Qr71crq.jpg" className="user-img"/>
                  <h4>Eric Simons</h4>
                  <p>
                     Cofounder @GoThinkster, lived in Aol's HQ for a few months, kinda looks like Peeta from
                     the Hunger Games
                  </p>
                  <button className="btn btn-sm btn-outline-secondary action-btn">
                     <i className="ion-plus-round"></i>
                     &nbsp; Follow Eric Simons
                  </button>
                  <button className="btn btn-sm btn-outline-secondary action-btn">
                     <i className="ion-gear-a"></i>
                     &nbsp; Edit Profile Settings
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ProfileHeader;