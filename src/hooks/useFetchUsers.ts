import { useState, useEffect } from 'react'
import { UserProps } from '../components/User'

/**
 * Types created based on the SWAGGER documentation
 */
interface AddressDTO {
  street: string
  suite: string
  city: string
  zipcode: string
  geo: {
    lat: string
    lng: string
  }
}

/**
 * Types created based on the SWAGGER documentation
 */
interface CompanyDTO {
  name: string
  catchPhrase: string
  bs: string
}

/**
 * Types created based on the SWAGGER documentation
 */
interface UserDTO {
  id: number
  name: string
  username: string
  email: string
  address: AddressDTO
  phone: string
  website: string
  company: CompanyDTO
}

/**
 * This function serves as an adapter that maps data from the UserDTO interface,
 * which is structured according to the REST API response, to the UserProps interface
 * expected by the frontend components. This technique, often related to the Adapter Pattern,
 * is a crucial practice in software development for several reasons:
 *
 * 1. **Decoupling**: It decouples the frontend components from the specific structure of the
 *    backend data model. Changes in the backend data structure do not directly impact the
 *    frontend, making the application more resilient to changes.
 *
 * 2. **Flexibility and Reusability**: By abstracting the data transformation logic into this
 *    mapping function, we can easily adapt to new requirements or changes in the data model
 *    without significant rewrites. This makes our code more flexible and reusable.
 *
 * 3. **Maintainability**: It simplifies the maintenance of the codebase by isolating the
 *    transformation logic in a single location. This separation of concerns makes it easier
 *    to update the data mapping logic as needed without affecting the rest of the application.
 *
 * Utilizing this technique effectively reduces tight coupling between the frontend and the
 * REST API, leading to a more modular, maintainable, and adaptable application architecture.
 */
const mapUserDTOToUserProps = (fetchedUsers: UserDTO[]): UserProps[] => {
  return fetchedUsers.map((user) => ({
    name: user.name.split(' ')[0],
    lastName: user.name.split(' ')[1] || '',
    contact: {
      phone: user.phone,
      email: user.email,
    },
  }))
}

const useFetchUsers = () => {
  const [users, setUsers] = useState<UserProps[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/users'
        )
        if (!response.ok) {
          throw new Error('Failed to fetch users')
        }
        const fetchedUsers: UserDTO[] = await response.json()

        const mappedUsers = mapUserDTOToUserProps(fetchedUsers)
        setUsers(mappedUsers)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  return { users, loading, error }
}

export default useFetchUsers
