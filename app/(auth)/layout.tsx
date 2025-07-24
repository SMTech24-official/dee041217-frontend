import React from 'react';
import background from '@/assets/images/background.png';

function layout({children}: {children: React.ReactNode}) {
    return (
        <div  style={{
            backgroundImage: `url(${background.src})`,
            backgroundAttachment: "fixed", // ensures background stays fixed
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            color: "white",
          }}>
            {children}
        </div>
    );
}

export default layout;