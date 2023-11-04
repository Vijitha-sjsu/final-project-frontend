import './App.css';
import TweetComponent from './Components/TweetComponent/TweetComponent.tsx';

function App() {
  return (
    <div>
      <TweetComponent id = {1} user={{username:"Vijitha Gunta", id: "userId"}} time = {"Nov 5"} textContent='Yaay, my first tweet!' >

      </TweetComponent>
      <TweetComponent id = {1} user={{username:"Joe Dane", id: "userId"}} time = {"Nov 5"} textContent='Yaay, my first tweet!' >

      </TweetComponent>
      <TweetComponent id = {1} user={{username:"John doe", id: "userId"}} time = {"Nov 5"} textContent='Yaay, my first tweet!' >

      </TweetComponent>
      <TweetComponent id = {1} user={{username:"Prateek Sharma", id: "userId"}} time = {"Nov 5"} textContent='Yaay, my first tweet!' >

      </TweetComponent>
      <TweetComponent id = {1} user={{username:"Suri P", id: "userId"}} time = {"Nov 5"} textContent='Yaay, my first tweet!' >

      </TweetComponent>
      <TweetComponent id = {1} user={{username:"Neelesh G", id: "userId"}} time = {"Nov 5"} textContent='Yaay, my first tweet!' >

      </TweetComponent>
      <TweetComponent id = {1} user={{username:"EMily Howard", id: "userId"}} time = {"Nov 5"} textContent='Yaay, my first tweet!' >

      </TweetComponent>
    </div>
  );
}

export default App;
