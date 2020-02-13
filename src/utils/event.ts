class EventEmitter {
    private list: {
        event: EventType
        fn: () => void
    }[] = []

    constructor() {}

    // 监听事件
    on(event: EventType, fn: () => void) {
        this.list.push({
            event,
            fn
        })
    }

    // 发出事件
    emit(event: EventType) {
        this.list.forEach((item) => {
            if (item.event === event) {
                item.fn()
            }
        })
    }
}

export enum EventType {
    signOut,
    loginSuccessful
}

export const event = new EventEmitter()
