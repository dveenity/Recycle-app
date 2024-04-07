const serVer = `https://recycle-app-backend.vercel.app`;
const token = localStorage.getItem("recycle-users");

// fetch logged in user
export const fetchUser = async () => {
  const response = await fetch(`${serVer}/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

// fetch all users
export const fetchUsers = async () => {
  const response = await fetch(`${serVer}/users`);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

// fetch logged in researcher pdf
export const fetchPDF = async () => {
  const response = await fetch(`${serVer}/viewResearch`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

// fetch all policies
export const fetchPolicies = async () => {
  const response = await fetch(`${serVer}/viewPolicy`);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

// fetch all recycled Items
export const fetchRecycledItems = async () => {
  const response = await fetch(`${serVer}/recycledItems`);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

// fetch all notifications
export const fetchNotifications = async () => {
  const response = await fetch(`${serVer}/notifications`);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

// fetch all feedbacks
export const fetchFeedbacks = async () => {
  const response = await fetch(`${serVer}/feedbacks`);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};
