import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  // 3.받아온 데이터를  컴포넌트 안에서 데이터로서 state로 쓰기 위해 state를 생성
  const [todos, setTodos] = useState(null);

  // 7. input 태그에 엮을 수 있는 state를 생성
  const [inputValue, setInputValue] = useState({
    title: "",
  });

  // 9. POST 함수를 만들어줌
  const onSubmitHandler = async () => {
    axios.post("http://localhost:4000/todos", inputValue);
    //state도 같이 렌더링 시켜주기 위해서 작성 map으로 뿌려준 todos
    setTodos([...todos, inputValue]);
  };

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
    <>
      <div>
        {/* {input 영역} */}
        <form
          /*form의 submit은 항상 새로고침 되기 때문에 preventDefault를 넣어줘야한다*/

          onSubmit={(event) => {
            event.preventDefault();

            // 버튼 클릭 시,  input에 들어있는 값(state)을 이용하여 DB에 저장 (POST)
            onSubmitHandler();
          }}
        >
          {/* 6. 추가를 누를 때 인풋값에 있는 값을 알아야함 벨류와 온체인지를 항상 엮어줘야함*/}
          <input
            type="text"
            /*8. 스테이트를 value와 onChange를 엮어준다*/
            value={inputValue.title}
            onChange={(event) => {
              setInputValue({ title: event.target.value });
            }}
          />
          <button type="submit">추가</button>
        </form>
      </div>

      <div>
        {/* 5. 화면에 뿌리기 위해 todos를 map으로 돌림 최초의 컴포넌트가 렌더링 됐을 때는 async가 실행되기 전에 map 부분이 실행된다
         그래서 그것을 방지하고자 optional chaining을 넣어준다 ?*/}
        {/* /데이터 영역 */}

        {todos?.map((item) => {
          return (
            // 항상 key 값이 필요
            <div key={item.id}>
              {item.id} : {item.title}
              {/* 삭제버튼 */}
              &nbsp;<button>삭제</button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
