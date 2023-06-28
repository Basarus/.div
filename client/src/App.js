import { useState } from 'react';
import './App.css';
import Authorization from './component/authorization';
import { registration } from './http/userApi';
import Question from './component/question.menu';
import Answers from './component/answers.menu';

function App() {
  
  let [component, setComponent] = useState('auth')


  function customRouter(componentId) {
    if (componentId) setComponent(componentId);
    switch (component) {
      case 'answers':
        return <Answers customRouter={customRouter}/>
      case 'question':
        return <Question customRouter={customRouter}/>
      default:
       return <Authorization customRouter={customRouter}/>
    }
  }

  return (
    <div className="App">
    {customRouter()}
    </div>
  )
}

export default App;
