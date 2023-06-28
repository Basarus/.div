import { useEffect, useState } from 'react';
import './style.css'
import * as http from '../http/userApi'
import { localUrl } from '../http';
import NavBar from './navbar';

function Answers(props) {

  const [questions, setQuestions] = useState([])
  const [target, setTarget] = useState(null)
  const [answer, setAnswer] = useState('')

  useEffect(() => {
    http.getQuestions().then(res => res.data).then(res => {
      setQuestions(res)
    })
  }, [target])

  function filter(type) {
    if (questions.length <= 1) return;
    if (type == 'date') {
      let copy = [...questions];
      let check = +new Date(copy[0].createdAt) - (+new Date(copy[1].createdAt)) >= 0
      if (!check) copy.sort((a, b) => +new Date(b.createdAt) - (+new Date(a.createdAt)));
      else copy.sort((a, b) => +new Date(a.createdAt) - (+new Date(b.createdAt)));
      setQuestions(copy)
    }
    if (type == 'status') {
      let copy = [...questions];
      let check = copy[0].status == 'Active'
      if (!check) copy.sort((a, b) => a.status.localeCompare(b.status) - b.status.localeCompare(a.status));
      else copy.sort((a, b) =>  b.status.localeCompare(a.status) -  a.status.localeCompare(b.status));
      setQuestions(copy)
    }
  }

  async function sendAnswer(){
    if (questions.find(e => e.id == target).comment) return;
      await http.sendAnswer(target, answer)
      setTarget(null)
      setAnswer('')
  }

  async function tryTarget(id){
    if (questions.find(e => e.id == id).status != 'Active') return;
    setTarget(id)
  }


  return (
    !target ? <div>
      <NavBar customRouter={props.customRouter} />
      <div className='filter_panel'>
          <button className='filter_button' onClick={filter.bind(this, 'status')}> Фильтр по статусу</button>
          <button className='filter_button' onClick={filter.bind(this, 'date')}> Фильтр по дате</button>
        </div>
      <div className="question_list">
        {questions.map((e, i) => {
          return <div onClick={tryTarget.bind(this, e.id)} key={e.id} className='question_form'>
            <div className='question_left'>
              <div className='question_user_id'>ID: {e.id}</div>
              <div className='question_user_text'>Сообщение: {e.message}</div>
             {e.comment ? <div className='question_user_text'>Ответ: {e.comment}</div> : ''}
            </div>
            <div className='question_right'>
              <div className='question_status'>Статус: {e.status}</div>
              <div className='question_date'>Дата: {e.createdAt}</div>
            </div>
          </div>
        })}
      </div>
    </div> : <div>
    <NavBar customRouter={props.customRouter} />
    <div className="auth_form">
                <input id='auth_name' onChange={(event) => setAnswer(event.target.value)} className='auth_input' placeholder="Ответ на вопрос"></input>
                <button onClick={sendAnswer.bind(this)} className='auth_switch'>Ответить на вопрос</button>
                <button onClick={setTarget.bind(this, null)} className='auth_switch'>Закрыть</button>
            </div>
    </div>
  )
}

export default Answers;