// src/features/todos/components/TodoModal.tsx
import { useEffect, useState, type FormEvent, useRef } from "react";
import type { Task } from "../../types/types";
import { Modal, Button, Form } from "react-bootstrap";
import type { TaskDTO } from "../../types/types";
import DatePicker from "react-datepicker";

type props = {
	open: boolean;
	handleClose: () => void;
	todoItem: Task | null;
	handleUpdate: (updateItem: TaskDTO) => void;
	handleAdd: (item: TaskDTO) => void;
};

export default function TodoModal({ open, handleClose, todoItem, handleUpdate, handleAdd }: props) {
	const [name, setName] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [dueDate, setDueDate] = useState<Date | null>(null);
	const [isImportant, setIsImportant] = useState<boolean>(false);
	const [priorityId, setPriorityId] = useState<number>(1);
	// Used to focus the description input on modal open
	const nameRef = useRef<HTMLInputElement | null>(null);
	const [validated, setValidated] = useState<boolean>(false);
	
	useEffect(() => {
		if (!todoItem) return;
		
		// Set the initial values for the properties
		if (todoItem?.name) setName(todoItem.name);
		if (todoItem?.description) setDescription(todoItem.description);
		if (todoItem?.dueDate) setDueDate(new Date(todoItem.dueDate));
		if (todoItem?.isImportant) setIsImportant(todoItem.isImportant);
		if (todoItem?.priorityId) setPriorityId(todoItem.priorityId);
	}, [todoItem]);
	
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
		}
		
		if (todoItem) {
			// Updating an existing item
			handleUpdate(newTodoItem);
		}
		else {
			// Creating a new item
			handleAdd(newTodoItem);
		}
		
		handleClose();
		setName("");
		setValidated(false);
	}
	
	function onClose() {
		// Reset the values
		setName("");
		setIsImportant(false);
		setDueDate(null);
		setDescription("");
		setPriorityId(1);
		
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
					  <DatePicker selected={dueDate} onChange={(date) => setDueDate(date)} />
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
