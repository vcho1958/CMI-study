let currentObserver = null;


const debounceFrame = (callback) => {
  let currentCallback = -1;
  return () => {
    cancelAnimationFrame(currentCallback);
    currentCallback = requestAnimationFrame(callback);
  }
}
export const observe = fn => { //observerble�� ���� ������� ��ü�� �����ϴ� �Լ��� ���ڷ� �����Ѵ�.
  //������ observerble�� ���Ǵ� �Լ����� observers�� ����ϱ� ���ؼ�
  currentObserver = debounceFrame(fn);
  fn();
  currentObserver = null;
}

export const observable = obj => { //obj�� Ư�� ���°� ����ִ� ��ü�̴�.
  // Object.keys(obj).forEach(key => {
  //   let _value = obj[key];
  //   const observers = new Set();
  //   Object.defineProperty(obj, key, { //���� �� ��ü�� ������Ƽ���� get�� set�� �����Ѵ�.
  //     get() { //�������� ��ü�� ������Ƽ�� ������ �� �߻��Ѵ�.
  //       if (currentObserver) observers.add(currentObserver); //���� observe�Լ��� ���� ���޵� �Լ� ���ο��� ��ü�� ������Ƽ�� ���� ���� ��� �ش� �Լ��� observers�� �߰��Ѵ�.
  //       return _value;//
  //     },
  //     set(value) { //���� ��𼭵� �ش� �������� ��ü�� ���� ��ȭ�� �شٸ�
  //       if (_value === value) return;
  //       if (JSON.stringify(_value) === JSON.stringify(value)) return;

  //       //���ڴ� immutable�� �� ���ڴ� mutable�� �� �����ϴ� ������ ���� �ڵ�
  //       //Set, Map�� Ư�� ��ü�� stringfy�� ������������Ƿ� ���� �ʿ�� �ۼ��ؾ��Ѵ�.
  //       _value = value;
  //       observers.forEach(fn => fn());
  //       //get�� ���� �߰��� �ݹ��Լ����� �ٽ� �ѹ� �����Ѵ�.
  //       //render�Լ��� observe�� �����ϸ� ��ȭ�� ������ DOM�� �緻�����Ǵ� ������ ������ �� �ִ�.
  //     }
  //   });
  // })
  // return obj;
  const observerMap = { };
  return new Proxy(obj, {
    get(target, name) {//target�� obj�� �纻 �� �� ����. name�� key��� ���� �� ��.
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