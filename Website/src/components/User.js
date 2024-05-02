import userEvent from "@testing-library/user-event";
import React, { useState } from "react";

function User(props) {
    const { user, setUsers, setMsg } = props;
    return (
    <div>
        {user.firstname} {user.lastname} {user.email}
    </div>
  );
}

export default User;