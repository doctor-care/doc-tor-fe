import React from 'react';
import ErrorMessage from '../NotFound/ErrorMessage';
import '../../../pages/patient/style.css';

export default function InputInForm(props) {
    const { label, properties, register, value, error, type } = props;
    return (
        <div className="formData">
            <div>
                <label>{label}</label>
            </div>
            <div>
                <input className="form-control" {...register} defaultValue={value}
                    name={properties} type={type}
                />
            </div>
            <div>
                {error && (
                    <ErrorMessage messageId={error} />
                )}
            </div>
        </div>
    )
}
