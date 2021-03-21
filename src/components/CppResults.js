import React from 'react';
import {Icon, Segment, Header} from 'semantic-ui-react';

function CppResults({testResults}) {

    const testSuites = testResults.testsuites[0];
    const results = testSuites.testsuite;

    function renderResults(results) {

        if ((failureNumber(results)) === 0) return null;

        return (
        <Segment.Group>
            {results.map(r => {
                if (r.failures) {
                    return r.failures.map((f, idx) =>( 
                        <Segment color = "red" key = {idx}>
                            <Header>failed</Header>
                            <strong>{r.name}</strong>: {f.failure}
                            <Icon name = "close" color = "red" />
                        </Segment>))
                }
                return undefined;
            })}
        </Segment.Group>)

    }

    function failureNumber(results) {
        return results.reduce((acc, r) => {
            if (r.failures) return acc + r.failures.length;
            return acc;
        }, 0);
    }

    function renderHeader(results) {
        if (failureNumber(results) === 0)  return <Header size = "large" color = "green">All tests passed</Header> 
        else return <Header size = "large">{failureNumber(results)} failure{failureNumber(results) === 1? "" : "s"} </Header>

    }

    return (
        <div>
            {renderHeader(results)}
            {renderResults(results)}
        </div>
    );
}

export default CppResults;
