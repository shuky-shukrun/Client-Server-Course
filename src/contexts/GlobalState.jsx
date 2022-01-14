import React, { createContext, useEffect, useReducer, useState } from "react";
import AppReducer from "./AppReducer";
import ServiceModal from "../components/ServiceModal";
import DeleteModal from "../components/DeleteModal";
import {
  getAllServicesByEmail,
  deleteServiceFromDB,
  insertServiceToDB,
  updateServiceOnDB,
} from "./ClientDBOperations";

// Initial state

const initialState = {
  user: {},
  data: [],
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const [loading, setLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(true);

  function addUser(user) {
    dispatch({
      type: "ADD_USER",
      payload: user,
    });
  }

  async function loadServicesBacklog() {
    if (state.user.email) {
      const { status, message } = await getAllServicesByEmail(state.user.email);
      if (status === 200) {
        let rows = [...message];
        rows.forEach((row) => {
          row.action = (
            <>
              <ServiceModal
                service={row}
                type="Edit"
                handleSave={handleEditService}
                className="me-2"
                id={`edit_${row.treatmentNumber}`}
                key={`edit_${row.treatmentNumber}`}
              />
              <DeleteModal
                handleDeleteRow={handleDeleteRow}
                treatmentNumber={row.treatmentNumber}
                id={`delete_${row.treatmentNumber}`}
                key={`delete_${row.treatmentNumber}`}
              />
            </>
          );
        });
      }
      dispatch({
        type: "SET_DATA",
        payload: message,
      });
      return { status, message };
    }
  }

  async function handleAddService(service) {
    const { status, message } = await insertServiceToDB(
      service,
      state.user.email
    );
    if (status === 200) {
      setTableLoading(true);
      console.log("Loading news");
      await loadServicesBacklog();
    }
    setTableLoading(false);
  }

  async function handleEditService(service) {
    const { status, message } = await updateServiceOnDB(
      service,
      state.user.email
    );
    if (status === 200) {
      setTableLoading(true);
      console.log("Loading news");
      await loadServicesBacklog();
    }
    setTableLoading(false);
  }

  // Actions
  async function handleDeleteRow(treatmentNumber) {
    setTableLoading(true);
    const { status, message } = await deleteServiceFromDB(treatmentNumber);
    if (status === 200) {
      await loadServicesBacklog();
      dispatch({
        type: "DELETE_ROW",
        payload: treatmentNumber,
      });
    }
    setTableLoading(false);
  }

  useEffect(async () => {
    setTableLoading(true);
    await loadServicesBacklog();
    setTableLoading(false);
  }, [state.user]);

  const loadingJSX = (
    <div className="h-100 row align-items-center justify-content-center mt-5">
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="spinner-grow text-primary me-2" role="status"></div>
        <div className="spinner-grow text-secondary me-2" role="status"></div>
        <div className="spinner-grow text-success me-2" role="status"></div>
        <div className="spinner-grow text-danger me-2" role="status"></div>
        <div className="spinner-grow text-warning me-2" role="status"></div>
        <div className="spinner-grow text-info me-2" role="status"></div>
      </div>
    </div>
  );

  return (
    <GlobalContext.Provider
      value={{
        addUser,
        user: state.user,
        setLoading,
        data: state.data,
        tableLoading,
        loadServicesBacklog,
        setTableLoading,
        handleAddService,
      }}
    >
      {loading ? loadingJSX : children}
    </GlobalContext.Provider>
  );
};
