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
  const [deleteBtn, setDeleteBtn] = useState("Delete User");

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
    setDeleteBtn(<ButtonLoad />);
    try {
      const res = await axios.delete(`${serVer}/deleteUser/${userId}`);

      const { data } = res;

      console.log(data);

      setResult(data);

      // reload page
      refetch();
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setResult("");
      }, 3000);

      setDeleteBtn("Delete User");
    }
  };

  return (
    <div className="admin-users">
      <HeaderGoBack h1="Users" />
      <ul>
        {hasUsers ? (
          usersOnly.map((users) => {
            const time = new Date(users.createdAt).toLocaleDateString();

            return (
              <li key={users._id}>
                <div>
                  <div>
                    Name: <strong>{users.name}</strong>
                  </div>
                  <div>
                    Email: <strong>{users.email}</strong>
                  </div>
                  <div>
                    Role: <strong>{users.role}</strong>
                  </div>
                  <div>
                    Joined: <strong>{time}</strong>
                  </div>
                </div>
                <button onClick={() => deleteUser(users._id)}>
                  {deleteBtn}
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
