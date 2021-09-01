import { observerble } from "./Observer";

export class Store { //vuex 타입
  #state; //내부 메소드에서 mutation에 지정된 동작으로만 변화시킬 수 있도록 private로
  #mutations; //마찬가지로 commit메소드에서만 호출 할 수 있도록 private
  #actions; //마찬가지로  dispatch를 통해서만 참조할 수 있도록 private
  state = { };
  constructor({ state, mutations, actions }) {
    this.#state = observerble(state);
    this.#mutations = mutations; //commit으로 동작시킬 action 집합
    this.#actions = actions; // dispatch를 통해 동작시킬 action 집합 (비동기적 API호출 할 때 사용)
    Object.keys(state).forEach(key => {
      Object.defineProperty(this.state, key, { //private가 아닌 state의 각 프로퍼티의 get을 private인 #state를 반환하도록 선언
        get: () => this.#state[key]
      })
    })
  }
  commit(action, payload) { //payload는 state 이외의 다른 인자! state는 꼭 넘겨줘야함 payload는 선택
    this.#mutations[action](this.#state, payload);
  }
  dispatch(action, payload) {
    return this.#actions[action]({ //store의 메소드를 this를 바인드함으로써 context를 유지하여 전달함 이유는 
      //내부에서 동작 후 필요 시 commit이나 dispatch를 통해 후속작업을 해야하고 그 후속에서 state를 참조할 필요가
      //있을 수 있기 때문입니다.
      //실제 constructor에서 actions를 지정할 시에는 {actions:({ action명: ({state, commit등 context유지할 프로퍼티 명}, ...payload)})=>동작할 함수}이런 형태로 지정한다. 비동기 적으로 동작하는 것과 관련이 깊어보임.
      state: this.#state,
      commit: this.commit.bind(this),
      dispatch: this.dispatch.bind(this)
    }, payload)
  }

}

export const creeateStore = (reducer) => {
  const state = observerble(reducer());

  const frozenState = { };
  Object.keys(state).forEach(key => {
    Object.defineProperty(frozenState, key, { //사실 상 그냥 외부에서 dispatch 이외의 수단으로 못 건드리도록
      //하는 용도 어차피 클래스가 아니기 때문에 외부에선 getState밖에 사용하지 못해서
      //frozenState만 참조할 수 있다.
      get: () => state[key],
    })
  })
  const dispatch = (action) => {
    const newState = reducer(state, action); // 기존 state 내용 유지 새 객체반환
    for (const [key, value] of Object.entries(newState)) {//entries는 잘 쓰진 않지만 파이썬의 numerable?과 비슷하다.
      if (!state[key]) continue;
      state[key] = value; //새 객체 갱신 이 때 observerble에 의해서 observe중인 컴포넌트들이 갱신된다.
    }
  }
  const getState = () => frozenState;
  return { getState, dispatch } //onReducer와 비슷해 보임
}

