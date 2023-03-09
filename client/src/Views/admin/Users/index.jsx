import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import useSumbitForm from "../../../utils/submitForm";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import logout from "../../../utils/logout";
import { getAllUsers } from "../../../Api/queries";

const AdminUsersPage = () => {
  const [query, loading] = useSumbitForm(getAllUsers, true);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    query(search, (data) => {
      setUsers(data);
    });
  }, []);
  return (
    <div className="flex-col flex gap-8 px-4 py-3 big-container admin">
      <div className="flex w-1/1 justify-between">
        <div className="flex gap-2">
          <Button
            color="success"
            variant="outlined"
            onClick={() => navigate("/admin/create")}
          >
            Create Class
          </Button>
          <Button
            color="success"
            variant="outlined"
            onClick={() => navigate("/")}
          >
            Classes
          </Button>
        </div>
        <Button color="error" variant="contained" onClick={() => logout()}>
          Log Out
        </Button>
      </div>
      <div className="flex width-1/1 justify-between gap-10">
        <div className="flex width-5/6" style={{ width: "100%" }}>
          <TextField
            value={search}
            variant="standard"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                query(search, (data) => {
                  setUsers(data);
                });
              }
            }}
            label="Search"
            style={{ width: "100%" }}
            name="search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button
          color="success"
          variant="contained"
          onClick={() => {
            query(search, (data) => {
              setUsers(data);
            });
          }}
        >
          Search
        </Button>
      </div>
      {!loading && (
        <>
          {users.length ? (
            <>
              {users.map((e) => {
                return (
                  <div key={e._id} className="fex">
                    {e.name}
                    <br />
                    {e.mail}
                  </div>
                );
              })}
            </>
          ) : (
            <div className="text-xl text-center w-1/1">User Not Found</div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminUsersPage;
