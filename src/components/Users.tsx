import { UsersProps } from '../types/userTypes';
import User from './User';

function Users({ users }: UsersProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {users.map((user) => (
        <User user={user} key={user.id} />
      ))}
    </div>
  )
}

export default Users
