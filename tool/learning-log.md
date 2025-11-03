# Tool Learning Log

## Tool: Phaser

## Project: Cat Crush

---

### 10/5/25:
I linked **Math.js** to my HTML file using CDN.
- `math.evaluate()` is solving the expression.
``` JS
var num = math.evaluate('(2+3)/4');
console.log(num); // 1.5
```
It can take in variables and solve.
``` JS
var x = {x:2};
var num = math.evaluate('(2*x)/4', x );
console.log(num)
```
The second argument need to be an object, like `{ x: 2 }`. It does not work when I just write `var x = 2`.

- `math.parse()` is breaking down the expression into pieces.
``` JS
math.parse('2 * x^3');
```
- OperatorNode: *, ^
- ConstantNode: 2
- SymbolNode: x

### 11/2/25:
I decided to change my project to my backup idea, which is a candy crush game. I will use the cats I have from last year's project to make my game. 

`preload () {}` - define the asserts for the scene. 
``` js
preload() {
    this.load.image("roachCat", "sprites/roachCat.PNG");
}
```
The first `""` is how you refer to this image, and the second `""` is the source of the image. 

`create(){}` - add objects to the scene. This runs only once at the beginning of the scene. 
``` js
create() {
    this.roachCat = this.add.image(400, 350, "roachCat");
}
```
`this.XXX` - It creates a property of the scene. `this` means the current scene. The `XXX` is the property name. We can use it to store data. It is like a variable. 

`this.add.image(#, #, nameOfImage);` - This add the image to somewhere on the screen. The first number is the `x` coordinate, and the second number is the `y` coordinate. The last one is what image you want to add. 






<!--
* Links you used today (websites, videos, etc)
* Things you tried, progress you made, etc
* Challenges, a-ha moments, etc
* Questions you still have
* What you're going to try next
-->
