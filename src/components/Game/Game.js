import React from 'react';
import './Game.css';
import History from '../History/History'
import RecordsTable from "../RecordsTable/RecordsTable"


class Game extends React.Component {

	#cipher;

	constructor(props) {
		super(props);
		this.#cipher = "";
		this.state = {
			answer: "",
			buttonOn: false,
			history: [],
			records: [],
			attempts: 0,
			isGameOn: false
		};
	}

	getHistory = () => this.state.history;
	getRecords = () => this.state.records;
	getAttempts = () => this.state.attempts;


	onChangeInput = (event) => {
		const name = event.target.name;
		let value = event.target.value;

		if (!/^[0-9]{0,4}$/.test(value))
			return;

		if (value.length === 4)
			this.setState({
				[name]: value,
				buttonOn: true
			});
		else
			this.setState({
				[name]: value,
				buttonOn: false
			});

	}

	checkWin = () => {
		let answer = this.state.answer;
		let cipher = this.#cipher;
		let length = cipher.length;
		let bulls = 0;
		let cows = 0;
		let char = "-";

		for (let i = 0; i < length; i++) {
			if (answer[i] === cipher[i]) {
				++bulls;
				answer = Game.#setCharAt(answer, i, char);
				cipher = Game.#setCharAt(cipher, i, char);
			}
		}
		for (let i = 0; i < length; i++) {
			if (answer[i] === char)
				continue;

			for (let j = 0; j < length; j++) {
				if (cipher[j] === char)
					continue;

				if (answer[i] === cipher[j]) {
					++cows;
					answer = Game.#setCharAt(answer, i, char);
					cipher = Game.#setCharAt(cipher, j, char);
					break;
				}
			}
		}
		// console.log(cipher);
		// console.log(answer);

		let result = {
			guess: this.state.answer,
			result: `${bulls}Б${cows}К`
		};

		if (bulls === 4) {
			let message = "Игра окончена. Количество попыток " +
				(this.state.attempts + 1) +
				". Введите имя если хотите сохранить результат в таблице рекордов";
			let name = prompt(message, '');

			if (name !== null) {
				let record = {
					attempts: this.state.attempts + 1,
					name: name
				};
				let records = [...this.state.records, record];
				records.sort((a, b) => {
					if (a.attempts > b.attempts) {
						return 1;
					}
					if (a.attempts < b.attempts) {
						return -1;
					}
					return 0;
				})

				this.setState({
					answer: "",
					buttonOn: false,
					history: [...this.state.history, result],
					records: records,
					attempts: 0,
					isGameOn: false
				})
			}
			else {
				this.setState({
					answer: "",
					buttonOn: false,
					attempts: 0,
					history: [...this.state.history, result],
					isGameOn: false
				})
			}

		}
		else {
			this.setState({
				answer: "",
				buttonOn: false,
				history: [...this.state.history, result],
				attempts: this.state.attempts + 1
			})
		}
	}

	render() {
		return <div className='Game'>
			<div className='row'>
				<div className='col'>
					<h4 className='m-4'>Таблица рекордов</h4>
					<RecordsTable getRecords={this.getRecords} />
				</div>
				<div className='col m-4'>
					<button className='btn btn-primary'
						onClick={() => {
							this.#cipher = Game.#getNewcCipher(4);
							this.setState({
								isGameOn: true,
								history: []
							})
							alert("Игра началась! Угадайте шифр из 4 цифр.")
						}}>
						Hовая игра
					</button>
					<div className='m-5 p-3'>
						<form onSubmit={(event) => {
							this.checkWin();
							event.preventDefault();
						}}>
							<p>
								<label>Введите комбинацию из 4 цифр:
									<input type="text" name="answer"
										disabled={!this.state.isGameOn}
										value={this.state.answer}
										onChange={this.onChangeInput} />
								</label>
							</p>
							<p>
								<input className='btn btn-success m-3'
									disabled={!this.state.buttonOn}
									type="submit"
									value="Проверить" />
							</p>
						</form>
					</div>
				</div>
				<div className='col m-4'>
					<h4>История</h4>
					<History getHistory={this.getHistory} />
				</div>
			</div>
		</div>

	}

	static #setCharAt(string, index, char) {
		if (index > string.length - 1)
			return string;

		return string.substring(0, index) + char + string.substring(index + 1);
	}

	static #getNewcCipher(length) {
		let cipher = "";

		for (let i = 0; i < length; i++)
			cipher += Math.floor((Math.random() * 10) + 0);

		//console.log(`cipher = ${cipher}`);
		return cipher;
	}
}



export default Game;