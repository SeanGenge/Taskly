// src/features/todos/components/TodoModal.tsx
import { useEffect, useState, type FormEvent, useRef } from "react";
import type { Task } from "../../types/types";
import { Modal, Button, Form } from "react-bootstrap";
import type { TaskDTO } from "../../types/types";

type props = {
	open: boolean;
	handleClose: () => void;
	todoItem: Task | null;
	handleUpdate: (updateItem: TaskDTO) => void;
	handleAdd: (item: TaskDTO) => void;
};

export default function TodoModal({ open, handleClose, todoItem, handleUpdate, handleAdd }: props) {
	const [name, setName] = useState<string>("")
	// Used to focus the description input on modal open
	const nameRef = useRef<HTMLInputElement | null>(null);
	const [validated, setValidated] = useState<boolean>(false);
	
	useEffect(() => {
		if (todoItem && todoItem?.description) {
			setName(todoItem?.description)
		}
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
		
		const newTodoItem: TaskDTO = {
			name: name
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
				<Form.Group className="mb-3" controlId="formBasicPassword">
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
