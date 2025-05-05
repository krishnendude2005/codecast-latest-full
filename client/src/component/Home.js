import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { v4 as uuid } from 'uuid';
import { useNavigate } from 'react-router-dom';

function Home() {
    const [roomId, setRoomId] = useState("");
    const [username, setUsername] = useState("");
  const navigate = useNavigate();

    const generateRoomId = (e) => {
        e.preventDefault();
        const id = uuid();
        setRoomId(id);
        toast.success("Room ID is generated");
    }

    const joinRoom = ()=> {
        if(!roomId || !username) {
            toast.error("Both Room ID and Username required");
            return;
        }
        //navigate
       navigate(`/editor/${roomId}`, {
        state: {username}
      });
      toast.success("Room is created")
    }
    return (
        <div className='container-fluid'>
            <div className='row justify-content-center align-items-center min-vh-100'>
                <div className='col-12 col-md-6'>
                    <div className='card shadow-sm p-2 mb-5 bg-secondary rounded'>
                        <div className='card-body text-center bg-dark'>

                            {/* Logo */}
                            <img className='img-fluid mx-auto d-block' src='/images/code-sync.png' alt='codesync'
                                style={{ maxWidth: "150px" }}
                            />

                            {/* Heading */}
                            <h4 className='text-light mt-2'> <span>Enter ROOM ID & Username</span></h4>

                            {/* Form */}
                            <div className='form-group'>
                                <input
                                    onChange={(e) => setRoomId(e.target.value)}
                                    value={roomId}
                                    type='text' className='form-control mb-2' placeholder='ROOM ID'
                                />
                            </div>
                            <div className='form-group'>
                                <input
                                    value={username}
                                    onChange={ (e) => setUsername(e.target.value)}
                                    type='text' className='form-control mb-2' placeholder='Username'
                                />
                            </div>

                            {/* Join Button */}
                            <button 
                            onClick={joinRoom}
                            className='btn btn-success btn-lg btn-block mt-2'>JOIN</button>
                            <p className='mt-3 text-light'>
                                Don't have a ROOM ID ?
                                <span
                                    className='text-success p-2' style={{ cursor: 'pointer' }}
                                    onClick={generateRoomId}
                                >
                                    New Room
                                </span>
                            </p>
                            <p>Developed by Krishnendu De</p>
                        </div>
                    </div>
                </div>
            </div>
           
        </div>
    )
}

export default Home