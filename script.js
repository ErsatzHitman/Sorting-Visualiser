let array = [];
let animationSpeed = 100; // Default animation speed
let arraySize = 10; // Default array size



function updateSpeedValue() {
    animationSpeed = document.getElementById('speedSlider').value;
    document.getElementById('speedValue').textContent = animationSpeed;
  }
  
  function updateSizeValue() {
    arraySize = document.getElementById('sizeSlider').value;
    document.getElementById('sizeValue').textContent = arraySize;
    initializeArray();
  }
  

function initializeArray() {
  array = [];
  for (let i = 0; i < arraySize; i++) {
    array.push(Math.floor(Math.random() * 100) + 1);
  }
  renderBars();
}

function renderBars() {
  const container = document.getElementById('container');
  container.innerHTML = '';
  for (let i = 0; i < array.length; i++) {
    const bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.height = `${array[i]}px`;
    container.appendChild(bar);
  }
}

async function mergeSort() {
  await performSort(mergeSortHelper, 0, array.length - 1);
}

async function mergeSortHelper(start, end) {
  if (start < end) {
    const mid = Math.floor((start + end) / 2);
    await mergeSortHelper(start, mid);
    await mergeSortHelper(mid + 1, end);
    await merge(start, mid, end);
  }
}

async function merge(start, mid, end) {
  const tempArray = [];
  let i = start;
  let j = mid + 1;
  let k = 0;

  while (i <= mid && j <= end) {
    highlightBars(i, j);
    await new Promise(resolve => setTimeout(resolve, animationSpeed));
    if (array[i] <= array[j]) {
      tempArray[k++] = array[i++];
    } else {
      tempArray[k++] = array[j++];
    }
  }

  while (i <= mid) {
    tempArray[k++] = array[i++];
  }

  while (j <= end) {
    tempArray[k++] = array[j++];
  }

  for (let p = 0; p < k; p++) {
    array[start + p] = tempArray[p];
  }

  renderBars();
}

async function quickSort() {
  await performSort(quickSortHelper, 0, array.length - 1);
}

async function quickSortHelper(start, end) {
  if (start < end) {
    const pivotIndex = await partition(start, end);
    await quickSortHelper(start, pivotIndex - 1);
    await quickSortHelper(pivotIndex + 1, end);
  }
}

async function partition(start, end) {
  const pivotValue = array[end];
  let pivotIndex = start;

  for (let i = start; i < end; i++) {
    highlightBars(i, end);
    await new Promise(resolve => setTimeout(resolve, animationSpeed));
    if (array[i] < pivotValue) {
      [array[i], array[pivotIndex]] = [array[pivotIndex], array[i]];
      pivotIndex++;
    }
  }

  [array[pivotIndex], array[end]] = [array[end], array[pivotIndex]];
  renderBars();

  return pivotIndex;
}

async function bubbleSort() {
  await performSort(bubbleSortHelper);
}

async function bubbleSortHelper() {
  const n = array.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      highlightBars(j, j + 1);
      await new Promise(resolve => setTimeout(resolve, animationSpeed));
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }
  }
  renderBars();
}

function highlightBars(index1, index2) {
  const bars = document.querySelectorAll('.bar');
  bars[index1].classList.add('red');
  bars[index2].classList.add('red');
  setTimeout(() => {
    bars[index1].classList.remove('red');
    bars[index2].classList.remove('red');
  }, animationSpeed);
}



async function performSort(sortFunction, ...args) {
    const sliders = document.querySelectorAll('input[type="range"]');
    const buttons = document.querySelectorAll('button');
  
    sliders.forEach(slider => (slider.disabled = true));
    buttons.forEach(button => (button.disabled = true));
  
    await sortFunction(...args);
  
    sliders.forEach(slider => (slider.disabled = false));
    buttons.forEach(button => (button.disabled = false));
  }
  
  
  

initializeArray();
