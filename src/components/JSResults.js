import React from 'react';
import {Icon, Segment, Header} from 'semantic-ui-react';

function JSResults({testResults}) {

    const {stats, failures, passes} = testResults;
    const [testNumber, failureNumber] = [stats.tests, stats.failures];

    return (
        <div>
            <Header size = "large">{testNumber} {testNumber === 1? "test" : "tests"}, 
                {" " + failureNumber} {failureNumber === 1? "failure": "failures"}</Header>
            <Segment.Group>
                {failures.map((f, idx) =>
                    <Segment color = "red" key = {idx}>
                        <Header>failed</Header>
                        {f.fullTitle}: {f.err.message}
                    <Icon name = "close" color = "red" />
                    </Segment>
                )}
                {passes.map((p, idx) => 
                <Segment color = "green" key = {idx}>
                    <Header>passed</Header>
                        {p.fullTitle}
                    <Icon name = "check" color = "green" />
                </Segment>
                )}
            </Segment.Group>
        </div>
    );
}

export default JSResults;
