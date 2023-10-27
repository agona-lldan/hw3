import "./style.scss";

// а когда не было кривых названий функций
function sueta() {
  const list = document.getElementById("list");
  if (localStorage.getItem("todo")) {
    if (list) {
      list.innerHTML = localStorage.getItem("todo") || "";
    }
  }

  document.querySelectorAll(".todo__check").forEach((elem) => {
    elem.addEventListener("click", () => {
      if (elem.classList.contains("active")) {
        elem.classList.remove("active");
      } else {
        elem.classList.add("active");
      }
      saveOnStorage();
    });
  });

  document.querySelectorAll(".todo__delete").forEach((elem) => {
    elem.addEventListener("click", (evt) => {
      if (evt.target instanceof HTMLElement) {
        const dataDelete = evt.target.dataset.delete;
        const element = document.querySelector(
          "[data-id='" + dataDelete + "']",
        );
        element?.remove();
        saveOnStorage();
      }
    });
  });

  function saveOnStorage() {
    localStorage.setItem("todo", list?.innerHTML || "");
  }
}
window.onload = sueta;
const input: HTMLInputElement | null = document.getElementById(
  "input",
) as HTMLInputElement;
const highlight = document.getElementById("highlight");
input?.addEventListener("input", () => {
  if (highlight) {
    const split = input.value.split(" ");
    const regex = /#[a-zA-Z0-9А-Яа-я]+/;
    let result = "";
    for (let i = 0; i < split.length; i++) {
      if (regex.test(split[i])) {
        result += "<span>" + split[i] + "</span> ";
      } else {
        result += split[i] + " ";
      }
    }
    highlight.innerHTML = result;
  }
});

document.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    if (input && input.value.length > 0) {
      const split = input.value.split(" ");
      const regex = /#[a-zA-Z0-9А-Яа-я]+/;
      let task = "";
      let hashtag: string[] = [];
      for (let i = 0; i < split.length; i++) {
        if (regex.test(split[i])) {
          hashtag.push(split[i]);
        } else {
          task += split[i] + " ";
        }
      }
      const list = document.getElementById("list");
      const elements = document.querySelectorAll("[data-id]");

      let htmlFirst = ` <div class="todo__item" data-id="${
        elements.length + 1
      }">
            <div class="todo__item-block">
              <button class="todo__check"></button>
              <p class="todo__text">${task}</p>
            </div>
            <div class="todo__item-block">
              <div class="todo__hashtag-wrapper">`;
      const htmlSecond = `
              </div>
              <button class="todo__delete" data-delete="${
                elements.length + 1
              }">удалить</button>
            </div>
          </div>`;

      if (hashtag.length > 0) {
        for (let el of hashtag) {
          htmlFirst += `<div class="todo__hashtag">${el}</div>`;
        }
      }
      list?.insertAdjacentHTML("afterbegin", htmlFirst + htmlSecond);
      localStorage.setItem("todo", list?.innerHTML || "");
      sueta();
      input.value = "";
      if (highlight) {
        highlight.innerHTML = "";
      }
    }
  }
});
