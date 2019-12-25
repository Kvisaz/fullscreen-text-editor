const Repository = {
    keyItem: "fullscreen-text-editor-xds121",
    load() {
        const saved = localStorage.getItem(this.keyItem);
        if (saved != null) return JSON.parse(saved);
        else return '';
    },

    save(content) {
        localStorage.setItem(this.keyItem, JSON.stringify(content))
    }
};

const InputWrapper = {
    INPUT_ELEMENT: null,

    init() {
        this.INPUT_ELEMENT = document.querySelector('#input');
        document.execCommand("defaultParagraphSeparator", false, "p");
    },

    getText() {
        return this.INPUT_ELEMENT.innerHTML;
    },

    setText(text) {
        this.INPUT_ELEMENT.innerHTML = text;
    }

};

const App = {
    autoSaveInterval: 1000,
    autoSaveTimer: -1,

    initData() {
        const saved = Repository.load();
        if (saved.length > 0) InputWrapper.setText(saved);
    },

    initTimer() {
        clearTimeout(this.autoSaveTimer);
        this.autoSaveTimer = setInterval(() => this.save(), this.autoSaveInterval);
    },

    save() {
        Repository.save(InputWrapper.getText());
    },

    run() {
        InputWrapper.init();
        this.initData();
        this.initTimer();
    }
};

App.run();