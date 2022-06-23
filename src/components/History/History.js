import React from 'react';
import './History.css';

class History extends React.Component {

    #getHistory;
    constructor(props) {
        super(props);
        this.#getHistory = props.getHistory;
    }

    getHistoryInTegTr = () => {
        let history = this.#getHistory();
        let historyInTegTr = [];
        for (let i = 0; i < history.length; i++) {
            const element = history[i];
            historyInTegTr.push(
                <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    <td>{element.guess}</td>
                    <td>{element.result}</td>
                </tr>
            );
        }
        return historyInTegTr;
    }

    render() {
        return <div className='History'>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Догадка</th>
                        <th scope="col">Результат</th>
                    </tr>
                </thead>
                <tbody>
                    {this.getHistoryInTegTr()}
                </tbody>
            </table>
        </div>
    }
}

export default History;