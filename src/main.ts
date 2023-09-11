import "./css/style.css";
import FullList from "./model/FullList";
import ListItem from "./model/ListItem";

import ListTemplate from "./template/listTemplate";

const initApp = (): void => {
  const fullList = FullList.instance;
  const template = ListTemplate.instance;
  const itemEntryForm = document.getElementById(
    "itemEntryForm"
  ) as HTMLFormElement;

  //adds a newentry and updates the fullList as well as
  //the user interface
  itemEntryForm.addEventListener("submit", (event: SubmitEvent): void => {
    event.preventDefault();
    const input = document.getElementById("newItem") as HTMLInputElement;
    const newEntryText: string = input.value.trim();
    if (!newEntryText.length) return;

    const itemId: number = fullList.list.length
      ? parseInt(fullList.list[fullList.list.length - 1].id) + 1
      : 1;
    const newItem = new ListItem(itemId.toString(), newEntryText);
    fullList.addItem(newItem);
    template.render(fullList);
  });

  //clears the entire todo list and
  //updates the localstorage as well as the userinterface
  const clearItems = document.getElementById(
    "clearItemsButton"
  ) as HTMLButtonElement;
  clearItems.addEventListener("click", (): void => {
    fullList.clearList();
    template.clear();
  });
  fullList.load();
  template.render(fullList);
};

//to ensure HTML structure of the page is ready before calling initApp
document.addEventListener("DOMContentLoaded", initApp);
