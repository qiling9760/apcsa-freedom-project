class Scene1 extends Phaser.Scene {
  constructor() {
    super("scene1");
  }

  preload() {
    this.load.image("cat1", "sprites/hershey.PNG");
    this.load.image("cat2", "sprites/kiss.PNG");
    this.load.image("cat3", "sprites/kitkat.PNG");
    this.load.image("cat4", "sprites/nn.PNG");
  }

  create() {
    // array to store all types of cats
    this.candy = ["cat1", "cat2", "cat3", "cat4"];
    // game grid and rows + columns
    this.eachCat = [];
    this.rows = 5;
    this.cols = 5;
    // distance between each boxes
    this.tileDistance = 150;
    this.offsetX = 100;
    this.offsetY = 100;

    // create the grid of cats
    // loop through each row
    for (let row = 0; row < this.rows; row++) {
      // add a new empty row to the grid
      this.eachCat[row] = [];

      // loop through each column in the row
      for (let col = 0; col < this.cols; col++) {
        // where to put the cats on the screen
        let x = this.offsetX + col * this.tileDistance;
        let y = this.offsetY + row * this.tileDistance;

        // give each box one cat, randomly get a cat from the array
        let num = Math.floor(Math.random() * this.candy.length);
        let cat = this.add
          .image(x, y, this.candy[num])
          .setScale(0.05)
          .setOrigin(0.5, 0.5)
          .setInteractive({ draggable: true });  // allow the cat to be dragged

        // cat info
        cat.catType = this.candy[num];
        cat.row = row;
        cat.col = col;
        // position of the cat when we start dragging, use it to make the cat go back to original position when we can't find a target cat to switch spot
        cat.originalX = x;
        cat.originalY = y;

        // run when dragging, cat position = mouse position
        cat.on("drag", (pointer, dragX, dragY) => {
          cat.x = dragX;
          cat.y = dragY;
        });

        // when the cat let go by the mouse
        cat.on("dragend", () => {
          this.dragging(cat);
        });

        this.input.setDraggable(cat);

        // add the cat to the grid
        this.eachCat[row][col] = cat;
      }
    }

    // this.handleMatches();
  }

  // find the cats that are three or more in a row or column and return an array of those cats
  findMatches() {
    // array to store the cats that are three or more in a row or column
    let matches = [];

    // horizontal
    for (let row = 0; row < this.rows; row++) {
      let streak = [];
      for (let col = 0; col < this.cols; col++) {
        // cat that we are currently looking at
        let current = this.eachCat[row][col];
        if (current && streak.length > 0 &&
          current.catType === streak[streak.length - 1].catType // if current cat's type  == last cat's type in the streak array
        ) {
          streak.push(current); // add the current cat to the streak array
        } else { // cats not the same
          if (streak.length >= 3) {
            matches.push(...streak); // add every item in the streak to match
          }
          // if the next cat does not exist, set the streak to an empty array
          if (current) {
            streak = [current]; // add the first current cat to streak/start finding a different type
          } else {
            streak = [];
          }
        }
      }
      if (streak.length >= 3) {
        matches.push(...streak);
      }
    }

    // vertical
    for (let col = 0; col < this.cols; col++) {
      let streak = [];
      for (let row = 0; row < this.rows; row++) {
        let current = this.eachCat[row][col];
        if (
          current &&
          streak.length > 0 &&
          current.catType === streak[streak.length - 1].catType
        ) {
          streak.push(current);
        } else {
          if (streak.length >= 3) {
            matches.push(...streak);
          }
          if (current) {
            streak = [current];
          } else {
            streak = [];
          }
        }
      }
      if (streak.length >= 3) {
        matches.push(...streak);
      }
    }

    // unique will have all the cats that are the same
    // duplicate from two matches will only get into unique onces
    let unique = [];
    for (let i = 0; i<matches.length; i++) {
      if (!unique.includes(matches[i])) { // include checks if the array has that item
        unique.push(matches[i]);
      }
    }
    return unique;
  }

  //swap the cat info of c1 and c2, then update the grid and the position of the cats on screen
  swapCat(c1, c2) {
    // store the cat info of c1 in a temp variable so we can swap the cat info of c1 and c2
    let tempX = c1.originalX;
    let tempY = c1.originalY;
    let tempRow = c1.row;
    let tempCol = c1.col;

    c1.originalX = c2.originalX;
    c1.originalY = c2.originalY;
    c1.row = c2.row;
    c1.col = c2.col;

    c2.originalX = tempX;
    c2.originalY = tempY;
    c2.row = tempRow;
    c2.col = tempCol;

    // swap the position of the cats in the grid
    this.eachCat[c1.row][c1.col] = c1;
    this.eachCat[c2.row][c2.col] = c2;

    // update the position of the cats on screen
    c1.setPosition(c1.originalX, c1.originalY);
    c2.setPosition(c2.originalX, c2.originalY);
  }

  // check if the cat we are dragging is next to the target cat
  isNeighbor(c1, c2) { // c1 is cat that we are dragging, c2 is the targetCat
    let xDiff = Math.abs(c1.row - c2.row); // (0,0) & (1,0) xDiff = 1
    let yDiff = Math.abs(c1.col - c2.col); // yDiff = 0
    return xDiff + yDiff === 1; // return true is they are next to each other
  }

  // get information of the cat we want to swap with
  getCat(mao) { // mao is the cat we are dragging
    // loop through the grid to find the cat that we want to swap with
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        let cat = this.eachCat[row][col];
        if (!cat || cat === mao) continue; // continue means skip the code afterwards and go to the next loop, we do nothing if there is no cat or the position is equal to itself

        // if overla, then get the information of the cat that we are dragging to
        let overlap = Phaser.Geom.Intersects.RectangleToRectangle(
          mao.getBounds(),
          cat.getBounds(),
        );
        if (overlap) return cat; // targetCat in dragging()
      }
    }
    // if can't find target cat
    return null;
  }

  // delete the cats that are in match
  handleMatches() {
    let matches = this.findMatches(); // unique array (same cats)
    if (matches.length > 0) {
      for (let i = 0; i<matches.length; i++) {
        this.eachCat[matches[i].row][matches[i].col] = null;
        // delete the cats that are three or more in a row or column
        matches[i].destroy();
      }
    }
  }

  dragging(mao) {
    let targetCat = this.getCat(mao); // use getCat() to get the information of the cat we want to swap with

    // if can't find targetCat then the mao (cat we are dragging) go back to where it is
    if (!targetCat) {
      mao.setPosition(mao.originalX, mao.originalY);
      return;
    }

    // if they are next to each other, we swap
    if (this.isNeighbor(mao, targetCat)) {
      this.swapCat(mao, targetCat);
      this.handleMatches();
    } else {
      mao.setPosition(mao.originalX, mao.originalY);
    }
  }
}

const config = {
  type: Phaser.AUTO,
  parent: "phaser-game",
  width: window.innerWidth,
  height: window.innerHeight,
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [Scene1],
};

new Phaser.Game(config);
