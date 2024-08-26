import { Navbar } from './components/Nabvar/Navbar';
import { Body } from './components/Body/Body';
import { Sidebar } from './components/Sidebar/Sidebar';
import './App.css';

function App() {
	return (
		<div className='app-container'>
			<Navbar />
			<Body />
			<Sidebar />
		</div>
	);
}

export default App;

