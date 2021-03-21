import React from 'react';
import {Icon, Header, Segment} from 'semantic-ui-react';

function RubyTestResults({testResults}) {

    const {stats, examples, summary_line} = testResults;
    console.log(testResults);

    return (
        <div>
            <Header size = "large">{summary_line || stats.tests}</Header>
            <Segment.Group>
            {examples.map((e, idx) => 
            <Segment color = {e.status === "failed"? "red" : "green"} key = {idx}>
                <Header>{e.status}</Header>
                {e.full_description} {e.exception && ":" + e.exception.message}
                {e.status === "failed"? <Icon name = "close" color = "red" /> : <Icon name = "check" color = "green" />}
            </Segment>) }
                </Segment.Group>
        </div>
    );
}

export default RubyTestResults;
