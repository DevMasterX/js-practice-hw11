const animatedText =
  'Please enter a keyword in the field above ⬆️ to search for images.';

const textContainer = document.querySelector('.animated-text');

if (!textContainer) {
  console.error('Element with class ".animated-text" not found.');
  return;
}

const typingSpeed = 100;
const erasingSpeed = 50;
const pauseBeforeErasing = 2000;
let typingTimeoutId;
let isTypingEnabled = false;

// if (isTypingEnabled) {
//   typeEffect();
// }

async function typeEffect() {
  for (let i = 0; i <= animatedText.length; i += 1) {
    if (!isTypingEnabled) {
      return;
    }
    textContainer.textContent = animatedText.slice(0, i);
    await pause(typingSpeed);
  }
  await pause(pauseBeforeErasing);

  for (let i = animatedText.length; i >= 0; i -= 1) {
    if (!isTypingEnabled) {
      return;
    }
    textContainer.textContent = animatedText.slice(0, i);
    await pause(erasingSpeed);
  }

  // Используем setTimeout (вместо рекурсивного вызова)
  // для предотвращения переполнения стека
  typingTimeoutId = setTimeout(typeEffect, 100);
}

async function pause(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function startTypingEffect() {
  if (isTypingEnabled) {
    return;
  }
  isTypingEnabled = true;
  typeEffect();
}

function stopTypingEffect() {
  isTypingEnabled = false;
  textContainer.textContent = '';

  if (typingTimeoutId) {
    clearTimeout(typingTimeoutId);
    typingTimeoutId = null;
  }
}
export { startTypingEffect, stopTypingEffect };
