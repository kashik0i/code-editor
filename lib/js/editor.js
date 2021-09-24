const executeCodeBtn = document.querySelector(".editor__run");
const resetCodeBtn = document.querySelector(".editor__reset");

class Editor {
  codeEditor;
  tabs = 0;
  currentTab;
  addNewTab;
  deleteTab;
  constructor(ace) {
    this.addNewTab = () => {
      var self = this;
      var addTab = document.querySelector("#addTabIcon");
      var liElement = document.createElement("LI");
      liElement.setAttribute("role", "presentation");
      var iElement = document.createElement("SPAN");
      iElement.className = "fa fa-times";
      iElement.addEventListener(
        "click",
        function (event) {
          self.deleteTab(iElement);
        },
        false
      );
      var anchorElement = document.createElement("A");
      anchorElement.href = "#";
      this.tabs++;
      anchorElement.appendChild(iElement);
      var textChild = document.createElement("SPAN");
      textChild.innerHTML = "Tab[" + this.tabs + "]&nbsp;&nbsp;";
      anchorElement.insertBefore(textChild, iElement);
      liElement.appendChild(anchorElement);
      addTab.parentNode.insertBefore(liElement, addTab);
    };
    this.deleteTab = (tab) => {
      while (tab.nodeName != "LI") {
        tab = tab.parentNode;
      }
      tab.parentNode.removeChild(tab);
    };
    try {
      this.codeEditor = ace;
    } catch (error) {
      console.log(error.message);
      return;
    }
    // Set default code in editor
    var defaultValue =
      "console.log('Hello World');\nvar x = 3;\nvar x_sqr = x*3;";
    this.codeEditor.setValue(defaultValue);
    // Set buttons
    executeCodeBtn.addEventListener("click", (e) => {
      const userCode = this.codeEditor.getValue();

      // Run user code
      try {
        new Function(userCode)();
      } catch (error) {
        console.log(error);
      }
    });
    resetCodeBtn.addEventListener("click", (e) => {
      //   console.log(e);
      // Clear ace editor;
      this.codeEditor.setValue("");
    });

    // Theme
    this.codeEditor.setTheme("ace/theme/github");

    // Set Language
    this.codeEditor.session.setMode("ace/mode/javascript");

    // Set Options
    var options = {
      //   fontFamily: "",
      fontSize: "12pt",
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true,
    };
    this.codeEditor.setOptions(options);
  }
}
let editor = new Editor(ace.edit("editorCode"));
console.log(editor);

