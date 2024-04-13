import { useQuery } from "react-query";
import { fetchUsers } from "../../Hooks/useFetch";
import PageLoader from "../../Animations/PageLoader";
import HeaderGoBack from "../../Custom/HeaderGoBack";
import axios from "axios";
import { useState } from "react";
import ButtonLoad from "../../Animations/ButtonLoad";

const serVer = `https://recycle-app-backend.vercel.app`;

const Users = () => {
  const [result, setResult] = useState("");
  const [loadingUsers, setLoadingUsers] = useState({}); // State to track loading state for each user

  const { data, isLoading, isError, refetch } = useQuery("users", fetchUsers);

  if (isLoading) return <PageLoader />;

  if (isError) {
    // logout if error
    return <div>Error fetching data</div>;
  }

  // filter out Admin
  const usersOnly = data.filter((users) => users.role !== "admin");

  const hasUsers = usersOnly.length > 0;

  // delete users
  const deleteUser = async (userId) => {
    // Set loading state for the clicked user
    setLoadingUsers((prevLoading) => ({
      ...prevLoading,
      [userId]: true,
    }));

    try {
      const res = await axios.delete(`${serVer}/deleteUser/${userId}`);

      const { data } = res;

      setResult(data);

      // reload page
      refetch();
    } catch (error) {
      setResult(error.response.data);
    } finally {
      setTimeout(() => {
        setResult("");
      }, 3000);

      // Reset loading state for the clicked user
      setLoadingUsers((prevLoading) => ({
        ...prevLoading,
        [userId]: false,
      }));
    }
  };

  return (
    <div className="admin-users">
      <HeaderGoBack h1="Users" />
      <ul>
        {hasUsers ? (
          usersOnly.map((user) => {
            const time = new Date(user.createdAt).toLocaleDateString();

            return (
              <li key={user._id}>
                <div>
                  <div>
                    Name: <strong>{user.name}</strong>
                  </div>
                  <div>
                    Email: <strong>{user.email}</strong>
                  </div>
                  <div>
                    Role: <strong>{user.role}</strong>
                  </div>
                  <div>
                    Joined: <strong>{time}</strong>
                  </div>
                </div>
                <button onClick={() => deleteUser(user._id)}>
                  {loadingUsers[user._id] ? <ButtonLoad /> : "Delete User"}
                </button>
              </li>
            );
          })
        ) : (
          <div>No users yet</div>
        )}
      </ul>
      <p className="error-p">{result}</p>
    </div>
  );
};

export default Users;
