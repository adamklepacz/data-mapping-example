import React from 'react'

export interface UserProps {
  name: string
  lastName: string
  contact: {
    phone: string
    email: string
  }
}

const User: React.FC<UserProps> = ({ name, lastName, contact }) => {
  return (
    <div
      style={{
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '20px',
        margin: '10px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      <h1 style={{ color: '#333', fontSize: '24px' }}>User Component</h1>
      <p style={{ color: '#666', fontSize: '16px' }}>Name: {name}</p>
      <p style={{ color: '#666', fontSize: '16px' }}>Last Name: {lastName}</p>
      <p style={{ color: '#666', fontSize: '16px' }}>Phone: {contact.phone}</p>
      <p style={{ color: '#666', fontSize: '16px' }}>Email: {contact.email}</p>
    </div>
  )
}

export default User
