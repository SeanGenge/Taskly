type props = {
	openModal: (id?: string) => void;
};

function TodoHeader({ openModal }: props) {
	return (
		<button className="btn btn-primary w-100" onClick={() => openModal()}>
			Add Task
		</button>
	)
}

export default TodoHeader
