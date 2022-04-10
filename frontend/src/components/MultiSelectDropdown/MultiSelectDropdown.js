import React, { useState } from "react";
import { default as ReactSelect } from "react-select";
import { components } from "react-select";


const Option = (props) => {
    return (
        <div>
            <components.Option {...props}>
                <input
                    type="checkbox"
                    checked={props.isSelected}
                    onChange={() => null}
                />{" "}
                <label>{props.label}</label>
            </components.Option>
        </div>
    );
};

const MultiSelectDropdown = (props) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const setSelectedtedOptionhandler = (option) => {
        setSelectedOption(option)
        props.selectedData(option);
    }

    return (
        <span
            className="d-inline-block"
            data-toggle="popover"
            data-trigger="focus"
            data-content="Please selecet account(s)"
        >
            <ReactSelect
                options={props.data}
                isMulti={props.multipleSelect}
                closeMenuOnSelect={false}
                hvalueeSelectedOptions={false}
                components={{
                    Option
                }}
                defaultValue={selectedOption}
                onChange={setSelectedtedOptionhandler}
                placeholder={props.title}
                allowSelectAll={true}
            />
        </span>
    );
}

export default MultiSelectDropdown
