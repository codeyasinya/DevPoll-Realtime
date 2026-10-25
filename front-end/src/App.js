

import React, {useEffect, useState} from 'react';
import io from 'socket.io-client';
const socket = io('http://localhost:5000');
function App()
{
    const [votes,setVotes]= useState({
        JavaScript: 0,
        Python: 0,
        CPlusPlus: 0,
    });


    useEffect(()=> {
        socket.on('updateVotes',(updatedVotes) => {
            console.log('Frontend recived updates votes:',updatedVotes);
            setVotes(updatedVotes);
        });

        return ()=>{
            socket.off('updateVotes');
        };
    },[]);

    
    const castVotes = (option) => {
         console.log('button recived updates votes:',option);
        socket.emit('castVote',option);
    };
    
    return (
        <div style={{padding : '20px',
            fontFamily : 'sans-serif',
            maxWidth : '600px',
            margin : '0 auto',
            width :'100%',
            boxSizing : 'border-box'
        }}>
            <h1> Real-Time Voting App</h1>
            <div>
            {Object.keys(votes).map((option)=>(
            <div key={option} style={{margin : '10px 0'}}>
                <span>
                    <strong>
                        {option}:
                    </strong>
                    {
                        votes[option]
                    }
                    votes
                </span>
                <button onClick={()=> castVotes(option)}>Vote</button>
            </div>
        ))}
        </div>
        </div>

    );

}

export default App; 

