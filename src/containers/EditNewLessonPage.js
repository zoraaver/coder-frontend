import React, { useState, useEffect } from "react";
import API from "../adapters/API.js";
import MonacoEditor from "react-monaco-editor";
import ReactMarkdown from "react-markdown/with-html";
import { useHistory, useLocation, useParams } from "react-router-dom";
import {
  Confirm,
  Button,
  Container,
  Dropdown,
  Form,
  Segment,
  Header,
} from "semantic-ui-react";

function EditNewLessonPage(props) {
  let subsection = { id: 0, title: "" };
  const history = useHistory();
  const [confirmWindowOpen, setConfirmWindowOpen] = useState(false);
  const { state, pathname } = useLocation();
  const [preview, setPreview] = useState({ title: "", content: "" });

  if (state) subsection = state.subsection;

  const params = useParams();
  const [formdata, setFormdata] = useState({
    language: "",
    title: "",
    content: "",
    subsection_id: subsection.id,
  });

  if (subsection.id === 0 && pathname === "/lessons/new") history.push("/");

  useEffect(() => {
    if (pathname === "/lessons/new") return;

    API.editLesson(params.id)
      .then((lessonToEdit) => setFormdata({ ...lessonToEdit, id: params.id }))
      .catch(console.log);
  }, [pathname, params.id, subsection.id]);

  const languageOptions = [
    {
      key: "ruby",
      text: "Ruby",
      value: "ruby",
    },
    {
      key: "javascript",
      text: "Javascript",
      value: "javascript",
    },
    {
      key: "cpp",
      text: "C++",
      value: "cpp",
    },
  ];

  function handleSubmit() {
    if (pathname === "/lessons/new") {
      API.postLesson(formdata)
        .then((id) => history.push(`/lessons/${id}`))
        .catch(console.error);
    } else {
      API.patchLesson(formdata)
        .then((id) => history.push(`/lessons/${id}`))
        .catch(console.error);
    }
  }

  function handleChange(e) {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  }

  function handleDelete(id) {
    if (!id) return;
    API.deleteLesson(id)
      .then(() => history.push("/"))
      .catch(console.log);
  }

  return (
    <Segment>
      <Confirm
        open={confirmWindowOpen}
        onCancel={() => setConfirmWindowOpen(false)}
        onConfirm={() => {
          handleDelete(params.id);
          setConfirmWindowOpen(false);
        }}
        confirmButton={`Delete lesson: ${formdata.title}`}
        content={`Are you sure you want to delete '${formdata.title}'? This action is permanent.`}
      />
      <Container>
        Please note that lesson content must be written in html. Do not include
        script tags. If test code is not provided a lesson will not display a
        test. Lesson starter code will be displayed to users when they first
        attempt a lesson.
      </Container>
      <Segment>
        <Header>Subsection: {subsection.title}</Header>
      </Segment>
      <Segment>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <Header>Lesson title:</Header>
            <input
              name="title"
              placeholder="lesson title"
              onChange={handleChange}
              value={formdata.title}
            />
          </Form.Field>
          <Form.Field>
            <Header>Lesson language:</Header>
            <Dropdown
              placeholder="language"
              value={formdata.language}
              selection
              options={languageOptions}
              onChange={(e, { value }) =>
                setFormdata({ ...formdata, language: value })
              }
            />
          </Form.Field>
          <Button
            type="button"
            positive
            onClick={() =>
              setPreview({ title: formdata.title, content: formdata.content })
            }
          >
            Preview lesson
          </Button>
          <Button primary type="submit">
            Submit lesson
          </Button>
          {params.id ? (
            <Button
              type="button"
              negative
              onClick={() => setConfirmWindowOpen(true)}
            >
              Delete lesson
            </Button>
          ) : null}
        </Form>
      </Segment>
      <Segment>
        <Header>Lesson content:</Header>
        <MonacoEditor
          width="900"
          height="600"
          fontSize={30}
          language={"html"}
          theme="vs-dark"
          value={formdata.content}
          onChange={(newValue) =>
            setFormdata({ ...formdata, content: newValue })
          }
        />
      </Segment>
      <Segment>
        <Header>Lesson test code: (optional)</Header>
        <MonacoEditor
          width="900"
          height="600"
          fontSize={30}
          language={formdata.language}
          theme="vs-dark"
          value={formdata.test}
          onChange={(newValue) => setFormdata({ ...formdata, test: newValue })}
        />
      </Segment>
      <Segment>
        <Header>Lesson starter code: (optional)</Header>
        <MonacoEditor
          width="900"
          height="80"
          fontSize={30}
          language={formdata.language}
          theme="vs-dark"
          value={formdata.starter_code}
          onChange={(newValue) =>
            setFormdata({ ...formdata, starter_code: newValue })
          }
        />
      </Segment>
      <Segment>
        <Header>Lesson preview:</Header>
        <Segment>
          <Header size="huge" textAlign="center">
            {preview.title}
          </Header>
          <div className="lesson">
            <ReactMarkdown source={preview.content} escapeHtml={false} />
          </div>
        </Segment>
      </Segment>
    </Segment>
  );
}

export default EditNewLessonPage;
