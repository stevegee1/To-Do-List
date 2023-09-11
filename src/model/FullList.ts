import ListItem from "./ListItem";

interface List {
  list: ListItem[];
  load(): void;
  save(): void;
  clearList(): void;
  addItem(itemObj: ListItem): void;
  removeItem(id: string): void;
}

export default class FullList implements List {
  //defined a singleton for FullList clas
  static instance: FullList = new FullList();
  private constructor(private itemArray: ListItem[] = []) {}

  get list(): ListItem[] {
    return this.itemArray;
  }
  set list(arry: ListItem[]) {
    this.itemArray = arry;
  }

  /**
   * we load items for storage and,
   * adds it to our FullList instance
   *
   * @returns void
   */
  load(): void {
    const storedItems: string | null = localStorage.getItem("myList");
    if (typeof storedItems !== "string") return;
    const parsedList: { _id: string; _item: string; _checked: boolean }[] =
      JSON.parse(storedItems);
    parsedList.forEach((itemObj) => {
      const newListItem = new ListItem(
        itemObj._id,
        itemObj._item,
        itemObj._checked
      );
      FullList.instance.addItem(newListItem);
    });
  }

  /**
   * We stringify and save our itemArray in the localstorage
   * @returns: void
   */
  save(): void {
    localStorage.setItem("myList", JSON.stringify(this.itemArray));
  }

  /**
   * we clear the todo list and update our localStorage
   * @returns:void
   */
  clearList(): void {
    this.itemArray = [];
    this.save();
  }

  /**
   * We add item to our todo list
   * @param itemObj : ListItem
   * @returns:void
   */
  addItem(itemObj: ListItem): void {
    this.itemArray.push(itemObj);
    this.save();
  }

  /**
   * we remove item from our todolist
   * @param id :string
   */
  removeItem(id: string): void {
    this.itemArray = this.itemArray.filter((item) => item.id !== id);
  }
}
