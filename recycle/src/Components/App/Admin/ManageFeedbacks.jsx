import { useQuery } from "react-query";
import { fetchFeedbacks } from "../../Hooks/useFetch";
import PageLoader from "../../Animations/PageLoader";
import HeaderGoBack from "../../Custom/HeaderGoBack";

const ManageFeedbacks = () => {
  const { data, isLoading, isError } = useQuery("feedbacks", fetchFeedbacks);

  if (isLoading) return <PageLoader />;

  if (isError || !data) {
    // logout if error
    return <div>Error fetching data </div>;
  }

  const hasFeedbacks = data.length > 0;

  return (
    <div className="admin-users">
      <HeaderGoBack h1="Feedbacks" />
      <ul>
        {hasFeedbacks ? (
          data.map((feedback) => {
            return (
              <li key={feedback._id}>
                <div>
                  by: <strong>{feedback.feedbackBy}</strong>
                </div>
                <div>
                  description: <strong>{feedback.feedback}</strong>
                </div>
              </li>
            );
          })
        ) : (
          <div>No feedbacks yet</div>
        )}
      </ul>
    </div>
  );
};

export default ManageFeedbacks;
