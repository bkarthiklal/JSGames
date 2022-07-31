const circle1 = {
  x: 100,
  y: 100,
  radius: 50
};
const circle2 = {
  x: 200,
  y: 200,
  radius: 50
};

let dx = circle2.x - circle1.x;
let dy = circle2.y - circle1.y;
let distance = Math.sqrt(dx * dx + dy * dy);

let sumOfRadii = circle1.radius + circle2.radius;

if (distance < sumOfRadii) {
  console.log('collision');
} else if(distance === sumOfRadii) {
  console.log('touch');
} else {
  console.log('no collision');
}