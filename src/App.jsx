import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  // 3.받아온 데이터를 위락 컴포넌트 안에서 데이터로서 state로 쓰기 위해 state를 생성
  const [todos, setTodos] = useState(null);

  // 2. 비동기 함수를 만듬 , 서버 통신을 한다는 것 자체가 비동기를 의미하기 때문
  const fetchTodos = async () => {
    //get 으로 axios 통신을 요청 , axios 앞에 await을 붙여야함
    const { data } = await axios.get("http://localhost:4000/todos");

    console.log("data: ", data);

    // 4. todos에 데이터를 set 해줌, 그래야 컴포넌트 안에서 state에 db가 돌아감
    setTodos(data);
  };

  // 1. 화면이 마운팅 됐을 때 실행되는 hook
  useEffect(() => {
    // db로 부터 값을 가져올 것이다.
    fetchTodos();
  }, []);

  return (
    // 5. 화면에 뿌리기 위해 todos를 map으로 돌림
    // 최초의 컴포넌트가 렌더링 됐을 때는 async가 실행되기 전에 map 부분이 실행된다 그래서 그것을 방지하고자 optional chaining을 넣어준다 ?
    <div>
      {todos?.map((item) => {
        return (
          // 항상 key 값이 필요
          <div key={item.id}>
            {item.id} : {item.title}
          </div>
        );
      })}
    </div>
  );
}

export default App;
