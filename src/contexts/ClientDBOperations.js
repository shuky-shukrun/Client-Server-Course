async function getAllServicesByEmail(email) {
  try {
    const res = await fetch("/api/services", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ email }), // body data type must match "Content-Type" header
    });
    return await res.json();
  } catch (error) {
    return { status: 500, message: "Server is not available" };
  }
}

async function insertServiceToDB(service, email) {
  try {
    const res = await fetch("/api/services/add", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ service, email }), // body data type must match "Content-Type" header
    });
    return await res.json();
  } catch (error) {
    return { status: 500, message: "Server is not available" };
  }
}

async function deleteServiceFromDB(treatmentNumber) {
  console.log({ treatmentNumber });
  try {
    const res = await fetch("/api/services/delete", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ treatmentNumber }), // body data type must match "Content-Type" header
    });
    return await res.json();
  } catch (error) {
    return { status: 500, message: "Server is not available" };
  }
}

async function updateServiceOnDB(service) {
  try {
    const res = await fetch("/api/services/update", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(service), // body data type must match "Content-Type" header
    });
    return await res.json();
  } catch (error) {
    return { status: 500, message: "Server is not available" };
  }
}

async function uploadTransactionsFile(formData) {
  try {
    const res = await fetch("/api/transactions/upload", {
      method: "POST",
      mode: "cors", // no-cors, *cors, same-origin
      body: formData,
    });
    return await res.json();
  } catch (error) {
    return { status: 500, message: "Server is not available" };
  }
}

async function getUserFromDB(email, password) {
  try {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    return await res.json();
  } catch (error) {
    return { status: 500, message: "Server is not available" };
  }
}

async function addUserToDB(user) {
  try {
    const res = await fetch("/api/registration", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return await res.json();
  } catch (error) {
    return { status: 500, message: "Server is not available" };
  }
}

async function forgotPassword(email) {
  try {
    const res = await fetch("/api/forgotPassword", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    return await res.json();
  } catch (error) {
    return { status: 500, message: "Server is not available" };
  }
}
export {
  getAllServicesByEmail,
  insertServiceToDB,
  deleteServiceFromDB,
  updateServiceOnDB,
  uploadTransactionsFile,
  getUserFromDB,
  addUserToDB,
  forgotPassword,
};
