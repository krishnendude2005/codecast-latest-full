import React, { useEffect, useRef, useState } from 'react'
import Client from './Client';
import Editor from './Editor';
import { initSocket } from '../socket'
import { useLocation, useParams, useNavigate, Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';
function EditorPage() {
  const [clients, setClient] = useState([]);
  const codeRef = useRef(null);

  const socketRef = useRef(null);
  const location = useLocation();
  const { roomId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on('connect_error', (err) => handleError(err));
      socketRef.current.on('connect_failed', (err) => handleError(err));

      const handleError = (e) => {
        console.log('socket error => ', e);
        toast.error("Socket Connection failed");
        navigate("/");
      }
      socketRef.current.emit('join', {
        roomId,
        username: location.state?.username,
      });
      socketRef.current.on('joined', ({ clients, username, socketId }) => {
        if (username !== location.state.username) {
          toast.success(`${username} joined`);
        }
        setClient(clients);
        socketRef.current.emit('sync-code', {
          code: codeRef.current,
          socketId,
        });
      });
      //disconnected
      socketRef.current.on('disconnected', ({ socketId, username }) => {
        toast.success(`${username} left the room`);
        setClient((prev) => {
          return prev.filter(
            (client) => client.socketId !== socketId
          )
        })
      })
    };
    init();

    return () => {
      socketRef.current.disconnect();
      socketRef.current.off('joined');
      socketRef.current.off('disconnected');
    }
  }, []);



  if (!location.state) {
    return <Navigate to="/" />
  }


  //copy room ID & leave room BUTTONS functionality
  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success("ROOM ID copied");
    } catch (error) {
      toast.error("Unable to copy ROOM ID")
    }
  }

  const leaveRoom = () => {
    navigate('/');
  }


  return (
    <div className='container-fluid vh-100'>
      <div className='row h-100'>

        {/* Left Column - Members*/}
        <div className='col-md-2 bg-dark text-light d-flex flex-column h-100' style={{ boxShadow: "2px 0px 4px rgba(0,0,0,0.1)" }}>
          {/* Logo */}
          <img src='/images/code-sync.png' alt='codesync' className='img-fluid mx-auto' style={{ maxWidth: "150px", marginTop: "3px" }} />
          <hr />
          {/* Client List Container*/}
          <div className='d-flex flex-column overflow-auto'>
            {clients.map((client) => (
              <Client key={client.socketId} username={client.username} />
            ))}
          </div>
          {/* Buttons */}
          <div className='mt-auto'>
            <hr />
            <button className='btn btn-success mb-2' onClick={copyRoomId}>
              Copy Room ID
            </button>
            <button className='btn btn-danger mb-2 px-3 btn-block' onClick={leaveRoom}>
              Leave Room
            </button>
          </div>
        </div>

        {/* Right Column  - Editor*/}
        <div className='col-md-10 text-light d-flex flex-column h-100'>
          <Editor socketRef={socketRef} roomId={roomId} onCodeChange={(code) => codeRef.current = code} />
        </div>




      </div>

    </div>
  )
}

export default EditorPage