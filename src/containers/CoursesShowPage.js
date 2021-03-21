import React, { useEffect, useState } from "react";
import API from "../adapters/API.js";
import CoursesContainer from "./CoursesContainer.js";

function CoursesShowPage({ setError, setUser }) {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    API.getCourses()
      .then(setCourses)
      .catch((errorPromise) => {
        setUser(false);
        if (!errorPromise) errorPromise.then(setError);
        else
          setError({
            message: "Server is currently offline. Please try later",
          });
      });
  }, [setUser, setError]);

  return <CoursesContainer courses={courses} header="All courses" />;
}

export default CoursesShowPage;
