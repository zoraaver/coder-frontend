import React, {useEffect, useState} from 'react';
import {Segment, Button} from 'semantic-ui-react';
import RubyTestResults from './RubyTestResults.js';
import JSResults from './JSResults.js';
import CppResults from './CppResults.js';
import API from '../adapters/API';
import  MonacoEditor  from 'react-monaco-editor';


function CodeEditor({starter_code, id, language}) {

    const [code, setCode] = useState("");
    const [testResults, setTestResults] = useState(false);
    const [clicked, setClicked] = useState(true);
    const [error, setError] = useState(false);
    const [errorVisiblity, setErrorVisiblity] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        API.postCode({code, language, id})
            .then(response => {
                if (response.results) {
                    setTestResults(JSON.parse(response.results));
                    setError(false);
                }
                if (response.error){
                    setError(response);
                    setTestResults(false);
                }
            })
            .then(() =>{window.scrollTo(0, document.body.scrollHeight)} )
            .catch(errorPromise => {
                setTestResults(false);
                if (errorPromise) errorPromise.then(setError);
            })
    }

    useEffect(() => {
        setCode(starter_code);
    }, [starter_code]);

    function testResultsToRender(language) {
        switch(language) {
            case "ruby":
                return <RubyTestResults testResults = {testResults}/>;
            case "javascript":
                return <JSResults testResults = {testResults} />;
            case "cpp":
                return <CppResults testResults = {testResults} />;
            default:
                return undefined;
        }
    }

    function renderError(error) {
        if (!error) return undefined;
        return (
            <>
                <Button negative onClick = {() => setErrorVisiblity(!errorVisiblity)}>Error</Button>
                <br></br>
                {errorVisiblity && <Segment>
                    <strong>{error.error}</strong>
                </Segment>}
            </>
        )
    }


    return (
        <div className = "code-editor">
            <Segment>
                <Button  positive onClick = {handleSubmit}>Submit code</Button>
                <Button primary onClick = {() => setClicked(!clicked)} >{clicked? "Hide Results" : "Show results"}</Button>
                {renderError(error)}
            </Segment>
            <MonacoEditor
                width="800"
                height="600"
                fontSize = { 30}
                language={language}
                theme="vs-dark"
                value={code}
                onChange={newValue => setCode(newValue)}
            />
            {testResults && clicked &&
            <Segment>
                { testResultsToRender(language) }
            </Segment>}
        </div>
    );
}

export default CodeEditor;
