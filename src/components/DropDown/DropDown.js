import React, { useEffect, useState } from "react";
import './DropDown.scss'

const data = [{ id: 0, label: "XS" },
{ id: 1, label: "S" },
{ id: 2, label: "M" },
{ id: 3, label: "L" },
{ id: 4, label: "XL" },
{ id: 5, label: "XXL" },
{ id: 6, label: "XXXL" },
{ id: 7, label: "4XL" },
{ id: 8, label: "5XL" }]

const Dropdown = (props) => {
    const [isOpen, setOpen] = useState(false);
    const [items, setItem] = useState(data);
    const [selectedItem, setSelectedItem] = useState(null);

    const toggleDropdown = () => setOpen(!isOpen);

    const handleItemClick = (id) => {
        console.log(id)
        selectedItem == id ? setSelectedItem(null) : setSelectedItem(id);
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
                        {/* <span className={`dropdown-item-dot ${item.id == selectedItem && 'selected'}`}></span> */}
                        {item.label}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Dropdown