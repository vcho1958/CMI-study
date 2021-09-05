let currentObserver = null;


const debounceFrame = (callback) => {
  let currentCallback = -1;
  return () => {
    cancelAnimationFrame(currentCallback);
    currentCallback = requestAnimationFrame(callback);
  }
}
export const observe = fn => { //observerble을 통해 만들어진 객체를 참조하는 함수를 인자로 전달한다.
  //이유는 observerble이 사용되는 함수들을 observers에 등록하기 위해서
  currentObserver = debounceFrame(fn);
  fn();
  currentObserver = null;
}

export const observable = obj => { //obj는 특정 상태가 들어있는 객체이다.
  // Object.keys(obj).forEach(key => {
  //   let _value = obj[key];
  //   const observers = new Set();
  //   Object.defineProperty(obj, key, { //전달 된 객체의 프로퍼티별로 get과 set을 설정한다.
  //     get() { //옵저버블 객체의 프로퍼티를 참조할 때 발생한다.
  //       if (currentObserver) observers.add(currentObserver); //만약 observe함수를 통해 전달된 함수 내부에서 객체의 프로퍼티가 참조 됐을 경우 해당 함수를 observers에 추가한다.
  //       return _value;//
  //     },
  //     set(value) { //만약 어디서든 해당 옵저버블 객체의 값에 변화를 준다면
  //       if (_value === value) return;
  //       if (JSON.stringify(_value) === JSON.stringify(value)) return;

  //       //전자는 immutable일 때 후자는 mutable일 때 동작하는 렌더링 방지 코드
  //       //Set, Map등 특수 객체는 stringfy가 적용되지않으므로 추후 필요시 작성해야한다.
  //       _value = value;
  //       observers.forEach(fn => fn());
  //       //get을 통해 추가된 콜백함수들이 다시 한번 동작한다.
  //       //render함수를 observe로 전달하면 변화될 때마다 DOM이 재렌더링되는 로직을 구현할 수 있다.
  //     }
  //   });
  // })
  // return obj;
  const observerMap = { };
  return new Proxy(obj, {
    get(target, name) {//target이 obj의 사본 인 것 같다. name이 key라고 보면 될 듯.
      observerMap[name] = observerMap[name] || new Set();
      if (currentObserver) observerMap[name].add(currentObserver);
      return target[name];
    },
    set(target, name, value) {
      if (!value.getMonth && target[name] == value) return true;
      if (!value.getMonth && JSON.stringify(target[name]) == JSON.stringify(value)) return true;
      target[name] = value;
      observerMap[name].forEach(fn => fn());
      return true;
    }
  })

}