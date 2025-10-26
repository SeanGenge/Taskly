import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TodoPage from './pages/TodoPage'
import PageLayout from './Layouts/PageLayout'

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<PageLayout />}>
					<Route index element={<TodoPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
