import { Form, Row, Col } from "react-bootstrap";
import type { SortMode, Order } from "../../types/types";

type props = {
	sortMode: SortMode;
	order: Order;
	setSortMode: (sortMode: SortMode) => void;
	setOrder: (order: Order) => void;
	hideCompleted: boolean;
	onHideCompleted: (b: boolean) => void;
}

export default function SortFilter({ sortMode, order, setSortMode, setOrder, hideCompleted, onHideCompleted }: props) {
	const SORT_LABEL: Record<SortMode, string> = {
		important: 'Important',
		dueDate: 'Due date',
		created: 'Created',
	};
	const ORDER_LABEL: Record<SortMode, Record<Order, string>> = {
		important: { asc: 'last', desc: 'first' },
		dueDate: { asc: 'due earliest', desc: 'due latest' },
		created: { asc: 'oldest first', desc: 'newest first' },
	};

	// Combine the SORT_LABEL and ORDER_LABEL together
	// Requires flatMap to remove extra dimension
	const SORT_OPTIONS = (Object.keys(SORT_LABEL) as SortMode[]).flatMap((mode) =>
		(['desc', 'asc'] as Order[]).map((order) => ({
			value: `${mode}:${order}`,
			label: `${SORT_LABEL[mode]} - ${ORDER_LABEL[mode][order]}`,
		}))
	);

	function parseSort(value: string): { mode: SortMode; order: Order } {
		// Split the values by : then return each separate part
		const [mode, order] = value.split(':') as [SortMode, Order];

		return { mode, order };
	}

	return (
		<Row className="mt-md-4">
			<Col sm={2} md={2}>
				<Form.Check
					type='checkbox'
					label='Hide completed'
					id='hideCompleted'
					checked={hideCompleted}
					onChange={(e) => onHideCompleted(e.currentTarget.checked)}
				/>
			</Col>
			<Col md></Col>
			<Col sm={12} md={5}>
				<Form.Select
					id="sortSelect"
					aria-label="SortSelect"
					value={`${sortMode}:${order}`}
					onChange={(e) => {
						const { mode, order } = parseSort(e.target.value);

						setSortMode(mode);
						setOrder(order);
					}}
				>
					{SORT_OPTIONS.map((opt) => (
						<option key={opt.value} value={opt.value}>
							{opt.label}
						</option>
					))}
				</Form.Select>
			</Col>
		</Row>
	);
}
