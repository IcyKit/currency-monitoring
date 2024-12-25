import axios from "axios";
import "./App.css";
import CurrCard from "./CurrCard";
import { useEffect, useState } from "react";
import { Input } from "antd";

type ValuteType = {
	ID: string;
	NumCode: string;
	CharCode: string;
	Nominal: number;
	Name: string;
	Previous: number;
	Value: number;
};

function App() {
	const [date, setDate] = useState<Date>(new Date());
	const [valute, setValute] = useState<ValuteType[]>([]);
	const [search, setSearch] = useState<string>("");
	const [filteredArray, setFilteredArray] = useState(valute);

	useEffect(() => {
		const getCurrInfo = async () => {
			const { data } = await axios.get(
				"https://www.cbr-xml-daily.ru/daily_json.js"
			);
			// setFilteredArray(data);
			setDate(new Date(data.Date));

			const valuteArr = [];
			for (let key in data.Valute) {
				valuteArr.push(data.Valute[key]);
			}
			setValute(valuteArr);
			setFilteredArray(valuteArr);
		};

		getCurrInfo();
	}, []);

	const handleInputChange = (e: any) => {
		const value = e.target.value;
		setSearch(value);

		const filtered = valute.filter(item =>
			item.CharCode.toLowerCase().includes(value.toLowerCase())
		);

		setFilteredArray(filtered);
	};

	return (
		<>
			<header>
				<h1>Курсы валют</h1>
			</header>

			<div className="main">
				<p className="date">На {date.toLocaleString("ru-RU")}</p>

				<Input
					placeholder="Поиск валюты"
					value={search}
					onChange={e => handleInputChange(e)}
					className="search"
				/>

				<div className="currency">
					{filteredArray.map((val: ValuteType) => {
						return (
							<CurrCard
								Name={val.Name}
								Value={val.Value}
								CharCode={val.CharCode}
								ID={val.ID}
								Nominal={val.Nominal}
								NumCode={val.NumCode}
								Previous={val.Previous}
								key={val.ID}
							/>
						);
					})}
				</div>
			</div>
		</>
	);
}

export default App;
