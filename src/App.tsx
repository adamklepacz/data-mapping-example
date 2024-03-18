import './App.css'
import User from './components/User'
import useFetchUsers from './hooks/useFetchUsers'

function App() {
  const { users, loading, error } = useFetchUsers()

  return (
    <>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridAutoRows: 'auto',
          gap: '32px',
        }}
      >
        {loading ? (
          <h1>Loading...</h1>
        ) : error ? (
          <h1>{error}</h1>
        ) : (
          users.map((user) => (
            <User
              key={user.name}
              name={user.name}
              lastName={user.lastName}
              contact={{
                phone: user.contact.phone,
                email: user.contact.email,
              }}
            />
          ))
        )}
      </div>
    </>
  )
}

export default App
