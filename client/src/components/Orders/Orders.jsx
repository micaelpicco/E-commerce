import React from 'react';
import { useDispatch } from "react-redux";
import { orderProductsByName, orderProductsByScore } from '../../redux/actions';
import "./Orders.css"
const Orders = ( {setOrder} ) => {

    const dispatch = useDispatch()

    const handleSelectName = (e) => {
        e.preventDefault();
        if (e.target.value === "A-Z" || e.target.value === "Z-A") {
            dispatch(orderProductsByName(e.target.value));
            setOrder(e.target.value);
        }
    }

 /*    const handleSelectScore = (e) => {
        e.preventDefault();
        if (e.target.value.length) {
            dispatch(orderProductsByScore(e.target.value))
        }
    } */

    return (
        <div>
            <select className='buttonOrder' onChange={(e) => handleSelectName(e)}>
                <option value="order">Ordenar por Nombre</option>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
            </select>
            {/* <select onChange={(e) => handleSelectScore(e)}>
                <option value="">Ordenar por Calificación</option>
                <option value="ascendente">Menor a Mayor</option>
                <option value="descendente">Mayor a Menor</option>
            </select> */}
        </div>
    );
};

export default Orders;