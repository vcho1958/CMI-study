

class Component {
  $state; // 변화를 감지할 객체
  $target; // target query
  constructor($target) {
    this.$target = $target;
    this.setup();
    this.setEvent();
    this.render();
  }
  setup() { }; // 초기 state값 설정 [오버라이딩]
  template() { return '' }; // render시에 새로고침 될 html 구역이며 내부에서 map등으로 state에 있는 상태들을 활용하여 값을 동적으로 할당함 [오버라이딩]
  render() { // state변경 혹은 이벤트 발생시 setState함수 내부에서 실행되어 컴포넌트에 할당된 template을 기준으로 다시 렌더링 함
    this.$target.innerHTML = this.template();
  }
  addEvent(eventType, selector, callback) {
    const children = [...this.$target.querySelectorAll(selector)];
    const isTarget = (target) => children.includes(target) || target.closest(selector);
    //바로 다음줄에서 조건문에서 활용되며 addListener를 통해 target(template 구역)에서 eventType과 일치하는 이벤트가 발생하면
    //이벤트가 발생한 엘리먼트가 target(template 구역)의 자식인지 판별하고 아니라면 
    //재귀적으로 검사하여 해당 addEvent를 통해 지정했던 selector를 가진 자식이 있는지 확인 합니다.
    this.$target.addEventListener(eventType, event => {
      if (!isTarget(event.target)) return false;//아니면 event발생을 중단
      callback(event)//맞으면 추가한 callback에 올바르게 event를 전달.
    })
  }
  setEvent() {//오버라이딩하여 사용! addEvent메소드를 활용함

  }
  setState(newState) {
    this.$state = { ...this.$state, ...newState };
    this.render();
  }
}