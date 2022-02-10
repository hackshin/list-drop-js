const parentDiv = document.querySelector('.scrollBox');
let lists = document.querySelectorAll('.scrollItem');

let dragstartElem = null; // first draggedElement
let dragObject = null;

let storeList = [];

(() => {
  for (let index = 0; index < lists.length; index++) {
    const objectDiv = {
      div: lists[index],
      index: index,
    };
    storeList.push(objectDiv);
  }
})();

for (let index = 0; index < lists.length; index++) {
  lists[index].addEventListener(
    'dragstart',
    (e) => {
      dragstartElem = e.target;
      dragObject = { div: e.target, index: index };
    },
    false
  );

  lists[index].addEventListener('dragover', (e) => e.preventDefault(), false);

  lists[index].addEventListener(
    'drop',
    (e) => {
      e.preventDefault();

      if (e.target.className === 'scrollItem') {
        if (
          dragObject.div.parentNode !== e.target.parentNode ||
          e.target === dragstartElem ||
          dragstartElem === null
        )
          return;

        let currentObject = { div: e.target, index: index };

        storeList.map((obj, index) => {
          if (obj.index === currentObject.index) {
            storeList[index] = dragObject;
          } else if (obj.index === dragObject.index) {
            storeList[index] = currentObject;
          }
        });

        storeList.map((obj, index) => {
          parentDiv.appendChild(obj.div);
        });
      }
    },
    false
  );
}
