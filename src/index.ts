import Button from "./components/Button/Button";

const button = new Button({
  text: 'Click me',
})

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');

  app.innerHTML = button;
})
