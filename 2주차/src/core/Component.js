import { observe, observable } from "./Observer.js";

export default class Component { //���� render�� ��� ��ӹ޾� �������̵��� �� setState�̿��� ������ ���Ǿ�� �ȵȴ�.(���� ����)
  state; // 
  props;
  $el;
  constructor($el, props) {
    this.$el = $el; //������ ����� target�� ������ ����
    this.props = props; // �θ� ������Ʈ�κ��� ���� ���� ��ü(const {������Ƽ��} = $props�� �޼ҵ� ���ο��� ����� �� �ִ�.)
    this.setup();
  }
  setup() {
    this.state = observable(this.initState());
    observe(() => {
      this.render();
      this.setEvent();
    })
  }; // �ʱ� state�� ���� [�������̵�]
  initState() { return {} };
  template() { return '' }; // render�ÿ� ���ΰ�ħ �� html �����̸� ���ο��� map������ state�� �ִ� ���µ��� Ȱ���Ͽ� ���� �������� �Ҵ��� [�������̵�]
  render() { // state���� Ȥ�� �̺�Ʈ �߻��� setState�Լ� ���ο��� ����Ǿ� ������Ʈ�� �Ҵ�� template�� �������� �ٽ� ������ ��
    console.log(this);
    this.$el.innerHTML = this.template();
    this.mounted();
  }
  addEvent(eventType, selector, callback) {
    const children = [...this.$el.querySelectorAll(selector)];
    const isTarget = (target) => children.includes(target) || target.closest(selector);
    //�ٷ� �����ٿ��� ���ǹ����� Ȱ��Ǹ� addListener�� ���� target(template ����)���� eventType�� ��ġ�ϴ� �̺�Ʈ�� �߻��ϸ�
    //�̺�Ʈ�� �߻��� ������Ʈ�� target(template ����)�� �ڽ����� �Ǻ��ϰ� �ƴ϶�� 
    //��������� �˻��Ͽ� �ش� addEvent�� ���� �����ߴ� selector�� ���� �ڽ��� �ִ��� Ȯ�� �մϴ�.
    this.$el.addEventListener(eventType, event => {
      if (!isTarget(event.target)) return false;//�ƴϸ� event�߻��� �ߴ�
      callback(event)//������ �߰��� callback�� �ùٸ��� event�� ����.
    })
  }
  setEvent() {//�������̵��Ͽ� ���! addEvent�޼ҵ带 Ȱ����

  }

  mounted() {

    // �������̵��Ͽ� ��� html ������Ʈ�� ������Ƽ�� data - component ���� ���� ��� 
    //DOM��ü�� ���� �ش�������Ʈ�� �����Ѵ�.�� �� �����ϰ� ���Ǵ� �޼ҵ��� ��� ���ó�� bind�޼ҵ带 Ȱ���Ͽ� �Ѱ��ش�.

  }
  setState(newState) {
    this.$state = { ...this.$state, ...newState };
    this.render();
  }
}