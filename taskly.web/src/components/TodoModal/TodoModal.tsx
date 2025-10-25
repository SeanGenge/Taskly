// src/features/todos/components/TodoModal.tsx
import { useState, type FormEvent, useRef } from "react";
import type { Task, Priority } from "../../types/types";
import { Modal, Button, Form } from "react-bootstrap";
import type { TaskDTO } from "../../types/types";
import DatePicker from "react-datepicker";

type props = {
	open: boolean;
	handleClose: () => void;
	todoItem: Task | null;
	handleUpdate: (updateItem: TaskDTO) => void;
	handleAdd: (item: TaskDTO) => void;
	priorities: Priority[];
};

export default function TodoModal({ open, handleClose, todoItem, handleUpdate, handleAdd, priorities }: props) {
	const [name, setName] = useState<string>(todoItem?.name ?? "");
	const [description, setDescription] = useState<string>(todoItem?.description ?? "");
	const [dueDate, setDueDate] = useState<Date | null>(todoItem?.dueDate ? new Date(todoItem.dueDate) : null);
	const [isImportant, setIsImportant] = useState<boolean>(todoItem?.isImportant ?? false);
	const [priorityId, setPriorityId] = useState<number>(todoItem?.priorityId ?? 1);
	const nameRef = useRef<HTMLInputElement | null>(null);
	const [validated, setValidated] = useState<boolean>(false);

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const form = e.currentTarget;

		if (form.checkValidity() === false) {
			e.stopPropagation();
			setValidated(true);

			return;
		}

		if (name == undefined) return;

		// Create the updated object
		const newTodoItem: TaskDTO = {
			name: name,
			isImportant: isImportant,
			dueDate: dueDate?.toISOString(),
			description: description,
			priorityId: priorityId,
		}

		if (todoItem) {
			// Updating an existing item
			handleUpdate(newTodoItem);
		}
		else {
			// Creating a new item
			handleAdd(newTodoItem);
		}

		setValidated(false);
		handleClose();
	}

	function onClose() {
		setValidated(false);
		handleClose();
	}

	return (
		<Modal className="modal" show={open} onHide={onClose} onEntered={() => nameRef.current?.focus()}>
			<Modal.Header closeButton>
				<Modal.Title>{todoItem ? "Edit" : "Create a New"} Task</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form id="todoForm" noValidate validated={validated} onSubmit={handleSubmit}>
					<Form.Group className="mb-3" controlId="taskName">
						<Form.Label>Task</Form.Label>
						<Form.Control
							type="text"
							ref={nameRef}
							placeholder="Type your task here..."
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
						/>
						<Form.Control.Feedback type="invalid">Please write a task</Form.Control.Feedback>
					</Form.Group>
					<Form.Check
						type='checkbox'
						label='important'
						id='isImportant'
						checked={isImportant}
						onChange={(e) => setIsImportant(e.currentTarget.checked)}
					/>
					<Form.Group className="mb-3" controlId="dueDate">
						<Form.Label className="me-2">Due Date:</Form.Label>
						<DatePicker selected={dueDate} onChange={(date) => setDueDate(date)} dateFormat="dd/MM/yyyy" placeholderText="dd/mm/yyyy" />
					</Form.Group>
					<Form.Group className="mb-3" controlId="priority">
						<Form.Label>Priority</Form.Label>
						<Form.Select aria-label="Default select example" value={priorityId} onChange={(e) => setPriorityId(Number(e.target.value))}>
							{
								priorities.map(p => {
									return (
										<option key={p.id} value={p.id}>{p.name}</option>
									);
								})
							}
						</Form.Select>
					</Form.Group>
					<Form.Group className="mb-3" controlId="description">
						<Form.Label>Description</Form.Label>
						<Form.Control as="textarea" rows={4} value={description} onChange={(e) => setDescription(e.target.value)} />
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={onClose}>
					Close
				</Button>
				<Button variant="primary" type="submit" form="todoForm">
					{todoItem ? "Update todo item" : "Create new todo item"}
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
