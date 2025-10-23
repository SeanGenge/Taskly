// src/features/todos/components/TodoModal.tsx
import { useEffect, useState, type FormEvent } from "react";
import type { Task } from "../../types/types";
import { Modal, Button, Form } from "react-bootstrap";
import type { TodoItemDTO } from "../../types/types";

type props = {
  open: boolean;
  handleClose: () => void;
  todoItem: Task | null;
  handleSave: (updateItem: TodoItemDTO) => void;
//   onClose: () => void;
//   onSave: (p: { id?: string; description: string; isCompleted: boolean }) => Promise<void> | void;
};

export default function TodoModal({ open, handleClose, todoItem, handleSave }: props) {
	const [description, setDescription] = useState<string>("")
	
	useEffect(() => {
		if (todoItem && todoItem?.description) {
			setDescription(todoItem?.description)
		}
	}, [todoItem]);
	
	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		
		if (description == undefined) return;
		
		if (todoItem) {
			// Updating an existing item
			const newTodoItem: TodoItemDTO = {
				description: description
			}
			
			handleSave(newTodoItem);
		}
		else {
			// Creating a new item
			
		}
		
		handleClose();
	}

  return (
	  <Modal show={open} onHide={handleClose}>
		  <Modal.Header closeButton>
			  <Modal.Title>{todoItem ? "Edit" : "Create a New"} Todo item</Modal.Title>
		  </Modal.Header>
		  <Modal.Body>
			  <Form id="todoForm" onSubmit={handleSubmit}>
				  <Form.Group className="mb-3" controlId="formBasicPassword">
					  <Form.Label>Description</Form.Label>
					  <Form.Control type="text" placeholder="Type your task here..." value={description} onChange={(e) => setDescription(e.target.value)} />
				  </Form.Group>
			  </Form>
		  </Modal.Body>
		  <Modal.Footer>
			  <Button variant="secondary" onClick={handleClose}>
				  Close
			  </Button>
			  <Button variant="primary" type="submit" form="todoForm">
				  {todoItem ? "Update todo item" : "Create new todo item"}
			  </Button>
		  </Modal.Footer>
	  </Modal>
  );
}
