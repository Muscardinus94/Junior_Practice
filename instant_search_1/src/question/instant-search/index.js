import { debounce } from './util';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

/*
* title: InstantSearch class
* description: instant search ui component
* configuration:
    selector: 검색필드를 display할 영역,
    css: 적용할 css 명칭 ,
    placeholder: 검색필드 안내문구,
    delayTime: 지연시간,
    changeEvent: 텍스트 입력시 이벤트
*/
export class InstantSearch {
    constructor(configuration) {
        // 내부변수
        // default delay time
        this.DEFAULT_DELAY_TIME = 500;
        // rxjs subscription (구독을 해제하기 위한 변수)
        this.subscription = null;

        // 설정정보
        // callback setup
        this.callback = configuration.changeEvent;
        // delayTime setup
        this.delayTime = configuration.delayTime ?? this.DEFAULT_DELAY_TIME;

        // 초기 템플릿 display, 이벤트 대상 저장
        this.textinputElement = this.initialize(document.querySelector(configuration.selector), configuration);

        // event listen
        this.eventBinding();
    }

    /*
    * title: instant search display method
    * input: display 되는 element, configuration placeholder, css 정보
    * output: text input element
    * description: 최초 생성할 때 input element를 생성한다. 템플릿을 관리한다.
    */
    initialize(selector, configuration) {
        // js. configuration을 참고하여 input element를 생성하시오. (기능과 디자인을 분리하기 위한 방법)
        // TODO: Write JS code here!'
        const textinput = document.createElement("input");
        textinput.setAttribute("type", "text");
        textinput.setAttribute("placeholder", configuration.placeholder);
        textinput.classList.add(configuration.css);
        selector.appendChild(textinput);
        return textinput;
    }

    /*
    * title: event binding method
    * description: component의 기능을 구현.
    */
    eventBinding() {
        // q3. debounce 기능을 통해 가져온 데이터를 외부로 전달한다.
        // TODO: Write JS code here!'
        const dispatchEvent = debounce((targetText) => {
            this.callback(targetText);
        }, this.delayTime);
        // this.textinputElement.addEventListener('keyup', (event) => {
        //     dispatchEvent(event.target.value);
        // });

        const eventSource = fromEvent(this.textinputElement, "keyup")
            .pipe(debounceTime(this.delayTime));
        this.subscription = eventSource.subscribe((event) => {
            dispatchEvent(event.target.value);
        });
    }
}
