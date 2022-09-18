import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'
import { Link } from 'react-router-dom'

function OrderHistory() {
    const state = useContext(GlobalState)

    const [history] = state.userApi.history





    return (


        <div className="history-page">
            <h2>History</h2>
            <h4>You have No Ordered Products Yet</h4>
            <div className="history-page">
                <table>
                    <thead>
                        <tr>
                            <th>Payment Id</th>
                            <br />
                            <th>Date of Purchase</th>
                            <br />

                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>0</td>
                            <br />
                            <td>0</td>
                            <br />
                            <td><Link to="/notfound" >View</Link></td>


                        </tr>
                    </tbody>
                </table>
                <br /><br /><br /><br /><br />
                <br /><br /><br /><br /><br /><br /><br />
                <br /><br /><br /><br /><br />
            </div>


        </div>



    )
}

export default OrderHistory