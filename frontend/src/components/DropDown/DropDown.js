import React, { useState } from "react";
import './DropDown.scss'

const data = [{ id: 1, label: "Ascending" },{ id: 2, label: "Descending" }]

const Dropdown = (props) => {
    const [isOpen, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState();

    const toggleDropdown = () => setOpen(!isOpen);

    const handleItemClick = (id) => {
        setSelectedItem(id)
        props.sortedData(id);
        setOpen(false)
    }

    return (
        <div className='dropdown'>
            <div className='dropdown-header' onClick={toggleDropdown}>
                {selectedItem ? data.find(item => item.id === selectedItem).label : props.title}
            </div>
            <div className={`dropdown-body ${!isOpen ? 'collapsed' : 'open'}`}>
                {data.map((item, index) => (
                    <div key={index} className={`dropdown-item ${item.id === selectedItem ? 'selected' : ''}`} onClick={() => handleItemClick(item.id)}>
                        {item.label}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Dropdown