const LOCAL_URL = "http://localhost:8080/";
const BACKEND_URL = "https://redcoderface.co.uk/";
const BASE_URL = BACKEND_URL;
const VALIDATE_URL = BASE_URL + "validate";
const LOGIN_URL = BASE_URL + "login";
const SIGNUP_URL = BASE_URL + "users";
const SECTIONS_URL = BASE_URL + "sections/";
const SUBSECTIONS_URL = BASE_URL + "subsections/";
const COURSES_URL = BASE_URL + "courses/";
const LESSONS_URL = BASE_URL + "lessons/";
const TEST_URL = LESSONS_URL + "test";

async function postLesson(lesson) {
  const resp = await fetch(LESSONS_URL, {
    method: "POST",
    headers: {
      Authorisation: localStorage.token,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ lesson }),
  });
  return JSONresp(resp);
}

async function deleteLesson(id) {
  const resp = await fetch(LESSONS_URL + id, {
    method: "DELETE",
    headers: { Authorisation: localStorage.token },
  });
  return JSONresp(resp);
}

function genericAuthObj(token) {
  return {
    method: "GET",
    headers: {
      Authorisation: token,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
}

async function postSubsection(subsection) {
  const resp = await fetch(SUBSECTIONS_URL, {
    method: "POST",
    headers: {
      Authorisation: localStorage.token,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ subsection }),
  });
  return JSONresp(resp);
}

async function postSection(section) {
  const resp = await fetch(SECTIONS_URL, {
    method: "POST",
    headers: {
      Authorisation: localStorage.token,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ section }),
  });
  return JSONresp(resp);
}

async function deleteSection(sectionId) {
  const resp = await fetch(SECTIONS_URL + sectionId, {
    method: "DELETE",
    headers: { Authorisation: localStorage.token },
  });
  return JSONresp(resp);
}

async function deleteSubsection(subsection_id) {
  const resp = await fetch(SUBSECTIONS_URL + subsection_id, {
    method: "DELETE",
    headers: { Authorisation: localStorage.token },
  });
  return JSONresp(resp);
}

async function patchSection(section) {
  const resp = await fetch(SECTIONS_URL + section.id, {
    method: "PATCH",
    headers: {
      Authorisation: localStorage.token,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ section }),
  });
  return JSONresp(resp);
}

async function patchSubsection(subsection) {
  const resp = await fetch(SUBSECTIONS_URL + subsection.id, {
    method: "PATCH",
    headers: {
      Authorisation: localStorage.token,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ subsection }),
  });
  return JSONresp(resp);
}

async function editLesson(id) {
  const resp = await fetch(LESSONS_URL + `${id}/edit`, {
    headers: { Authorisation: localStorage.token },
  });
  return JSONresp(resp);
}

async function patchLesson(lesson) {
  const resp = await fetch(LESSONS_URL + lesson.id, {
    method: "PATCH",
    headers: {
      Authorisation: localStorage.token,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ lesson }),
  });
  return JSONresp(resp);
}

async function completeLesson(lesson) {
  const resp = await fetch(LESSONS_URL + `${lesson.id}/complete_lesson`, {
    method: "PATCH",
    headers: {
      Authorisation: localStorage.token,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ lesson }),
  });
  return JSONresp(resp);
}

async function postCode({ code, language, id }) {
  const resp = await fetch(TEST_URL, {
    method: "POST",
    headers: {
      Authorisation: localStorage.token,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ code, language, id }),
  });
  return JSONresp(resp);
}

async function getLesson(id) {
  const resp = await fetch(
    LESSONS_URL + id,
    genericAuthObj(localStorage.token)
  );
  return JSONresp(resp);
}

async function getCourses() {
  const resp = await fetch(COURSES_URL, genericAuthObj(localStorage.token));
  return JSONresp(resp);
}

async function getCourse(id) {
  const resp = await fetch(
    COURSES_URL + id,
    genericAuthObj(localStorage.token)
  );
  return JSONresp(resp);
}

async function validate() {
  const resp = await fetch(VALIDATE_URL, {
    method: "GET",
    headers: {
      Authorisation: localStorage.token,
    },
  });
  const user = await JSONresp(resp);
  return handleUserResponse(user);
}

function handleUserResponse(user) {
  if (user.token) {
    localStorage.token = user.token;
  }
  return user;
}

function JSONresp(resp) {
  if (resp.ok) return resp.json();
  throw resp.json();
}

function createUserObj(user) {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ user }),
  };
}

async function signUp(user) {
  const resp = await fetch(SIGNUP_URL, createUserObj(user));
  const user_2 = await JSONresp(resp);
  return handleUserResponse(user_2);
}

async function loginUser(user) {
  const resp = await fetch(LOGIN_URL, createUserObj(user));
  const user_2 = await JSONresp(resp);
  return handleUserResponse(user_2);
}

export default {
  validate,
  signUp,
  loginUser,
  hasToken: () => !!localStorage.token,
  clearToken: () => localStorage.removeItem("token"),
  postCode,
  getCourses,
  getCourse,
  getLesson,
  completeLesson,
  postSection,
  deleteSection,
  patchSection,
  patchSubsection,
  deleteSubsection,
  postSubsection,
  postLesson,
  editLesson,
  patchLesson,
  deleteLesson,
};
