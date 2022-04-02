import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { default as ReactSelect } from "react-select";
import { components } from "react-select";

// const colourOptions = [
//     { value: "ocean1", label: "Ocean" },
//     { value: "blue", label: "Blue" },
//     { value: "purple", label: "Purple" },
//     { value: "red", label: "Red" },
//     { value: "orange", label: "Orange" },
//     { value: "yellow", label: "Yellow" },
//     { value: "green", label: "Green" },
//     { value: "forest", label: "Forest" },
//     { value: "slate", label: "Slate" },
//     { value: "silver", label: "Silver" }
// ];

const data = [{ value: 0, label: "XS" },
{ value: 1, label: "S" },
{ value: 2, label: "M" },
{ value: 3, label: "L" },
{ value: 4, label: "XL" },
{ value: 5, label: "XXL" },
{ value: 6, label: "XXXL" },
{ value: 7, label: "4XL" },
{ value: 8, label: "5XL" }]


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

    useEffect(() => {
        props.selectedData(selectedOption);
      }, [selectedOption]);

    return (
        <span
            class="d-inline-block"
            data-toggle="popover"
            data-trigger="focus"
            data-content="Please selecet account(s)"
        >
            <ReactSelect
                options={data}
                isMulti
                closeMenuOnSelect={false}
                hvalueeSelectedOptions={false}
                components={{
                    Option
                }}
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                placeholder={props.title}
                allowSelectAll={true}
            />
        </span>
    );
}

export default MultiSelectDropdown
