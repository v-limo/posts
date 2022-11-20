import { useAppSelector } from '../app/hooks';
import Users from '../components/Users';

function UsersPage() {
  const { users } = useAppSelector((state) => state.users)
  return (
    <div className="bg-gray-200  p-20 pt-2 min-h-screen  display: flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold text-center text-gray-700">All Users</h1>
      <Users users={users} />
    </div>
  )
}

export default UsersPage
