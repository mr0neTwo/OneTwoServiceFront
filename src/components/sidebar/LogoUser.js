import React from 'react';



function LogoUser() {
    
    return (
        <div className = 'avatar'> 
        
            <img 
                src = {`${process.env.PUBLIC_URL}/data/avatars/ava.jpeg`}
                className = 'imgAvatar' 
                alt = 'User avatar' 
            />
        </div>
    )
    
}

export default LogoUser;
