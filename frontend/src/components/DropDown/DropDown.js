import React, { useEffect, useState } from "react";
import './DropDown.scss'

const data = [{ id: 0, label: "Ascending" },{ id: 1, label: "Descending" }]

const Dropdown = (props) => {
    const [isOpen, setOpen] = useState(false);
    const [items, setItem] = useState(data);
    const [selectedItem, setSelectedItem] = useState(null);

    const toggleDropdown = () => setOpen(!isOpen);

    const handleItemClick = (id) => {
        selectedItem == id ? setSelectedItem(null) : setSelectedItem(id);
        props.sortedData(id);
        setOpen(false)
    }

    return (
        <div className='dropdown'>
            <div className='dropdown-header' onClick={toggleDropdown}>
                {selectedItem ? items.find(item => item.id == selectedItem).label : props.title}
                <i className={`fa fa-chevron-right icon ${isOpen && "open"}`}></i>
            </div>
            <div className={`dropdown-body ${!isOpen ? 'collapsed' : 'open'}`}>
                {items.map(item => (
                    <div className={`dropdown-item ${item.id == selectedItem ? 'selected' : ''}`} onClick={e => handleItemClick(e.target.id)} id={item.id}>
                        {item.label}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Dropdown