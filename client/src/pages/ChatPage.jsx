import React, { useContext, useEffect, useRef, useState } from 'react';
import { ChatContext } from '../context/ChatContext';
import { AuthContext } from '../context/AuthContext';
import { FaPaperPlane, FaSearch } from 'react-icons/fa';
import { IoMdInformationCircleOutline } from 'react-icons/io';

const ChatPage = () => {
  const {
    users,
    getUsers,
    selectedUser,
    setSelectedUser,
    getMessages,
    messages,
    sendMessage,
  } = useContext(ChatContext);
  const { authUser } = useContext(AuthContext);

  const [text, setText] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (selectedUser) getMessages(selectedUser._id);
  }, [selectedUser]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!text.trim()) return;
    await sendMessage({ message: text });
    setText('');
  };

  return (
    <div className="h-screen w-screen bg-[#090E24] text-white flex overflow-hidden relative">
      {/* Background blur blob */}
      <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-purple-700 blur-[150px] opacity-40 z-0"></div>

      {/* Sidebar */}
      <div className="z-10 w-1/3 max-w-sm bg-[#141627] p-4 flex flex-col gap-4 border-r border-[#2E2F3A]">
        <h1 className="text-xl font-bold mb-2">💬 QuickChat</h1>

        <div className="relative">
          <input
            className="w-full p-2 pl-10 bg-[#1F2235] text-white rounded-lg placeholder:text-gray-400"
            placeholder="Search User..."
          />
          <FaSearch className="absolute top-3 left-3 text-gray-400" />
        </div>

        <div className="overflow-y-auto flex-1">
          {users.map((user) => (
            <div
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-[#1F2235] ${
                selectedUser?._id === user._id ? 'bg-[#1F2235]' : ''
              }`}
            >
              <div className="w-10 h-10 bg-gray-500 rounded-full" />
              <div>
                <div className="font-medium">{user.fullName}</div>
                <div className="text-sm text-gray-400">
                  {user.isOnline ? 'Online' : 'Offline'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="z-10 flex-1 bg-[#1F2235] flex flex-col p-4 justify-between">
        {/* Chat Header */}
        <div className="flex items-center justify-between border-b border-[#2E2F3A] pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-500 rounded-full" />
            <div>
              <div className="font-semibold">{selectedUser?.fullName || 'No user selected'}</div>
              {selectedUser && (
                <div className="text-sm text-gray-400">
                  {selectedUser.isOnline ? 'Online' : 'Offline'}
                </div>
              )}
            </div>
          </div>
          <IoMdInformationCircleOutline className="text-2xl text-gray-400" />
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto mt-4 space-y-2 pr-2">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className={`max-w-xs p-2 rounded-xl text-sm ${
                msg.senderId === authUser._id
                  ? 'bg-gradient-to-br from-purple-700 to-purple-500 self-end ml-auto text-white'
                  : 'bg-[#2A2E4A] text-white'
              }`}
            >
              {msg.message}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        {selectedUser && (
          <div className="flex items-center gap-3 mt-4 border-t border-[#2E2F3A] pt-3">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Send a message"
              className="flex-1 p-2 bg-[#292D45] rounded-full text-white placeholder-gray-400"
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend} className="p-2 bg-purple-600 rounded-full hover:bg-purple-700">
              <FaPaperPlane />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
