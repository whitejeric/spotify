import './App.css';
import Dashboard from './Dashboard';
import Login from './Login';
import logo from './logo.svg';

const code = new URLSearchParams(window.location.search).get('code');
console.log(code);

function App() {
	return (
		<div className="App">{code ? <Dashboard code={code} /> : <Login />}</div>
	);
}

export default App;
