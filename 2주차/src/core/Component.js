

class Component {
  $state; // ��ȭ�� ������ ��ü
  $target; // target query
  constructor($target) {
    this.$target = $target;
    this.setup();
    this.setEvent();
    this.render();
  }
  setup() { }; // �ʱ� state�� ���� [�������̵�]
  template() { return '' }; // render�ÿ� ���ΰ�ħ �� html �����̸� ���ο��� map������ state�� �ִ� ���µ��� Ȱ���Ͽ� ���� �������� �Ҵ��� [�������̵�]
  render() { // state���� Ȥ�� �̺�Ʈ �߻��� setState�Լ� ���ο��� ����Ǿ� ������Ʈ�� �Ҵ�� template�� �������� �ٽ� ������ ��
    this.$target.innerHTML = this.template();
  }
  addEvent(eventType, selector, callback) {
    const children = [...this.$target.querySelectorAll(selector)];
    const isTarget = (target) => children.includes(target) || target.closest(selector);
    //�ٷ� �����ٿ��� ���ǹ����� Ȱ��Ǹ� addListener�� ���� target(template ����)���� eventType�� ��ġ�ϴ� �̺�Ʈ�� �߻��ϸ�
    //�̺�Ʈ�� �߻��� ������Ʈ�� target(template ����)�� �ڽ����� �Ǻ��ϰ� �ƴ϶�� 
    //��������� �˻��Ͽ� �ش� addEvent�� ���� �����ߴ� selector�� ���� �ڽ��� �ִ��� Ȯ�� �մϴ�.
    this.$target.addEventListener(eventType, event => {
      if (!isTarget(event.target)) return false;//�ƴϸ� event�߻��� �ߴ�
      callback(event)//������ �߰��� callback�� �ùٸ��� event�� ����.
    })
  }
  setEvent() {//�������̵��Ͽ� ���! addEvent�޼ҵ带 Ȱ����

  }
  setState(newState) {
    this.$state = { ...this.$state, ...newState };
    this.render();
  }
}