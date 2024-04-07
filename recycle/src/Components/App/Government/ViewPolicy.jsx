import { useQuery } from "react-query";
import PageLoader from "../../Animations/PageLoader";
import { fetchPolicies, fetchUser } from "../../Hooks/useFetch";
import axios from "axios";
import HeaderGoBack from "../../Custom/HeaderGoBack";
import ButtonLoad from "../../Animations/ButtonLoad";
import { useState } from "react";

const serVer = `http://localhost:2244`;

const ViewPolicy = () => {
  const [deleteBtn, setDeleteBtn] = useState("Delete Policy");
  const [result, setResult] = useState("");

  const {
    data: userData,
    isLoading: userLoading,
    isError: userError,
  } = useQuery("user", fetchUser);

  const { data, isLoading, isError, refetch } = useQuery(
    "policy",
    fetchPolicies
  );

  if (isLoading || userLoading) return <PageLoader />;

  if (isError || userError || !data) {
    // logout if error
    return <div>Error fetching data</div>;
  }

  const { name } = userData;

  const hasPolicy = data && data.length > 0;

  const deletePolicy = async (policy) => {
    setDeleteBtn(<ButtonLoad />);
    try {
      const res = await axios.delete(`${serVer}/delete-policy/${policy}`);

      const { data } = res;
      console.log(res);
      setResult(data);
      refetch();
    } catch (error) {
      console.log(error);
    } finally {
      setDeleteBtn("DeletePolicy");

      setTimeout(() => {
        setResult("");
      }, 3000);
    }
  };

  return (
    <div className="admin-users">
      <HeaderGoBack h1="List of Policies" />
      <ul>
        {hasPolicy ? (
          data.map((policy) => (
            <li key={policy._id}>
              <h3>name: {policy.policyName}</h3>
              <p>Author: {policy.authorName}</p>
              <p>Description: {policy.description}</p>
              {name === policy.authorName && (
                <button onClick={() => deletePolicy(policy._id)}>
                  {deleteBtn}
                </button>
              )}
            </li>
          ))
        ) : (
          <div>No policies posted yet</div>
        )}
      </ul>
      <p className="error-p">{result}</p>
    </div>
  );
};

export default ViewPolicy;
