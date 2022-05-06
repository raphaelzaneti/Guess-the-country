import React, { useEffect, useState } from "react";
import './countries-table.css'
import { useCountriesArray } from "../validationCountry/validateCountry";

export default function CountriesTable(props) {

    const [correctTable, setCorrectTable] = useState([])
    const [wrongTable, setWrongTable] = useState([])
    const { correctCountriesArray, setCorrectCountriesArray, wrongCountriesArray, setWrongCountriesArray } = useCountriesArray()

    useEffect(() => {
        insertRow(wrongCountriesArray, false)
    }, [wrongCountriesArray])

    useEffect(() => {
        insertRow(correctCountriesArray, true)
    }, [correctCountriesArray])


    function insertRow(arr, correct) {
        if (correct === true) {
            arr.map(country => setCorrectTable([...correctTable, <tr className="table-success"><td>{country}</td></tr>]))
        } else if (correct === false) {
            arr.map(country => setWrongTable([...wrongTable, <tr className="table-danger"><td>{country}</td></tr>]))
        }
    }

    return (
        <div className="tables">
            <table id="table__correct" className="table table-bordered tables__table table__correct">
                <thead className="bg-success">
                    <tr>
                        <th>Correct</th>
                    </tr>
                </thead>
                <tbody>
                    {correctTable}
                </tbody>
            </table>

            <table id="table__wrong" className="table table-bordered tables__table table__wrong">
                <thead className="bg-danger">
                    <tr>
                        <th>Wrong</th>
                    </tr>
                </thead>
                <tbody>
                    {wrongTable}
                </tbody>
            </table>
        </div>

    )
}