import { UserButton } from "@clerk/nextjs";
import {
  faCheckCircle,
  faExclamationCircle,
  faHome,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <div
      className="sm:min-w-25 h-1/5 sm:h-full grayComp flex flex-row sm:flex-col"
    >
      <UserButton/>
      <Link href={"/"}>
        <FontAwesomeIcon className="icon ml-3" icon={faHome} />
        <h2>All Tasks</h2>
      </Link>
      <Link href={"/pages/todo"}>
        <FontAwesomeIcon className="icon" icon={faList} />
        <h2>To Do</h2>
      </Link>
      <Link href={"/pages/important"}>
        <FontAwesomeIcon className="icon ml-4" icon={faExclamationCircle} />
        <h2>Important!</h2>
      </Link>
      <Link href={"/pages/completed"}>
        <FontAwesomeIcon className="icon ml-4" icon={faCheckCircle} />
        <h2>Completed</h2>
      </Link>
    </div>
  );
}

export default Navbar;
