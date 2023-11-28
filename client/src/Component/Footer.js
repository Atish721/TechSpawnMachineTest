import React from 'react';

const Footer = () =>{
    return(
        <>
            <footer style={{position: 'fixed', left: '0', bottom: '0', width: '100%', backgroundColor: 'rgb(196,196,196)', color: 'rgb(0,0,0)', textAlign: 'center'}}>
                <p className='pt-3'>Copyright &copy;{new Date().getFullYear()}&nbsp;Atish. All rights reserved.</p>
            </footer>
        </>
    )
}

export default Footer