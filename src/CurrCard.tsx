import { Card } from "antd";

type CurrCardProps = {
	ID: string;
	NumCode: string;
	CharCode: string;
	Nominal: number;
	Name: string;
	Previous: number;
	Value: number;
};

function CurrCard({ Name, CharCode, Value }: CurrCardProps) {
	return (
		<Card title={`${Name} (${CharCode})`} style={{ width: 300 }}>
			<p>
				1 {CharCode} = {Value.toFixed(2)}₽
			</p>
		</Card>
	);
}

export default CurrCard;
