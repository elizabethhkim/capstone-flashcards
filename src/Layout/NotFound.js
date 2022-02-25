import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <>
      <h2>Not Found</h2>
      <p>
        Yikes. There's nothing here. Maybe it's time to take a break, get some
        fresh air, drink some water, strecth your body a little bit. Before you
        go... I just want to say that you're doing great, and I'm really proud
        of you. 💛
      </p>
      <Link to={"/"} className="btn btn-warning">
        Return Home
      </Link>
    </>
  );
}

export default NotFound;
