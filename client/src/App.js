import './App.css';
import Authorization from './component/authorization';
import { registration } from './http/userApi';

function App() {
  
  async function test(){
    console.log(await registration('test', 'tesst@test.ru', '12345'))
  }
 


  return (
    <div className="App">
      <Authorization></Authorization>
    </div>
  )
}

export default App;
