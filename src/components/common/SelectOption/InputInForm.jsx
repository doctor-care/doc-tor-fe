import React from 'react';
import ErrorMessage from '../NotFound/ErrorMessage';
import '../../../pages/patient/style.css';

export default function InputInForm(props) {
    const { label, properties, register, value, error, type } = props;
    return (
        <div className="grid">
            <div>
                <label>{label}</label>
            </div>
            <div>
                <input className="form-control" {...register} defaultValue={value} name={properties} type={type} />
                {error && <ErrorMessage messageId={error} />}
            </div>
        </div>
    );
}
