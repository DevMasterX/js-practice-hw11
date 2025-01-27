const animatedText =
  'Please enter a keyword in the field above ⬆️ to search for images.';

const textContainer = document.querySelector('.animated-text');

const typingSpeed = 100;
const erasingSpeed = 50;
const pauseBeforeErasing = 1000;

async function typeEffect() {
  for (let i = 0; i <= animatedText.length; i += 1) {
    textContainer.textContent = animatedText.slice(0, i);
    await pause(typingSpeed);
  }

  await pause(pauseBeforeErasing);

  for (let i = animatedText.length; i >= 0; i -= 1) {
    textContainer.textContent = animatedText.slice(0, i);
    await pause(erasingSpeed);
  }
  typeEffect();
}

async function pause(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export { typeEffect };
