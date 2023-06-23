import React from 'react'

export default function Option(props) {
    const { label, list } = props;
    return (
        <React.Fragment>
            <option disabled value="">-Choice {label}-</option>
            {list.map(item => <option value={item} key={item}>{item}</option>)}
        </React.Fragment>
    )
}
