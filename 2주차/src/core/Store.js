import { observerble } from "./Observer";

export class Store { //vuex Ÿ��
  #state; //���� �޼ҵ忡�� mutation�� ������ �������θ� ��ȭ��ų �� �ֵ��� private��
  #mutations; //���������� commit�޼ҵ忡���� ȣ�� �� �� �ֵ��� private
  #actions; //����������  dispatch�� ���ؼ��� ������ �� �ֵ��� private
  state = { };
  constructor({ state, mutations, actions }) {
    this.#state = observerble(state);
    this.#mutations = mutations; //commit���� ���۽�ų action ����
    this.#actions = actions; // dispatch�� ���� ���۽�ų action ���� (�񵿱��� APIȣ�� �� �� ���)
    Object.keys(state).forEach(key => {
      Object.defineProperty(this.state, key, { //private�� �ƴ� state�� �� ������Ƽ�� get�� private�� #state�� ��ȯ�ϵ��� ����
        get: () => this.#state[key]
      })
    })
  }
  commit(action, payload) { //payload�� state �̿��� �ٸ� ����! state�� �� �Ѱ������ payload�� ����
    this.#mutations[action](this.#state, payload);
  }
  dispatch(action, payload) {
    return this.#actions[action]({ //store�� �޼ҵ带 this�� ���ε������ν� context�� �����Ͽ� ������ ������ 
      //���ο��� ���� �� �ʿ� �� commit�̳� dispatch�� ���� �ļ��۾��� �ؾ��ϰ� �� �ļӿ��� state�� ������ �ʿ䰡
      //���� �� �ֱ� �����Դϴ�.
      //���� constructor���� actions�� ������ �ÿ��� {actions:({ action��: ({state, commit�� context������ ������Ƽ ��}, ...payload)})=>������ �Լ�}�̷� ���·� �����Ѵ�. �񵿱� ������ �����ϴ� �Ͱ� ������ ����.
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
    Object.defineProperty(frozenState, key, { //��� �� �׳� �ܺο��� dispatch �̿��� �������� �� �ǵ帮����
      //�ϴ� �뵵 ������ Ŭ������ �ƴϱ� ������ �ܺο��� getState�ۿ� ������� ���ؼ�
      //frozenState�� ������ �� �ִ�.
      get: () => state[key],
    })
  })
  const dispatch = (action) => {
    const newState = reducer(state, action); // ���� state ���� ���� �� ��ü��ȯ
    for (const [key, value] of Object.entries(newState)) {//entries�� �� ���� ������ ���̽��� numerable?�� ����ϴ�.
      if (!state[key]) continue;
      state[key] = value; //�� ��ü ���� �� �� observerble�� ���ؼ� observe���� ������Ʈ���� ���ŵȴ�.
    }
  }
  const getState = () => frozenState;
  return { getState, dispatch } //onReducer�� ����� ����
}

