# Entry 5
##### 4/19/26
### Context 
I created a **match-3 puzzle game** where the players can move the cat sprites around to line them into three or more of the same type in a row or column to clear them. My tool is [phaser](https://docs.phaser.io/phaser/getting-started/what-is-phaser), and this is my [product](https://qiling9760.github.io/apcsa-freedom-project/tool/phaser.html).

### Tool
#### findMatches()
I built different functions to help me move and destory cats.

First, I need to find the cats that are three or more in a row or column that have the same type. 

``` js
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

      // vertical
    }

    // unique will have all the cats that are the same
    // duplicate from two streak will only get into unique onces
    let unique = [];
    for (let i = 0; i<matches.length; i++) {
      if (!unique.includes(matches[i])) { // include checks if the array has that item
        unique.push(matches[i]);
      }
    }
    return unique;
}
```
The `for loop` compares current cat with the last cat in the `streak` array. If the current cat has the same type as the last cat, then it will be added to the array. The loop will keep adding the cats to the array until the current cat has a different type as the cats in the array. Then, if the `streak` array has a length of 3 or more, that means we find a match, and they can be clear out. Every item in this array will be pushed to the `matches` array. After each push, the `streak` array will get reset and continue to find the next type of cats that may have a match. 

If `streak`'s length is less than 3, that means we did not find a match. It will reset and use the cat that ends the streak as the base to find the next match. 

Since streaks are checked both horizontally and vertically, a single cat can belong to two different match streaks at the same time.
```
a, a, a
b, `a`, b,
c, a, d,
```
The center `a` can get pushed twice into `matches`.

If a cat has already been added to the `unique` array, it won’t be added again when it appears in `matches` later. The `unique` make sure each cat only get destoryed once.

#### isNeighbor()
Only cats that are next to each other can switch spot. 
``` js
// check if the cat we are dragging is next to the target cat
  isNeighbor(c1, c2) { // c1 is cat that we are dragging, c2 is the targetCat
    let xDiff = Math.abs(c1.row - c2.row); // (0,0) & (1,0) xDiff = 1
    let yDiff = Math.abs(c1.col - c2.col); // yDiff = 0
    return xDiff + yDiff === 1; // return true is they are next to each other
  }
```
Cats are considered neighbors if they are adjacent in the same row or column. If they are in the same column, their column index difference must be 0 and their row index difference must be 1 for them to be adjacent. So, the sum of their column and row differencs must be 1 to be neighbors. 

#### handleMatches()
Once we’ve identified all matching cats, we remove them from the board.
``` js
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
```
I found [.destory()](https://docs.phaser.io/phaser/concepts/gameobjects) from the Phaser documentation. This method permanently remove a game object. 

#### dragging()
After I drag a cat, I swap its position with the target cat. If they are neighbors, the swap is allowed; if not, the dragged cat returns to its original position. After the swap, if it creates a match, the cats in the match will be destroyed. 
``` js
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
```

### EDP
I am in the `test and evaluate the prototype` stage of my project because I have completed my MVP, and I need to verify that it works as expected. I also need to add extra features to make my game to make it feel like an actual `macth-3 puzzle game`. 

### Skills
#### Collaboration
I asked one of my classmates Shi Jun for help. He taught me how to use `matches.push(...streak)` and `.includes()`. `matches.push(...streak)` means adding each individual item in the `streak` array into `matches`. 
``` js
matches.push(streak[0], streak[1], streak[2], ...);
```
`.includes()` checks if the array has an specific item. 


#### Problem decomposition
I broke the game into different parts and created separate functions to handle each part. I know that in order to swap the cats, I need to get the position information of the cat I want to swap with, so I made the `getCat()` function. I also know that before two cats can be swapped, they need to be next to each other, so I created the `isNeighbor()` function.


[Previous](entry04.md) | [Next](entry06.md)

[Home](../README.md)